import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema ()

export class Home {
    @Prop({required : true})
    name : String;
    @Prop({required : true})
    state : String;
    @Prop({required : true})
    photo : String;
    @Prop({required : true})
    availableUnits : Number;
    @Prop({required : true})
    city : String;
    @Prop()
    wifi : Boolean;
    @Prop()
    laundry : Boolean;
    @Prop({required : false, default : Date.now})
    createdAt : Date;
}

export const HomeSchema = SchemaFactory.createForClass(Home);