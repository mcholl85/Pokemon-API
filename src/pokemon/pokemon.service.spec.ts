import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { getPokemonResultMock, getPokemonsResultMock } from './pokemon.mocks';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let mockedHttpService;

  beforeEach(async () => {
    mockedHttpService = {
      get: () => Promise.resolve(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: HttpService,
          useValue: mockedHttpService,
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPokemons', () => {
    it('should return a pokemonList response', async () => {
      mockedHttpService.get = () => of(getPokemonsResultMock);
      const pokemons = await service.getAllPokemons();

      expect(pokemons).toStrictEqual({
        pokemons: [
          {
            name: 'bulbasaur',
            order: 1,
            imgSrc:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          },
          {
            name: 'ivysaur',
            order: 2,
            imgSrc:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
          },
        ],
        count: 2,
      });
    });
    describe('getPokemon', () => {
      it('should return an pokemon object', async () => {
        mockedHttpService.get = () => of(getPokemonResultMock);
        const pokemon = await service.getPokemon('ditto');

        expect(pokemon).toStrictEqual({
          pokemon: {
            theme: 'normal',
            imgSrc:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png',
            types: ['normal'],
            moves: ['transform'],
            stats: [
              {
                name: 'hp',
                base: 48,
              },
              {
                name: 'attack',
                base: 48,
              },
              {
                name: 'defense',
                base: 48,
              },
              {
                name: 'special-attack',
                base: 48,
              },
              {
                name: 'special-defense',
                base: 48,
              },
              {
                name: 'speed',
                base: 48,
              },
            ],
            height: 0.3,
            weight: 4,
            id: 132,
          },
        });
      });
    });
  });
});
