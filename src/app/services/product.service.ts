import { Product } from './../interfaces/product.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productsCollection: AngularFirestoreCollection<Product>
    = this.afs.collection('products')

  constructor(
    private afs: AngularFirestore
  ) { }

  public getProducts(): Observable<Product[]> {
    return this.productsCollection.valueChanges()
  }

  public addProduct(p: Product): Promise<any> {
    p.id = this.afs.createId()
    return this.productsCollection.doc(p.id).set(p)
    // return this.productsCollection.add(p)
  }

  public deleteProduct(p: Product): Promise<any> {
    return this.productsCollection.doc(p.id).delete()
  }

  public updateProduct(p: Product): Promise<any> {
    return this.productsCollection.doc(p.id).update(p)
  }

  public searchByName(name: string): Observable<Product[]> {
    return this.afs.collection<Product>('products',
      (ref) => ref.orderBy('name').startAt(name).endAt(name + '\uf8ff')
    ).valueChanges()
  }
}
