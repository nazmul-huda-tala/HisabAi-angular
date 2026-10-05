import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({selector:'app-payment-panel',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./payment-panel.component.html',styleUrl:'./payment-panel.component.scss'})
export class PaymentPanelComponent { @Input() total=1000; @Output() paid=new EventEmitter<{method:string,received:number}>(); method='Cash'; received=1000; get change(){return Math.max(0,this.received-this.total);} pay(){if(this.received>=this.total)this.paid.emit({method:this.method,received:this.received});} }