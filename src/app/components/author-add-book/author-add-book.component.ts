import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Author } from 'src/app/shared/interfaces/author';
import { Book } from 'src/app/shared/interfaces/book';
import { AuthorService } from 'src/app/shared/services/author.service';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-author-add-book',
  imports: [ReactiveFormsModule, MatButtonModule, MatSelectModule, FormsModule, RouterLink],
  templateUrl: './author-add-book.component.html',
  styleUrl: './author-add-book.component.css'
})
export class AuthorAddBookComponent {
  authorService = inject(AuthorService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  bookService = inject(BookService);
  author: Author;
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
        console.error('Error fetching courses:', error.message);
      }
    });
    const authorId = this.route.snapshot.params['id'];
    this.authorService.getAuthorById(authorId).subscribe({
      next: (author) => {
        this.author = author;
      },
      error: (error) => {
        console.error('Error fetching author:', error);
      }
    });
  }

  addBook() {
    if (this.form.valid) {
      const authorId = this.route.snapshot.params['id'];
      const bookToAdd = this.books.find(book => book.id === this.form.value.book);
      if (bookToAdd) {
        this.authorService.addBookToAuthor(authorId, bookToAdd.id).subscribe({
          next: () => {
            console.log('Book added successfully');
            this.router.navigate(['/author-books', this.author.id]); 
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
    this.router.navigate(['/teacher-courses', this.author.id]); 
  }

}
