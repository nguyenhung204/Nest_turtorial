import { Module } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { InterestCommand } from './interests.command';
import { MongooseModule } from '@nestjs/mongoose';
import { InterestsController } from './interests.controller';
import { Interest, InterestSchema } from 'src/schemas/interest.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Interest.name, schema: InterestSchema }]),
  ],
  providers: [InterestCommand, InterestsService],
  controllers: [InterestsController],
})
export class InterestsModule { }
