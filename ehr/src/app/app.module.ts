import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { appointmentComponent } from './appointment/appointment.component';
import { BillComponent } from './Bill/Bill.component';
import { HospitalSuppliesComponent } from './HospitalSupplies/HospitalSupplies.component';
import { HospitalMoneyPoolComponent } from './HospitalMoneyPool/HospitalMoneyPool.component';
import { SampleAssetComponent } from './SampleAsset/SampleAsset.component';
import { PatientInfoComponent } from './PatientInfo/PatientInfo.component';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    appointmentComponent,
		BillComponent,
		HospitalSuppliesComponent,
		HospitalMoneyPoolComponent,
		SampleAssetComponent,
		
    PatientInfoComponent
		
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
