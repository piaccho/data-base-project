import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(products: Product[], productName: string): Product[] {
        products = this.filterProductName(products, productName)
        return products
    }

    filterProductName(products: Product[], productName: string) {
        productName = productName.toLowerCase();
        products = products.filter(product => product.name.toLowerCase().includes(productName));
        return products
    }
}