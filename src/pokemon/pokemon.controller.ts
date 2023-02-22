import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PokemonResponse } from './dto/pokemonReponse.dto';
import { PokemonsResponse } from './dto/pokemonsResponse.dto';
import { PokemonService } from './pokemon.service';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @ApiOkResponse({ type: PokemonsResponse })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get()
  async getAllPokemons(): Promise<PokemonsResponse> {
    return await this.pokemonService.getAllPokemons();
  }

  @ApiOkResponse({ type: PokemonResponse })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':name')
  async getPokemon(@Param('name') name: string): Promise<PokemonResponse> {
    return await this.pokemonService.getPokemon(name);
  }
}
