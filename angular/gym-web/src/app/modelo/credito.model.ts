export class Credito{    
    constructor(
        public id?:number,
        public rutCliente?:number,
        public digitoCliente?:string,
        public nombreCompletoCliente?:string,
        public total?:number,
        public fecha?:string,
        public rutUsuario?:number,
        public boleta?:number,
        public credito?:number,
        public creditoFecha?:string,
        public pagoComentario?:string,
        public pagoTipo?:string,
        public creditoFechaPago?:string
    ){}
}