import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

const mockPokemon = {
  id: '1',
  name: 'Bulbasaur',
};

describe('PokemonCardComponent', () => {
  let compiled: HTMLDivElement;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);

    fixture.componentRef.setInput('pokemon', mockPokemon);

    compiled = fixture.nativeElement as HTMLDivElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the simplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    const pokemonName = compiled.querySelector('h2');
    const pokemonImage = compiled.querySelector('img');

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;

    expect(pokemonImage?.src).toBeDefined();
    expect(pokemonImage?.src).toContain(imageUrl);
    expect(pokemonName?.textContent?.trim()).toContain(mockPokemon.name);
  });

  //TODO: Falta por revisar el test de RouterLink
  // it('should have the proper ng-reflect-router-link', () => {
  //   const linkDebugElement = fixture.debugElement.query(
  //     By.directive(RouterLink)
  //   );
  //   expect(linkDebugElement)
  //     .withContext('Could not find an element with a RouterLink')
  //     .not.toBeNull();

  //   const routerLinkInstance = linkDebugElement.injector.get(RouterLink);

  //   console.log(routerLinkInstance);

  //   // console.log(divWithLink?.attributes);
  // });
});
