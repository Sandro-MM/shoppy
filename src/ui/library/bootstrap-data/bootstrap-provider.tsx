'use client';

import { useEffect } from 'react';
import {BootstrapData} from "@ui/bootstrap-data/bootstrap-data";
import {useBootstrapDataStore} from "@ui/bootstrap-data/bootstrap-data-store";


export function BootstrapProvider({
                                      data,
                                      children,
                                  }: {
    data: BootstrapData;
    children: React.ReactNode;
}) {
    const setData = useBootstrapDataStore((s) => s.setData);

    useEffect(() => {
        setData(data);
    }, [data, setData]);

    return <>{children}</>;
}