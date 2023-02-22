import { ApiProperty } from '@nestjs/swagger';

export class Pokemons {
  @ApiProperty()
  name: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  imgSrc: string;
}
