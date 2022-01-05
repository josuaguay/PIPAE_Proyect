
export interface Producto {
    precioTotal: any;
    //precioReducido: any;
    titulo: string;
    descripcion: string;
    precio: number;
    foto: string;
    id: string;
    importe: number;
    amount: number;
    //fecha: Date;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    amount: number;
    data: any;
  }

/**export interface Producto {
    nombre: string;
    precioNormal: number;
    precioReducido: number;
    foto: string;
    id: string;
    //fecha: Date;
}*/

export interface Cliente {
   uid: string;
   email: string;
   nombre: string;
   sexo:string;
  // movil: string;
   //foto: string;
   //referencia: string;
    /**ubicacion: {
    lat: number;
    lng: number;
   }*/
}
/**
export interface Pedido {
   id: string;
   titulo: string;
   descripcion: string;
   precio: number;
   estado: EstadoPedido;
   fecha: any;
   valoracion: number;
}*/

export interface Pedido {
    id: string;
    cliente: Cliente;    
    productos: ProductoPedido[]; 
    precioTotal: number;     
    estado: EstadoPedido;
    fecha: any;
    valoracion: number;
 }

export interface ProductoPedido {
    producto: Producto;
    cantidad: number;
}

export type  EstadoPedido = 'enviado' | 'visto' | 'camino' | 'entregado';
