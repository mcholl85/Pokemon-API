import { ApiProperty } from '@nestjs/swagger';
import { Pokemons } from './pokemons.dto';

export class PokemonsResponse {
  @ApiProperty({ type: Pokemons })
  pokemons: Pokemons[];

  @ApiProperty()
  count: number;
}
