import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { promise } from 'protractor';
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { captureRejections } from 'stream';
import { unescapeIdentifier } from '@angular/compiler';
import * as firebase from 'firebase/app';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Cliente } from '../models';
import { FirestoreService } from '../services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signOut() {
    throw new Error('Method not implemented.');
  }
  onAuthStateChanged(arg0: string) {
    throw new Error('Method not implemented.');
  }
  onSubmitLogin() {
    throw new Error('Method not implemented.');
  }
  service: any;
  //private user: firebase.FirebaseAppSettings;
  datosCliente: Cliente;
  constructor(private AFauth : AngularFireAuth, 
    private router : Router, 
    private db : AngularFirestore,
    private firestoreService: FirestoreService) { }

  login(email:string, password:string){

    return new Promise((resolve, rejected) =>{
      this.AFauth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });
  } 
  
  logout(){
    this.AFauth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }

  register(email : string, password : string, nombre : string, sexo : string){

    return new Promise ((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(email, password).then( res =>{
          // console.log(res.user.uid);
        const uid = res.user.uid;
          this.db.collection('Clientes').doc(uid).set({
            nombre : nombre,
            email: email,
            sexo: sexo,
            uid : uid,
          })
        
        resolve(res)
      }).catch( err => reject(err))
    })
    

  }

  stateUser() {
    this.getDatosUsuarios().subscribe( res => {
      // console.log(res);
      if (res !== null) {
         this.getInfoUser();

      }  
   });

  }


  getDatosUsuarios(){
    return this.AFauth.authState;
 }

  /**getUid(){
    return this.user.uid;
}*/
	async resetPassword(email: string) {
		return this.AFauth.sendPasswordResetEmail(email)
			.then(() => console.log("email sent"))
			.catch((error) => console.log(error))
	}

	/**getUid(){
		const user = this.AFauth.user; 
	}*/

  async getUid() {
    const user = await this.AFauth.currentUser;
    if (user === null) {
      return null;
    } else {
       return user.uid;
    }
 }



  async getInfoUser() {
    const uid = await this.getUid();
    const path = 'Clientes';  
    this.firestoreService.getDoc<Cliente>(path, uid).subscribe( res => {
          if (res !== undefined) {
                this.datosCliente = res;
                // console.log('datosCliente ->' , this.datosCliente);
          }
    });
}


/**async getInfoUser() {
  const uid = await this.getUid();
  const path = 'Clientes';  
  this.firestoreService.getDoc<Cliente>(path, uid).subscribe( res => {
        if (res !== undefined) {
              this.datosCliente = res;
              // console.log('datosCliente ->' , this.datosCliente);
        }
  });
}*/


}
