package com.midiavox.ramais.Repository;

import com.midiavox.ramais.Model.Extensions;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExtensionsRepository extends JpaRepository<Extensions, Long> {

    // Busca um ramal específico pelo número
    Extensions findByExtensionNumber(Short extensionNumber);

    // Busca todos os ramais disponíveis
    List<Extensions> findByInUseFalse();

    // Busca todos os ramais que têm usuários logados
    List<Extensions> findByLoggedUserIsNotNull();

    // Busca todos os ramais disponíveis e sem usuário logado
    List<Extensions> findByInUseFalseAndLoggedUserIsNull();
}
