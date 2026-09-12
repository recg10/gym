
/*export interface DetalleFactura{
    id?:number;
    numerofactura?:number;
    codigoProducto?:number;
    precio?:number;
    cantidad?:number;
}*/


export class DetalleVenta{    
    constructor(
        public id?:number,
        public idArticulo?:number,
        public idVenta?:number,
        public articuloDescripcion?:string,
        public precio?:number,
        public cantidad?:number,
        public subTotal?:number
        
    ){}
}