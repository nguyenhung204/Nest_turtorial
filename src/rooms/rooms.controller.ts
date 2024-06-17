import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ChatsService } from 'src/chat/chats.service';
import { GetChatDto } from 'src/chat/dto/get-chat.dto';
import { RoomAuth } from 'src/config/guard/auth.guard.room';


@Controller('rooms')
export class RoomsController {

  constructor(
    private readonly roomsService: RoomsService,
    private readonly chatsService: ChatsService,
  ) { }

  @Post('create')
  @UseGuards(RoomAuth)
  @ApiBearerAuth()
  create(@Request() req : any, @Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(req.user._id.toString(), createRoomDto);
  }

  @Get('search')
  @UseGuards(RoomAuth)
  @ApiBearerAuth()
  getByRequest(@Request() req) {
    return this.roomsService.getByRequest(req.user._id.toString());
  }

  @Get(':id/chats')
  @UseGuards(RoomAuth)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true })
  getChats(@Param('id') id, @Query() dto: GetChatDto) {
    return this.chatsService.findAll(id, new GetChatDto(dto));
  }
}
