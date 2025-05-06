package com.midiavox.ramais.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "extensions")
public class Extensions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "extension_number", unique = true, nullable = false)
    private Short extensionNumber;

    private String loggedUser;

    private boolean inUse;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Short getExtensionNumber() {
        return extensionNumber;
    }

    public void setExtensionNumber(Short extensionNumber) {
        this.extensionNumber = extensionNumber;
    }

    public String getLoggedUser() {
        return loggedUser;
    }

    public void setLoggedUser(String loggedUser) {
        this.loggedUser = loggedUser;
    }

    public boolean isInUse() {
        return inUse;
    }

    public void setInUse(boolean inUse) {
        this.inUse = inUse;
    }
}
