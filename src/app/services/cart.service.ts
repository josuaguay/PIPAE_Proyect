import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FirestoreService } from '../services/firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from "../models";
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
//import { MenuPage } from "../paginas/menu/menu.page";

/**export interface Product {
  data: any;
  id: number;
  name: string;
  price: number;
  amount: number;
}*/

@Injectable({
  providedIn: "root",
})
export class CartService {
  /**getProducts(): any[] {
    throw new Error('Method not implemented.');
  }*/
   /**data: Product[] = [ 
    { id: 0, name: 'Pizza Salami', price: 8.99, amount: 0 },
    { id: 1, name: 'Pizza Classic', price: 5.49, amount: 0 },
    { id: 2, name: 'Sliced Bread', price: 4.99, amount: 0 },
    { id: 3, name: 'Salad', price: 6.99, amount: 0 }
  ];*/
  //suscriberUserInfo: Subscription;
  

  //data: Product[];
  //Product=[];
 
/** 
  arrayColeccionProduct: any = [{
    //id: "",
    id: this.firestoreService.getId(),
    //foto: '',
    data: {} as Product[]
   }];
 */
  //private path = 'Product';
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
 
  constructor(private firestoreService: FirestoreService,
    private angularFirestore: AngularFirestore
    ){

      //this.getProducts();

      //this.Product.getProduct();
      
    }

  /**getProducts(): Product[] {
    return this.data;    
  }*/

  /*getProducts() {
    const collection = this.angularFirestore.collection('Product').get()
    return collection;
}*/

   /**getProducts(){
    this.firestoreService.consultar('Product').subscribe(() => {
      this.Product = [];
      console.log('Product'); 
    });
  }*/

  /**getProducts<tipo>(path: string) {
    const collection = this.angularFirestore.collection<tipo>(path);
    return collection.valueChanges();
  }*/
/** 
 getProducts(){
    this.firestoreService.consultar('Product').subscribe((resultadoConsultaProductos) => {
      this.arrayColeccionProduct = [];
      resultadoConsultaProductos.forEach((datosProducto: any) => {
        this.arrayColeccionProduct.push({
          id: datosProducto.payload.doc.id,
          data: datosProducto.payload.doc.data()          
        });
      })
    });console.log("Product");
  }
*/
  /**getProducts(): Observable<Product[]> {
    return this.firestoreService.collection<Product>('Product').valueChanges();
  }*/
  
  getCart(): Producto[] {
    console.log("this.cart: ", this.cart);
    return this.cart;
  }

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }
 
  addProduct(productoCarro: Producto) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === productoCarro.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
			productoCarro.amount = 1;
			this.cart.push(productoCarro);
			console.log(`product ${productoCarro.titulo} pushed to carro`);
		}
		this.cartItemCount.next(this.cartItemCount.value + 1);
  }

	decreaseProduct(productoEditando) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === productoEditando.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(productoEditando) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === productoEditando.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

  
}