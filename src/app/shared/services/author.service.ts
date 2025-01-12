import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './book.service';
import { Author } from '../interfaces/author';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';

const API_URL = `${environment.apiURL}/authors`;

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router)
  bookService = inject(BookService);

  constructor() { }

  getAuthors() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Author[]>(`${API_URL}`, { headers });
  }

  getAuthorById(authorId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Author>(`${API_URL}/${authorId}`, { headers });
  }

  getAuthorByLastname(lastname: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Author>(`${API_URL}/${lastname}`, { headers });
  }

  addAuthor(author: Author) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<Author>(`${API_URL}`, author, { headers });
  }

  updateAuthor(author: Author) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const authorId = author.id;
    return this.http.put<Author>(`${API_URL}/${authorId}`, author, { headers });
  }

  deleteAuthor(authorId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.delete<Author>(`${API_URL}/${authorId}`, { headers });
  }

  addBookToAuthor(authorId: number, bookId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const book = this.bookService.getBookById(bookId);
    return this.http.put<Author>(`${API_URL}/${authorId}/books/${bookId}`, book, { headers });
  }

  removeBookFromAuthor(authorId: number, bookId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.delete<Author>(`${API_URL}/${authorId}/books/${bookId}`,  { headers });
  }

  getBooksByAuthorId(authorId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Book[]>(`${environment.apiURL}/books/authors/${authorId}`, { headers });
  }
}
