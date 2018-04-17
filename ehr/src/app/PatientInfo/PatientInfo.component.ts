import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PatientInfoService } from './PatientInfo.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-PatientInfo',
	templateUrl: './PatientInfo.component.html',
	styleUrls: ['./PatientInfo.component.css'],
  providers: [PatientInfoService]
})
export class PatientInfoComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          patientID = new FormControl("", Validators.required);
        
  
      
          firstname = new FormControl("", Validators.required);
        
  
      
          lastname = new FormControl("", Validators.required);
        
  
      
          gender = new FormControl("", Validators.required);
        
  
      
          dayOfBirth = new FormControl("", Validators.required);
        
  
      
          phonenumber = new FormControl("", Validators.required);
        
  
      
          nationality = new FormControl("", Validators.required);
        
  
      
          medicationArray = new FormControl("", Validators.required);
        
  
      
          pastVisitsArray = new FormControl("", Validators.required);
        
  


  constructor(private servicePatientInfo:PatientInfoService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          patientID:this.patientID,
        
    
        
          firstname:this.firstname,
        
    
        
          lastname:this.lastname,
        
    
        
          gender:this.gender,
        
    
        
          dayOfBirth:this.dayOfBirth,
        
    
        
          phonenumber:this.phonenumber,
        
    
        
          nationality:this.nationality,
        
    
        
          medicationArray:this.medicationArray,
        
    
        
          pastVisitsArray:this.pastVisitsArray
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicePatientInfo.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "ehr.PatientInfo",
      
        
          "patientID":this.patientID.value,
        
      
        
          "firstname":this.firstname.value,
        
      
        
          "lastname":this.lastname.value,
        
      
        
          "gender":this.gender.value,
        
      
        
          "dayOfBirth":this.dayOfBirth.value,
        
      
        
          "phonenumber":this.phonenumber.value,
        
      
        
          "nationality":this.nationality.value,
        
      
        
          "medicationArray":this.medicationArray.value,
        
      
        
          "pastVisitsArray":this.pastVisitsArray.value
        
      
    };

    this.myForm.setValue({
      
        
          "patientID":null,
        
      
        
          "firstname":null,
        
      
        
          "lastname":null,
        
      
        
          "gender":null,
        
      
        
          "dayOfBirth":null,
        
      
        
          "phonenumber":null,
        
      
        
          "nationality":null,
        
      
        
          "medicationArray":null,
        
      
        
          "pastVisitsArray":null
        
      
    });

    return this.servicePatientInfo.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "patientID":null,
        
      
        
          "firstname":null,
        
      
        
          "lastname":null,
        
      
        
          "gender":null,
        
      
        
          "dayOfBirth":null,
        
      
        
          "phonenumber":null,
        
      
        
          "nationality":null,
        
      
        
          "medicationArray":null,
        
      
        
          "pastVisitsArray":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "ehr.PatientInfo",
      
        
          
        
    
        
          
            "firstname":this.firstname.value,
          
        
    
        
          
            "lastname":this.lastname.value,
          
        
    
        
          
            "gender":this.gender.value,
          
        
    
        
          
            "dayOfBirth":this.dayOfBirth.value,
          
        
    
        
          
            "phonenumber":this.phonenumber.value,
          
        
    
        
          
            "nationality":this.nationality.value,
          
        
    
        
          
            "medicationArray":this.medicationArray.value,
          
        
    
        
          
            "pastVisitsArray":this.pastVisitsArray.value
          
        
    
    };

    return this.servicePatientInfo.updateAsset(form.get("patientID").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicePatientInfo.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.servicePatientInfo.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "patientID":null,
          
        
          
            "firstname":null,
          
        
          
            "lastname":null,
          
        
          
            "gender":null,
          
        
          
            "dayOfBirth":null,
          
        
          
            "phonenumber":null,
          
        
          
            "nationality":null,
          
        
          
            "medicationArray":null,
          
        
          
            "pastVisitsArray":null 
          
        
      };



      
        if(result.patientID){
          
            formObject.patientID = result.patientID;
          
        }else{
          formObject.patientID = null;
        }
      
        if(result.firstname){
          
            formObject.firstname = result.firstname;
          
        }else{
          formObject.firstname = null;
        }
      
        if(result.lastname){
          
            formObject.lastname = result.lastname;
          
        }else{
          formObject.lastname = null;
        }
      
        if(result.gender){
          
            formObject.gender = result.gender;
          
        }else{
          formObject.gender = null;
        }
      
        if(result.dayOfBirth){
          
            formObject.dayOfBirth = result.dayOfBirth;
          
        }else{
          formObject.dayOfBirth = null;
        }
      
        if(result.phonenumber){
          
            formObject.phonenumber = result.phonenumber;
          
        }else{
          formObject.phonenumber = null;
        }
      
        if(result.nationality){
          
            formObject.nationality = result.nationality;
          
        }else{
          formObject.nationality = null;
        }
      
        if(result.medicationArray){
          
            formObject.medicationArray = result.medicationArray;
          
        }else{
          formObject.medicationArray = null;
        }
      
        if(result.pastVisitsArray){
          
            formObject.pastVisitsArray = result.pastVisitsArray;
          
        }else{
          formObject.pastVisitsArray = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "patientID":null,
        
      
        
          "firstname":null,
        
      
        
          "lastname":null,
        
      
        
          "gender":null,
        
      
        
          "dayOfBirth":null,
        
      
        
          "phonenumber":null,
        
      
        
          "nationality":null,
        
      
        
          "medicationArray":null,
        
      
        
          "pastVisitsArray":null 
        
      
      });
  }

}
