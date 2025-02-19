import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], value: string): Product[] {
    return products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
  }

}
