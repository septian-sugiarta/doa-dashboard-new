import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuditPlanService {

  constructor() { }

  getAuditPlans() {
    return fetch('http://localhost:3000/audit-plan')
      .then(response => response.json())
      .then(data => data);
  }

  createAuditPlan(auditPlan: any) {
    return fetch('http://localhost:3000/audit-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(auditPlan)
    })
      .then(response => response.json())
      .then(data => data);
  }

  updateAuditPlan(auditPlan: any) {
    return fetch(`http://localhost:3000/audit-plan/${auditPlan.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(auditPlan)
    })
      .then(response => response.json())
      .then(data => data);
  }

  deleteAuditPlan(id: number) {
    return fetch(`http://localhost:3000/audit-plan/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => data);
  }

  getAuditPlan(id: number) {
    return fetch(`http://localhost:3000/audit-plan/${id}`)
      .then(response => response.json())
      .then(data => data);
  }

  getAPdetails(id: number, apdetails: any) {
    return fetch(`http://localhost:3000/audit-plan/${id}/apdetails`)
      .then(response => response.json())
      .then(data => data);
  }

  createAPdetail(id: number, apdetails: any) {
    return fetch(`http://localhost:3000/audit-plan/${id}/apdetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apdetails)
    })
      .then(response => response.json())
      .then(data => data);
  }

  updateAPdetail(id: number, apdetails: any) {
    return fetch(`http://localhost:3000/audit-plan/${id}/apdetails`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apdetails)
    })
      .then(response => response.json())
      .then(data => data);
  }

  deleteAPdetail(id: number, apdetails: any) {
    return fetch(`http://localhost:3000/audit-plan/${id}/apdetails`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => data);
  }

  getAPdetail(id: number, apdetails: any) {
    return fetch(`http://localhost:3000/audit-plan/${id}/apdetails`)
      .then(response => response.json())
      .then(data => data);
  }

  getIssuences(id: number, issuence: any) {
    return fetch(`http://localhost:3000/audit-plan/${id}/apdetails/${id}/issuence`)
      .then(response => response.json())
      .then(data => data)
  }

  createIssuence(id: number, issuence: any) {
    return fetch(`http://localhost:3000/audit-plan/${id}/apdetails/${id}/issuence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(issuence)
    })
      .then(response => response.json())
      .then(data => data)
  }

  updateIssuence(id: number, issuence: any) {
    return fetch(`http://localhost:3000/audit-plan/${id}/apdetails/${id}/issuence`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(issuence)
    })
      .then(response => response.json())
      .then(data => data)
  }

  deleteIssuence(id: number, issuence: any) {
    return fetch(`http://localhost:3000/audit-plan/${id}/apdetails/${id}/issuence`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => data)
  }

  getIssuence(id: number, issuence: any) {
    return fetch(`http://localhost:3000/audit-plan/${id}/apdetails/${id}/issuence`)
      .then(response => response.json())
      .then(data => data)
  }


}
