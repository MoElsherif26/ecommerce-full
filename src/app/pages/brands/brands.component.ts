import { BrandService } from './../../core/services/brand.service';
import { Component, OnInit } from '@angular/core';
import { Brand } from '../../core/interfaces/brand';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [TitleCasePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  allBrands: Brand[] = [];

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
      }
    });
  }

}
