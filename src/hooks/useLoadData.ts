import Award from "@/interfaces/award.interface";
import Promotion from "@/interfaces/promotion.interface";
import Store from "@/interfaces/store.interface";
import User from "@/interfaces/user.interface";
import api from "@/services/api";
import { ROLE } from "@/utils/types/roles";
import { useEffect, useState } from "react";


const useLoadData = (user: User | null, storeSelected: number | null) => {
  const [stores, setstores] = useState<Store[]>([]);
  const [store, setstore] = useState<Store | null>(null);
  const [awards, setawards] = useState<Award[]>([]);
  const [promotions, setpromotions] = useState<Promotion[]>([]);
  const [loading, setloading] = useState<boolean>(false)


  useEffect(() => {
    if(!storeSelected) return;
    api.get(`stores/${storeSelected}`)
      .then((res) => setstore(res?.data?.store))
      .catch(error => console.error('[ERROR API] /stores', error?.response?.data))
  }, [])

  useEffect(() => {
    if(!user || user.role !== ROLE.SUPERADMIN) return;
    api.get(`stores`)
    .then((res) => setstores(res?.data?.stores))
    .catch(error => console.error('[ERROR API] /stores', error?.response?.data))
  },[user])

  useEffect(() => {
    if(!storeSelected) return;
    api.get(`awards/${storeSelected}`)
        .then((res) => setawards(res?.data?.awards))
        .catch(error => console.error('[ERROR API] /awards', error?.response?.data))
  },[storeSelected])

  useEffect(() => {
    if(!storeSelected) return;
    api.get(`promotions/${storeSelected}`)
        .then((res) => setpromotions(res?.data?.promotions))
        .catch(error => console.error('[ERROR API] /promotions', error?.response?.data))
  },[storeSelected])

  
  return {
    loading,
		store,
    stores,
    awards,
    promotions

    
  }
}

export default useLoadData;