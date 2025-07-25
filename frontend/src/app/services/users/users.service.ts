import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<{ id_number: number; name: string; unit: string; role: string; email: string; username: string; password: string }[]> {
    return this.http.get<{ id_number: number; name: string; unit: string; role: string; email: string; username: string; password: string }[]>('http://localhost:3000/users');
  }


  createUser(user: any) {
    return this.http.post(`http://localhost:3000/users`, user)
  }

  changePassword(user: { email: string, old_password: string, new_password: string }): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/users/change-password/${user.email}`, user);
  }


  validateOldPassword(data: { email: string, old_password: string }): Observable<{ isValid: boolean }> {
    return this.http.post<{ isValid: boolean }>(
      `http://localhost:3000/users/validate-old-password/${data.email}`,
      { password: data.old_password }
    );
  }



  deleteUser(email: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:3000/users/delete`, { email, password }).pipe(
      catchError(error => {
        console.error('Error deleting user', error);
        return throwError(() => new Error('Error deleting user: ' + (error.message || error)));
      })
    );
  }

  getUser(id: number): Observable<{ id_number: number; name: string; unit: string; role: string; username: string; password: string }> {
    return this.http.get<{ id_number: number; name: string; unit: string; role: string; username: string; password: string }>(`http://localhost:3000/users/${id}`);
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/auth/me');
  }
}
