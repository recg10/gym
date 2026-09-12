import { Component, Input, OnInit } from '@angular/core';  
import { ConfirmDialogService } from './../../servicios/confirm-dialog.service';

  
@Component({  
    selector: 'app-confirmation-dialog',  
    templateUrl: 'confirmation-dialog.component.html',  
    styleUrls: ['confirmation-dialog.component.css']  
})  
  
export class ConfirmationDialogComponent implements OnInit {  
    message: any;  
    constructor(  
        private confirmDialogService: ConfirmDialogService  
    ) { }  
  
    ngOnInit(): any {  
       /** 
        *   This function waits for a message from alert service, it gets 
        *   triggered when we call this from any other component 
        */  
        this.confirmDialogService.getMessage().subscribe(message => {  
            this.message = message;  
        });  
    }  
} 