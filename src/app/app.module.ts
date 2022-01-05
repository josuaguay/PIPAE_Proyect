import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Import the AngularFire Module
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HttpClientModule } from '@angular/common/http';
import { CartModalPageModule } from './paginas/cart-modal/cart-modal.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,   
    AngularFireStorageModule,
    HttpClientModule,
    CartModalPageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}

