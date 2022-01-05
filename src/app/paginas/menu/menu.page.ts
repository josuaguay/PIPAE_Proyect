import { Component,OnInit, Input, ViewChild, ElementRef  } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
//import { Product} from '../../services/cart.service';
import { Producto } from 'src/app/models';
import { NotificationsService } from '../../services/notifications.service';
import { CartService } from '../../services/cart.service';
//import { ComandaService } from 'src/app/services/comanda.service';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from '../../paginas/cart-modal/cart-modal.page';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit{
  //@Input() producto1: Producto;


  //producto: Producto[] = [];
  //product = [];

  private path = 'productos';

  //data: Product[];

  productoEditando: Producto;

  arrayColeccionProducto: any = [{
    //id: "",
    id: this.firestoreService.getId(),
    //foto: '',
    data: {} as Producto[]
   }];
  
    
   cart = [];
   products : any = [];
   //products = this.getProducts();
   cartItemCount: BehaviorSubject<number>;
  
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  
  


  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public notificationsService: NotificationsService,
              private cartService: CartService, 
              private modalCtrl: ModalController,
              private navController:NavController /**,
              public comandaService: ComandaService,
              private qrScanner: QRScanner*/) {{
    // Crear una tarea vacía

    //this.cartService.getProducts();    
  this.productoEditando = {} as Producto;
  } 
                
  }

  ngOnInit() {
		this.products = this.getProducts();   
		this.cart = this.cartService.getCart();
		this.cartItemCount = this.cartService.getCartItemCount();
	}

  //ngOnInit() {}

  /**addComanda(){

    this.comandaService.addProducto(this.producto);
  }
*/
  /**  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

 loadProductos() {
      this.firestoreService.getCollection<Producto>(this.path).subscribe( res => {
            console.log(res);
            this.producto = res;
      });
  }

  sendNotification() {
      this.notificationsService.newNotication();
  }*/

  getProducts(){
    this.firestoreService.consultar(this.path).subscribe((resultadoConsultaProductos) => {
      this.arrayColeccionProducto = [];
      resultadoConsultaProductos.forEach((datosProducto: any) => {
        this.arrayColeccionProducto.push({
          id: datosProducto.payload.doc.id,
          data: datosProducto.payload.doc.data()          
        });
      })
    });
  }
 

  addToCart(producto: Producto) {
		console.log(`add ${producto.titulo} to carrito`)
		this.animateCSS('jello');
		this.cartService.addProduct(producto);
	}

	async openCart() {
		this.animateCSS('bounceOutLeft', true);

		const modal = await this.modalCtrl.create({
			component: CartModalPage,
			cssClass: 'cart-modal'
		});
		modal.onWillDismiss().then(() => {
			this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
			this.animateCSS('bounceInLeft');
		});
		modal.present();
   
	}

	// copied from animate.css github page: https://github.com/daneden/animate.css
	animateCSS(animationName, keepAnimated = false) {
		const node = this.fab.nativeElement;
		node.classList.add('animated', animationName);


		function handleAnimationEnd() {
			if (!keepAnimated) {
				node.classList.remove('animated', animationName);
			}
			node.removeEventListener('animationend', handleAnimationEnd);
		}
		node.addEventListener('animationend', handleAnimationEnd);
	}





}
function getProducts(): any[] {
  throw new Error('Function not implemented.');
}

