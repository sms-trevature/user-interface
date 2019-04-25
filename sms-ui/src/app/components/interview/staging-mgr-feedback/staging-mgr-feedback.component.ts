import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-staging-mgr-feedback',
  templateUrl: './staging-mgr-feedback.component.html',
  styleUrls: ['./staging-mgr-feedback.component.scss']
})
export class StagingMgrFeedbackComponent implements OnInit {

  constructor(private htp: HttpClient) { 
    this.htp.get('/interview-service/interview/Feedback/InterviewId/2').toPromise().then(data => {
    
      console.log(data);
    
    });
  }

  ngOnInit() {
    console.log("test test est !!");

    

  }



}
