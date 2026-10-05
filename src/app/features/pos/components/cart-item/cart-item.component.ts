import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({selector:'app-cart-item',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./cart-item.component.html',styleUrl:'./cart-item.component.scss'})
export class CartItemComponent { @Input() name='Product'; @Input() price=0; @Input() qty=1; @Output() qtyChange=new EventEmitter<number>(); @Output() remove=new EventEmitter<void>(); change(v:number){this.qty=Math.max(1,Number(v)||1);this.qtyChange.emit(this.qty);} }