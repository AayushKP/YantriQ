import create from "zustand";

const useStore = create((set) => ({
  // Cart State
  cart: [],
  totalPrice: 0,
  totalItems: 0,

  // User State
  user: null, // Initially no user is logged in

  // Cart actions
  addToCart: (product, quantity) =>
    set((state) => {
      const updatedCart = [...state.cart, { product, quantity }];
      const updatedTotalItems = state.totalItems + quantity;
      const updatedTotalPrice = state.totalPrice + product.price * quantity;

      return {
        cart: updatedCart,
        totalItems: updatedTotalItems,
        totalPrice: updatedTotalPrice,
      };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter(
        (item) => item.product._id !== productId
      );
      const removedItem = state.cart.find(
        (item) => item.product._id === productId
      );
      const updatedTotalItems = state.totalItems - removedItem.quantity;
      const updatedTotalPrice =
        state.totalPrice - removedItem.product.price * removedItem.quantity;

      return {
        cart: updatedCart,
        totalItems: updatedTotalItems,
        totalPrice: updatedTotalPrice,
      };
    }),

  clearCart: () =>
    set(() => ({
      cart: [],
      totalPrice: 0,
      totalItems: 0,
    })),

  // User actions
  setUser: (user) =>
    set(() => ({
      user,
    })),

  logoutUser: () =>
    set(() => ({
      user: null,
      cart: [], // Clear the cart on logout
      totalPrice: 0,
      totalItems: 0,
    })),
}));

export default useStore;
