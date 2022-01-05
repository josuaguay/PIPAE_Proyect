import { Component, OnInit } from '@angular/core';
import { BasedatosService } from 'src/app/services/basedatos.service'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService} from 'src/app/services/usuarios.service';
import { MenuController, ModalController } from "@ionic/angular";
import { Cliente } from 'src/app/models';
import { Subscription } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import { FirestorageService } from '../../services/firestorage.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  
  cliente: Cliente = {
    uid: '',
    email: '',         
    nombre: '',      
    sexo: '',   
  };

  newFile: any;

  uid = '';

  suscriberUserInfo: Subscription;

  ingresarEnable = false;

  constructor(public menucontroler: MenuController,
              public authService: AuthService,
              public firestoreService: FirestoreService,
              public firestorageService: FirestorageService,
              private modalController: ModalController) {

        this.authService.getDatosUsuarios().subscribe( res => {
                console.log(res);
                if (res !== null) {
                   this.uid = res.uid;
                   this.getUserInfo(this.uid);
                } else {
                    this.initCliente();
                }
        });

  }

  async ngOnInit() {
       const uid = await this.authService.getUid();
       console.log(uid);
  }

  initCliente() {
      this.uid = '';
      this.cliente = {
        uid: '',
        email: '',               
        nombre: '',  
        sexo: '',       
      };
      console.log(this.cliente);
  }

  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('login');
  }


   getUserInfo(uid: string) {
       console.log('getUserInfo');
       const path = 'Clientes';
       this.suscriberUserInfo = this.firestoreService.getDoc<Cliente>(path, uid).subscribe( res => {
              if (res !== undefined) {
                this.cliente = res;
              }
       });
   }




}

