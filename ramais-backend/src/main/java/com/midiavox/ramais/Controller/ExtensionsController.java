package com.midiavox.ramais.Controller;

import com.midiavox.ramais.Model.Extensions;
import com.midiavox.ramais.Service.ExtensionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/extensions")
public class ExtensionsController {

    @Autowired
    private ExtensionsService extensionsService;

    // Retorna todos os ramais disponíveis (não em uso e sem usuário logado)
    @GetMapping("/available")
    public ResponseEntity<List<Extensions>> getAvailableExtensions() {
        return ResponseEntity.ok(extensionsService.findAvailableExtensions());
    }

    // Retorna o primeiro ramal disponível (não em uso e sem usuário logado)
    @GetMapping("/first-available")
    public ResponseEntity<Optional<Extensions>> getFirstAvailableExtension() {
        return ResponseEntity.ok(extensionsService.findFirstAvailableExtension());
    }

    // Retorna os ramais que estão em uso
    @GetMapping("/in-use")
    public ResponseEntity<List<Extensions>> getExtensionsInUse() {
        return ResponseEntity.ok(extensionsService.getExtensionsInUse());
    }

    // Faz login em um ramal
    @PostMapping("/login")
    public ResponseEntity<String> loginToExtension(@RequestParam Short extensionNumber, @RequestParam String user) {
        boolean success = extensionsService.loginToExtension(extensionNumber, user);
        return success ? ResponseEntity.ok("Usuário logado no ramal " + extensionNumber)
                : ResponseEntity.badRequest().body("Falha ao logar no ramal.");
    }

    // Faz logout de um ramal
    @PostMapping("/logout")
    public ResponseEntity<String> logoutFromExtension(@RequestParam Short extensionNumber) {
        boolean success = extensionsService.logoutFromExtension(extensionNumber);
        return success ? ResponseEntity.ok("Logout realizado no ramal " + extensionNumber)
                : ResponseEntity.badRequest().body("Falha ao deslogar.");
    }
}
