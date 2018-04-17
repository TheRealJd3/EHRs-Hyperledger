/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HeadService } from './Head.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Head',
	templateUrl: './Head.component.html',
	styleUrls: ['./Head.component.css'],
  providers: [HeadService]
})
export class HeadComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          id = new FormControl("", Validators.required);
        
  
      
          title = new FormControl("", Validators.required);
        
  
      
          firstname = new FormControl("", Validators.required);
        
  
      
          lastname = new FormControl("", Validators.required);
        
  


  constructor(private serviceHead:HeadService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          id:this.id,
        
    
        
          title:this.title,
        
    
        
          firstname:this.firstname,
        
    
        
          lastname:this.lastname
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceHead.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
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
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "ehr.Head",
      
        
          "id":this.id.value,
        
      
        
          "title":this.title.value,
        
      
        
          "firstname":this.firstname.value,
        
      
        
          "lastname":this.lastname.value
        
      
    };

    this.myForm.setValue({
      
        
          "id":null,
        
      
        
          "title":null,
        
      
        
          "firstname":null,
        
      
        
          "lastname":null
        
      
    });

    return this.serviceHead.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "id":null,
        
      
        
          "title":null,
        
      
        
          "firstname":null,
        
      
        
          "lastname":null 
        
      
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "ehr.Head",
      
        
          
        
    
        
          
            "title":this.title.value,
          
        
    
        
          
            "firstname":this.firstname.value,
          
        
    
        
          
            "lastname":this.lastname.value
          
        
    
    };

    return this.serviceHead.updateParticipant(form.get("id").value,this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceHead.deleteParticipant(this.currentId)
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

    return this.serviceHead.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "id":null,
          
        
          
            "title":null,
          
        
          
            "firstname":null,
          
        
          
            "lastname":null 
          
        
      };



      
        if(result.id){
          
            formObject.id = result.id;
          
        }else{
          formObject.id = null;
        }
      
        if(result.title){
          
            formObject.title = result.title;
          
        }else{
          formObject.title = null;
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
      
        
          "id":null,
        
      
        
          "title":null,
        
      
        
          "firstname":null,
        
      
        
          "lastname":null 
        
      
      });
  }

}
