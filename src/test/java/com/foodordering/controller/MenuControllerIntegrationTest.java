package com.foodordering.controller;

import com.foodordering.repository.MenuItemRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureWebMvc
@ActiveProfiles("test")
public class MenuControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private MenuItemRepository menuItemRepository;
    
    @Test
    public void testGetAllMenuItems() throws Exception {
        mockMvc.perform(get("/api/menu/items"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$", hasSize(greaterThan(0))))
                .andExpect(jsonPath("$[0].name", notNullValue()))
                .andExpect(jsonPath("$[0].price", notNullValue()))
                .andExpect(jsonPath("$[0].category", notNullValue()));
    }
    
    @Test
    public void testGetMenuItemsByCategory() throws Exception {
        // Test Pizza category
        mockMvc.perform(get("/api/menu/items?category=Pizza"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$", hasSize(greaterThan(0))))
                .andExpect(jsonPath("$[*].category", everyItem(equalTo("Pizza"))));
        
        // Test Burgers category
        mockMvc.perform(get("/api/menu/items?category=Burgers"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$", hasSize(greaterThan(0))))
                .andExpect(jsonPath("$[*].category", everyItem(equalTo("Burgers"))));
        
        // Test Drinks category
        mockMvc.perform(get("/api/menu/items?category=Drinks"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$", hasSize(greaterThan(0))))
                .andExpect(jsonPath("$[*].category", everyItem(equalTo("Drinks"))));
    }
    
    @Test
    public void testGetAvailableMenuItems() throws Exception {
        mockMvc.perform(get("/api/menu/items?availableOnly=true"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$", hasSize(greaterThan(0))))
                .andExpect(jsonPath("$[*].available", everyItem(equalTo(true))));
    }
}