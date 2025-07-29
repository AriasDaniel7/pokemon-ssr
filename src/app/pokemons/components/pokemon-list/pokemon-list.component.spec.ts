import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, RouterLink } from '@angular/router';
import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../interfaces';

const mockPokemons: SimplePokemon[] = [
  {
    name: 'Bulbasaur',
    id: '1',
  },
  {
    name: 'Ivysaur',
    id: '2',
  },
];

describe('PokemonListComponent', () => {
  let compiled: HTMLDivElement;
  let fixture: ComponentFixture<PokemonListComponent>;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLDivElement;
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list with 2 pokemon-card', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();

    expect(compiled.querySelectorAll('pokemon-card').length).toBe(
      mockPokemons.length
    );
  });

  it('should render "No hay pokemons"', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(compiled.querySelector('div')?.textContent?.trim()).toContain(
      'No hay pokemons'
    );
  });
});
