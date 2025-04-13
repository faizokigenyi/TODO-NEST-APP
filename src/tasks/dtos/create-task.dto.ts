import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority: 'low' | 'medium' | 'high';
}
