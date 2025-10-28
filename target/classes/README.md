# Food Ordering System - Backend

Spring Boot REST API for the Food Ordering System with comprehensive authentication, menu management, and order processing capabilities.

## Architecture Overview

The backend follows a layered architecture pattern:

```
Controller Layer (REST endpoints)
    ↓
Service Layer (Business logic)
    ↓
Repository Layer (Data access)
    ↓
Entity Layer (JPA entities)
```

## Features

### Authentication & Authorization
- **Session-based Authentication**: Secure login/logout with HTTP sessions
- **Role-based Access Control**: CUSTOMER and ADMIN roles with different permissions
- **Password Encryption**: BCrypt hashing for secure password storage
- **CORS Support**: Configured for frontend integration

### Menu Management
- **CRUD Operations**: Complete menu item management
- **Category Organization**: Items organized by categories (Pizza, Burgers, Drinks, etc.)
- **Availability Control**: Toggle item availability without deletion
- **Admin-only Access**: Secure endpoints for menu modifications

### Order Processing
- **Order Creation**: Process customer orders with validation
- **Status Tracking**: Complete order lifecycle management
- **Admin Dashboard**: View and manage all orders
- **Customer History**: Users can view their order history

## Tech Stack

- **Java 17** - Modern Java with latest features
- **Spring Boot 3.2.0** - Application framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence layer
- **Hibernate** - ORM implementation
- **H2 Database** - In-memory database for development
- **Maven** - Dependency management and build tool
- **JUnit 5** - Testing framework

## Project Structure

```
src/main/java/com/foodordering/
├── config/                          # Configuration classes
│   ├── DataLoader.java              # Sample data initialization
│   └── SecurityConfig.java          # Security configuration
├── controller/                      # REST controllers
│   ├── AuthController.java          # Authentication endpoints
│   ├── MenuController.java          # Menu management endpoints
│   └── OrderController.java         # Order processing endpoints
├── dto/                             # Data Transfer Objects
│   ├── AuthResponse.java            # Authentication response
│   ├── CreateOrderRequest.java      # Order creation request
│   ├── ErrorResponse.java           # Error response format
│   ├── LoginRequest.java            # Login request
│   ├── MenuItemRequest.java         # Menu item request
│   ├── MenuItemResponse.java        # Menu item response
│   ├── OrderResponse.java           # Order response
│   └── RegisterRequest.java         # Registration request
├── entity/                          # JPA entities
│   ├── MenuItem.java                # Menu item entity
│   ├── Order.java                   # Order entity
│   ├── OrderItem.java               # Order item entity
│   ├── OrderStatus.java             # Order status enum
│   ├── Role.java                    # User role enum
│   └── User.java                    # User entity
├── repository/                      # Data repositories
│   ├── MenuItemRepository.java      # Menu item data access
│   ├── OrderRepository.java         # Order data access
│   └── UserRepository.java          # User data access
├── service/                         # Business logic
│   ├── MenuService.java             # Menu business logic
│   ├── OrderService.java            # Order business logic
│   └── UserService.java             # User business logic
└── FoodOrderingSystemApplication.java # Main application class
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/login
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "CUSTOMER",
  "message": "Login successful"
}
```

#### POST /api/auth/register
Register a new user account.

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

#### POST /api/auth/logout
Logout current user (invalidates session).

#### GET /api/auth/me
Get current authenticated user information.

### Menu Management Endpoints

#### GET /api/menu/items
Get all menu items (public endpoint).

**Query Parameters:**
- `category` (optional): Filter by category
- `availableOnly` (optional): Show only available items

**Response:**
```json
[
  {
    "id": 1,
    "name": "Margherita Pizza",
    "price": 12.99,
    "category": "Pizza",
    "available": true,
    "createdAt": "2025-10-28T10:00:00",
    "updatedAt": "2025-10-28T10:00:00"
  }
]
```

#### POST /api/menu/items (Admin Only)
Create a new menu item.

**Request:**
```json
{
  "name": "New Pizza",
  "description": "Delicious pizza",
  "price": 15.99,
  "category": "Pizza",
  "available": true
}
```

#### PUT /api/menu/items/{id} (Admin Only)
Update an existing menu item.

#### DELETE /api/menu/items/{id} (Admin Only)
Delete a menu item.

#### PATCH /api/menu/items/{id}/availability (Admin Only)
Toggle menu item availability.

### Order Management Endpoints

#### POST /api/orders
Create a new order.

**Request:**
```json
{
  "items": [
    {
      "menuItemId": 1,
      "quantity": 2
    }
  ],
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345"
  },
  "contactPhone": "555-0123"
}
```

#### GET /api/orders
Get current user's orders.

#### GET /api/orders/{id}
Get specific order details.

#### PUT /api/orders/{id}/status (Admin Only)
Update order status.

**Query Parameters:**
- `status`: New status (PENDING, CONFIRMED, PREPARING, OUT_FOR_DELIVERY, DELIVERED, CANCELLED)

#### GET /api/orders/admin/all (Admin Only)
Get all orders for admin dashboard.

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Menu Items Table
```sql
CREATE TABLE menu_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    order_number VARCHAR(50) UNIQUE,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    delivery_address_street VARCHAR(255),
    delivery_address_city VARCHAR(100),
    delivery_address_state VARCHAR(50),
    delivery_address_zip_code VARCHAR(20),
    contact_phone VARCHAR(20),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    menu_item_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);
```

## Security Configuration

### Authentication
- Session-based authentication with HTTP sessions
- Password encryption using BCrypt
- Session timeout configuration
- CSRF protection disabled for API endpoints

### Authorization
- Role-based access control (RBAC)
- Method-level security with `@PreAuthorize`
- Admin-only endpoints protected
- Public endpoints for menu browsing

### CORS Configuration
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:3000"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    return source;
}
```

## Business Logic

### Order Processing Flow
1. **Validation**: Verify menu items exist and are available
2. **Calculation**: Calculate total amount including taxes
3. **Creation**: Create order with PENDING status
4. **Items**: Create associated order items
5. **Response**: Return order details to customer

### Menu Management
- **Category Validation**: Ensure valid categories
- **Price Validation**: Positive decimal values
- **Availability Control**: Soft delete through availability flag
- **Audit Trail**: Track creation and update timestamps

### User Management
- **Email Uniqueness**: Prevent duplicate accounts
- **Password Security**: BCrypt hashing with salt
- **Role Assignment**: Default to CUSTOMER role
- **Session Management**: Track user sessions

## Error Handling

### Global Exception Handling
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.badRequest()
            .body(new ErrorResponse("RUNTIME_ERROR", e.getMessage()));
    }
}
```

### Custom Error Responses
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Menu item not found with id: 123"
}
```

## Testing

### Test Structure
```
src/test/java/com/foodordering/
├── controller/                      # Integration tests
│   ├── AuthControllerTest.java
│   ├── MenuControllerTest.java
│   └── OrderControllerTest.java
├── service/                         # Unit tests
│   ├── MenuServiceTest.java
│   ├── OrderServiceTest.java
│   └── UserServiceTest.java
└── repository/                      # Repository tests
    ├── MenuItemRepositoryTest.java
    ├── OrderRepositoryTest.java
    └── UserRepositoryTest.java
```

### Running Tests
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=OrderControllerTest

# Run with coverage
mvn test jacoco:report
```

### Test Configuration
- **@SpringBootTest**: Full application context
- **@AutoConfigureTestDatabase**: In-memory H2 for tests
- **@Transactional**: Rollback after each test
- **MockMvc**: Web layer testing

## Configuration

### Application Properties
```properties
# Server configuration
server.port=8080

# Database configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# JPA configuration
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# H2 Console (development only)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Security
spring.security.user.name=admin
spring.security.user.password=admin
```

### Profile-specific Configuration
- **application-dev.properties**: Development settings
- **application-test.properties**: Test environment
- **application-prod.properties**: Production configuration

## Deployment

### Building the Application
```bash
# Create executable JAR
mvn clean package

# Skip tests during build
mvn clean package -DskipTests

# The JAR file will be in target/food-ordering-system-0.0.1-SNAPSHOT.jar
```

### Running the JAR
```bash
java -jar target/food-ordering-system-0.0.1-SNAPSHOT.jar
```

### Docker Deployment
```dockerfile
FROM openjdk:17-jre-slim
COPY target/food-ordering-system-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## Monitoring and Logging

### Actuator Endpoints
```properties
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always
```

### Logging Configuration
```properties
logging.level.com.foodordering=DEBUG
logging.level.org.springframework.security=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
```

## Performance Considerations

### Database Optimization
- **Indexing**: Proper indexes on frequently queried columns
- **Connection Pooling**: HikariCP for connection management
- **Query Optimization**: Use of JPA projections for large datasets
- **Caching**: Consider Redis for session storage in production

### API Performance
- **Pagination**: Implement for large result sets
- **Compression**: Enable GZIP compression
- **Rate Limiting**: Implement for public endpoints
- **Async Processing**: For heavy operations

## Security Best Practices

### Input Validation
- **Bean Validation**: Use `@Valid` annotations
- **SQL Injection**: Parameterized queries through JPA
- **XSS Prevention**: Proper input sanitization
- **CSRF Protection**: Enabled for state-changing operations

### Authentication Security
- **Password Policy**: Minimum length and complexity
- **Session Security**: Secure session configuration
- **Brute Force Protection**: Account lockout mechanisms
- **Audit Logging**: Track authentication events

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check H2 console at `/h2-console`
   - Verify JDBC URL: `jdbc:h2:mem:testdb`

2. **Authentication Issues**
   - Check session configuration
   - Verify CORS settings for frontend

3. **Permission Denied Errors**
   - Verify user roles in database
   - Check method-level security annotations

4. **Build Failures**
   - Ensure Java 17 is installed
   - Check Maven dependencies

### Debug Mode
Enable debug logging:
```properties
logging.level.org.springframework.security=DEBUG
logging.level.org.springframework.web=DEBUG
```

## Contributing

### Code Style
- Follow Java naming conventions
- Use proper JavaDoc comments
- Implement proper exception handling
- Write comprehensive tests

### Pull Request Process
1. Create feature branch from main
2. Implement changes with tests
3. Update documentation
4. Submit pull request with description

## Future Enhancements

- **Payment Integration**: Stripe/PayPal integration
- **Real-time Notifications**: WebSocket for order updates
- **File Upload**: Image upload for menu items
- **Analytics**: Order analytics and reporting
- **Multi-tenant**: Support for multiple restaurants"