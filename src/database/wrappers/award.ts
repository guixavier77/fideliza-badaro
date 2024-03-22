import { QueryConstraint, Unsubscribe } from 'firebase/firestore';
import FirestorePipe from '../utils/pipe';
import StoreDB from './store';
import Award from '../entities/award.entity';


class AwardDB extends FirestorePipe {
	public static readonly colName = 'Awards';
	constructor(idStore: string) {
		if (!idStore)
			throw new Error('Informe o id da loja')
		super(`${StoreDB.colName}/${idStore}/${AwardDB.colName}`);
	}

	public createCustomId(id: string, data: Award): Promise<any> {
		return this._define(id, data);
	}
	public async create(data: Award): Promise<any> {
		try {
			await this.saveFile(data);
			return await this._create(data);
		} catch (error: any) {
			console.log(error);
			if (data.image_ref) {
				await this.deleteFile(data.image_ref)
			}
			throw error.message
		}
	}

	public update(id: string, data: Award): Promise<any> {
		return this._update(id, data);
	}

	public delete(id: string): Promise<any> {
		return this._delete(id);
	}

	public getAll(...params: QueryConstraint[]): Promise<Award[]> {
		return this._getAll<Award>(...params);
	}

	public get(id: string): Promise<Award> {
		return this._get(id);
	}

	public on(listener: (data: Award[]) => void, ...params: QueryConstraint[]): Unsubscribe {
		return this._on(listener, ...params);
	}

	private async saveFile(data: Award) {
		if (data.image) {
			const resultUpload = await this.uploadFile(new Date().getTime().toString(), data.image);
			data.image_ref = resultUpload.ref.fullPath;
			data.image_url = resultUpload.url;
		}
		delete data.image
	}

}

export default AwardDB;
