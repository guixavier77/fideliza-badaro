import { QueryConstraint, Unsubscribe } from 'firebase/firestore';
import FirestorePipe from '../utils/pipe';
import UserDB from './user';
import Store from '../entities/store.entity';


class StoreDB extends FirestorePipe {
	public static readonly colName = 'Stores';
	constructor() {
		super(StoreDB.colName);
	}

	public createCustomId(id: string, data: Store): Promise<any> {
		return this._define(id, data);
	}
	public create(data: Store): Promise<any> {
		return this._create(data);
	}

	public update(id: string, data: Store): Promise<any> {
		return this._update(id, data);
	}

	public delete(id: string): Promise<any> {
		return this._delete(id);
	}

	public getAll(...params: QueryConstraint[]): Promise<Store[]> {
		return this._getAll<Store>(...params);
	}

	public get(id: string): Promise<Store> {
		return this._get(id);
	}

	public on(listener: (data: Store[]) => void, ...params: QueryConstraint[]): Unsubscribe {
		return this._on(listener, ...params);
	}
}

export default StoreDB;
