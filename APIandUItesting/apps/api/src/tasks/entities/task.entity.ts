import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({ type: String, example: 'a89ab425-1e6c-43f9-8680-eb20bbde91f1' })
  id!: string;

  @ApiProperty({ type: String, example: 'Write report' })
  title!: string;

  @ApiProperty({ type: String, example: 'Q3 summary' })
  description!: string;

  @ApiProperty({ type: String, example: '2026-08-19T10:30:11.699Z' })
  creationDate!: string;

  @ApiProperty({ type: String, example: '2026-08-19T10:30:11.699Z' })
  modificationDate!: string;
}
