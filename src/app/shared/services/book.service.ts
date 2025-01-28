import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';

const API_URL = `${environment.apiURL}/books`;

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  constructor() {
   }

   addBook(book: Book) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<Book>(`${API_URL}`, book, { headers });
  }

  updateBook(book: Book) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = book.id;
    return this.http.put<Book>(`${API_URL}/${id}`, book, { headers });
  }

  deleteBook(book: Book) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = book.id
    return this.http.delete<{msg: string}>(`${API_URL}/${id}`, { headers });
  }

  getBooks() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Book[]>(`${API_URL}`, { headers });
  }

  getBookById(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Book>(`${API_URL}/${id}`, { headers });
  }

}
