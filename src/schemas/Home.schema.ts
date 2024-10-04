import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Home {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    state: string;
    @Prop({ required: true })
    photo: string;
    @Prop({ required: true })
    availableUnits: number;
    @Prop({ required: true })
    city: string;
    @Prop()
    wifi: boolean;
    @Prop()
    laundry: boolean;
    @Prop({ required: false, default: Date.now })
    createdAt: Date;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
