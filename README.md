# Food Ordering System

A full-stack web application for managing food orders with customer and admin interfaces. Built with Spring Boot backend and React frontend.

## Features

### Customer Features

- Browse menu items by category
- Add items to cart with quantity selection
- Place orders with delivery information
- View order history and status
- User registration and authentication

### Admin Features

- **Menu Management**: Add, edit, delete, and toggle availability of menu items
- **Order Management**: View all orders, update order status, and track deliveries
- **Dashboard**: Overview of orders with statistics
- **Role-based Access**: Secure admin-only sections

## Tech Stack

### Backend

- **Java 17** with Spring Boot 3.2.0
- **Spring Security** for authentication and authorization
- **Spring Data JPA** with Hibernate
- **H2 Database** (in-memory for development)
- **Maven** for dependency management

### Frontend

- **React 18** with Vite
- **React Router** for navigation
- **Context API** for state management
- **CSS3** for styling
- **Fetch API** for HTTP requests

## Quick Start

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6 or higher

### 1. Clone the Repository

```bash
git clone <repository-url>
cd food-ordering-system
```

### 2. Start the Backend

```bash
# Install dependencies and run
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Start the Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## Default Users

The application comes with pre-configured users:

### Admin User

- **Email**: `admin@foodordering.com`
- **Password**: `admin123`
- **Access**: Full admin dashboard with menu and order management

### Customer User

- **Email**: `customer@example.com`
- **Password**: `customer123`
- **Access**: Customer interface for browsing and ordering

## Project Structure

```
food-ordering-system/
├── src/main/java/com/foodordering/          # Backend source code
│   ├── config/                              # Configuration classes
│   ├── controller/                          # REST controllers
│   ├── dto/                                 # Data Transfer Objects
│   ├── entity/                              # JPA entities
│   ├── repository/                          # Data repositories
│   └── service/                             # Business logic
├── frontend/                                # Frontend React application
│   ├── src/
│   │   ├── components/                      # React components
│   │   │   ├── admin/                       # Admin-specific components
│   │   │   ├── auth/                        # Authentication components
│   │   │   ├── cart/                        # Shopping cart components
│   │   │   ├── common/                      # Shared components
│   │   │   └── menu/                        # Menu display components
│   │   ├── contexts/                        # React contexts
│   │   ├── hooks/                           # Custom hooks
│   │   └── pages/                           # Page components
│   └── public/                              # Static assets
└── README.md                                # This file
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Menu Management

- `GET /api/menu/items` - Get all menu items
- `POST /api/menu/items` - Create menu item (Admin only)
- `PUT /api/menu/items/{id}` - Update menu item (Admin only)
- `DELETE /api/menu/items/{id}` - Delete menu item (Admin only)
- `PATCH /api/menu/items/{id}/availability` - Toggle availability (Admin only)

### Order Management

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/{id}` - Get specific order
- `PUT /api/orders/{id}/status` - Update order status (Admin only)
- `GET /api/orders/admin/all` - Get all orders (Admin only)

## Admin Interface Guide

### Accessing Admin Dashboard

1. Login with admin credentials
2. Click the "Admin" button in the navigation bar
3. Use the tabbed interface to switch between Menu and Order management

### Menu Management

- **Add Items**: Click "Add New Item" to create menu items
- **Edit Items**: Click "Edit" on any menu item card
- **Toggle Availability**: Use "Enable/Disable" buttons
- **Delete Items**: Click "Delete" with confirmation prompt
- **Categories**: Organize items by Pizza, Burgers, Drinks, Appetizers, Desserts

### Order Management

- **View Orders**: See all orders with status indicators
- **Order Details**: Click on any order to view full details
- **Update Status**: Use status buttons to change order progress
- **Statistics**: View order counts and status distribution

## Order Status Flow

1. **PENDING** - Order placed, awaiting confirmation
2. **CONFIRMED** - Order accepted by restaurant
3. **PREPARING** - Food is being prepared
4. **OUT_FOR_DELIVERY** - Order is on the way
5. **DELIVERED** - Order completed successfully
6. **CANCELLED** - Order was cancelled

## Development

### Running Tests

```bash
# Backend tests
mvn test

# Frontend tests (if configured)
cd frontend
npm test
```

### Building for Production

```bash
# Backend
mvn clean package

# Frontend
cd frontend
npm run build
```

## Configuration

### Database

The application uses H2 in-memory database by default. For production, update `application.properties`:

```properties
# Example PostgreSQL configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/foodordering
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

### CORS

CORS is configured for `http://localhost:3000` and `http://localhost:5173`. Update `SecurityConfig.java` for different frontend URLs.

## Troubleshooting

### Common Issues

1. **Port Already in Use**

   - Backend: Change port in `application.properties`: `server.port=8081`
   - Frontend: Vite will automatically suggest an alternative port

2. **CORS Errors**

   - Ensure backend CORS configuration matches frontend URL
   - Check that credentials are included in requests

3. **Authentication Issues**

   - Clear browser cookies/session storage
   - Verify user credentials in database

4. **Database Issues**
   - H2 console available at: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:testdb`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
