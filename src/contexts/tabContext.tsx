'use client'
import { TABS } from '@/utils/types/tabs';
import { createContext, useContext, useState } from 'react';

const TabContext = createContext<any>(null);

export const TabProvider = ({ children }: any) => {
	const [tabSelected, setTabSelected] = useState<any>(TABS.HOME);
	const [tabDashSelected, setTabDashSelected] = useState<any>()

	return <TabContext.Provider value={{ tabSelected, setTabSelected, tabDashSelected,setTabDashSelected }}>{children}</TabContext.Provider>;
};

export const useTab = () => useContext(TabContext);
