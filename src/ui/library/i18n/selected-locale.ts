// import {useBootstrapDataStore} from '@ui/bootstrap-data/bootstrap-data-store';

export function useSelectedLocale() {
  // const data = useBootstrapDataStore(s => s.data);
  return {
    locale: null,
    localeCode:  'en',
    lines: null,
  };
}
