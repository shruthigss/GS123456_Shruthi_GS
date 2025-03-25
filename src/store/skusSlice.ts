
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SKU } from '@/types';

// Sample initial data
const initialSKUs: SKU[] = [
  { id: 'SK00158', name: 'Crew Neck Merino Wool Sweater', price: 114.99, cost: 18.28 },
  { id: 'SK00269', name: 'Faux Leather Leggings', price: 9.99, cost: 8.45 },
  { id: 'SK00300', name: 'Fleece-Lined Parka', price: 199.99, cost: 17.80 },
  { id: 'SK00304', name: 'Cotton Polo Shirt', price: 139.99, cost: 10.78 },
  { id: 'SK00766', name: 'Foldable Travel Hat', price: 44.99, cost: 27.08 },
  { id: 'SK00786', name: 'Chic Quilted Wallet', price: 14.99, cost: 4.02 },
  { id: 'SK00960', name: 'High-Slit Maxi Dress', price: 74.99, cost: 47.47 },
  { id: 'SK01183', name: 'Turtleneck Cable Knit Sweater', price: 49.99, cost: 22.60 },
  { id: 'SK01189', name: 'Retro-Inspired Sunglasses', price: 194.99, cost: 115.63 },
  { id: 'SK01193', name: 'Stretch Denim Overalls', price: 129.99, cost: 47.06 },
  { id: 'SK01249', name: 'Adjustable Elastic Headband', price: 19.99, cost: 1.34 },
  { id: 'SK01319', name: 'Adjustable Baseball Cap', price: 4.99, cost: 2.29 },
  { id: 'SK01349', name: 'Cotton Polo Shirt', price: 114.99, cost: 60.94 },
  { id: 'SK01549', name: 'Faux Suede Ankle Boots', price: 94.99, cost: 71.53 },
  { id: 'SK01566', name: 'Striped Cotton Socks', price: 9.99, cost: 6.91 },
  { id: 'SK01642', name: 'Performance Compression Tights', price: 54.99, cost: 59.61 },
  { id: 'SK01733', name: 'Vintage Logo Hoodie', price: 94.99, cost: 84.45 },
  { id: 'SK01896', name: 'Floral Chiffon Wrap Dress', price: 149.99, cost: 68.55 },
  { id: 'SK01927', name: 'Asymmetrical Hem Skirt', price: 99.99, cost: 66.89 },
  { id: 'SK01950', name: 'Slim Fit Pinstripe Suit', price: 99.99, cost: 13.30 },
  { id: 'SK02029', name: 'Chunky Heel Sandals', price: 89.99, cost: 46.70 },
  { id: 'SK02429', name: 'Suede Fringe Vest', price: 184.99, cost: 159.65 },
  { id: 'SK02448', name: 'Relaxed Fit Cargo Pants', price: 149.99, cost: 7.20 },
  { id: 'SK02562', name: 'Corduroy A-Line Skirt', price: 129.99, cost: 48.62 }
];

const loadInitialState = (): SKU[] => {
  try {
    const saved = localStorage.getItem('skus');
    return saved ? JSON.parse(saved) : initialSKUs;
  } catch (error) {
    console.error('Failed to load SKUs from localStorage:', error);
    return initialSKUs;
  }
};

const skusSlice = createSlice({
  name: 'skus',
  initialState: loadInitialState(),
  reducers: {
    setSKUs: (state, action: PayloadAction<SKU[]>) => {
      return action.payload;
    },
    addSKU: (state, action: PayloadAction<Omit<SKU, 'id'>>) => {
      const newSKU: SKU = {
        ...action.payload,
        id: crypto.randomUUID(),
      };
      state.push(newSKU);
      localStorage.setItem('skus', JSON.stringify(state));
    },
    updateSKU: (state, action: PayloadAction<{ id: string, updates: Partial<Omit<SKU, 'id'>> }>) => {
      const { id, updates } = action.payload;
      const index = state.findIndex(sku => sku.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
        localStorage.setItem('skus', JSON.stringify(state));
      }
    },
    removeSKU: (state, action: PayloadAction<string>) => {
      const filteredState = state.filter(sku => sku.id !== action.payload);
      localStorage.setItem('skus', JSON.stringify(filteredState));
      return filteredState;
    },
  },
});

export const { setSKUs, addSKU, updateSKU, removeSKU } = skusSlice.actions;
export default skusSlice.reducer;
