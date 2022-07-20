import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productForm: FormGroup;
  public displayedColumns: any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.productForm = this.fb.group({
      'name': [''],
      'stock': [0],
      'price': [0],

    })
  }

}
