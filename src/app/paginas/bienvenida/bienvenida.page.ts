import { Component, OnInit } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService} from 'src/app/services/usuarios.service';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
//import { NavController, NavParams, MenuController, ModalController, AlertController} from '@ionic/angular';


@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  
})
export class BienvenidaPage implements OnInit {
  
  idConsultar:string;

   public users:any = [];
   public  email : string;

   constructor(private authService : AuthService, 
    public usuariosService: UsuariosService/**,
    private qrScanner: QRScanner,
    public navController: NavController,
    public navParams: NavParams,
    private menuController: MenuController,
    private modalController: ModalController,
    private alertController: AlertController,*/

    ) { }

  ngOnInit() {
    this.authService.getDatosUsuarios().subscribe (email => {
      this.email = this.email;  
      this.users = this.users; 
    }) 
  }

  /**scanQR(){
    this.qrScanner.prepare()
   .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        // start scanning
        window.document.querySelector('ion-app').classList.add('transparentBody');
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
 
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
          this.navController.push('MenuPage', {
           idRestaurante: text
          });
         this.qrScanner.destroy();
 
        });
        this.qrScanner.show();
      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
   })
   .catch((e: any) => console.log('Error is', e)); 
 
   }*/

}
