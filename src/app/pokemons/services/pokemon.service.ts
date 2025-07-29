import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokeAPIResponse, Pokemon, SimplePokemon } from '../interfaces';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http
      .get<PokeAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
      )
      .pipe(
        map((resp) => {
          const simplePokemons: SimplePokemon[] = resp.results.map(
            (pokemon) => {
              return {
                id: pokemon.url.split('/').at(-2) ?? '',
                name: pokemon.name,
              };
            }
          );

          return simplePokemons;
        })
      );
  }

  public loadPokemon(id: string) {
    return this.http
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    const errorMessage = error.error ?? 'Unknown error';

    return throwError(() => new Error(errorMessage));
  }

  public loadPokemons(limit: number) {
    return this.http
      .get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .pipe(
        map((resp) => {
          const simplePokemons: SimplePokemon[] = resp.results.map(
            (pokemon) => {
              return {
                id: pokemon.url.split('/').at(-2) ?? '',
                name: pokemon.name,
              };
            }
          );

          return simplePokemons;
        })
      );
  }
}
