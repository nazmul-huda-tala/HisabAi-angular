import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
@Component({selector:'app-employee-list',standalone:true,imports:[CommonModule,FormsModule,RouterLink],templateUrl:'./employee-list.component.html',styleUrl:'./employee-list.component.scss'})
export class EmployeeListComponent { readonly service=inject(EmployeeService); search=''; get filtered(){const q=this.search.toLowerCase().trim();return this.service.employees().filter(x=>!q||x.name.toLowerCase().includes(q)||x.email.toLowerCase().includes(q)||x.role.toLowerCase().includes(q));} remove(id:number){if(confirm('Delete this employee?'))this.service.remove(id);} toggle(x:any){this.service.save({...x,active:!x.active},x.id);} }
