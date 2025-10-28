package com.foodordering.config;

import com.foodordering.entity.MenuItem;
import com.foodordering.entity.Role;
import com.foodordering.entity.User;
import com.foodordering.repository.MenuItemRepository;
import com.foodordering.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private MenuItemRepository menuItemRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Create admin user if not exists
        if (userRepository.findByEmail("admin@foodordering.com").isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@foodordering.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            System.out.println("Admin user created: admin@foodordering.com / admin123");
        }
        
        // Create sample customer if not exists
        if (userRepository.findByEmail("customer@example.com").isEmpty()) {
            User customer = new User();
            customer.setEmail("customer@example.com");
            customer.setPassword(passwordEncoder.encode("customer123"));
            customer.setRole(Role.CUSTOMER);
            userRepository.save(customer);
            System.out.println("Customer user created: customer@example.com / customer123");
        }
        
        // Create sample menu items if not exists
        if (menuItemRepository.count() == 0) {
            createSampleMenuItems();
            System.out.println("Sample menu items created with categories: Pizza, Burgers, Drinks");
        }
    }
    
    private void createSampleMenuItems() {
        // Pizza Category
        menuItemRepository.save(new MenuItem("Margherita Pizza", new BigDecimal("12.99"), "Pizza", true));
        menuItemRepository.save(new MenuItem("Pepperoni Pizza", new BigDecimal("14.99"), "Pizza", true));
        menuItemRepository.save(new MenuItem("Vegetarian Pizza", new BigDecimal("13.99"), "Pizza", true));
        menuItemRepository.save(new MenuItem("Hawaiian Pizza", new BigDecimal("15.99"), "Pizza", true));
        menuItemRepository.save(new MenuItem("Meat Lovers Pizza", new BigDecimal("17.99"), "Pizza", true));
        menuItemRepository.save(new MenuItem("BBQ Chicken Pizza", new BigDecimal("16.99"), "Pizza", true));
        menuItemRepository.save(new MenuItem("Four Cheese Pizza", new BigDecimal("15.49"), "Pizza", true));
        menuItemRepository.save(new MenuItem("Supreme Pizza", new BigDecimal("18.99"), "Pizza", true));
        
        // Burgers Category
        menuItemRepository.save(new MenuItem("Classic Burger", new BigDecimal("9.99"), "Burgers", true));
        menuItemRepository.save(new MenuItem("Cheeseburger", new BigDecimal("10.99"), "Burgers", true));
        menuItemRepository.save(new MenuItem("Bacon Burger", new BigDecimal("12.99"), "Burgers", true));
        menuItemRepository.save(new MenuItem("Double Cheeseburger", new BigDecimal("14.99"), "Burgers", true));
        menuItemRepository.save(new MenuItem("Veggie Burger", new BigDecimal("11.99"), "Burgers", true));
        menuItemRepository.save(new MenuItem("BBQ Bacon Burger", new BigDecimal("15.99"), "Burgers", true));
        menuItemRepository.save(new MenuItem("Mushroom Swiss Burger", new BigDecimal("13.99"), "Burgers", true));
        menuItemRepository.save(new MenuItem("Spicy Jalapeño Burger", new BigDecimal("13.49"), "Burgers", true));
        
        // Drinks Category
        menuItemRepository.save(new MenuItem("Coca Cola", new BigDecimal("2.99"), "Drinks", true));
        menuItemRepository.save(new MenuItem("Pepsi", new BigDecimal("2.99"), "Drinks", true));
        menuItemRepository.save(new MenuItem("Orange Juice", new BigDecimal("3.99"), "Drinks", true));
        menuItemRepository.save(new MenuItem("Apple Juice", new BigDecimal("3.99"), "Drinks", true));
        menuItemRepository.save(new MenuItem("Water", new BigDecimal("1.99"), "Drinks", true));
        menuItemRepository.save(new MenuItem("Sparkling Water", new BigDecimal("2.49"), "Drinks", true));
        menuItemRepository.save(new MenuItem("Iced Tea", new BigDecimal("2.79"), "Drinks", true));
        menuItemRepository.save(new MenuItem("Coffee", new BigDecimal("3.49"), "Drinks", true));
        menuItemRepository.save(new MenuItem("Hot Chocolate", new BigDecimal("3.99"), "Drinks", true));
        menuItemRepository.save(new MenuItem("Milkshake - Vanilla", new BigDecimal("4.99"), "Drinks", true));
        menuItemRepository.save(new MenuItem("Milkshake - Chocolate", new BigDecimal("4.99"), "Drinks", true));
        menuItemRepository.save(new MenuItem("Milkshake - Strawberry", new BigDecimal("4.99"), "Drinks", true));
    }
}