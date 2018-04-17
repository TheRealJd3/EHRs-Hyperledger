import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace ehr{
   export class User extends Participant {
      email: string;
   }
   export class SampleAsset extends Asset {
      assetId: string;
      value: string;
   }
   export class ChangeAssetValue extends Transaction {
      newValue: string;
      relatedAsset: Asset;
   }
   export class PatientInfo extends Asset {
      patientID: string;
      firstname: string;
      lastname: string;
      gender: Gender;
      dayOfBirth: Date;
      phonenumber: number;
      nationality: Nationality;
      medicationArray: string[];
      pastVisitsArray: Visits[];
   }
   export class Doctor extends Participant {
      id: string;
      title: string;
      firstname: string;
      lastname: string;
      department: string;
      salary: number;
   }
   export class Head extends Participant {
      id: string;
      title: string;
      firstname: string;
      lastname: string;
   }
   export class Patient extends Participant {
      id: string;
      title: string;
      firstname: string;
      lastname: string;
      lastvisit: Date;
      balanceDue: number;
   }
   export enum Gender {
      MALE,
      FEMALE,
      OTHER,
   }
   export enum Nationality {
      AMERICAN,
      BRITISH,
      INDIAN,
      PAKISTANI,
      CANADIAN,
      EMIRATI,
      OTHER,
   }
   export class Visits {
      visitDate: Date;
      procedure: string;
      doctor: string;
      medicinePrescribed: string[];
   }
   export class updateMedication extends Transaction {
      owner: Patient;
      medicationArray: string[];
      patientInfo: PatientInfo;
   }
   export class updatePastVisits extends Transaction {
      owner: Patient;
      newVisit: Visits;
      patientInfo: PatientInfo;
   }
   export class updateContact extends Transaction {
      owner: Patient;
      phonenumber: number;
      patientInfo: PatientInfo;
   }
// }
