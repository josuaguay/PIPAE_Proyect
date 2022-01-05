import { Injectable } from '@angular/core';
import { AngularFirestore, 
    AngularFirestoreDocument,
    AngularFirestoreCollection} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root', 
})
export class BasedatosService {
    service: any;

    constructor(public db: AngularFirestore){}

    getDUsuarios(){
       return this.db.collectionGroup ('Clientes').snapshotChanges ()
    }

    
    /**getDatosUsuarios(){
        return this.db.collection ('users').snapshotChanges ()
     }*/

    /**createDocument <tipo>(data:tipo, enlace:string) {
        const ref = this.db.collection<tipo>(enlace);
        return ref.add(data);
    }

    deleteDocument() {
    }

    getDocument() {
    }

    editDocument() {
    }*/



}