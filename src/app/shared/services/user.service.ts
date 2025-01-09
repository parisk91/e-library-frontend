import { HttpClient, HttpHeaders } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Credentials, LoggedInUser, User } from '../interfaces/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BookService } from './book.service';

const API_URL = `${environment.apiURL}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  bookService: BookService = inject(BookService)

  user = signal<LoggedInUser | null>(null);

  constructor() { 
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      try {
        const decodedToken = jwtDecode<{ sub: string, role: string }>(access_token);
        this.user.set({
          username: decodedToken.sub,
          role: decodedToken.role,
        });

        this.redirectUser(decodedToken.role);
      } catch (error) {
        console.error('Token Decoding Error:', error);
        localStorage.removeItem('access_token');
      }
    }

    effect(() => {
      const currentUser = this.user();
      if (!currentUser) {
        console.log('No user logged in');
      } else {
        console.log('User logged in:', currentUser.username);
      }
    });
  }

  private redirectUser(role: string) {
    if (role === 'ADMIN') {
      this.router.navigate(['admin-dashboard']);
    } else if (role === 'USER') {
      this.router.navigate(['user-dashboard']);
    } else {
      this.router.navigate(['login']);
    }
  }

  loginUser(credentials: Credentials) {
    return this.http.post<{ access_token: string }>(`${API_URL}/authenticate/`, credentials);
  }

  logoutUser() {
    this.user.set(null);
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

  registerUser(user: User) {
    return this.http.post<{ access_token: string }>(`${API_URL}/signup/`, user);
  }

  addUser(user: User) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<User>(`${API_URL}/`, user, { headers });
  }

  addBookToUser(userId: number, bookId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const book = this.bookService.getBookById(bookId);
    return this.http.put<User>(`${API_URL}/users/${userId}/addBooks/${bookId}`, book, { headers });
  }

  removeBookFromUser(userId: number, bookId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const book = this.bookService.getBookById(bookId);
    return this.http.delete<User>(`${API_URL}/users/${userId}/removeBooks/${bookId}`);
  }

  updateUser(user: User) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = user.id;
    return this.http.put<User>(`${API_URL}/${id}`, user, { headers });
  }

  deleteUser(user: User) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = user.id
    return this.http.delete<User>(`${API_URL}/${id}`, { headers });
  }

  getUsers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<User[]>(`${API_URL}/users/`, { headers });
  }

  getUserById(userId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<User>(`${API_URL}/${userId}`, { headers });
  }

  getUserByUsername(username: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<User>(`${API_URL}/${username}`, { headers });
  }

  getUserByEmail(email: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<User>(`${API_URL}/${email}`, { headers });
  }

  getRole() {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode<{ sub: string, role: string }>(token);
        this.user.set({
          username: decodedToken.sub,
          role: decodedToken.role,
        });
      return this.user().role;
    }
    return false; 
  }

  getUsername() : string {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode<{ sub: string, role: string }>(token);
        this.user.set({
          username: decodedToken.sub,
          role: decodedToken.role,
        });
      return this.user().username;
    }
    return null; 
  }

  /* async getUserId(): Promise<number> {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode<{ sub: string, role: string }>(token);
      this.user.set({
        username: decodedToken.sub,
        role: decodedToken.role,
      });
      const username = this.user().username;
      try {
        const user = await this.getUserByUsername(username).toPromise();
        return user.id;
      } catch (error) {
        console.error('Error fetching user by username:', error);
        return null;
      }
    }
    return null;
 } */
}
