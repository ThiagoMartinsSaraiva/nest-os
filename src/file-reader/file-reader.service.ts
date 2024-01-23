import { Injectable } from '@nestjs/common';
import { writeFile, readFile, unlink, readdir } from 'fs';
import {
  CreateFileProps,
  DeleteFileProps,
  GetFileContentProps,
  SearchFileProps,
} from './file-reader-dtos';

@Injectable()
export class FileReaderService {
  private readonly tmpFolderPath = './tmp';

  async createFile({ filename, data }: CreateFileProps) {
    const message = await new Promise((resolve) => {
      writeFile(`${this.tmpFolderPath}/${filename}`, data, (err) => {
        if (err) {
          return resolve('Falha ao criar arquivo');
        }

        resolve('Arquivo criado com sucesso');
      });
    });

    return { message };
  }

  async getFileContent({ filename }: GetFileContentProps) {
    const message = await new Promise((resolve) => {
      readFile(`${this.tmpFolderPath}/${filename}`, (err, fileData) => {
        if (err) {
          return resolve('Falha ao obter o conteúdo do arquivo');
        }

        resolve(fileData.toString());
      });
    });

    return { message };
  }

  async getAllFiles() {
    const message = await new Promise((resolve) => {
      readdir(this.tmpFolderPath, (err, files) => {
        if (err) {
          return resolve('Falha ao obter arquivos');
        }

        resolve(files);
      });
    });

    return { message };
  }

  async searchFile({ search }: SearchFileProps) {
    const message = await new Promise((resolve) => {
      readdir(this.tmpFolderPath, (err, files) => {
        if (err) {
          return resolve('Falha ao buscar arquivos');
        }

        const filteredFiles = files.filter((file) => {
          return file.toLowerCase().includes(search.toLowerCase());
        });

        resolve(filteredFiles);
      });
    });

    return { message };
  }

  async deleteFile({ filename }: DeleteFileProps) {
    const message = await new Promise((resolve) => {
      unlink(`${this.tmpFolderPath}/${filename}`, (err) => {
        if (err) {
          return resolve('Falha ao remover arquivo');
        }

        resolve('Arquivo removido');
      });
    });

    return { message };
  }
}
