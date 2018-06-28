import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  jsonString: JSON;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getExportJson(this.httpService.user.USER_ID).subscribe(s => {
      this.jsonString = s;
      this.jsonString["DATA"][0]["hallo"] = "jawoll";
      console.log(this.jsonString["DATA"]);
      //console.log(this.jsonString);
    });
    //console.log(this.jsonString);

    //let arr = JSON.parse(this.jsonString);
    //console.log(arr);
  }

}
