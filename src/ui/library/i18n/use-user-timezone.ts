import {useMemo} from 'react';
import {getLocalTimeZone} from '@internationalized/date';
// import {useBootstrapDataStore} from '@ui/bootstrap-data/bootstrap-data-store';

export function useUserTimezone(): string {
  // const {user, settings} = useBootstrapDataStore(s => s.data);
  // const defaultTimezone = settings.dates.default_timezone;
  // const preferredTimezone =  'auto';
  //
    return getLocalTimeZone()
}
