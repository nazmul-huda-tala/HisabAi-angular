import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({selector:'app-cart',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./cart.component.html',styleUrl:'./cart.component.scss'})
export class CartComponent { items=[{name:'চাল মিনিকেট ৫ কেজি',price:420,qty:1},{name:'সয়াবিন তেল ২ লিটার',price:360,qty:1}]; get total(){return this.items.reduce((s,x)=>s+x.price*x.qty,0);} remove(i:number){this.items.splice(i,1);} clear(){this.items=[];} }