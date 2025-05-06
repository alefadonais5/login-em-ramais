package com.midiavox.ramais.Service;

import com.midiavox.ramais.Model.Extensions;
import com.midiavox.ramais.Repository.ExtensionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ExtensionsService {

    @Autowired
    private ExtensionsRepository extensionsRepository;

    // Buscar todos os ramais disponíveis (não em uso e sem usuário logado)
    public List<Extensions> findAvailableExtensions() {
        return extensionsRepository.findByInUseFalse();  // Verifica apenas se o ramal não está em uso
    }

    // ✅ Primeiro ramal disponível corretamente
    public Optional<Extensions> findFirstAvailableExtension() {
        return extensionsRepository.findByInUseFalseAndLoggedUserIsNull().stream().findFirst();
    }

    // Realizar login em um ramal
    @Transactional
    public boolean loginToExtension(Short extensionNumber, String user) {
        Extensions extension = extensionsRepository.findByExtensionNumber(extensionNumber);

        if (extension == null) {
            System.out.println("Erro: Ramal " + extensionNumber + " não encontrado.");
            return false;
        }

        // Verifique se o ramal já está em uso
        if (extension.getLoggedUser() != null || extension.isInUse()) {
            System.out.println("Erro: Ramal " + extensionNumber + " já está em uso.");
            return false;
        }

        // Atualize os campos para refletir o login
        extension.setLoggedUser(user);  // Define o usuário logado
        extension.setInUse(true);  // Marca o ramal como "em uso"

        // Salva no banco de dados e garante o commit da transação
        extensionsRepository.save(extension);

        // Confirmar a atualização de estado
        Extensions updatedExtension = extensionsRepository.findByExtensionNumber(extensionNumber);
        if (updatedExtension.isInUse()) {
            System.out.println("Login bem-sucedido no ramal " + extensionNumber);
            return true;
        } else {
            System.out.println("Erro ao atualizar status do ramal.");
            return false;
        }
    }

    // ✅ Logout que libera o ramal corretamente
    @Transactional
    public boolean logoutFromExtension(Short extensionNumber) {
        Extensions extension = extensionsRepository.findByExtensionNumber(extensionNumber);

        if (extension != null && extension.getLoggedUser() != null) {
            // Limpa os dados do usuário logado
            extension.setLoggedUser(null);
            extension.setInUse(false);  // Libera o ramal

            // Salva a atualização no banco
            extensionsRepository.save(extension);

            // Confirmar a atualização do status
            Extensions updatedExtension = extensionsRepository.findByExtensionNumber(extensionNumber);
            if (!updatedExtension.isInUse()) {
                System.out.println("Logout bem-sucedido no ramal " + extensionNumber);
                return true;
            } else {
                System.out.println("Erro ao liberar o ramal.");
                return false;
            }
        }

        System.out.println("Ramal não encontrado ou já está deslogado.");
        return false;
    }

    // Buscar ramais que estão em uso
    public List<Extensions> getExtensionsInUse() {
        return extensionsRepository.findByLoggedUserIsNotNull();
    }
}
