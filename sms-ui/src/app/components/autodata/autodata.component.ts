import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';


@Component({
  selector: 'app-autodata',
  templateUrl: './autodata.component.html',
  styleUrls: ['./autodata.component.scss']
})
export class AutodataComponent implements OnInit {

  filteredAssociates = new Array;

  constructor(private http: HttpClient) {
    this.http.get('interview-service/interview').toPromise().then(data => {
        console.log("retrieved   " + data); 
        console.log(data[1]);
       console.log( data[1].associateEmail);
      
      let objIndex = 0;

      while (data[objIndex] != null || data[objIndex] != undefined) {

        this.filteredAssociates.push(data[objIndex]);

        objIndex++;

      }

    });
    console.log("from the array " + this.filteredAssociates[2]);
   // console.log(this.filteredAssociates[2].associateEmail);
    //{{temp.filteredAssociates.associateEmail}}
   }

  ngOnInit() {
    console.log("test")
  }

}
