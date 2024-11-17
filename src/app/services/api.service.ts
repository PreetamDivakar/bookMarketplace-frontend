import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:5000'; // Replace with your base URL

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: string, body: any, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post<T>(url, body, options).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.put<T>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete<T>(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    // You can further enhance this method to handle specific types of errors
    console.error('API call error', error);
    return throwError(error);
  }
}
