export interface Articulo {
    id?:number;
    codigo?:string;     
    nombre?:string;
    codBarras?:string;
    marca?:string;
    precio_venta?:number;
    stock?:number;
    stock_min?:number;
    claseId?:number;
    claseDescripcion?:string;
}