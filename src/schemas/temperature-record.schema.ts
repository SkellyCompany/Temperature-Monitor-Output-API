import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemperatureRecordDocument = TemperatureRecord & Document;

@Schema({ collection: 'TemperatureRecords' })
export class TemperatureRecord {
	@Prop()
	value: number;

	@Prop()
	time: number;
}

export const TemperatureRecordSchema = SchemaFactory.createForClass(TemperatureRecord);
