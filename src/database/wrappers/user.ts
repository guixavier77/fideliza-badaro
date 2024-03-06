import { QueryConstraint, Unsubscribe, where, query, getDocs, limit } from 'firebase/firestore';
import FirestorePipe from '../utils/pipe';
import User from '../entities/user.entity';


class UserDB extends FirestorePipe {
	public static readonly colName = 'Users';
	constructor() {
		super(UserDB.colName);
	}


	public createCustomId(id: string, data: User): Promise<any> {
		return this._define(id, data);
	}
	public create(data: User): Promise<any> {
		return this._create(data);
	}

	public update(id: string, data: User): Promise<any> {
		return this._update(id, data);
	}

	public delete(id: string): Promise<any> {
		return this._delete(id);
	}

	public getAll(...params: QueryConstraint[]): Promise<User[]> {
		return this._getAll<User>(...params);
	}

	public get(id: string): Promise<User> {
		return this._get(id);
	}

	public on(listener: (data: User[]) => void, ...params: QueryConstraint[]): Unsubscribe {
		return this._on(listener, ...params);
	}
}

export default UserDB;
