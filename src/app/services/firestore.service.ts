import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  [x: string]: any;
  firestoreService: any;

  
  public insertar(coleccion, datos) {
    return this.angularFirestore.collection(coleccion).add(datos);
  } 
  public consultar(coleccion) {
    return this.angularFirestore.collection(coleccion).snapshotChanges();
  }
  public borrar(coleccion, documentId) {
    return this.angularFirestore.collection(coleccion).doc(documentId).delete();
  }
  public actualizar(coleccion, documentId, datos) {
    return this.angularFirestore.collection(coleccion).doc(documentId).set(datos);
   }
  constructor(public angularFirestore: AngularFirestore, public storage: AngularFireStorage) { }

  createDoc(data: any, path: string, uid: string) {
      return this.angularFirestore.collection(path).doc(uid).set(data);
  }

  crearColec(nombre:string, PrecioNormal:number, PrecioReducido:number){   
        const id = this.firestoreService.getId();             
        return this.angularFirestore.collection('Productos').doc(id).set({
          nombre : nombre,
          PrecioNormal: PrecioNormal,
          PrecioReducido: PrecioReducido,
          id : id,
        })       
  }   
  

  getDoc<tipo>(path: string, id: string) {
    const collection = this.angularFirestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.angularFirestore.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.angularFirestore.collection(path);
    return collection.doc(id).update(data);
  }

  getId() {
    return this.angularFirestore.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.angularFirestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getCollectionQuery<tipo>(path: string, parametro: string, condicion: any, busqueda: string) {
    const collection = this.angularFirestore.collection<tipo>(path, 
      ref => ref.where( parametro, condicion, busqueda));
    return collection.valueChanges();
  }

  getCollectionAll<tipo>(path, parametro: string, condicion: any, busqueda: string, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.angularFirestore.collectionGroup<tipo>(path, 
      ref => ref.where( parametro, condicion, busqueda)
                .orderBy('fecha', 'desc')
                .limit(1)
                .startAfter(startAt)
      );
    return collection.valueChanges();
  }

  getCollectionPaginada<tipo>(path: string, limit: number, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.angularFirestore.collection<tipo>(path, 
      ref => ref.orderBy('fecha', 'desc')
                .limit(limit)
                .startAfter(startAt)
      );
    return collection.valueChanges();
  }

}


function reject(err: any): any {
  throw new Error('Function not implemented.');
}

