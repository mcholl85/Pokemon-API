import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getAllPokemons() {
    return await this.pokemonService.getAllPokemons();
  }
  @Get(':name')
  async getPokemon(@Param('name') name: string) {
    return await this.pokemonService.getPokemon(name);
  }
}
