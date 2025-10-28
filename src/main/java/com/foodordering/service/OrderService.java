package com.foodordering.service;

import com.foodordering.dto.CreateOrderRequest;
import com.foodordering.dto.OrderResponse;
import com.foodordering.entity.MenuItem;
import com.foodordering.entity.Order;
import com.foodordering.entity.OrderItem;
import com.foodordering.entity.OrderStatus;
import com.foodordering.repository.MenuItemRepository;
import com.foodordering.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private MenuItemRepository menuItemRepository;
    
    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request, Long userId) {
        // Calculate total and create order items
        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();
        
        // Create the order first
        Order order = new Order(userId, BigDecimal.ZERO);
        
        // Process each item in the request
        for (CreateOrderRequest.OrderItemRequest itemRequest : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId())
                .orElseThrow(() -> new RuntimeException("Menu item not found: " + itemRequest.getMenuItemId()));
            
            if (!menuItem.getAvailable()) {
                throw new RuntimeException("Menu item is not available: " + menuItem.getName());
            }
            
            BigDecimal itemTotal = menuItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            total = total.add(itemTotal);
            
            OrderItem orderItem = new OrderItem(order, menuItem, itemRequest.getQuantity(), menuItem.getPrice());
            orderItems.add(orderItem);
        }
        
        // Set the calculated total
        order.setTotal(total);
        order.setItems(orderItems);
        
        // Save the order (this will cascade to order items)
        Order savedOrder = orderRepository.save(order);
        
        return convertToOrderResponse(savedOrder);
    }
    
    public OrderResponse getOrderById(Long orderId, Long userId) {
        Order order = orderRepository.findByIdWithItems(orderId);
        if (order == null) {
            throw new RuntimeException("Order not found: " + orderId);
        }
        
        if (!order.getUserId().equals(userId)) {
            throw new RuntimeException("Access denied to order: " + orderId);
        }
        
        return convertToOrderResponse(order);
    }
    
    public List<OrderResponse> getUserOrders(Long userId) {
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return orders.stream()
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, String statusString) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        
        try {
            OrderStatus newStatus = OrderStatus.valueOf(statusString.toUpperCase());
            order.setStatus(newStatus);
            Order updatedOrder = orderRepository.save(order);
            
            // Fetch the order with items for the response
            Order orderWithItems = orderRepository.findByIdWithItems(orderId);
            return convertToOrderResponse(orderWithItems);
            
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid order status: " + statusString);
        }
    }
    
    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAllByOrderByCreatedAtDesc();
        return orders.stream()
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
    }
    
    private OrderResponse convertToOrderResponse(Order order) {
        List<OrderResponse.OrderItemResponse> itemResponses = order.getItems().stream()
                .map(item -> new OrderResponse.OrderItemResponse(
                        item.getId(),
                        item.getMenuItem().getId(),
                        item.getMenuItem().getName(),
                        item.getQuantity(),
                        item.getUnitPrice(),
                        item.getSubtotal()
                ))
                .collect(Collectors.toList());
        
        return new OrderResponse(
                order.getId(),
                order.getUserId(),
                itemResponses,
                order.getTotal(),
                order.getStatus(),
                order.getCreatedAt(),
                order.getUpdatedAt()
        );
    }
}