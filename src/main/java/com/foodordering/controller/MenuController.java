package com.foodordering.controller;

import com.foodordering.dto.MenuItemRequest;
import com.foodordering.dto.MenuItemResponse;
import com.foodordering.dto.ErrorResponse;
import com.foodordering.service.MenuService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/menu")
public class MenuController {
    
    @Autowired
    private MenuService menuService;
    
    /**
     * GET /api/menu/items - Get all menu items
     * Public endpoint - no authentication required
     */
    @GetMapping("/items")
    public ResponseEntity<List<MenuItemResponse>> getAllMenuItems(
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "false") boolean availableOnly) {
        
        List<MenuItemResponse> menuItems;
        
        if (availableOnly) {
            menuItems = menuService.getAvailableMenuItems();
        } else if (category != null && !category.isEmpty()) {
            menuItems = menuService.getMenuItemsByCategory(category);
        } else {
            menuItems = menuService.getAllMenuItems();
        }
        
        return ResponseEntity.ok(menuItems);
    }
    
    /**
     * GET /api/menu/items/{id} - Get specific menu item
     * Public endpoint - no authentication required
     */
    @GetMapping("/items/{id}")
    public ResponseEntity<?> getMenuItemById(@PathVariable Long id) {
        Optional<MenuItemResponse> menuItem = menuService.getMenuItemById(id);
        
        if (menuItem.isPresent()) {
            return ResponseEntity.ok(menuItem.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("NOT_FOUND", "Menu item not found with id: " + id));
        }
    }
    
    /**
     * POST /api/menu/items - Create new menu item
     * Admin only endpoint
     */
    @PostMapping("/items")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createMenuItem(@Valid @RequestBody MenuItemRequest request) {
        try {
            MenuItemResponse createdMenuItem = menuService.createMenuItem(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMenuItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("CREATION_FAILED", "Failed to create menu item: " + e.getMessage()));
        }
    }
    
    /**
     * PUT /api/menu/items/{id} - Update existing menu item
     * Admin only endpoint
     */
    @PutMapping("/items/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateMenuItem(@PathVariable Long id, @Valid @RequestBody MenuItemRequest request) {
        Optional<MenuItemResponse> updatedMenuItem = menuService.updateMenuItem(id, request);
        
        if (updatedMenuItem.isPresent()) {
            return ResponseEntity.ok(updatedMenuItem.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("NOT_FOUND", "Menu item not found with id: " + id));
        }
    }
    
    /**
     * DELETE /api/menu/items/{id} - Delete menu item
     * Admin only endpoint
     */
    @DeleteMapping("/items/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteMenuItem(@PathVariable Long id) {
        boolean deleted = menuService.deleteMenuItem(id);
        
        if (deleted) {
            return ResponseEntity.ok().body("Menu item deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("NOT_FOUND", "Menu item not found with id: " + id));
        }
    }
    
    /**
     * PATCH /api/menu/items/{id}/availability - Toggle menu item availability
     * Admin only endpoint
     */
    @PatchMapping("/items/{id}/availability")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> toggleAvailability(@PathVariable Long id) {
        Optional<MenuItemResponse> updatedMenuItem = menuService.toggleAvailability(id);
        
        if (updatedMenuItem.isPresent()) {
            return ResponseEntity.ok(updatedMenuItem.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("NOT_FOUND", "Menu item not found with id: " + id));
        }
    }
}