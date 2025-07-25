import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NcrFormService {

  constructor(private http: HttpClient) { }

  updateNcrFormStatus(ncrId: number, status: string): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/ncr-form/${ncrId}`, { status: status });
  }

  getNcrForms(keyword?: string): Observable<{
    NCR_init_ID: number,
    status: string,
    ncrformStatus: string,
    ncrreplyStatus?: string,
    ncrfollowresultStatus?: string,
    RegulationBased: string,
    Subject: string,
    Audit_Plan_No: string,
    NCR_nbr: string,
    Issued_date: Date,
    Responsible_Office: string,
    times_occurred: string,
    Audit_Type: string,
    Audit_scope: string,
    To_UIC: string,
    Attention: string,
    Required_condition_reff: string,
    Level_of_Finding: string,
    implementation_date: Date,
    Problem_Analysis: string,
    Answer_due_date: Date,
    Issue_IAN: string,
    IAN_nbr: string,
    Encountered_Condition: string,
    Audited_by: string,
    Audit_Date: Date,
    Acknowledge_by: string,
    Acknowledge_date: Date,
    Status: string,
    Remark: string,
    RCA_problem: string,
    Corrective_Action: string,
    Preventive_Action: string,
    Recommend_corrective_action: string,
    Identified_by_Auditee: string,
    Identified_Date: Date,
    Accept_by_Auditor: string,
    Auditor_Accept_date: Date,
    implementationReply_date: Date,
    Close_Corrective_Actions: string,
    Proposed_Close_Auditee: string,
    Proposed_Close_Date: Date,
    Implemented_close_date: Date,
    Is_close: string,
    effectiveness: string,
    Refer_to_Verify_Sheet: string,
    Sheet_No: string,
    New_NCR_Issue_nbr: string,
    Close_approved_by: string,
    Close_approved_date: Date,
    Verified_Chief_IM: string,
    Verified_Date: Date,
    followup_audit_result: string,
    evidence: string,
  }[]> {
    if (keyword) {
      return this.http.get<{
        NCR_init_ID: number,
        status: string, ncrformStatus: string,

        RegulationBased: string,
        Subject: string,
        Audit_Plan_No: string,
        NCR_nbr: string,
        Issued_date: Date,
        Responsible_Office: string,
        times_occurred: string,
        Audit_Type: string,
        Audit_scope: string,
        To_UIC: string,
        Attention: string,
        Required_condition_reff: string,
        Level_of_Finding: string,
        implementation_date: Date,
        Problem_Analysis: string,
        Answer_due_date: Date,
        Issue_IAN: string,
        IAN_nbr: string,
        Encountered_Condition: string,
        Audited_by: string,
        Audit_Date: Date,
        Acknowledge_by: string,
        Acknowledge_date: Date,
        Status: string,
        Remark: string,
        RCA_problem: string,
        Corrective_Action: string,
        Preventive_Action: string,
        Recommend_corrective_action: string,
        Identified_by_Auditee: string,
        Identified_Date: Date,
        Accept_by_Auditor: string,
        Auditor_Accept_date: Date,
        implementationReply_date: Date,
        Close_Corrective_Actions: string,
        Proposed_Close_Auditee: string,
        Proposed_Close_Date: Date,
        Implemented_close_date: Date,
        Is_close: string,
        effectiveness: string,
        Refer_to_Verify_Sheet: string,
        Sheet_No: string,
        New_NCR_Issue_nbr: string,
        Close_approved_by: string,
        Close_approved_date: Date,
        Verified_Chief_IM: string,
        Verified_Date: Date,
        followup_audit_result: string,
        evidence: string,
      }[]>(`http://localhost:3000/ncr-form?keyword=${keyword}`);
    }
    return this.http.get<{
      NCR_init_ID: number,
      status: string,
      ncrformStatus: string,
      RegulationBased: string,
      Subject: string,
      Audit_Plan_No: string,
      NCR_nbr: string,
      Issued_date: Date,
      Responsible_Office: string,
      times_occurred: string,
      Audit_Type: string,
      Audit_scope: string,
      To_UIC: string,
      Attention: string,
      Required_condition_reff: string,
      Level_of_Finding: string,
      implementation_date: Date,
      Problem_Analysis: string,
      Answer_due_date: Date,
      Issue_IAN: string,
      IAN_nbr: string,
      Encountered_Condition: string,
      Audited_by: string,
      Audit_Date: Date,
      Acknowledge_by: string,
      Acknowledge_date: Date,
      Status: string,
      Remark: string,
      RCA_problem: string,
      Corrective_Action: string,
      Preventive_Action: string,
      Recommend_corrective_action: string,
      Identified_by_Auditee: string,
      Identified_Date: Date,
      Accept_by_Auditor: string,
      Auditor_Accept_date: Date,
      implementationReply_date: Date,
      Close_Corrective_Actions: string,
      Proposed_Close_Auditee: string,
      Proposed_Close_Date: Date,
      Implemented_close_date: Date,
      Is_close: string,
      effectiveness: string,
      Refer_to_Verify_Sheet: string,
      Sheet_No: string,
      New_NCR_Issue_nbr: string,
      Close_approved_by: string,
      Close_approved_date: Date,
      Verified_Chief_IM: string,
      Verified_Date: Date,
      followup_audit_result: string,
      evidence: string,
    }[]>(`http://localhost:3000/ncr-form`);
  }

  createNcrForm(ncrForm: any) {
    return this.http.post(`http://localhost:3000/ncr-form`, ncrForm)

  }

  updateNcrForm(ncrForm: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/ncr-form/${ncrForm.NCR_init_ID}`, ncrForm);
  }


  deleteNcrForm(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/ncr-form/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting NCR Form', error);
        return throwError(() => new Error('Error deleting NCR Form: ' + (error.message || error)));
      })
    );
  }


  getNcrForm(NCR_init_ID: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/ncr-form/${NCR_init_ID}`);
  }

}
