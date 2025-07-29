import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { PokemonService } from './pokemons/services/pokemon.service';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const totalPokemons = 151;
      const pages = Math.ceil(totalPokemons / 20);
      return Array.from({ length: pages }, (_, i) => ({
        page: (i + 1).toString(),
      }));
    },
  },
  {
    path: 'pokemon/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const pokemonService = inject(PokemonService);
      const totalPokemons = 151;
      const pokemons = await firstValueFrom(
        pokemonService.loadPokemons(totalPokemons)
      );
      return pokemons.map((pokemon) => ({
        id: pokemon.name,
      }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
