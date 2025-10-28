package com.foodordering.dto;

import com.foodordering.entity.OrderStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    
    private Long id;
    private Long userId;
    private List<OrderItemResponse> items;
    private BigDecimal total;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public OrderResponse() {}
    
    public OrderResponse(Long id, Long userId, List<OrderItemResponse> items, 
                        BigDecimal total, OrderStatus status, 
                        LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.total = total;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public List<OrderItemResponse> getItems() {
        return items;
    }
    
    public void setItems(List<OrderItemResponse> items) {
        this.items = items;
    }
    
    public BigDecimal getTotal() {
        return total;
    }
    
    public void setTotal(BigDecimal total) {
        this.total = total;
    }
    
    public OrderStatus getStatus() {
        return status;
    }
    
    public void setStatus(OrderStatus status) {
        this.status = status;
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
    
    public static class OrderItemResponse {
        
        private Long id;
        private Long menuItemId;
        private String menuItemName;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal subtotal;
        
        // Constructors
        public OrderItemResponse() {}
        
        public OrderItemResponse(Long id, Long menuItemId, String menuItemName, 
                               Integer quantity, BigDecimal unitPrice, BigDecimal subtotal) {
            this.id = id;
            this.menuItemId = menuItemId;
            this.menuItemName = menuItemName;
            this.quantity = quantity;
            this.unitPrice = unitPrice;
            this.subtotal = subtotal;
        }
        
        // Getters and Setters
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public Long getMenuItemId() {
            return menuItemId;
        }
        
        public void setMenuItemId(Long menuItemId) {
            this.menuItemId = menuItemId;
        }
        
        public String getMenuItemName() {
            return menuItemName;
        }
        
        public void setMenuItemName(String menuItemName) {
            this.menuItemName = menuItemName;
        }
        
        public Integer getQuantity() {
            return quantity;
        }
        
        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
        
        public BigDecimal getUnitPrice() {
            return unitPrice;
        }
        
        public void setUnitPrice(BigDecimal unitPrice) {
            this.unitPrice = unitPrice;
        }
        
        public BigDecimal getSubtotal() {
            return subtotal;
        }
        
        public void setSubtotal(BigDecimal subtotal) {
            this.subtotal = subtotal;
        }
    }
}