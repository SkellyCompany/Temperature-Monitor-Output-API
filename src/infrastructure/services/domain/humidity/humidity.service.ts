import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HumidityRecord, HumidityRecordDocument } from 'src/domain/schemas/humidity-record.schema';

@Injectable()
export class HumidityService {
	constructor(
		@InjectModel(HumidityRecord.name) private humidityRecordModel: Model<HumidityRecordDocument>
	) { }

	getAllRecords(): Promise<HumidityRecord[]> {
		return this.humidityRecordModel.find().exec();
	}
}
