import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface UserRow { name: string; email: string; role: string; status: string; }

@Component({selector:'app-users-roles',standalone:true,imports:[CommonModule, FormsModule],templateUrl:'./users-roles.component.html',styleUrl:'./users-roles.component.scss'})
export class UsersRolesComponent {
  users: UserRow[] = [
    {name:'Store Owner',email:'owner@hishabai.com',role:'Owner',status:'Active'},
    {name:'Main Cashier',email:'cashier@hishabai.com',role:'Cashier',status:'Active'},
    {name:'Manager',email:'manager@hishabai.com',role:'Manager',status:'Active'}
  ];
  message=''; showForm=false; editingIndex=-1;
  form: UserRow = {name:'',email:'',role:'Cashier',status:'Active'};

  addUser(){ this.editingIndex=-1; this.form={name:'',email:'',role:'Cashier',status:'Active'}; this.showForm=true; }
  editUser(index:number){ this.editingIndex=index; this.form={...this.users[index]}; this.showForm=true; }
  closeForm(){ this.showForm=false; }
  saveUser(){
    if(!this.form.name.trim() || !this.form.email.trim()) { this.message='Please enter name and email.'; return; }
    if(this.editingIndex >= 0) this.users[this.editingIndex]={...this.form}; else this.users=[...this.users,{...this.form}];
    this.showForm=false; this.message=this.editingIndex >= 0 ? '✓ User updated successfully' : '✓ User added successfully';
    setTimeout(()=>this.message='',2200);
  }
  toggleStatus(index:number){ this.users[index].status=this.users[index].status==='Active'?'Inactive':'Active'; }
}
