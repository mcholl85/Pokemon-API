import { ApiProperty } from '@nestjs/swagger';
import { Stat } from './stat.dto';

export class PokemonResponse {
  @ApiProperty()
  theme: string;

  @ApiProperty()
  imgSrc: string;

  @ApiProperty()
  types: string[];

  @ApiProperty()
  moves: string[];

  @ApiProperty({ type: Stat })
  stats: Stat[];

  @ApiProperty()
  height: number;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  id: number;
}
