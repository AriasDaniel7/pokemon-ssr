import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.title.setTitle('Pricing Page');

    this.meta.updateTag({
      name: 'description',
      content: 'This is the pricing page of our Angular application.',
    });

    this.meta.updateTag({
      name: 'og:title',
      content: 'Pricing Page',
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'angular, pricing, page, ssr',
    });
  }
}
