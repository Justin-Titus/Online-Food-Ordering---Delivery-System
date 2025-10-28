# Food Ordering System - Frontend

React-based frontend application providing customer and admin interfaces for the Food Ordering System.

## Features

### Customer Interface
- **Menu Browsing**: View menu items by category with search and filtering
- **Shopping Cart**: Add items, modify quantities, and manage cart contents
- **Order Placement**: Complete checkout with delivery information
- **Order Tracking**: View order history and real-time status updates
- **User Authentication**: Secure login and registration

### Admin Interface
- **Menu Management**: Complete CRUD operations for menu items
- **Order Management**: View all orders and update status
- **Dashboard**: Tabbed interface with statistics and overview
- **Role-based Access**: Secure admin-only sections

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router 6** - Client-side routing and navigation
- **Context API** - State management for auth and cart
- **CSS3** - Custom styling with responsive design
- **Fetch API** - HTTP client for backend communication

## Project Structure

```
frontend/
├── public/                          # Static assets
├── src/
│   ├── components/                  # React components
│   │   ├── admin/                   # Admin-specific components
│   │   │   ├── AdminDashboard.jsx   # Main admin interface
│   │   │   ├── MenuManagement.jsx   # Menu CRUD operations
│   │   │   └── OrderManagement.jsx  # Order status management
│   │   ├── auth/                    # Authentication components
│   │   │   ├── LoginForm.jsx        # User login form
│   │   │   ├── RegisterForm.jsx     # User registration
│   │   │   └── ProtectedRoute.jsx   # Route protection
│   │   ├── cart/                    # Shopping cart components
│   │   │   └── Cart.jsx             # Cart display and management
│   │   ├── common/                  # Shared components
│   │   │   └── Header.jsx           # Navigation header
│   │   └── menu/                    # Menu display components
│   │       ├── MenuItem.jsx         # Individual menu item
│   │       └── MenuList.jsx         # Menu item grid
│   ├── contexts/                    # React contexts
│   │   ├── AuthContext.jsx          # Authentication state
│   │   └── CartContext.jsx          # Shopping cart state
│   ├── hooks/                       # Custom React hooks
│   │   └── useAuth.js               # Authentication hook
│   ├── pages/                       # Page components
│   │   ├── Admin.jsx                # Admin dashboard page
│   │   ├── Checkout.jsx             # Order checkout page
│   │   ├── Home.jsx                 # Landing page
│   │   ├── Login.jsx                # Login page
│   │   ├── Menu.jsx                 # Menu browsing page
│   │   ├── Orders.jsx               # Order history page
│   │   └── Register.jsx             # Registration page
│   ├── App.jsx                      # Main application component
│   └── main.jsx                     # Application entry point
├── package.json                     # Dependencies and scripts
└── vite.config.js                   # Vite configuration
```##
 Quick Start

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup
The frontend expects the backend to be running on `http://localhost:8080`. Update the API base URL in components if needed:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## Component Architecture

### State Management
The application uses React Context API for global state management:

#### AuthContext
Manages user authentication state and provides:
- `user` - Current authenticated user
- `login(email, password)` - User login function
- `register(userData)` - User registration function
- `logout()` - User logout function
- `isAuthenticated` - Boolean authentication status
- `isAdmin()` - Check if user has admin role

#### CartContext
Manages shopping cart state and provides:
- `cart` - Current cart contents
- `addToCart(item, quantity)` - Add item to cart
- `removeFromCart(itemId)` - Remove item from cart
- `updateQuantity(itemId, quantity)` - Update item quantity
- `clearCart()` - Empty the cart
- `totalAmount` - Calculate total cart value

### Routing Structure
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/menu" element={<Menu />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/order-confirmation" element={<OrderConfirmation />} />
  <Route path="/admin" element={<Admin />} />
</Routes>
```

## Admin Interface

### AdminDashboard Component
Main admin interface with tabbed navigation:
- **Menu Management Tab**: CRUD operations for menu items
- **Order Management Tab**: View and update order status

### MenuManagement Component
Comprehensive menu item management:
- **Grid View**: Display all menu items in responsive cards
- **Add Item**: Modal form for creating new menu items
- **Edit Item**: Update existing menu item details
- **Delete Item**: Remove menu items with confirmation
- **Toggle Availability**: Enable/disable items without deletion
- **Category Filter**: Organize items by categories

### OrderManagement Component
Complete order processing interface:
- **Order List**: View all orders with status indicators
- **Order Details**: Click to view full order information
- **Status Updates**: Change order status with visual feedback
- **Statistics**: Display order counts and metrics
- **Real-time Updates**: Automatic refresh of order data

## API Integration

### Authentication API
```javascript
// Login
const response = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

// Check authentication status
const response = await fetch(`${API_BASE_URL}/auth/me`, {
  method: 'GET',
  credentials: 'include'
});
```

### Menu API
```javascript
// Get menu items
const response = await fetch(`${API_BASE_URL}/menu/items`);

// Create menu item (admin)
const response = await fetch(`${API_BASE_URL}/menu/items`, {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(menuItemData)
});
```

### Order API
```javascript
// Create order
const response = await fetch(`${API_BASE_URL}/orders`, {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData)
});

// Get all orders (admin)
const response = await fetch(`${API_BASE_URL}/orders/admin/all`, {
  method: 'GET',
  credentials: 'include'
});
```

## Styling and Design

### CSS Architecture
- **Component-scoped CSS**: Each component has its own CSS file
- **Responsive Design**: Mobile-first approach with media queries
- **CSS Variables**: Consistent color scheme and spacing
- **Flexbox/Grid**: Modern layout techniques

### Design System
```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --success-color: #27ae60;
  --warning-color: #f39c12;
  --danger-color: #e74c3c;
  --light-gray: #ecf0f1;
  --dark-gray: #7f8c8d;
}
```

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Error Handling

### Global Error Handling
```javascript
const handleApiError = (error) => {
  if (error.status === 401) {
    // Redirect to login
    navigate('/login');
  } else if (error.status === 403) {
    // Show access denied message
    setError('Access denied');
  } else {
    // Show generic error
    setError('Something went wrong');
  }
};
```

### Form Validation
- **Client-side Validation**: Immediate feedback for user input
- **Server-side Validation**: Handle backend validation errors
- **Error Display**: Clear error messages with styling

## Performance Optimization

### Code Splitting
```javascript
// Lazy load admin components
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

// Wrap in Suspense
<Suspense fallback={<div>Loading...</div>}>
  <AdminDashboard />
</Suspense>
```

### Optimization Techniques
- **React.memo**: Prevent unnecessary re-renders
- **useCallback**: Memoize event handlers
- **useMemo**: Memoize expensive calculations
- **Image Optimization**: Proper image formats and sizes

## Testing

### Testing Setup
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### Test Examples
```javascript
// Component testing
import { render, screen } from '@testing-library/react';
import MenuItem from './MenuItem';

test('renders menu item with correct price', () => {
  const item = { name: 'Pizza', price: 12.99 };
  render(<MenuItem item={item} />);
  expect(screen.getByText('$12.99')).toBeInTheDocument();
});
```

## Deployment

### Build Process
```bash
# Create production build
npm run build

# The build folder contains optimized static files
# Deploy the contents to your web server
```

### Environment Variables
```bash
# .env.production
VITE_API_BASE_URL=https://api.yourapp.com
VITE_APP_NAME=Food Ordering System
```

### Deployment Options
- **Netlify**: Automatic deployment from Git
- **Vercel**: Zero-config deployment
- **AWS S3**: Static website hosting
- **Docker**: Containerized deployment

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Implement proper prop validation
- Use meaningful component and variable names

### File Organization
- Group related components in folders
- Use index.js files for clean imports
- Separate concerns (components, styles, logic)
- Keep components small and focused

### Git Workflow
- Feature branches for new development
- Descriptive commit messages
- Pull requests for code review
- Regular integration with main branch

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for frontend URL
   - Check that credentials are included in requests

2. **Authentication Issues**
   - Clear browser cookies and local storage
   - Verify session configuration on backend

3. **Build Failures**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall dependencies

4. **Routing Issues**
   - Ensure React Router is properly configured
   - Check for conflicting route definitions

### Debug Mode
Enable React Developer Tools and use browser console for debugging:
```javascript
// Add debug logging
console.log('Auth state:', user);
console.log('Cart contents:', cart);
```

## Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Review Checklist
- [ ] Components are properly tested
- [ ] Responsive design is maintained
- [ ] Accessibility standards are followed
- [ ] Performance impact is considered
- [ ] Documentation is updated

## Future Enhancements

### Planned Features
- **Progressive Web App**: Offline functionality
- **Real-time Updates**: WebSocket integration
- **Advanced Filtering**: Enhanced menu search
- **User Preferences**: Saved favorites and settings
- **Multi-language Support**: Internationalization

### Technical Improvements
- **TypeScript Migration**: Type safety
- **State Management**: Redux Toolkit integration
- **Testing**: Comprehensive test coverage
- **Performance**: Bundle size optimization
- **Accessibility**: WCAG compliance

---

*This frontend application provides a modern, responsive interface for the Food Ordering System with comprehensive admin capabilities.*