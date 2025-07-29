import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-navbar',
})
class NavbarComponentMock {}

describe('App', () => {
  let compiled: HTMLDivElement;
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
      .overrideComponent(App, {
        add: {
          imports: [NavbarComponentMock],
        },
        remove: {
          imports: [NavbarComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(App);
    compiled = fixture.nativeElement as HTMLDivElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render navbar and router-outlet', () => {
    const navbar = compiled.querySelector('app-navbar');
    const routerOutlet = compiled.querySelector('router-outlet');

    expect(navbar).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
  });
});
