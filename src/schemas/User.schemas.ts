import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

import { Home } from "./Home.schema";
import { Interest } from "./interest.schema";
import { Room } from "./room.schemas";

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class User {
    @Prop({ required: false, auto: true, default: new mongoose.Types.ObjectId })
    _id: mongoose.Types.ObjectId;

    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: false,
        unique: true,
    })
    username: string;

    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
        required: false
    })
    password: string;

    @Prop({ required: false, default: Date.now })
    createdAt: Date;

    @Prop()
    about: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Home' })
    homes: Home[];
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
    rooms: Room[];

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Interest.name, autopopulate: true }])
    interests: Interest[]

    @Prop()
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
