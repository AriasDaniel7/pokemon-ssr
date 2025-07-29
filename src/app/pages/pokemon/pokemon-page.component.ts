import { Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
})
export default class PokemonPageComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.pokemonService
      .loadPokemon(id)
      .pipe(
        tap((pokemon) => {
          const pageTitle = `#${pokemon.id} - ${pokemon.name}`;
          const pageDescription = `Página del Pokémon ${pokemon.name} con ID ${pokemon.id}`;

          this.title.setTitle(pageTitle);

          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'keywords',
            content: `Pokémon, ${pokemon.name}, ID ${pokemon.id}`,
          });
          this.meta.updateTag({
            property: 'og:title',
            content: pageTitle,
          });
          this.meta.updateTag({
            property: 'og:description',
            content: pageDescription,
          });
          this.meta.updateTag({
            property: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
          });
        })
      )
      .subscribe({
        next: (pokemon) => {
          this.pokemon.set(pokemon);
        },
      });
  }
}
