package com.foodordering.config;

import com.foodordering.repository.MenuItemRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class DataLoaderTest {
    
    @Autowired
    private MenuItemRepository menuItemRepository;
    
    @Test
    public void testSampleMenuDataIsLoaded() {
        // Verify that sample menu items are loaded
        long totalItems = menuItemRepository.count();
        assertTrue(totalItems > 0, "Sample menu items should be loaded");
        
        // Verify Pizza category items
        long pizzaItems = menuItemRepository.findByCategory("Pizza").size();
        assertTrue(pizzaItems >= 3, "Should have at least 3 pizza items");
        
        // Verify Burgers category items
        long burgerItems = menuItemRepository.findByCategory("Burgers").size();
        assertTrue(burgerItems >= 3, "Should have at least 3 burger items");
        
        // Verify Drinks category items
        long drinkItems = menuItemRepository.findByCategory("Drinks").size();
        assertTrue(drinkItems >= 3, "Should have at least 3 drink items");
        
        // Verify all items are available by default
        long availableItems = menuItemRepository.findByAvailable(true).size();
        assertEquals(totalItems, availableItems, "All sample items should be available");
    }
    
    @Test
    public void testSpecificMenuItems() {
        // Test that specific items exist
        var pizzaItems = menuItemRepository.findByCategory("Pizza");
        assertTrue(pizzaItems.stream().anyMatch(item -> item.getName().equals("Margherita Pizza")),
                "Should contain Margherita Pizza");
        
        var burgerItems = menuItemRepository.findByCategory("Burgers");
        assertTrue(burgerItems.stream().anyMatch(item -> item.getName().equals("Classic Burger")),
                "Should contain Classic Burger");
        
        var drinkItems = menuItemRepository.findByCategory("Drinks");
        assertTrue(drinkItems.stream().anyMatch(item -> item.getName().equals("Coca Cola")),
                "Should contain Coca Cola");
    }
}