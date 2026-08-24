import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ type: String, example: 'Write report' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ type: String, example: 'Q3 summary' })
  @IsOptional()
  @IsString()
  description?: string;
}
