import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TemperatureRecord, TemperatureRecordDocument } from 'src/domain/schemas/temperature-record.schema';

@Injectable()
export class TemperatureService {
    constructor(
        @InjectModel(TemperatureRecord.name) private temperatureRecordModel: Model<TemperatureRecordDocument>
    ) { }

    getAllRecords(): Promise<TemperatureRecord[]> {
        return this.temperatureRecordModel.find().exec();
    }
}
