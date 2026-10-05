import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({selector:'app-quick-products',standalone:true,imports:[CommonModule],templateUrl:'./quick-products.component.html',styleUrl:'./quick-products.component.scss'})
export class QuickProductsComponent { @Output() selected=new EventEmitter<string>(); products=['চাল','তেল','চিনি','ডিম','দুধ','বিস্কুট','নুডলস','পানি']; choose(p:string){this.selected.emit(p);} }