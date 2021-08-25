export class FileUpload {
  key: string;
  filename: string;
  url: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
