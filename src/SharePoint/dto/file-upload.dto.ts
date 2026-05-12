import { IsString, IsNotEmpty } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty()
  @IsString()
  year: string;

  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  categoria: string;
}
