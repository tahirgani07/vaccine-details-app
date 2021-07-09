import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IState } from './models/states-model';
import { IDistrict } from './models/district-model';
import { ICenter } from './models/vaccine-center-model';

@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://cdn-api.co-vin.in/api";

  getStates():Observable<IState[]> {
    let url = this.baseUrl + "/v2/admin/location/states";
    return this.http.get<IState[]>(url);
  }

  getDistricts(stateId: String):Observable<IDistrict[]> {
    let url = this.baseUrl + "/v2/admin/location/districts/" + stateId;
    return this.http.get<IDistrict[]>(url);
  }

  getDetailsByPincode(pincode: String, date:String):Observable<ICenter[]> {
    let url = this.baseUrl + "/v2/appointment/sessions/public/calendarByPin";
    url = url + "?pincode=" + pincode + "&date=" + date;
    return this.http.get<ICenter[]>(url);
  }

  getDetailsByDistrict(districtID: String, date:String):Observable<ICenter[]> {
    let url = this.baseUrl + "/v2/appointment/sessions/public/calendarByDistrict";
    url = url + "?district_id=" + districtID + "&date=" + date;
    return this.http.get<ICenter[]>(url);
  }
}
