import { Component } from '@angular/core';
import productsData from '../../data/products.json';
import { Product } from 'src/app/interfaces/product';
import { FilterService } from 'src/app/services/filter.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = productsData;
  filteredProductName: string = "";

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.filterService.OnProductNameFiltered.subscribe((productName: string) => {
      this.filteredProductName = productName;
    })
  }
}
