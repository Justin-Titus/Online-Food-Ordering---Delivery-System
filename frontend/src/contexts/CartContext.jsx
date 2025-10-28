import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount + action.payload.price
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          totalAmount: state.totalAmount + action.payload.price
        };
      }
    
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (!itemToRemove) return state;
      
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        totalAmount: state.totalAmount - (itemToRemove.price * itemToRemove.quantity)
      };
    
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          const quantityDiff = action.payload.quantity - item.quantity;
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      
      const item = state.items.find(item => item.id === action.payload.id);
      const quantityDiff = action.payload.quantity - item.quantity;
      
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount + (item.price * quantityDiff)
      };
    
    case 'CLEAR_CART':
      return {
        items: [],
        totalAmount: 0
      };
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
  totalAmount: 0
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (itemId) => {
    const item = cart.items.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};