import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NvsFormService {
  private baseUrl = 'http://localhost:3000/nvs-form';

  constructor(private http: HttpClient) {}

    // ✅ Ambil data NVS berdasarkan NCR ID (untuk edit)
  getNvsByNcrId(ncrId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ncrId}`);
  }

  // ✅ Simpan data NVS (buat atau update)
  saveNvsData(ncrId: number, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${ncrId}`, data);
  }
}