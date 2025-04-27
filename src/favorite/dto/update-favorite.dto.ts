import { IsOptional, IsString } from 'class-validator';

export class UpdateFavoriteDto {
  @IsOptional()
  @IsString()
  city?: string;
}