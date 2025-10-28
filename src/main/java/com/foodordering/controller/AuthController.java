package com.foodordering.controller;

import com.foodordering.dto.AuthResponse;
import com.foodordering.dto.LoginRequest;
import com.foodordering.dto.RegisterRequest;
import com.foodordering.entity.User;
import com.foodordering.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request, HttpSession session) {
        try {
            User user = userService.registerUser(request.getEmail(), request.getPassword(), request.getRole());
            
            // Store user in session
            session.setAttribute("userId", user.getId());
            session.setAttribute("userEmail", user.getEmail());
            session.setAttribute("userRole", user.getRole());
            
            AuthResponse response = new AuthResponse(
                user.getId(), 
                user.getEmail(), 
                user.getRole(), 
                "Registration successful"
            );
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            AuthResponse response = new AuthResponse(null, null, null, e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request, HttpSession session) {
        try {
            User user = userService.authenticateUser(request.getEmail(), request.getPassword());
            
            // Store user in session
            session.setAttribute("userId", user.getId());
            session.setAttribute("userEmail", user.getEmail());
            session.setAttribute("userRole", user.getRole());
            
            AuthResponse response = new AuthResponse(
                user.getId(), 
                user.getEmail(), 
                user.getRole(), 
                "Login successful"
            );
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            AuthResponse response = new AuthResponse(null, null, null, e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout(HttpSession session) {
        session.invalidate();
        AuthResponse response = new AuthResponse(null, null, null, "Logout successful");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUser(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            AuthResponse response = new AuthResponse(null, null, null, "Not authenticated");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        String userEmail = (String) session.getAttribute("userEmail");
        com.foodordering.entity.Role userRole = (com.foodordering.entity.Role) session.getAttribute("userRole");
        
        AuthResponse response = new AuthResponse(userId, userEmail, userRole, "User authenticated");
        return ResponseEntity.ok(response);
    }
}