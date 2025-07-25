import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NcrReplyService {

  constructor(private http: HttpClient) { }

  updateNcrReplyStatus(ncrId: number, status: string): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/ncr-reply/${ncrId}`, { ncrreplyStatus: status });
  }

  replyToNcrForm(NCR_init_ID: number, formData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/ncr-reply/${NCR_init_ID}`, formData);
  }

  getNcrReplies(): Observable<{
    ncrId: number, ncrreplyStatus: string,
    RCA_problem: string,
    Corrective_Action: string,
    Preventive_Action: string,
    Recommend_corrective_action: string,
    Identified_by_Auditee: string,
    Identified_Date: Date,
    Accept_by_Auditor: string,
    Auditor_Accept_date: Date,
    implementationReply_date: Date,
  }[]> {
    return this.http.get<{
      ncrId: number, ncrreplyStatus: string,
      RCA_problem: string,
      Corrective_Action: string,
      Preventive_Action: string,
      Recommend_corrective_action: string,
      Identified_by_Auditee: string,
      Identified_Date: Date,
      Accept_by_Auditor: string,
      Auditor_Accept_date: Date,
      implementationReply_date: Date,
    }[]>(`http://localhost:3000/ncr-reply`)
  }

  getNcrReplyByNcrId(ncrId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/ncr-reply?ncrId=${ncrId}`);
  }

  createNcrReply(ncrReply: any) {
    return this.http.post(`http://localhost:3000/ncr-reply`, ncrReply)
  }

  updateNcrReply(ncrReply: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/ncr-reply/${ncrReply.NCR_init_ID}`, ncrReply)
  }

  deleteNcrReply(id: number) {
    return this.http.delete(`http://localhost:3000/ncr-reply/${id}`)
  }

  getNcrReply(NCR_init_ID: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/ncr-reply/${NCR_init_ID}`)
  }
}
