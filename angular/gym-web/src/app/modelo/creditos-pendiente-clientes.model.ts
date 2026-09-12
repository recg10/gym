import { CreditoClienteDetalle } from "./credito.cliente.detalle.model";

export interface CreditoPendienteClientes{
    id?:number;
    rutCliente?:string;
    nombre?:string;    
    paterno?:string;    
    materno?:string;    
    telefono?:string;
    total?:string;
    fecha?:string;
    detalles?:CreditoClienteDetalle[];
    creditoFacturaPago?:string;
}