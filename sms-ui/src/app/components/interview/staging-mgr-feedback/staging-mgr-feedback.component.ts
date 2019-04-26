import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StagingmanagerService } from 'src/app/sms-client/clients/stagingmanager.service';
import { InterviewFeedback } from 'src/app/sms-client/dto/InterviewFeedback';

@Component({
  selector: 'app-staging-mgr-feedback',
  templateUrl: './staging-mgr-feedback.component.html',
  styleUrls: ['./staging-mgr-feedback.component.scss']
})
export class StagingMgrFeedbackComponent implements OnInit {


  private feedbackVar: InterviewFeedback;

  get feedback() {
    return this.feedbackVar;
  }

<<<<<<< HEAD
 


=======
>>>>>>> c0ee6223e0607cd8ed205116be766c7b2e67ecb4
  constructor(private sManagerServ: StagingmanagerService) { }

  ngOnInit() {
    // Need to not hardcode feedback id (WIP)
    this.sManagerServ.getMgrFeedback(2).subscribe(data => { this.feedbackVar = data; });

<<<<<<< HEAD

=======
>>>>>>> c0ee6223e0607cd8ed205116be766c7b2e67ecb4
  }

}
