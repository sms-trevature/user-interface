import { Component, OnInit, Inject } from '@angular/core';

import { NewInterviewService } from 'src/app/sms-client/clients/new-interview.service';
import { Cohort } from 'src/app/sms-client/dto/Cohort';

@Component({
  selector: 'app-new-interview',
  templateUrl: './new-interview.component.html',
  styleUrls: ['./new-interview.component.scss']
})
export class NewInterviewComponent implements OnInit {

  private dateSelection:Date;
  private minDate: Date;
  private time: Date = new Date();
  private showSpinners = false;
  private myCohorts:Cohort[];
  private cohortId: number;
  private dropdown2NotReady=true;
  private buttonDisabled=true;

  private selectedCohort;
  private selectedAssociate;
  private selectedLocation;
  private selectedClient;

  private _cohortName = [];
  private _associateName = [];



  constructor(private newInt: NewInterviewService) {
     this.minDate= new Date();
     this.minDate.setDate(this.minDate.getDate());
  
  }

  ngOnInit() {
    this.newInt.findAllCohorts().subscribe(data => {
      this.myCohorts=data;
      console.log(this.myCohorts);
      for(let i=0;i<this.myCohorts.length;i++){
        this._cohortName.push(this.myCohorts[i].cohortName);
      }
    });
  }

 
  try(){

    console.log(this.dateSelection);
  
  }

  firstDropDownChanged(val: String): boolean {
    console.log(val);

    for(let j=0;j<this.myCohorts.length;j++){
        if(val== this.myCohorts[j].cohortName){
            this.cohortId= this.myCohorts[j].cohortId;
            break;
        }
    }
    if(val=="Select Cohort"){
      this.dropdown2NotReady=true;
      this._associateName.length=0;
      return false;
    }
    this.newInt.findCohortUsers(this.cohortId).subscribe(userdata =>{
      console.log(userdata);
      this._associateName.length=0;
      for(let k=0; k<userdata.length;k++){
        this._associateName.push(`${userdata[k].firstName+ " " +userdata[k].lastName}`);
      }
      this.dropdown2NotReady=false;
      
    })
   
    return true;
  }
   submitReadyCheck(){
    console.log('closer')
    if(this.dateSelection!=null && this.selectedCohort != 'Select Cohort'
       && this.selectedAssociate != 'Select An Associate' && this.selectedLocation != null
        && this.dateSelection != null  && this.selectedClient != null){
        console.log('should work');
          this.buttonDisabled=false;
       }
  } 
}
