import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StagingmanagerService } from 'src/app/sms-client/clients/stagingmanager.service';

@Component({
  selector: 'app-staging-mgr-feedback',
  templateUrl: './staging-mgr-feedback.component.html',
  styleUrls: ['./staging-mgr-feedback.component.scss']
})
export class StagingMgrFeedbackComponent implements OnInit {

  constructor(private mngrfeedback: StagingmanagerService) {

  }

  

  ngOnInit() {
    //console.log("test test est !!");

    

  }



}
