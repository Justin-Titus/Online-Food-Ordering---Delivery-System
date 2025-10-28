package com.foodordering.dto;

import com.foodordering.entity.Role;

public class AuthResponse {
    private Long id;
    private String email;
    private Role role;
    private String message;
    
    public AuthResponse() {}
    
    public AuthResponse(Long id, String email, Role role, String message) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.message = message;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Role getRole() {
        return role;
    }
    
    public void setRole(Role role) {
        this.role = role;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}