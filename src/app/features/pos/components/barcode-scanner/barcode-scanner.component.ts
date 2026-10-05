import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({selector:'app-barcode-scanner',standalone:true,imports:[FormsModule],templateUrl:'./barcode-scanner.component.html',styleUrl:'./barcode-scanner.component.scss'})
export class BarcodeScannerComponent { barcode=''; @Output() scanned=new EventEmitter<string>(); scan(){const v=this.barcode.trim();if(v)this.scanned.emit(v);this.barcode='';} }