export interface Matricula{
    id?:number;
    idTipoPlan?:number;
    tipoPlan?:string;
    fechaInicio?:string;    
    usuarioRut?:string;      
    alumnoRut?:string;    
    alumnoNombre?:string;   
    alumnoPaterno?:string;   
    alumnoMaterno?:string;   
    diasContratados?:number;
    diasUtilizados?:number;
    fechaVencimiento?:string; 
    activa?:boolean;   
    tipo?:string;
    valor?:number;
    color?:string;
}