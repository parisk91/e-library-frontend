import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './book.service';
import { Author } from '../interfaces/author';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';

const API_URL = `${environment.apiURL}/authors/`;

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
    return this.http.get<Author[]>(`${API_URL}/authors/`, { headers });
  }

  getAuthorById(authorId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Author>(`${API_URL}teachers/${authorId}`, { headers });
  }

  addAuthor(author: Author) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<Author>(`${API_URL}authors/`, author, { headers });
  }

  updateAuthor(author: Author) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const authorId = author.id;
    return this.http.put<Author>(`${API_URL}/authors/${authorId}`, author, { headers });
  }

  deleteAuthor(author: Author) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const authorId = author.id
    return this.http.delete<Author>(`${API_URL}/authors/${authorId}`, { headers });
  }

  getBooks(authorId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Book[]>(`${API_URL}/books/authors/${authorId}`,  { headers });
  }

  /* addBook(authorId: number, bookId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const course = this.courseService.getCourseById(courseId);
    return this.http.put<Teacher>(`${API_URL}teachers/${teacherId}/courses/${courseId}`,course, { headers });
  }

  removeBook(studentId: number, courseId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.delete<Teacher>(`${API_URL}teachers/${studentId}/courses/${courseId}`,  { headers });
  } */

}
