import { QueryConstraint, Unsubscribe } from 'firebase/firestore';
import FirestorePipe from '../utils/pipe';
import StoreDB from './store';
import Promotion from '../entities/promotion';



class PromotionsDB extends FirestorePipe {
	public static readonly colName = 'Promotions';
	constructor(idStore: string) {
		if (!idStore)
			throw new Error('Informe o id da loja')
		super(`${StoreDB.colName}/${idStore}/${PromotionsDB.colName}`);
	}

	public createCustomId(id: string, data: Promotion): Promise<any> {
		return this._define(id, data);
	}
	public async create(data: Promotion): Promise<any> {
		return this._create(data);
	}

	public update(id: string, data: Promotion): Promise<any> {
		return this._update(id, data);
	}

	public delete(id: string): Promise<any> {
		return this._delete(id);
	}

	public getAll(...params: QueryConstraint[]): Promise<Promotion[]> {
		return this._getAll<Promotion>(...params);
	}

	public get(id: string): Promise<Promotion> {
		return this._get(id);
	}

	public on(listener: (data: Promotion[]) => void, ...params: QueryConstraint[]): Unsubscribe {
		return this._on(listener, ...params);
	}

}

export default PromotionsDB;
