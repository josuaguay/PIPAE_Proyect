import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Producto, Pedido, Cliente, ProductoPedido } from '../models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from './firestore.service';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  private pedido: Pedido;
  pedido$ = new Subject<Pedido>();
  path = 'comanda/';
  uid = '';
  cliente: Cliente;
 

  comandaSuscriber: Subscription;
  clienteSuscriber: Subscription;

  constructor(public authService: AuthService,
              public firestoreService: FirestoreService,
              public router: Router) {

    //   console.log('ComandaService inicio');
      //this.initComanda();
      this.authService.getDatosUsuarios().subscribe( res => {
            console.log(res);
            if (res !== null) {
                  this.uid = res.uid;
                  this.loadCliente();
            }
      });
   }
 
  loadComanda() {
      const path = 'Clientes/' + this.uid + '/' + this.path;
      if (this.comandaSuscriber) {
        this.comandaSuscriber.unsubscribe();
      }
      this.comandaSuscriber = this.firestoreService.getDoc<Pedido>(path, this.uid).subscribe( res => {
              console.log(res);
              if (res) {
                    this.pedido = res;
                    this.pedido$.next(this.pedido);
              } else {
                  this.initComanda();
              }

      });
  }

  initComanda() {
      this.pedido = {
          id: this.uid,
          cliente: this.cliente,
          productos: [],
          precioTotal: null,         
          estado: 'enviado',
          fecha: new Date(),
          valoracion: null,
      };
      this.pedido$.next(this.pedido);
  }

   loadCliente() {
      const path = 'Clientes';
      this.clienteSuscriber = this.firestoreService.getDoc<Cliente>(path, this.uid).subscribe( res => {
            this.cliente = res;
            // console.log('loadCLiente() ->', res);
            this.loadComanda();
            this.clienteSuscriber.unsubscribe();
      });
  }
 
  getComanda(): Observable<Pedido> {
    setTimeout(() => {
        this.pedido$.next(this.pedido);
    }, 100);
    return this.pedido$.asObservable();
  }

  addProducto(productoInput: Producto) {
     console.log('addProducto ->', this.uid);
     if (this.uid.length) {
        const item = this.pedido.productos.find( productoPedido => {
            return (productoPedido.producto.id === productoInput.id)
        });
        if (item !== undefined) {
            item.cantidad ++;
        } else {
           const add: ProductoPedido = {
              cantidad: 1,
              producto: productoInput,
           };
           this.pedido.productos.push(add);
        }
     } else {
          this.router.navigate(['/registro']);
          return;
     }
     this.pedido$.next(this.pedido);
     console.log('en add pedido -> ', this.pedido);
     const path = 'Clientes/' + this.uid + '/' + this.path;
     this.firestoreService.createDoc(this.pedido, path, this.uid).then( () => {
          console.log('añadido con exito');
     });
  }
/** 
  removeProducto(producto: Producto) {
        console.log('removeProducto ->', this.uid);
        if (this.uid.length) {
            let position = 0;
            const item = this.pedido.productos.find( (productoPedido, index) => {
                position = index;
                return (productoPedido.producto.id === producto.id)
            });
            if (item !== undefined) {
                item.cantidad --;
                if (item.cantidad === 0) {
                     this.pedido.productos.splice(position, 1);
                }
                console.log('en remove pedido -> ', this.pedido);
                const path = 'Clientes/' + this.uid + '/' + this.path;
                this.firestoreService.createDoc(this.pedido, path, this.uid).then( () => {
                    console.log('removido con exito');
                });
            }
        }
  }

  realizarComanda() {

  }

 clearComanda() {
      const path = 'Clientes/' + this.uid + '/' + 'comanda';
      this.firestoreService.deleteDoc(path, this.uid).then( () => {
          this.initComanda();
      });
  }
*/

}