//import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

  /**export class AlertertasService{
  
  constructor(public alertController: AlertController) { }
  
   async myAlert(){      
      let alert = this.alertController.create({
        header: "Alerta",
        message: "Escoge una mejor opción",
        buttons: ['Aceptar']
      });
      (await alert).present();    
  }

}

/**export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}*/

export async function myAlert(message: string, titulo: string, alertCtrl: AlertController){
    if (alertCtrl) {
    let alert = alertCtrl.create({
      //title: titulo,
      //subTitle: message,
      buttons: ['Aceptar']
    });
    (await alert).present();
  }
}