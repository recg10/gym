import { CreditoClienteDetalle } from './credito.cliente.detalle.model';

export class CreditoCliente{    

    constructor(
        public id?:number,
        public fecha?:string,
        public boleta?:number,
        public total?:number,
        public pago_comentario?:string,
        public detalle?: CreditoClienteDetalle[]
        ){}
}