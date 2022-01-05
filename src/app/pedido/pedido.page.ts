import { Component, ViewChild, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Producto } from 'src/app/models';
import { IonInfiniteScroll } from '@ionic/angular';
import { FirestorageService } from '../services/firestorage.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
//import { resolve4 } from 'dns';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})


export class PedidoPage {
  
  productoEditando: Producto; 

  arrayColeccionProductos: any = [{
    //id: "",
    id: this.firestoreService.getId(),
    //foto: '',
    data: {} as Producto
   }];

   idProductoSelec: string;

   //newProducto: Tarea;

   newImage: '';
   newFile: '';
   loading: any;
   id:any;
   
   //foto: '';

   selecProducto(productoSelec) {
     console.log("Producto seleccionada: ");
     console.log(productoSelec);
     this.idProductoSelec = productoSelec.id;
     this.productoEditando.titulo = productoSelec.data.titulo;
     this.productoEditando.descripcion = productoSelec.data.descripcion;
     this.productoEditando.precio = productoSelec.data.precio;
     this.productoEditando.foto = productoSelec.data.foto;
   }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll; 

  dataScroll: any [] = Array [20] ;

  constructor(private firestoreService: FirestoreService,
    public firestorageService: FirestorageService,
    public loadingController: LoadingController,
    public toastController: ToastController ,
    public alertController: AlertController) {
    // Crear una tarea vacía
    this.productoEditando = {} as Producto;
    this.obtenerListaProductos();
  } 
  
 /**clicBotonInsertar() {
    this.firestoreService.insertar("tareas", this.tareaEditando).then(() => {
      console.log('Tarea creada correctamente!');
      this.tareaEditando= {} as Tarea;
      alert ("Se creó con exito");
    }, (error) => {
      console.error(error);
    });
  }*/

  /**async clicBotonInsertar() {
    this.presentLoading();    
    const titulo = this.tareaEditando.titulo;
    if (this.newFile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newFile, "Productos", titulo);
      this.tareaEditando.foto = res;
    }    
    this.firestoreService.createDoc(this.tareaEditando, "tareas", this.id).then(() => {
      console.log('Tarea creada correctamente!');
      this.tareaEditando= {} as Tarea;
      alert ("Se creó con exito");
    }, (error) => {
      console.error(error);
    });
  }*/

  async clicBotonInsertar() {
    this.presentLoading();    
    const titulo = this.productoEditando.titulo;    
    const res = await this.firestorageService.uploadImage(this.newFile, "Productos", titulo);
    this.productoEditando.foto = res;
    this.firestoreService.createDoc(this.productoEditando, "productos", this.id).then(() => {
      this.loading.dismiss();
      // Limpiar datos de pantalla
      this.productoEditando = {} as Producto;
      this.presentToast('guardado con éxito');    
    }).catch( error => {
      this.presentToast('no se pude guardar');
   });
  }

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



  /**async newImageUpload(event: any) {
    //const path = "Productos";
    const titulo = this.tareaEditando.titulo;
    const file = event.target.files[0];
    const res = await this.firestorageService.uploadImage(file, "Productos", titulo);
    this.newProducto.foto = res;
    this.clicBotonInsertar();
  }*/


  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando...',
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

 async clicBotonModificar() {
    //this.presentLoading();    
    const titulo = this.productoEditando.titulo;    
    const res = await this.firestorageService.uploadImage(this.newFile, "Productos", titulo);
    this.productoEditando.foto = res;
    this.firestoreService.actualizar("productos", this.idProductoSelec, this.productoEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaProductos();
      // Limpiar datos de pantalla
      this.productoEditando = {} as Producto;
      this.presentToast('modificado con éxito');    
    }).catch( _error => {
      this.presentToast('no se pude modificar');
   });
  }
  
  async clicBotonBorrar() {   
      const alert = await this.alertController.create({
        cssClass: 'secondary',
        header: 'Advertencia!!',
        message: 'Seguro que quiere <strong>Eliminar</strong> este registro??',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (_blah) => {
              console.log('Confirm Cancel: blah'); 
            }
          },
          {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Okay');                
              this.firestoreService.borrar("productos", this.idProductoSelec).then( () => {        
                // Actualizar la lista completa
                this.obtenerListaProductos();
                // Limpiar datos de pantalla 
                this.productoEditando = {} as Producto;               
                this.presentToast ('Eliminado con exito'); 
                this.alertController.dismiss(); 
              }).catch( _error => {
                this.presentToast ('No se pudo eliminar');                
              });

            }
          }
        ]
      });
  
      await alert.present();    
  }


  /**clicBotonBorrar() {
    this.firestoreService.borrar("tareas", this.idTareaSelec).then(() => {        
      // Actualizar la lista completa
      this.obtenerListaTareas();
      // Limpiar datos de pantalla
      this.tareaEditando = {} as Tarea;
      alert("Se borró con exito");
    }).catch(err => console.log(err))
  }*/

  obtenerListaProductos(){
    this.firestoreService.consultar("productos").subscribe((resultadoConsultaProductos) => {
      this.arrayColeccionProductos = [];
      resultadoConsultaProductos.forEach((datosProducto: any) => {
        this.arrayColeccionProductos.push({
          id: datosProducto.payload.doc.id,
          data: datosProducto.payload.doc.data()
        });
      })
    });
  }
  
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataScroll.length == 500) {
        event.target.disabled = true;
      }
    }, 100);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  /**async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
        this.arrayColeccionTareas = event.target.files[0];
        const reader = new FileReader();
        reader.onload = ((image) => {
            this.tareaEditando.foto = image.target.result as string;
        });
        reader.readAsDataURL(event.target.files[0]);
      }
}*/

}
