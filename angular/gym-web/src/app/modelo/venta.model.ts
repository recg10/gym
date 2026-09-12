
/*export interface Venta{
    id?:number;
    numerofactura?:number;
    codigoProducto?:number;
    precio?:number;
    cantidad?:number;
}*/

import { DetalleVenta } from "./detalle.venta.model";

export class Venta{    
    constructor(
        public id?:number,
        public rutCliente?:number,
        public total?:number,
        public fecha?:string,
        public rutUsuario?:number,
        public boleta?:number,
        public credito?:number,
        public creditoFecha?:string,
        public pagoComentario?:string,
        public pagoTipo?:string,
        public creditoFacturaPago?:string,
        public detalles?:DetalleVenta[],
        public nombreCliente?:string,       
        public digitoCliente?:string
    ){}
}