import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IorFollowOnService {

  constructor(private http: HttpClient) { }

  updateIorFollowOnStatus(iorId: number, status: string): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/ior-follow-on/${iorId}`, { iorfollowonStatus: status });
  }

  followonToIorForm(id_IOR: number, formData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/ior-follow-on/${id_IOR}`, formData);
  }

  getIorFollowOns(): Observable<{ iorId: number, iorfollowonStatus: string }> {
    return this.http.get<{ iorId: number, iorfollowonStatus: string }>(`http://localhost:3000/ior-follow-on`)
  }

  createIorFollowOn(iorFollowOn: any) {
    return this.http.post(`http://localhost:3000/ior-follow-on`, iorFollowOn)
  }

  updateIorFollowOn(iorFollowOn: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/ior-follow-on/${iorFollowOn.id_IOR}`, iorFollowOn)
  }

  deleteIorFollowOn(id: number) {
    return this.http.delete(`http://localhost:3000/ior-follow-on/${id}`)
  }

  getIorFollowOn(id_IOR: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/ior-follow-on/${id_IOR}`)
  }
}
