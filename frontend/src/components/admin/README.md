# Admin Components

This directory contains React components specifically designed for the admin interface of the Food Ordering System.

## Components Overview

### AdminDashboard.jsx
Main admin interface component that provides:
- **Tabbed Navigation**: Switch between Menu and Order management
- **Role-based Access Control**: Restricts access to admin users only
- **Responsive Layout**: Works on desktop and mobile devices

**Props**: None (uses authentication context)

**Usage**:
```jsx
import AdminDashboard from './AdminDashboard';

function AdminPage() {
  return <AdminDashboard />;
}
```

### MenuManagement.jsx
Comprehensive menu item management interface featuring:
- **CRUD Operations**: Create, Read, Update, Delete menu items
- **Modal Forms**: User-friendly forms for adding/editing items
- **Category Management**: Organize items by categories
- **Availability Toggle**: Enable/disable items without deletion
- **Responsive Grid**: Displays menu items in cards

**Key Features**:
- Form validation for menu item data
- Confirmation dialogs for destructive actions
- Real-time updates after operations
- Error handling with user feedback

**API Integration**:
- `GET /api/menu/items` - Fetch all menu items
- `POST /api/menu/items` - Create new menu item
- `PUT /api/menu/items/{id}` - Update existing item
- `DELETE /api/menu/items/{id}` - Delete menu item
- `PATCH /api/menu/items/{id}/availability` - Toggle availability

### OrderManagement.jsx
Complete order processing and management interface providing:
- **Order Overview**: List all orders with status indicators
- **Order Details**: Detailed view of individual orders
- **Status Management**: Update order status through workflow
- **Statistics Dashboard**: Order counts and metrics
- **Customer Information**: View delivery details and contact info

**Order Status Flow**:
1. PENDING → Order placed, awaiting confirmation
2. CONFIRMED → Order accepted by restaurant
3. PREPARING → Food is being prepared
4. OUT_FOR_DELIVERY → Order is on the way
5. DELIVERED → Order completed successfully
6. CANCELLED → Order was cancelled

**API Integration**:
- `GET /api/orders/admin/all` - Fetch all orders
- `PUT /api/orders/{id}/status` - Update order status

## Styling

Each component has its own CSS file with:
- **Responsive Design**: Mobile-first approach
- **Consistent Theming**: Uses CSS variables for colors
- **Interactive Elements**: Hover effects and transitions
- **Accessibility**: Proper contrast and focus indicators

### CSS Files
- `AdminDashboard.css` - Main dashboard layout and tabs
- `MenuManagement.css` - Menu item cards and forms
- `OrderManagement.css` - Order list and detail views

## State Management

### Local State
Each component manages its own local state for:
- Form data and validation
- Loading states
- Error messages
- UI state (modals, selected items)

### Global State Integration
Components integrate with global contexts:
- **AuthContext**: User authentication and role checking
- **API Calls**: Direct fetch requests to backend

## Error Handling

### User Feedback
- **Success Messages**: Confirmation of successful operations
- **Error Messages**: Clear error descriptions
- **Loading States**: Visual feedback during API calls
- **Validation Errors**: Real-time form validation

### Error Recovery
- **Retry Mechanisms**: Allow users to retry failed operations
- **Graceful Degradation**: Fallback UI for error states
- **Network Errors**: Handle connectivity issues

## Security Considerations

### Role-based Access
- **Admin Check**: Verify user has admin role before rendering
- **API Security**: All admin endpoints require authentication
- **Session Management**: Proper session handling

### Input Validation
- **Client-side Validation**: Immediate feedback for users
- **Server-side Validation**: Backend validates all inputs
- **XSS Prevention**: Proper input sanitization

## Performance Optimization

### Efficient Rendering
- **React.memo**: Prevent unnecessary re-renders
- **useCallback**: Memoize event handlers
- **Conditional Rendering**: Only render when needed

### API Optimization
- **Debounced Requests**: Prevent excessive API calls
- **Caching**: Store frequently accessed data
- **Pagination**: Handle large datasets efficiently

## Accessibility

### WCAG Compliance
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels
- **Color Contrast**: Meets accessibility standards
- **Focus Management**: Clear focus indicators

### Semantic HTML
- **Proper Headings**: Hierarchical heading structure
- **Form Labels**: Associated labels for all inputs
- **Button Roles**: Clear button purposes

## Testing

### Component Testing
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import MenuManagement from './MenuManagement';

test('displays menu items', async () => {
  render(<MenuManagement />);
  expect(screen.getByText('Menu Management')).toBeInTheDocument();
});
```

### Integration Testing
- **API Mocking**: Mock backend responses
- **User Interactions**: Test complete workflows
- **Error Scenarios**: Test error handling

## Usage Examples

### Basic Admin Dashboard
```jsx
import { useAuth } from '../../hooks/useAuth';
import AdminDashboard from './AdminDashboard';

function AdminRoute() {
  const { isAdmin } = useAuth();
  
  if (!isAdmin()) {
    return <div>Access Denied</div>;
  }
  
  return <AdminDashboard />;
}
```

### Menu Management Integration
```jsx
import MenuManagement from './MenuManagement';

function MenuTab() {
  return (
    <div className="admin-tab">
      <MenuManagement />
    </div>
  );
}
```

## Development Guidelines

### Code Style
- Use functional components with hooks
- Implement proper error boundaries
- Follow React best practices
- Use TypeScript for type safety (future enhancement)

### Component Structure
```jsx
const ComponentName = () => {
  // State declarations
  const [state, setState] = useState(initialState);
  
  // Effect hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = useCallback(() => {
    // Handler logic
  }, [dependencies]);
  
  // Render
  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
};
```

### File Organization
```
admin/
├── AdminDashboard.jsx       # Main dashboard component
├── AdminDashboard.css       # Dashboard styles
├── MenuManagement.jsx       # Menu CRUD operations
├── MenuManagement.css       # Menu management styles
├── OrderManagement.jsx      # Order processing
├── OrderManagement.css      # Order management styles
└── README.md               # This documentation
```

## Future Enhancements

### Planned Features
- **Bulk Operations**: Select and modify multiple items
- **Advanced Filtering**: Complex search and filter options
- **Export Functionality**: Download reports and data
- **Real-time Updates**: WebSocket integration for live updates
- **Analytics Dashboard**: Charts and metrics visualization

### Technical Improvements
- **TypeScript Migration**: Add type safety
- **Component Library**: Reusable UI components
- **Performance Monitoring**: Track component performance
- **Automated Testing**: Comprehensive test coverage

## Troubleshooting

### Common Issues

1. **Access Denied Errors**
   - Verify user has admin role
   - Check authentication status
   - Clear browser cache and cookies

2. **API Errors**
   - Check network connectivity
   - Verify backend is running
   - Check browser console for errors

3. **UI Issues**
   - Clear browser cache
   - Check CSS conflicts
   - Verify responsive design breakpoints

### Debug Tips
- Use React Developer Tools
- Check browser console for errors
- Monitor network requests in DevTools
- Use component state debugging

---

*These admin components provide a comprehensive interface for managing the Food Ordering System with proper security, accessibility, and user experience considerations.*