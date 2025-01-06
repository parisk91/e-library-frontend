import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';

const API_URL = `${environment.apiURL}/books/`;

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
    return this.http.post<Book>(`${API_URL}books/`, book, { headers });
  }

  updateBook(book: Book) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = book.id;
    return this.http.put<Book>(`${API_URL}teachers/${id}`, book, { headers });
  }

  deleteBook(book: Book) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = book.id
    return this.http.delete<Book>(`${API_URL}books/${id}`, { headers });
  }

  getBookById(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Book>(`${API_URL}teachers/${id}`, { headers });
  }

  getBooks() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Book[]>(`${API_URL}teachers/`, { headers });
  }

}
