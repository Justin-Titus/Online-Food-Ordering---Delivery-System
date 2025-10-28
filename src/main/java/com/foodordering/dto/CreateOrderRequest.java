package com.foodordering.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class CreateOrderRequest {
    
    @NotEmpty(message = "Order items cannot be empty")
    @Valid
    private List<OrderItemRequest> items;
    
    // Constructors
    public CreateOrderRequest() {}
    
    public CreateOrderRequest(List<OrderItemRequest> items) {
        this.items = items;
    }
    
    // Getters and Setters
    public List<OrderItemRequest> getItems() {
        return items;
    }
    
    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
    
    public static class OrderItemRequest {
        
        @NotNull(message = "Menu item ID is required")
        private Long menuItemId;
        
        @NotNull(message = "Quantity is required")
        private Integer quantity;
        
        // Constructors
        public OrderItemRequest() {}
        
        public OrderItemRequest(Long menuItemId, Integer quantity) {
            this.menuItemId = menuItemId;
            this.quantity = quantity;
        }
        
        // Getters and Setters
        public Long getMenuItemId() {
            return menuItemId;
        }
        
        public void setMenuItemId(Long menuItemId) {
            this.menuItemId = menuItemId;
        }
        
        public Integer getQuantity() {
            return quantity;
        }
        
        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }
}