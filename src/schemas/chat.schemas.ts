import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Room } from "./room.schemas";
import { User } from "./User.schemas";


export type ChatDocument = HydratedDocument<Chat>;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Chat {

    @Prop({ required: true })
    message: string;

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: User.name})
    sender_id: User;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Room.name, autopopulate: true })
    room_id: Room;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

