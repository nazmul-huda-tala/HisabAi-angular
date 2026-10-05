import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({selector:'app-product-search',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./product-search.component.html',styleUrl:'./product-search.component.scss'})
export class ProductSearchComponent { @Output() selected=new EventEmitter<string>(); search=''; products=['চাল মিনিকেট ৫ কেজি','সয়াবিন তেল ২ লিটার','আকিজ চিনি ১ কেজি','ডিম ১২ পিস','ফ্রেশ দুধ ১ লিটার']; get results(){const q=this.search.toLowerCase().trim();return q?this.products.filter(x=>x.toLowerCase().includes(q)):this.products;} choose(x:string){this.selected.emit(x);this.search='';} }