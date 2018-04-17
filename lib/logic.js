'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {ehr.ChangeAssetValue} changeAssetValue
 * @transaction
 */
function onChangeAssetValue(changeAssetValue) {
    var assetRegistry;
    var id = changeAssetValue.relatedAsset.assetId;
    return getAssetRegistry('ehr.SampleAsset')
        .then(function(ar) {
            assetRegistry = ar;
            return assetRegistry.get(id);
        })
        .then(function(asset) {
            asset.value = changeAssetValue.newValue;
            return assetRegistry.update(asset);
        });
}
/**
     * Place an order for a vehicle
     * @param {ehr.appointments.addAppointment} addAppointment - the addAppointment transaction
     * @transaction
     */


function addAppointment(addAppointment){
	console.log('addAppointment');

	var NS_D = 'id.appointment'

	var assetRegistry;
	var id = addAppointment.appointment.appointmentID;
	return getAssetRegistry(NS_D + '.Appointment')
		.then(function(ar){
			assetRegistry = ar;
			return assetRegistry.get(id);
		})
		.then(function(asset){
			asset.time = addAppointment.time;
			asset.realTime = addAppointment.realTime;
			return assetRegistry.update(asset);
		})
}

/**
     * Place an order for a vehicle
     * @param {ehr.updateMedication} updateMedication - the updateMedication transaction
     * @transaction
     */
    function updateMedication(updateMedication){
        console.log('update medication');
      
        var id = updateMedication.patientInfo.id;
        return getAssetRegistry('ehr.PatientInfo')
          .then(function(ar) {
            return ar.get(id).then(function(info){
              info.medicationArray = updateMedication.medicationArray;
              return ar.update(info);
          })
        })
      }
      
      /**
           * Place an order for a vehicle
           * @param {ehr.updatePastVisits} updatePastVisits - the updatePastVisits transaction
           * @transaction
           */
      function updatePastVisits(updatePastVisits){
        console.log('update past visits');
        var id = updatePastVisits.patientInfo;
        return getAssetRegistry('ehr.PatientInfo')
          .then(function(ar) {
            return ar.get(id).then(function(info){
              info.pastVisitsArray.push(updatePastVisits.newVisit);
              return ar.update(info);
          })
        })
      }
         /**
           * Place an order for a vehicle
           * @param {ehr.updateContact} tx- the updateContac transaction
           * @transaction
           */
      async function updateContact(tx){
        let asset = tx.asset;
    asset.phonenumber = tx.newphonenumber;
    // Get the asset registry that stores the assets. Note that
    // getAssetRegistry() returns a promise, so we have to await for it.
    let assetRegistry = await getAssetRegistry('ehr.PatientInfo');

    // Update the asset in the asset registry. Again, note
    // that update() returns a promise, so so we have to return
    // the promise so that Composer waits for it to be resolved.
    await assetRegistry.update(asset);
      }
       /**
     * Place an order for a vehicle
     * @param {ehr.economics.SendBill} newBill - the SendBill transaction
     * @transaction
     */
    function SendBill(newBill) {
        var balanceDue = newBill.bill.amount;
      
          var ID = newBill.bill.id;
          console.log("Bill has been sent");
        return getParticipantRegistry('ehr.Patient')
            .then(function(patientRegistry) {
                  console.log("OK");
                  return patientRegistry.get(ID).then(function(patient){
                    console.log("BBB");
                      patient.balanceDue += newBill.bill.amount;
                     newBill.bill.paid = false;
                     return patientRegistry.update(patient);
                })
            })
    }
     /**
         * Place an order for a vehicle
         * @param {ehr.economics.PayBill} oldBill - the PayBill transaction
         * @transaction
         */
    function PayBill(oldBill) {
        //var balancePaid = oldBill.bill.amount;
      
          var ID = oldBill.bill.id;
          var moneyID = oldBill.bill.moneyID;
          var amt = oldBill.bill.amount;
          console.log("paid");
        return getAssetRegistry('ehr.economics.HospitalMoneyPool')
            .then(function(assetRegistry) {
                  console.log("OK");
                  return assetRegistry.get(moneyID).then(function(_moneypool){
                    console.log("BBB");
                      _moneypool.moneypool += amt;
                     oldBill.bill.paid = true;
                     return assetRegistry.update(_moneypool);
                  
                })
            })
            .then(function(){getParticipantRegistry('ehr.Patient')
                .then(function(patientRegistry) {
                    console.log("OK");
                    return patientRegistry.get(ID).then(function(patient){
                        console.log("BBB");
                        patient.balanceDue -= amt;
                        oldBill.bill.paid = true;
                        return patientRegistry.update(patient);
                    })
                })
             })
             
}