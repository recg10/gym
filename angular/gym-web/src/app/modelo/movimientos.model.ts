export class Movimientos{
    constructor(        
        public id?:number,        
        public cuentaId?:number,
        public cuentaIdDescripcion?:string,
        public monto?:number,    
        public usuarioRut?:number,
        public tipoMovimiento?:number,
        public tipoMovimientoDescripcion?:string,
        public fecha?:string,
        public comentario?:string
        
    ){}
}