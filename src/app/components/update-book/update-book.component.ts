import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from 'src/app/shared/interfaces/book';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-update-book',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent {
  bookService = inject(BookService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  book: Book;
  form = new FormGroup ({
    bookTitle: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    const bookId = this.route.snapshot.params['id'];
    this.bookService.getBookById(bookId).subscribe({
      next: (book) => {
        this.book = book;
        this.form.patchValue({ bookTitle: book.title });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching book:', error.message);
      }
    });
  }

  updateBook() {
    if (this.form.valid) {
      this.book.title = this.form.value.bookTitle;
      this.bookService.updateBook(this.book).subscribe({
        next: () => {
          this.router.navigate(['/book-table']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating book:', error.message);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/book-table']);
  }
}
