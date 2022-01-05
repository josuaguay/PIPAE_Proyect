import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { UsuarioPage } from 'src/app/paginas/usuario/usuario.page';
import { FormsModule } from '@angular/forms';
import { ComponentesModule } from '../componentes/componentes.module';
import { ComandaPage } from 'src/app/paginas/comanda/comanda.page';
//import { MispedidosComponent } from './mispedidos/mispedidos.component';
//import { PedidosComponent } from './pedidos/pedidos.component';
//import { GooglemapsModule } from '../googlemaps/googlemaps.module';



@NgModule({
  declarations: [
    //HomeComponent,
    UsuarioPage,
    ComandaPage,
    //MispedidosComponent,
    //PedidosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ComponentesModule,
    //GooglemapsModule
  ]
})
export class PagesModule { }