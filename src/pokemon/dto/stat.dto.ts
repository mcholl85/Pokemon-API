import { ApiProperty } from '@nestjs/swagger';

export class Stat {
  @ApiProperty()
  name: string;

  @ApiProperty()
  base: number;
}
