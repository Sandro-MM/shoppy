import {create} from 'zustand';
import {BootstrapData} from '@ui/bootstrap-data/bootstrap-data';
import {supabase} from "../../../../supabaseClient.ts";

export const localBootstrapData: BootstrapData = {
  "themes": [
    {
      "id": 1,
      "name": "Dark",
      "is_dark": true,
      "default_light": false,
      "default_dark": true,
      "user_id": 1,
      "type": "site",
      "values": {
        "--be-foreground-base": "255 255 255",
        "--be-primary-light": "243 38 71",
        "--be-primary": "243 38 71",
        "--be-primary-dark": "243 38 71",
        "--be-on-primary": "246 246 246",
        "--be-background": "31 34 45",
        "--be-background-alt": "36 37 53",
        "--be-background-chip": "76 79 85",
        "--be-paper": "36 36 41",
        "--be-disabled-bg-opacity": "12%",
        "--be-disabled-fg-opacity": "30%",
        "--be-hover-opacity": "8%",
        "--be-focus-opacity": "12%",
        "--be-selected-opacity": "16%",
        "--be-text-main-opacity": "100%",
        "--be-text-muted-opacity": "70%",
        "--be-divider-opacity": "12%"
      },
      "font": null
    }
  ],
  settings: {
    themes: {
      default_id: 'light',
    },
    // Add other fields your `Settings` interface requires if needed
  },
  user: null,

  // Optional: Add empty values to satisfy the type
  sentry_release: '',
  is_mobile_device: false,
  i18n: {
    locale: 'en',
    translations: {},
  },
};

export interface BootstrapDataState {
  data: BootstrapData;
  setData: (data: BootstrapData | string) => void;
  mergeData: (data: Partial<BootstrapData>) => void;
}

export const useBootstrapDataStore = create<BootstrapDataState>()(set => ({
  // ✅ Initialize with static local bootstrap data
  data: localBootstrapData,

  setData: data => {
    const decodedData =
        typeof data === 'string' ? decodeBootstrapData(data) : data;
    set({data: decodedData});
  },

  mergeData: (partial: Partial<BootstrapData>) => {
    set(state => ({data: {...state.data, ...partial}}));
  },
}));

export const getBootstrapData = () => useBootstrapDataStore.getState().data;
export const setBootstrapData = useBootstrapDataStore.getState().setData;
export const mergeBootstrapData = useBootstrapDataStore.getState().mergeData;

export function decodeBootstrapData(
    data: string | BootstrapData,
): BootstrapData {
  return typeof data === 'string' ? JSON.parse(data) : data;
}


async function fetchSeoData() {
  let { data, error } = await supabase
      .from('theme_settings')
      .select('*')
      .eq('id', 1)
      .single();

  if (error) {
    console.error('Error fetching SEO data:', error);
    return null;
  }

  return data;
}
