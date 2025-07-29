import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';
import { catchError } from 'rxjs';

const mockPokeApiResponse: PokeAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
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
    // ... more pokemons
  ],
};

const expectedPokemons: SimplePokemon[] = [
  {
    name: 'bulbasaur',
    id: '1',
  },
  {
    name: 'ivysaur',
    id: '2',
  },
];

const mockPokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of simplePokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load a page of simplePokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load a pokemon by ID', () => {
    service.loadPokemon('1').subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
      expect(pokemon.id).toBe('1');
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/1`);

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  it('should load a pokemon by name', () => {
    const pokemonName = 'bulbasaur';

    service.loadPokemon(pokemonName).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
      expect(pokemon.name).toBe(pokemonName);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  // Disparar errores
  it('should catch errors if pokemon is not found', () => {
    const pokemonName = 'no-existent-pokemon';

    service
      .loadPokemon(pokemonName)
      .pipe(
        catchError((err) => {
          expect(err.message).toContain('Pokemon not found');
          return [];
        })
      )
      .subscribe((pokemon: any) => {});

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush('Pokemon not found', {
      status: 404,
      statusText: 'Not Found',
    });
  });
});
