import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { PageEvent } from '@angular/material/paginator';
import { NgFor } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { Pagination } from '../shared/models/pagination';
import { MatMenu } from '@angular/material/menu';
import {
  MatListOption,
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PagerComponent } from '../shared/components/pager/pager.component';

@Component({
  selector: 'app-shop',
  imports: [
    NgFor,
    ProductItemComponent,
    MatFormFieldModule,
    // MatListOption,
    // MatSelectionList,
    PagerComponent,

    MatSelectModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTearm: ElementRef;

  products?: Pagination<Product>;
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  buttonsNumber: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];
  pageSizeOptions = [5, 10, 15, 20];
  totalCount: number;

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      (response) => {
        if (response) {
          this.products = response;
          this.totalCount = response.count;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }

  onSortChange(event: MatSelectChange) {
    this.shopParams.sort = event.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSearch() {
    this.shopParams.search = this.searchTearm.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    this.searchTearm.nativeElement.value = '';
    this.shopParams.pageNumber = 1;
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
