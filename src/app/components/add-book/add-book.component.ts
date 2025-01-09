import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Book } from 'src/app/shared/interfaces/book';
import { User } from 'src/app/shared/interfaces/user';
import { BookService } from 'src/app/shared/services/book.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  bookService = inject(BookService);
  user: User;
  books: Book[];

  form = new FormGroup ({
    book: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching books:', error.message);
      }
    });
    const userId = this.route.snapshot.params['id'];
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  addBook() {
    if (this.form.valid) {
      const userId = this.route.snapshot.params['id'];
      const bookToAdd = this.books.find(book => book.id === this.form.value.book);
      if (bookToAdd) {
        this.userService.addBookToUser(userId, bookToAdd.id).subscribe({
          next: () => {
            console.log('Book added successfully');
            this.router.navigate(['/book-courses']); 
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error adding book:', error.message);
          }
        });
      } else {
        console.error('Book not found:', this.form.value.book);
      }
    }
  }

  goBack() {
    this.router.navigate(['/book-courses', this.user.id]); 
  }

}
