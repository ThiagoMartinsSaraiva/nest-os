import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { FileReaderService } from './file-reader.service';
import { CreateFileProps } from './file-reader-dtos';

@Controller('file-reader')
export class FileReaderController {
  constructor(private readonly fileReaderService: FileReaderService) {}

  @Get()
  async getFiles() {
    return await this.fileReaderService.getAllFiles();
  }

  @Get('/search')
  async filterFiles(@Query('q') search: string) {
    return await this.fileReaderService.searchFile({ search });
  }

  @Get('/:filename')
  async getFileContent(@Param('filename') filename: string) {
    return await this.fileReaderService.getFileContent({ filename });
  }

  @Post()
  async createFile(@Body() body: CreateFileProps) {
    const { filename, data } = body;
    return await this.fileReaderService.createFile({ filename, data });
  }

  @Delete('/:filename')
  async removeFile(@Param('filename') filename: string) {
    return await this.fileReaderService.deleteFile({ filename });
  }
}
