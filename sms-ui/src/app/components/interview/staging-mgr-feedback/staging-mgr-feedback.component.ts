import { Component, OnInit } from '@angular/core';
import { StagingmanagerService } from 'src/app/sms-client/clients/stagingmanager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staging-mgr-feedback',
  templateUrl: './staging-mgr-feedback.component.html',
  styleUrls: ['./staging-mgr-feedback.component.scss']
})
export class StagingMgrFeedbackComponent implements OnInit {



  constructor(private mngrfeedback: StagingmanagerService, private routerMod: Router) { 

  }

  ngOnInit() {
  }


  /* getManagerFeedback(){
    this.mngrfeedback.retrieveFeedback().subscribe(
      data => {
        //const ourField = 'base_experience';
        console.log(data);
        //console.log('experience? ', data[ourField]);
      }

  } */



}
