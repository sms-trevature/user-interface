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
export class AutodataComponent implements OnInit {


  private AssociateInterviewCounts: AssociateInterviewCount[] = [];

  constructor(private http: HttpClient, private interview: InterviewService, private autodata: AutodataService) {
   /*  this.http.get('interview-service/interview').toPromise().then(data => {
        console.log("retrieved   " + data); 
        console.log(data[1]);
       console.log( data[1].associateEmail);
      

      let objIndex = 0;

      while (data[objIndex] != null || data[objIndex] != undefined) {

        this.filteredAssociates.push(data[objIndex]);

        objIndex++;

      }


    }); */
    
   // console.log(this.filteredAssociates[2].associateEmail);
    //{{temp.filteredAssociates.associateEmail}}
   }

  ngOnInit() {
    this.interview.getInterviewCounts().subscribe(data => {
      this.AssociateInterviewCounts = data;
      //console.log("kenneth.james.currie@gmail.com");
      console.log(this.AssociateInterviewCounts);
    });
  }

}