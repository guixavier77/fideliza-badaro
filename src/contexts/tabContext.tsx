'use client'
import { TABS, TABS_DASH } from '@/utils/types/tabs';
import { createContext, useContext, useEffect, useState } from 'react';
import { DefaultContext } from './defaultContext';
import { ROLE } from '@/utils/types/roles';
import TabContextInterface from '@/interfaces/tab.interface';

const TabContext = createContext<TabContextInterface>({} as any);

export const TabProvider = ({ children }: any) => {
	const {user} = useContext(DefaultContext)
	const [tabSelected, setTabSelected] = useState<string>(user?.role === ROLE.CUSTOMER ? TABS.HOME : TABS.HOMEADMIN);
	const [tabDashSelected, setTabDashSelected] = useState<string>(TABS_DASH.DASH)


	useEffect(() => {
		setTabSelected(user?.role === ROLE.CUSTOMER ? TABS.HOME : TABS.HOMEADMIN);
;	},[user])
	return <TabContext.Provider value={{
		tabSelected, 
		setTabSelected, 
		tabDashSelected,
		setTabDashSelected 
		}}>
			{children}
		</TabContext.Provider>;
};

export const useTab = () => useContext(TabContext);
