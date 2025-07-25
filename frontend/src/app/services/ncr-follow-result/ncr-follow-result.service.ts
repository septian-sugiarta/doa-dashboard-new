import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NcrFollowResultService {

  constructor(private http: HttpClient) { }

  updateNcrFollowResultStatus(ncrId: number, status: string): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/ncr-follow-result/${ncrId}`, { ncrfollowresultStatus: status });
  }

  getNcrFollowResults(): Observable<{
    ncrId: number, ncrfollowresultStatus: string, Close_Corrective_Actions: string,
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
    return this.http.get<{
      ncrId: number, ncrfollowresultStatus: string,
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
    }[]>(`http://localhost:3000/ncr-follow-result`)
  }


  getNcrFollowResultByNcrId(ncrId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/ncr-follow-result?ncrId=${ncrId}`);
  }

  createNcrFollowResult(ncrFollowResult: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/ncr-follow-result`, ncrFollowResult);
  }


  updateNcrFollowResult(ncrFollowResult: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/ncr-follow-result/${ncrFollowResult.NCR_init_ID}`, ncrFollowResult
    )
  }

  deleteNcrFollowResult(id: number) {
    return this.http.delete(`http://localhost:3000/ncr-follow-result/${id}`)
  }

  getNcrFollowResult(NCR_init_ID: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/ncr-follow-result/${NCR_init_ID}`)
  }
}
