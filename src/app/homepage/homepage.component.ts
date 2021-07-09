import { Component, Inject, OnInit } from '@angular/core';
import { GetDetailsService } from '../get-details.service';
import { map } from 'rxjs/operators';
import { IState } from '../models/states-model';
import { IDistrict } from '../models/district-model';
import { ICenter } from '../models/vaccine-center-model';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  states:IState[] = [];
  districts:IDistrict[] = [];
  selectedState = "Select a State";
  selectedDistrict = "Select a District";
  centers:ICenter[] = [];
  pincode:String = "";
  searchBy:String = "district";
  today:Date = new Date();
  maxDate:Date = new Date();

  constructor(private getDetails : GetDetailsService, public dialog : MatDialog) { 
    this.getDetails.getStates()
    .subscribe(data => this.states = (data["states"]));

    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }

  ngOnInit(): void {
  }

  onStateSelect() {
    this.getDetails.getDistricts(this.selectedState)
    .subscribe(data => this.districts = data["districts"]);
  }

  listByDistrict() {
    this.getDetails.getDetailsByDistrict(this.selectedDistrict, this.getSelectedDate())
    .subscribe(data => {
      this.centers = data["centers"];
      for(let i = 0; i < this.centers.length; i++) {
        this.centers[i].sessions = data["centers"][i]["sessions"] ?? [];
        this.centers[i].vaccine_fees = data["centers"][i]["vaccine_fees"] ?? [];
      }
      if(this.centers.length == 0) {
        alert("Sorry! No data found");
        this.reset();
      }
    });
  }

  listByPincode() {
    this.pincode = this.pincode.trim();
    if(this.pincode.length != 6 || isNaN(Number(this.pincode))) {
      alert("Enter a valid pincode!");
      return;
    }

    this.getDetails.getDetailsByPincode(this.pincode, this.getSelectedDate())
    .subscribe(data => {
      this.centers = data["centers"];
      for(let i = 0; i < this.centers.length; i++) {
        this.centers[i].sessions = data["centers"][i]["sessions"] ?? [];
        this.centers[i].vaccine_fees = data["centers"][i]["vaccine_fees"] ?? [];
      }
      if(this.centers.length == 0) {
        alert("Sorry! No data found");
        this.reset();
      }
    });
  }

  reset() {
    this.centers = [];
    this.selectedState = "Select a State";
    this.selectedDistrict = "Select a District";
    this.districts = [];
    this.pincode = "";
  }

  getSelectedDate():String {
    let selectedDate = (<HTMLInputElement>document.getElementById('selected-date')).value;
    let tmp:String[] = [];
    tmp[0] = tmp[1] = tmp[2] = "";
    let j = 0;
    for(let i = 0; i < selectedDate.length; i++) {
      if(selectedDate[i] == '/') {
        j++;
        continue;
      }
      tmp[j] += selectedDate[i];
    }
    return tmp[1] + "-" + tmp[0] + "-" + tmp[2];
  }

  openDialog(id:string) {
    let curCenter: ICenter = this.centers[parseInt(id)];
    this.dialog.open(MoreInfoDialog, {data: curCenter});
  }
}

@Component({
  selector: 'more-info-dialog',
  templateUrl: 'more-info-dialog.html',
})
export class MoreInfoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public center: ICenter) {}
}

