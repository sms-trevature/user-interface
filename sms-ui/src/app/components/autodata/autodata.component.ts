import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { InterviewService } from 'src/app/sms-client/clients/interview.service';
import { Interview } from 'src/app/sms-client/dto/Interview';
import { AutodataService } from 'src/app/sms-client/clients/autodata.service';
import { AssociateInterviewCount } from 'src/app/sms-client/dto/AssociateInterviewCount';


@Component({
  selector: 'app-autodata',
  templateUrl: './autodata.component.html',
  styleUrls: ['./autodata.component.scss']
})
/**
 * This component is specifically used to create a list that
 * has associate name, associate email, and how many interviews have
 * been done.  This component is routed via the nav-bar through reports/
 * associate interview count.
 */
export class AutodataComponent implements OnInit {

  private AssociateInterviewCounts: AssociateInterviewCount[] = [];

  constructor(private http: HttpClient, private interview: InterviewService, private autodata: AutodataService) {
  
   }

  /**
   * This method is specifically to call to the database and populate
   * the tables. This component utilizes the dto service AssociateInterviewCount.
   * It also utilzes the service within sms-client/clients interview.service.ts.
   */
  ngOnInit() {
    this.interview.getInterviewCounts().subscribe(data => {
      this.AssociateInterviewCounts = data;
      //console.log("kenneth.james.currie@gmail.com");
      console.log(this.AssociateInterviewCounts);
    });
  }

}
