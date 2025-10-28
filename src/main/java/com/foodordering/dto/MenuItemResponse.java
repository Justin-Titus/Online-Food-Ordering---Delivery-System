package com.foodordering.dto;

import com.foodordering.entity.MenuItem;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class MenuItemResponse {
    
    private Long id;
    private String name;
    private BigDecimal price;
    private String category;
    private Boolean available;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public MenuItemResponse() {}
    
    public MenuItemResponse(MenuItem menuItem) {
        this.id = menuItem.getId();
        this.name = menuItem.getName();
        this.price = menuItem.getPrice();
        this.category = menuItem.getCategory();
        this.available = menuItem.getAvailable();
        this.createdAt = menuItem.getCreatedAt();
        this.updatedAt = menuItem.getUpdatedAt();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public Boolean getAvailable() {
        return available;
    }
    
    public void setAvailable(Boolean available) {
        this.available = available;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}