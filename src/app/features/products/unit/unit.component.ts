import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
interface Unit { id:number; name:string; description:string; active:boolean; }
const KEY='hishabai.units';
const DEFAULTS:Unit[]=[ {id:1,name:'Piece',description:'একটি পণ্য',active:true},
 {id:2,name:'Kg',description:'কিলোগ্রাম',active:true},
 {id:3,name:'Liter',description:'লিটার',active:true},
 {id:4,name:'Box',description:'বক্স',active:true}];
@Component({selector:'app-unit',standalone:true,imports:[CommonModule,FormsModule,RouterLink],templateUrl:'./unit.component.html',styleUrl:'./unit.component.scss'})
export class UnitComponent {
 units:Unit[]=this.load(); name=''; description=''; editingId:number|null=null; search=''; message='';
 get filtered(){const q=this.search.trim().toLowerCase();return this.units.filter(x=>!q||x.name.toLowerCase().includes(q)||x.description.toLowerCase().includes(q));}
 edit(x:Unit){this.editingId=x.id;this.name=x.name;this.description=x.description;}
 save(){const name=this.name.trim();if(!name){this.message='Unit name is required';return;} if(this.editingId){const x=this.units.find(v=>v.id===this.editingId);if(x){x.name=name;x.description=this.description.trim();}}else this.units.unshift({id:Date.now(),name,description:this.description.trim(),active:true});this.persist();this.reset();}
 remove(x:Unit){if(confirm(`Delete ${x.name}?`)){this.units=this.units.filter(v=>v.id!==x.id);this.persist();}}
 toggle(x:Unit){x.active=!x.active;this.persist();}
 reset(){this.name='';this.description='';this.editingId=null;this.message='Saved successfully';setTimeout(()=>this.message='',1800);}
 private load(){try{const v=JSON.parse(localStorage.getItem(KEY)||'');return Array.isArray(v)?v:DEFAULTS.map(x=>({...x}));}catch{return DEFAULTS.map(x=>({...x}));}}
 private persist(){localStorage.setItem(KEY,JSON.stringify(this.units));}
}
