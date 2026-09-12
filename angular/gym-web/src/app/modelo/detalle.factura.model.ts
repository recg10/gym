
/*export interface DetalleFactura{
    id?:number;
    numerofactura?:number;
    codigoProducto?:number;
    precio?:number;
    cantidad?:number;
}*/

export class DetalleFactura{    
    constructor(
        public id?:number,
        public numeroFactura?:string,
        public codigoProducto?:string,
        public precio?:number,
        public cantidad?:number
    ){}
}