package com.foodordering.service;

import com.foodordering.dto.MenuItemRequest;
import com.foodordering.dto.MenuItemResponse;
import com.foodordering.entity.MenuItem;
import com.foodordering.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MenuService {
    
    @Autowired
    private MenuItemRepository menuItemRepository;
    
    /**
     * Get all menu items
     */
    public List<MenuItemResponse> getAllMenuItems() {
        return menuItemRepository.findAll()
                .stream()
                .map(MenuItemResponse::new)
                .collect(Collectors.toList());
    }
    
    /**
     * Get menu items by category
     */
    public List<MenuItemResponse> getMenuItemsByCategory(String category) {
        return menuItemRepository.findByCategory(category)
                .stream()
                .map(MenuItemResponse::new)
                .collect(Collectors.toList());
    }
    
    /**
     * Get only available menu items
     */
    public List<MenuItemResponse> getAvailableMenuItems() {
        return menuItemRepository.findByAvailable(true)
                .stream()
                .map(MenuItemResponse::new)
                .collect(Collectors.toList());
    }
    
    /**
     * Get menu item by ID
     */
    public Optional<MenuItemResponse> getMenuItemById(Long id) {
        return menuItemRepository.findById(id)
                .map(MenuItemResponse::new);
    }
    
    /**
     * Create a new menu item
     */
    public MenuItemResponse createMenuItem(MenuItemRequest request) {
        MenuItem menuItem = new MenuItem(
                request.getName(),
                request.getPrice(),
                request.getCategory(),
                request.getAvailable()
        );
        
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return new MenuItemResponse(savedMenuItem);
    }
    
    /**
     * Update an existing menu item
     */
    public Optional<MenuItemResponse> updateMenuItem(Long id, MenuItemRequest request) {
        return menuItemRepository.findById(id)
                .map(menuItem -> {
                    menuItem.setName(request.getName());
                    menuItem.setPrice(request.getPrice());
                    menuItem.setCategory(request.getCategory());
                    menuItem.setAvailable(request.getAvailable());
                    
                    MenuItem updatedMenuItem = menuItemRepository.save(menuItem);
                    return new MenuItemResponse(updatedMenuItem);
                });
    }
    
    /**
     * Delete a menu item
     */
    public boolean deleteMenuItem(Long id) {
        if (menuItemRepository.existsById(id)) {
            menuItemRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    /**
     * Toggle menu item availability
     */
    public Optional<MenuItemResponse> toggleAvailability(Long id) {
        return menuItemRepository.findById(id)
                .map(menuItem -> {
                    menuItem.setAvailable(!menuItem.getAvailable());
                    MenuItem updatedMenuItem = menuItemRepository.save(menuItem);
                    return new MenuItemResponse(updatedMenuItem);
                });
    }
}