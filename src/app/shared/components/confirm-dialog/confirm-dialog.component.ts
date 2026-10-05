import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({selector:'app-confirm-dialog',standalone:true,imports:[CommonModule],templateUrl:'./confirm-dialog.component.html',styleUrl:'./confirm-dialog.component.scss'})
export class ConfirmDialogComponent { @Input() open=false; @Input() title='Confirm action'; @Input() message='Are you sure?'; @Input() confirmText='Confirm'; @Input() cancelText='Cancel'; @Output() confirmed=new EventEmitter<void>(); @Output() cancelled=new EventEmitter<void>(); }
