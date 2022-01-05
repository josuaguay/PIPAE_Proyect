import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public  email : string;
  public  nombre: string;
  public password : string;
  public sexo : string;
  
  loading: any;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(private auth : AuthService, 
    private router : Router, 
    private storage: AngularFireStorage,
    public loadingController: LoadingController,
    public toastController: ToastController) { }

  ngOnInit() {
    
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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando...',
    });
    await this.loading.present();
  }

  onUpload(e: { target: { files: any[]; }; }) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  async OnSubmitRegister(){
    this.presentLoading();
    this.auth.register(this.email, this.password,this.nombre, this.sexo).then( auth => {
      this.loading.dismiss();
      //this.router.navigate(['/login'])
      //console.log(auth)      
      this.presentToast('resgistrado con éxito');    
    }).catch( error => {
      this.presentToast('no se pude registrar');
   });this.router.navigate(['/login'])
  }
}
