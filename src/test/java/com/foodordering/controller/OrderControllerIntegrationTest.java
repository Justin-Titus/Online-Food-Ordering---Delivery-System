package com.foodordering.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodordering.dto.CreateOrderRequest;
import com.foodordering.entity.MenuItem;
import com.foodordering.entity.Order;
import com.foodordering.entity.OrderStatus;
import com.foodordering.entity.Role;
import com.foodordering.entity.User;
import com.foodordering.repository.MenuItemRepository;
import com.foodordering.repository.OrderRepository;
import com.foodordering.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureWebMvc
@ActiveProfiles("test")
@Transactional
public class OrderControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User testCustomer;
    private User testAdmin;
    private MenuItem testMenuItem;
    private MockHttpSession customerSession;
    private MockHttpSession adminSession;

    @BeforeEach
    void setUp() {
        // Create test customer
        testCustomer = new User();
        testCustomer.setEmail("customer@test.com");
        testCustomer.setPassword(passwordEncoder.encode("password"));
        testCustomer.setRole(Role.CUSTOMER);
        testCustomer = userRepository.save(testCustomer);

        // Create test admin
        testAdmin = new User();
        testAdmin.setEmail("admin@test.com");
        testAdmin.setPassword(passwordEncoder.encode("password"));
        testAdmin.setRole(Role.ADMIN);
        testAdmin = userRepository.save(testAdmin);

        // Create test menu item
        testMenuItem = new MenuItem();
        testMenuItem.setName("Test Pizza");
        testMenuItem.setPrice(BigDecimal.valueOf(12.99));
        testMenuItem.setCategory("Pizza");
        testMenuItem.setAvailable(true);
        testMenuItem = menuItemRepository.save(testMenuItem);

        // Create sessions
        customerSession = new MockHttpSession();
        customerSession.setAttribute("userId", testCustomer.getId());
        customerSession.setAttribute("userEmail", testCustomer.getEmail());
        customerSession.setAttribute("userRole", testCustomer.getRole());

        adminSession = new MockHttpSession();
        adminSession.setAttribute("userId", testAdmin.getId());
        adminSession.setAttribute("userEmail", testAdmin.getEmail());
        adminSession.setAttribute("userRole", testAdmin.getRole());
    }

    @Test
    void testGetUserOrders() throws Exception {
        // Create a test order
        Order order = new Order(testCustomer.getId(), BigDecimal.valueOf(12.99));
        orderRepository.save(order);

        mockMvc.perform(get("/api/orders")
                .session(customerSession))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void testUpdateOrderStatusAsAdmin() throws Exception {
        // Create a test order
        Order order = new Order(testCustomer.getId(), BigDecimal.valueOf(12.99));
        order = orderRepository.save(order);

        mockMvc.perform(put("/api/orders/{orderId}/status", order.getId())
                .param("status", "CONFIRMED")
                .session(adminSession))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("CONFIRMED"));
    }

    @Test
    void testUpdateOrderStatusAsCustomerShouldFail() throws Exception {
        // Create a test order
        Order order = new Order(testCustomer.getId(), BigDecimal.valueOf(12.99));
        order = orderRepository.save(order);

        mockMvc.perform(put("/api/orders/{orderId}/status", order.getId())
                .param("status", "CONFIRMED")
                .session(customerSession))
                .andExpect(status().isForbidden());
    }

    @Test
    void testGetAllOrdersAsAdmin() throws Exception {
        // Create a test order
        Order order = new Order(testCustomer.getId(), BigDecimal.valueOf(12.99));
        orderRepository.save(order);

        mockMvc.perform(get("/api/orders/admin/all")
                .session(adminSession))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void testGetAllOrdersAsCustomerShouldFail() throws Exception {
        mockMvc.perform(get("/api/orders/admin/all")
                .session(customerSession))
                .andExpect(status().isForbidden());
    }
}