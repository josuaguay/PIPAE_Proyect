import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' 
  }, 

  /**{ path: 'login', loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)  
  },*/
  
  { path: 'login', loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)  
},

  {
    path: 'usuario', loadChildren: () => import('./paginas/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'bienvenida', loadChildren: () => import('./paginas/bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
  },
  {
    path: 'registro', loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'pedido', loadChildren: () => import('./pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  
  {
    path: 'resetpassword', loadChildren: () => import('./paginas/resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },

  {
    path: 'tutorial', loadChildren: () => import('./paginas/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'comanda', loadChildren: () => import('./paginas/comanda/comanda.module').then( m => m.ComandaPageModule)
  },

  {
    path: 'menu', loadChildren: () => import('./paginas/menu/menu.module').then( m => m.MenuPageModule)
  },
  


 
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
