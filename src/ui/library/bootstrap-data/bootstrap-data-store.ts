import { create } from 'zustand';
import {BootstrapData} from "@ui/bootstrap-data/bootstrap-data";


export interface BootstrapDataState {
  data: BootstrapData | null;
  setData: (data: BootstrapData) => void;
}

export const useBootstrapDataStore = create<BootstrapDataState>((set) => ({
  data: null,
  setData: (data) => {
    console.log('✅ [Zustand] Hydrating store with:', data);
    set({ data });
  },
}));


export const getBootstrapData = () => useBootstrapDataStore.getState().data;
