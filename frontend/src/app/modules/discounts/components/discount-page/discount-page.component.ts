import { Component, OnInit } from '@angular/core';
import { ProductProvider } from '../../../resources/state';
import { HttpClient } from '@angular/common/http';
import { Discounts } from '../../state';
import { Observable } from 'rxjs';
import { DiscountsService } from '../../state/discounts.service';

@Component({
  selector: 'app-discount-page',
  templateUrl: './discount-page.component.html',
  styleUrls: ['./discount-page.component.scss']
})
export class DiscountPageComponent implements OnInit {
  public discounts$: Observable<Discounts[]>;

  constructor(private http: HttpClient,
              private discountsService: DiscountsService
              ) { }

  ngOnInit() {
    this.discounts$ = this.discountsService.discounts$;
  }

}
