import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Employee, EmployeeService } from '../services/employee.service';
@Component({selector:'app-employee-form',standalone:true,imports:[CommonModule,FormsModule,RouterLink],templateUrl:'./employee-form.component.html',styleUrl:'./employee-form.component.scss'})
export class EmployeeFormComponent {
 private service=inject(EmployeeService); private route=inject(ActivatedRoute); private router=inject(Router); id:number|undefined;
 model:Omit<Employee,'id'>={name:'',email:'',phone:'',role:'Cashier',department:'Sales',salary:0,active:true};
 constructor(){const raw=this.route.snapshot.paramMap.get('id');if(raw){this.id=Number(raw);const e=this.service.get(this.id);if(e)this.model={...e};}}
 save(){if(!this.model.name.trim()||!this.model.phone.trim()){return;}this.service.save({...this.model,name:this.model.name.trim(),email:this.model.email.trim()},this.id);this.router.navigate(['/employees']);}
}
