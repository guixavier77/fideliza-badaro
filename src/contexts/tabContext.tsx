'use client'
import { TABS, TABS_DASH } from '@/utils/types/tabs';
import { createContext, useContext, useState } from 'react';
import { DefaultContext } from './defaultContext';
import { ROLE } from '@/utils/types/roles';

const TabContext = createContext<any>(null);

export const TabProvider = ({ children }: any) => {
	const {user} = useContext(DefaultContext)
	const [tabSelected, setTabSelected] = useState<any>(user?.role === ROLE.CUSTOMER ? TABS.HOME : TABS.PROMOTIONS);
	const [tabDashSelected, setTabDashSelected] = useState<any>(TABS_DASH.DASH)

	return <TabContext.Provider value={{ tabSelected, setTabSelected, tabDashSelected,setTabDashSelected }}>{children}</TabContext.Provider>;
};

export const useTab = () => useContext(TabContext);
