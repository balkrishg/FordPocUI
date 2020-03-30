import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, 
  MatCheckboxModule, MatInputModule,
  MatButtonModule, MatFormFieldModule,MatMenuModule } from  '@angular/material';
  import { SliderModule } from 'angular-image-slider';
import { ProductRuleComponent } from './components/product-rule/product-rule.component';
import { ProductRuleDialogComponent } from './components/dialog/product-rule-dialog/product-rule-dialog.component';
// import { MatToolbarModule} from  '@angular/material';
import {ProductService} from './services/product.service';
import {HttpClientModule} from '@angular/common/http';

import { MessageService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';

import {DropdownModule} from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import {CardModule} from 'primeng/card';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';


import { ExcelService } from './services/excel.service';

import { CalculateIncentiveComponent } from './components/calculate-incentive/calculate-incentive.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    ProductRuleComponent,
    ProductRuleDialogComponent,
    CalculateIncentiveComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,
    SliderModule,
    DialogModule,
    ToastModule,
    DropdownModule,
    TableModule,
    CardModule,
    MultiSelectModule,
    CalendarModule,
    TabViewModule

    
  ],
  
  providers:[ProductService, MessageService, ExcelService],
  bootstrap: [AppComponent],
})
export class AppModule { }
