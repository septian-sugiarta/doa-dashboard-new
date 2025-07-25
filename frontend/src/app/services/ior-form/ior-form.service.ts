import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IorFormService {

  constructor(private http: HttpClient) { }

  updateIorFormStatus(iorId: number, status: string): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/ior-form/${iorId}`, { status: status });
  }

  getIorForms(keyword?: string): Observable<{
    id_IOR: number,
    subject_ior: string,
    occur_nbr: string,
    occur_date: Date,
    reference_ior: string,
    to_uic: string,
    cc_uic: string,
    category_occur: string,
    type_or_pnbr: string,
    level_type: string,
    detail_occurance: string,
    Reportedby: string,
    reporter_uic: string,
    report_date: Date,
    reporter_identity: string,
    data_reference: string,
    hirac_process: string,
    Initial_probability: string,
    initial_severity: string,
    follup_detail: string,
    follupby: string,
    follup_uic: string,
    follup_date: Date,
    follup_datarefer: string,
    follup_status: string,
    nextuic_follup: string,
    current_probability: string,
    current_severity: string,
    current_riskindex: string,
    initial_riskindex: string,

    status: string
  }[]> {
    if (keyword) {
      return this.http.get<{
        id_IOR: number, subject_ior: string,
        occur_nbr: string,
        occur_date: Date,
        reference_ior: string,
        to_uic: string,
        cc_uic: string,
        category_occur: string,
        type_or_pnbr: string,
        level_type: string,
        detail_occurance: string,
        Reportedby: string,
        reporter_uic: string,
        report_date: Date,
        reporter_identity: string,
        data_reference: string,
        hirac_process: string,
        Initial_probability: string,
        initial_severity: string,
        follup_detail: string,
        follupby: string,
        follup_uic: string,
        follup_date: Date,
        follup_datarefer: string,
        follup_status: string,
        nextuic_follup: string,
        current_probability: string,
        current_severity: string,
        current_riskindex: string,
        initial_riskindex: string,

        status: string
      }[]>(`http://localhost:3000/ior-form?keyword=${keyword}`);
    }
    return this.http.get<{
      id_IOR: number, subject_ior: string,
      occur_nbr: string,
      occur_date: Date,
      reference_ior: string,
      to_uic: string,
      cc_uic: string,
      category_occur: string,
      type_or_pnbr: string,
      level_type: string,
      detail_occurance: string,
      Reportedby: string,
      reporter_uic: string,
      report_date: Date,
      reporter_identity: string,
      data_reference: string,
      hirac_process: string,
      Initial_probability: string,
      initial_severity: string,
      follup_detail: string,
      follupby: string,
      follup_uic: string,
      follup_date: Date,
      follup_datarefer: string,
      follup_status: string,
      nextuic_follup: string,
      current_probability: string,
      current_severity: string,
      current_riskindex: string,
      initial_riskindex: string,

      status: string
    }[]>(`http://localhost:3000/ior-form`);
  }

  createIorForm(iorForm: any) {
    return this.http.post(`http://localhost:3000/ior-form`, iorForm);
  }


  updateIorForm(iorForm: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/ior-form/${iorForm.id_IOR}`, iorForm)
  }

  deleteIorForm(id: number) {
    return this.http.delete(`http://localhost:3000/ior-form/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting NCR Form', error);
        return throwError(() => new Error('Error deleting NCR Form: ' + (error.message || error)));
      })
    );
  }

  getIorForm(id_IOR: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/ior-form/${id_IOR}`)

  }
}
