import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
//import { Product } from '../../services/cart.service';
import { Product, Producto } from 'src/app/models';
import { ModalController, NavController} from '@ionic/angular';
import { MenuPage } from '../menu/menu.page';
import { FirestorageService } from '../../services/firestorage.service';
import { FirestoreService } from '../../services/firestore.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';


@Component({
	selector: 'app-cart-modal',
	templateUrl: './cart-modal.page.html',
	styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

	productoEditando: Producto; 
	cart: Producto[] = [];	
	newImage: '';
	newFile: '';
	loading: any;
	id:any;	
	

	constructor(
		private cartService: CartService,
		//private menuPage: MenuPage,
		private modalCtrl: ModalController,
		private firestorageService: FirestorageService,
		private firestoreService: FirestoreService,
		public loadingController: LoadingController,
    	public toastController: ToastController ,
    	public alertController: AlertController,
		public navController: NavController
		
	) {
		this.productoEditando = {} as Producto;
	}

	ngOnInit() {
		this.cart = this.cartService.getCart();
	}

	decreaseCartItem(producto: Producto): void {
		this.cartService.decreaseProduct(producto);
	}

	increaseCartItem(producto: Producto): void {
		this.cartService.addProduct(producto);
	}

	removeCartItem(producto: Producto): void {
		this.cartService.removeProduct(producto);
	}

	getTotal(): number {
		return this.cart.reduce((i, j) => i + j.precio * j.amount, 0);
	}

	close(): void {
		this.modalCtrl.dismiss();
	}

	async clicBotonInsertar() {
		this.presentLoading();    
		const titulo = this.productoEditando.titulo;    
		const res = await this.firestorageService.uploadImage(this.newFile, "Comandas", titulo);
		this.productoEditando.foto = res;		
		this.firestoreService.createDoc(this.productoEditando, "comandas", this.id).then(() => {
		  this.loading.dismiss();
		  // Limpiar datos de pantalla
		  this.productoEditando = {} as Producto;
		  this.presentToast('enviado con éxito');    
		}).catch( error => {
		  this.presentToast('no se pude enviar');
		  
	   });
	   this.close();
	   this.cart.length=0;
	   //this.navController.setRoot(MenuPage);
	   //window.location.assign('menu');
	   //this.cart=[];	   
	  }

	  /**getCart(): Producto[] {
		console.log("this.cart: ", this.cart);
		return this.cart;
	  }*/

	  async newImageUpload(event: any) {
		if (event.target.files && event.target.files[0]) {
			this.newFile = event.target.files[0];
			const reader = new FileReader();
			reader.onload = ((image) => {
				this.productoEditando.foto = image.target.result as string;
			});
			reader.readAsDataURL(event.target.files[0]);
		  }
	}

	  async presentLoading() {
		this.loading = await this.loadingController.create({
		  cssClass: 'normal',
		  message: 'enviando...',
		});
		await this.loading.present();
	  }
	
	  async presentToast(msg: string) {
		const toast = await this.toastController.create({
		  message: msg,
		  cssClass: 'normal',
		  duration: 2000,
		  color: 'light',
		});
		toast.present();
	  }
}
