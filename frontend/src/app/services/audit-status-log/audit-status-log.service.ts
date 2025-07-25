import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditStatusLogService {

  constructor(private http: HttpClient) { }

  getAuditStatusLogs(keyword?: string): Observable<{
    auditStatusLog_id: number,
    regulation_based: string,
    doc_nbr: string,
    statusLog_date: Date,
    subject: string,
    reason_of_issuance: string,
    prepared_by: string,
    prepared_date: Date,
    checked_by: string,
    checked_date: Date,
  }[]> {
    if (keyword) {
      return this.http.get<{
        auditStatusLog_id: number,
        regulation_based: string,
        doc_nbr: string,
        statusLog_date: Date,
        subject: string,
        reason_of_issuance: string,
        prepared_by: string,
        prepared_date: Date,
        checked_by: string,
        checked_date: Date,
      }[]>(`http://localhost:3000/audit-status-log?keyword=${keyword}`);
    }
    return this.http.get<{
      auditStatusLog_id: number,
      regulation_based: string,
      doc_nbr: string,
      statusLog_date: Date,
      subject: string,
      reason_of_issuance: string,
      prepared_by: string,
      prepared_date: Date,
      checked_by: string,
      checked_date: Date,
    }[]>(`http://localhost:3000/audit-status-log`);
  }

  createAuditStatusLog(auditStatusLog: any) {
    return this.http.post(`http://localhost:3000/audit-status-log`, auditStatusLog)

  }

  updateAuditStatusLog(auditStatusLog: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/audit-status-log/${auditStatusLog.auditStatusLog_id}`, auditStatusLog);
  }


  deleteAuditStatusLog(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/audit-status-log/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting NCR Form', error);
        return throwError(() => new Error('Error deleting NCR Form: ' + (error.message || error)));
      })
    );
  }

  getAuditStatusLog(auditStatusLog_id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/audit-status-log/${auditStatusLog_id}`);
  }

}
