import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { appointmentComponent } from './appointment/appointment.component';
import { BillComponent } from './Bill/Bill.component';
import { HospitalSuppliesComponent } from './HospitalSupplies/HospitalSupplies.component';
import { HospitalMoneyPoolComponent } from './HospitalMoneyPool/HospitalMoneyPool.component';
import { SampleAssetComponent } from './SampleAsset/SampleAsset.component';
import { PatientInfoComponent } from './PatientInfo/PatientInfo.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'appointment', component: appointmentComponent},
		
		{ path: 'Bill', component: BillComponent},
		
		{ path: 'HospitalSupplies', component: HospitalSuppliesComponent},
		
		{ path: 'HospitalMoneyPool', component: HospitalMoneyPoolComponent},
		
		{ path: 'SampleAsset', component: SampleAssetComponent},
		
		{ path: 'PatientInfo', component: PatientInfoComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
