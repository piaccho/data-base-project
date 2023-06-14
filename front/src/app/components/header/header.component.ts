import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  productName: string;

  constructor(private filterService: FilterService) {}

  filterProductName() {
    this.filterService.filterProductName(this.productName);
  }
}
