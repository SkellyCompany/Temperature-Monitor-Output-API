import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HumidityRecordDocument = HumidityRecord & Document;

@Schema({ collection: 'HumidityRecords' })
export class HumidityRecord {
	@Prop()
	value: number;

	@Prop()
	time: number;
}

export const HumidityRecordSchema = SchemaFactory.createForClass(HumidityRecord);
