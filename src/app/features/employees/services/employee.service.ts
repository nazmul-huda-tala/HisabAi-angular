import { Injectable, signal } from '@angular/core';
export interface Employee { id:number; name:string; email:string; phone:string; role:string; department:string; salary:number; active:boolean; }
const KEY='hishabai.employees';
const DEFAULTS:Employee[]=[
 {id:1,name:'Rahim Ahmed',email:'rahim@hishabai.local',phone:'01700000001',role:'Cashier',department:'Sales',salary:18000,active:true},
 {id:2,name:'Karim Hasan',email:'karim@hishabai.local',phone:'01700000002',role:'Inventory Staff',department:'Inventory',salary:20000,active:true},
];
@Injectable({providedIn:'root'}) export class EmployeeService {
 private readonly state=signal<Employee[]>(this.load()); readonly employees=this.state.asReadonly();
 save(data:Omit<Employee,'id'>,id?:number){const list=this.state().map(x=>x.id===id?{...data,id}:x);if(id===undefined)list.unshift({...data,id:Date.now()});this.state.set(list);this.persist();}
 remove(id:number){this.state.set(this.state().filter(x=>x.id!==id));this.persist();}
 get(id:number){return this.state().find(x=>x.id===id);}
 private load(){try{const v=JSON.parse(localStorage.getItem(KEY)||'');return Array.isArray(v)?v:DEFAULTS;}catch{return DEFAULTS;}}
 private persist(){localStorage.setItem(KEY,JSON.stringify(this.state()));}
}
