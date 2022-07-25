import { Observable } from 'rxjs';
import { Product } from './../../interfaces/product.interface';
import { ProductService } from './../../services/product.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products$: Observable<Product[]>;
  public filterProducts$: Observable<Product[]>;
  public productForm: FormGroup;
  public displayedColumns = ['name', 'price', 'stock', 'operations'];
  @ViewChild('name') public productName: ElementRef;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.products$ = this.productService.getProducts();
  }

  private createForm(): void {

    const { required } = Validators

    this.productForm = this.fb.group({
      'id': [undefined],
      'name': ['', [required]],
      'stock': [0, [required]],
      'price': [0, [required]]
    })
  }

  public onSubmit(): void {
    let p: Product = this.productForm.value;

    if (!p.id) {
      this.addProduct(p)
    } else {
      this.updateProduct(p)
    }
  }

  private addProduct(p: Product): void {
    this.productService.addProduct(p)
      .then(() => {
        this.notify('Product added.', 2000)
        this.clearFields()
      })
      .catch(() => {
        this.notify('Error on submiting the product.', 2000)
      })
  }

  public updateProduct(p: Product): void {
    this.productService.updateProduct(p)
      .then(() => {
        this.notify('Product has been updated.', 2000)
        this.clearFields()
      })
      .catch(() => {
        this.notify('Error when trying to updated the product.', 2000)
      })
  }

  public edit(p: Product): void {
    this.productForm.setValue(p)
  }

  public del(p: Product): void {
    this.productService.deleteProduct(p)
      .then(() => {
        this.notify('Product has been removed.', 2000)
        this.clearFields()
      })
      .catch(() => {
        this.notify('Error when trying to remove the product.', 2000)
      })
  }

  private notify(msg: string, timer: number): void {
    this.snackBar.open(msg, 'OK', { duration: timer })
  }

  private clearFields(): void {
    this.productForm.reset({ name: '', stock: 0, price: 0, id: undefined })
    this.productName.nativeElement.focus()
  }

  public filter(event): void {
    this.filterProducts$ = this.productService.searchByName(event.target.value)
  }

}
