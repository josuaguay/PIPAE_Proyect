import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { getFirestore } from "firebase/firestore"
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface user {
  description : string
  name : string
  id: string
  img : string
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private db : AngularFirestore,
    private auth: AuthService
    ) { }


  getUsuarios(){
    
    return this.db.collection('users').valueChanges({idField:'uid'}) as Observable<user[]>;
  }


  /**getUsuarios(){
    
    return this.auth.onAuthStateChanged('users');
  }*/


  /**getUsuarios(){
    
    return this.db.collection('users').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as user;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }*/






}

