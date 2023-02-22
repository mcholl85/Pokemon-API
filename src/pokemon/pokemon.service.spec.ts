import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';

const getPokemonsResultMock = {
  count: 1279,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=2&limit=2',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

describe('PokemonService', () => {
  let service: PokemonService;
  let mockedHttpService;

  beforeEach(async () => {
    mockedHttpService = {
      get: jest.fn(() => Promise.resolve()),
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
    it('should return a pokemon response', async () => {
      mockedHttpService = {
        get: jest.fn(() => Promise.resolve(getPokemonsResultMock)),
      };
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
  });
});
