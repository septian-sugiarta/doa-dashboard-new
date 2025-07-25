import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionLogService {

  constructor(private http: HttpClient) { }

  getActionLogs(keyword?: string): Observable<{
    actionLog_id: number,
    regulation_based: string,
    action_nbr: string,
    reference_PACLR_nbr: string,
    issued_date: Date,
    action_description: string,
    audit_area: string,
    status: string,
    implementationAction_date: Date,
    evidence: string,
    close_date: Date,
  }[]> {
    if (keyword) {
      return this.http.get<{
        actionLog_id: number,
        regulation_based: string,
        action_nbr: string,
        reference_PACLR_nbr: string,
        issued_date: Date,
        action_description: string,
        audit_area: string,
        status: string,
        implementationAction_date: Date,
        evidence: string,
        close_date: Date,
      }[]>(`http://localhost:3000/action-log?keyword=${keyword}`);
    }
    return this.http.get<{
      actionLog_id: number,
      regulation_based: string,
      action_nbr: string,
      reference_PACLR_nbr: string,
      issued_date: Date,
      action_description: string,
      audit_area: string,
      status: string,
      implementationAction_date: Date,
      evidence: string,
      close_date: Date,
    }[]>(`http://localhost:3000/action-log`);
  }

  createActionLog(actionLog: any) {
    return this.http.post(`http://localhost:3000/action-log`, actionLog)

  }

  updateActionLog(actionLog: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/action-log/${actionLog.actionLog_id}`, actionLog);
  }

  deleteActionLog(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/action-log/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting NCR Form', error);
        return throwError(() => new Error('Error deleting NCR Form: ' + (error.message || error)));
      })
    );
  }

  getActionLog(actionLog_id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/action-log/${actionLog_id}`);
  }
}
