
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '@/types';

// Load initial state from localStorage if available
const initialStores: Store[] = [
  { id: '1', name: 'San Francisco Bay Trends', location: 'San Francisco', order: 1 },
  { id: '2', name: 'Phoenix Sunwear', location: 'Phoenix', order: 2 },
  { id: '3', name: 'Dallas Ranch Supply', location: 'Dallas', order: 3 },
  { id: '4', name: 'Atlanta Outfitters', location: 'Atlanta', order: 4 },
  { id: '5', name: 'Nashville Melody Music Store', location: 'Nashville', order: 5 },
  { id: '6', name: 'New York Empire Eats', location: 'New York', order: 6 },
  { id: '7', name: 'Denver Peaks Outdoor', location: 'Denver', order: 7 },
  { id: '8', name: 'Philadelphia Liberty Market', location: 'Philadelphia', order: 8 },
  { id: '9', name: 'Boston Harbor Books', location: 'Boston', order: 9 },
  { id: '10', name: 'Austin Vibe Co.', location: 'Austin', order: 10 },
  { id: '11', name: 'Los Angeles Luxe', location: 'Los Angeles', order: 11 },
  { id: '12', name: 'Houston Harvest Market', location: 'Houston', order: 12 },
  { id: '13', name: 'Portland Evergreen Goods', location: 'Portland', order: 13 },
  { id: '14', name: 'Chicago Charm Boutique', location: 'Chicago', order: 14 },
  { id: '15', name: 'Las Vegas Neon Treasures', location: 'Las Vegas', order: 15 },
  { id: '16', name: 'Seattle Skyline Goods', location: 'Seattle', order: 16 },
  { id: '17', name: 'Miami Breeze Apparel', location: 'Miami', order: 17 },
  { id: '18', name: 'San Diego Wave Surf Shop', location: 'San Diego', order: 18 },
  { id: '19', name: 'Charlotte Queen’s Closet', location: 'Charlotte', order: 19 },
  { id: '20', name: 'Detroit Motor Gear', location: 'Detroit', order: 20 }
];

const loadInitialState = (): Store[] => {
  try {
    const saved = localStorage.getItem('stores');
    return saved ? JSON.parse(saved) : initialStores;
  } catch (error) {
    console.error('Failed to load stores from localStorage:', error);
    return initialStores;
  }
};

const storesSlice = createSlice({
  name: 'stores',
  initialState: loadInitialState(),
  reducers: {
    setStores: (state, action: PayloadAction<Store[]>) => {
      return action.payload;
    },
    addStore: (state, action: PayloadAction<Omit<Store, 'id' | 'order'>>) => {
      const newStore: Store = {
        ...action.payload,
        id: crypto.randomUUID(),
        order: state.length > 0 ? Math.max(...state.map(s => s.order)) + 1 : 1,
      };
      state.push(newStore);
      localStorage.setItem('stores', JSON.stringify(state));
    },
    updateStore: (state, action: PayloadAction<{ id: string, updates: Partial<Omit<Store, 'id'>> }>) => {
      const { id, updates } = action.payload;
      const index = state.findIndex(store => store.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
        localStorage.setItem('stores', JSON.stringify(state));
      }
    },
    removeStore: (state, action: PayloadAction<string>) => {
      const filteredState = state.filter(store => store.id !== action.payload);
      localStorage.setItem('stores', JSON.stringify(filteredState));
      return filteredState;
    },
    reorderStore: (state, action: PayloadAction<{ id: string, newOrder: number }>) => {
      const { id, newOrder } = action.payload;
      const storeIndex = state.findIndex(store => store.id === id);
      
      if (storeIndex === -1) return state;
      
      const oldOrder = state[storeIndex].order;
      
      // Don't do anything if trying to move to same position
      if (oldOrder === newOrder) return state;
      
      // Update orders for all affected stores
      state.forEach(store => {
        if (store.id === id) {
          store.order = newOrder;
        } else if (newOrder > oldOrder && store.order > oldOrder && store.order <= newOrder) {
          store.order--;
        } else if (newOrder < oldOrder && store.order >= newOrder && store.order < oldOrder) {
          store.order++;
        }
      });
      
      localStorage.setItem('stores', JSON.stringify(state));
      return state.sort((a, b) => a.order - b.order);
    },
  },
});

export const { setStores, addStore, updateStore, removeStore, reorderStore } = storesSlice.actions;
export default storesSlice.reducer;
