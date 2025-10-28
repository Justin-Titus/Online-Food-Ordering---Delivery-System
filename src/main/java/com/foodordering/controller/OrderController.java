package com.foodordering.controller;

import com.foodordering.dto.CreateOrderRequest;
import com.foodordering.dto.ErrorResponse;
import com.foodordering.dto.OrderResponse;
import com.foodordering.entity.Role;
import com.foodordering.service.OrderService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping
    public ResponseEntity<?> createOrder(@Valid @RequestBody CreateOrderRequest request, HttpSession session) {
        try {
            Long userId = (Long) session.getAttribute("userId");
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("UNAUTHORIZED", "User not authenticated"));
            }
            
            OrderResponse orderResponse = orderService.createOrder(request, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(orderResponse);
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("ORDER_CREATION_FAILED", e.getMessage()));
        }
    }
    
    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrder(@PathVariable Long orderId, HttpSession session) {
        try {
            Long userId = (Long) session.getAttribute("userId");
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("UNAUTHORIZED", "User not authenticated"));
            }
            
            OrderResponse orderResponse = orderService.getOrderById(orderId, userId);
            return ResponseEntity.ok(orderResponse);
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("ORDER_FETCH_FAILED", e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getUserOrders(HttpSession session) {
        try {
            Long userId = (Long) session.getAttribute("userId");
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("UNAUTHORIZED", "User not authenticated"));
            }
            
            List<OrderResponse> orders = orderService.getUserOrders(userId);
            return ResponseEntity.ok(orders);
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("ORDERS_FETCH_FAILED", e.getMessage()));
        }
    }
    
    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, 
                                             @RequestParam String status, 
                                             HttpSession session) {
        try {
            Long userId = (Long) session.getAttribute("userId");
            Role userRole = (Role) session.getAttribute("userRole");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("UNAUTHORIZED", "User not authenticated"));
            }
            
            // Only admins can update order status
            if (userRole != Role.ADMIN) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponse("FORBIDDEN", "Only admins can update order status"));
            }
            
            OrderResponse updatedOrder = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder);
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("STATUS_UPDATE_FAILED", e.getMessage()));
        }
    }
    
    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllOrders(HttpSession session) {
        try {
            Long userId = (Long) session.getAttribute("userId");
            Role userRole = (Role) session.getAttribute("userRole");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("UNAUTHORIZED", "User not authenticated"));
            }
            
            // Only admins can view all orders
            if (userRole != Role.ADMIN) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponse("FORBIDDEN", "Only admins can view all orders"));
            }
            
            List<OrderResponse> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("ORDERS_FETCH_FAILED", e.getMessage()));
        }
    }
}