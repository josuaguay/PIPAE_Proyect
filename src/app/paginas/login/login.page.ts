import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  loading: any;
  
  constructor(private authService: AuthService, 
    public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController ,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  onSubmitLogin()
  {
    this.authService.login(this.email, this.password).then( _res =>{
      
      this.presentToast('Datos correctos'); 
      this.router.navigate(['/bienvenida']);   
    }).catch( error => {
      this.presentToast('Datos incorrecto');
   });
  }

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

}
