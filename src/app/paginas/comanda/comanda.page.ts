import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Producto, Pedido, Cliente, ProductoPedido } from '../../models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { ComandaService } from 'src/app/services/comanda.service';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { CartService} from 'src/app/services/cart.service';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
//import { CartModalPage } from '../../paginas/cart-modal/cart-modal.page';
import { MenuPage } from '../menu/menu.page';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.page.html',
  styleUrls: ['./comanda.page.scss'],
})
export class ComandaPage implements OnInit {
	cart = [];
	productos = [];
	cartItemCount: BehaviorSubject<number>;

  pedido: Pedido;
  comandaSuscriber: Subscription;
  total: number;
  cantidad: number;
  private authservice: any;
  

  constructor(authservice:AuthService,
    public menucontroler: MenuController,
    public firestoreService: FirestoreService,
    public comandaService: ComandaService,
    private cartService: CartService, 
    private menuPage: MenuPage,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    //this.productos = this.cartService.getProducts();
		this.cart = this.cartService.getCart();
		this.cartItemCount = this.cartService.getCartItemCount();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy() - carrito componente');
    if (this.comandaSuscriber) {
       this.comandaSuscriber.unsubscribe();
    }
}


openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
}

loadPedido() {
    this.comandaSuscriber = this.comandaService.getComanda().subscribe( res => {
        console.log('loadPedido() en carrito', res);
        this.pedido = res;
        this.getTotal();
        this.getCantidad()
    });
}

initCarrito() {
  this.pedido = {
      id: '',
      cliente: null,
      productos: [],
      precioTotal: null,
      estado: 'enviado',
      fecha: new Date(),
      valoracion: null,
  };
}

getTotal() {
    this.total = 0;
    this.pedido.productos.forEach( producto => {
         this.total = (producto.producto.precioTotal) * producto.cantidad + this.total; 
    });
}
getCantidad() {
    this.cantidad = 0
    this.pedido.productos.forEach( producto => {
          this.cantidad =  producto.cantidad + this.cantidad; 
    });
}

async pedir() {
  if (!this.pedido.productos.length) {
    console.log('añade items al carrito');
    return;
  }
  this.pedido.fecha = new Date();
  this.pedido.precioTotal = this.total;
  this.pedido.id = this.firestoreService.getId();
  const uid = await this.authservice.getUid()
  const path = 'Clientes/' + uid + '/pedidos/' 
  console.log(' pedir() -> ', this.pedido, uid, path);

  /**this.firestoreService.createDoc(this.pedido, path, this.pedido.id).then( () => {
       console.log('guadado con exito');
       this.comandaService.clearComanda();
  });*/


 
}

}
