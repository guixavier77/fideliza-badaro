'use client'
import { TABS, TABS_DASH } from '@/utils/types/tabs';
import { createContext, useContext, useState } from 'react';

const TabContext = createContext<any>(null);

export const TabProvider = ({ children }: any) => {
	const [tabSelected, setTabSelected] = useState<any>(TABS.HOME);
	const [tabDashSelected, setTabDashSelected] = useState<any>(TABS_DASH.DASH)

	return <TabContext.Provider value={{ tabSelected, setTabSelected, tabDashSelected,setTabDashSelected }}>{children}</TabContext.Provider>;
};

export const useTab = () => useContext(TabContext);
