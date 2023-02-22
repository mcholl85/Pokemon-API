import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  API_URL,
  CONVERT_HEIGHT_INDICES,
  CONVERT_WEIGHT_INDICES,
  MAX_MOVES,
  SPRITE_EXTENSION,
  SPRITE_URL,
} from './pokemon.constants';
import {
  PokemonsApiResponse,
  PokemonApiReponse,
} from './pokemon.service.types';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  async getAllPokemons() {
    const { data } = await firstValueFrom(
      this.httpService.get<PokemonsApiResponse>(
        `${API_URL}?limit=100000&offset=0`,
      ),
    );
    const pokemons = data.results.map((pokemon, index) => ({
      name: pokemon.name,
      order: index + 1,
      imgSrc: `${SPRITE_URL}${index + 1}${SPRITE_EXTENSION}`,
    }));
    return { pokemons, count: data.count };
  }

  async getPokemon(name: string) {
    const { data } = await firstValueFrom(
      this.httpService.get<PokemonApiReponse>(`${API_URL}/${name}`),
    );
    const types = data.types.map(({ type }) => type.name);
    const moves = data.moves.slice(0, MAX_MOVES).map(({ move }) => move.name);
    const stats = data.stats.map((stat) => ({
      name: stat.stat.name,
      base: stat.base_stat,
    }));
    const height = data.height / CONVERT_HEIGHT_INDICES;
    const weight = data.weight / CONVERT_WEIGHT_INDICES;
    const id = data.id;
    const imgSrc = `${SPRITE_URL}${data.id}${SPRITE_EXTENSION}`;

    return {
      pokemon: {
        imgSrc,
        types,
        moves,
        stats,
        height,
        weight,
        id,
      },
    };
  }
}
