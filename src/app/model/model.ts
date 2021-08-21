export class User{
  name:string;
  firstName:string;
  lastName:string;
  position:string;
  email:string;
  cell:string;
  type:string; 
  area:string;
  key: string;
  url: string; 
profile_pic: File;

  constructor(file: File) {
    this.profile_pic = file;
  }
}
