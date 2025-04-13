/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetTasksParamDto {
  @IsOptional() // optional parameter
  @IsInt() // string type
  @Type(() => Number)
  id?: number;
}
