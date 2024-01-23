import { Module } from '@nestjs/common';
import { FileReaderService } from './file-reader.service';
import { FileReaderController } from './file-reader.controller';

@Module({
  providers: [FileReaderService],
  controllers: [FileReaderController],
})
export class FileReaderModule {}
