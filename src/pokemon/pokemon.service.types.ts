export type PokemonApiReponse = {
  id: number;
  sprites: Sprites;
  types: Type[];
  stats: Stats[];
  moves: Moves[];
  order: number;
  height: number;
  weight: number;
};

export type PokemonsApiResponse = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

type Sprites = {
  other: {
    dream_world: {
      front_default: string;
    };
    home: {
      front_default: string;
    };
    'official-artwork': {
      front_default: string;
    };
  };
};

type Moves = {
  move: {
    name: string;
  };
};

type Type = {
  type: {
    name: string;
  };
};

type Stats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};
