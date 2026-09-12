export class CreditoClienteDetalle{    
    constructor(
        public idArticulo?:number,
        public nombre?:string,
        public codBarras?:string,
        public cantidad?:number,
        public precio?:number,
        public isEdit?:boolean,
        ){}       

}