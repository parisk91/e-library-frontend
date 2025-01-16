import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Book } from 'src/app/shared/interfaces/book';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-insert-book',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './insert-book.component.html',
  styleUrl: './insert-book.component.css'
})
export class InsertBookComponent {
  bookService = inject(BookService);
  router = inject(Router);
  book: Book;

  form = new FormGroup ({
    title: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    description: new FormControl(''),
    author: new FormControl
  })

ngOnInit(): void {  
}

  insertBook() {
    if (this.form.valid) {
      const newBook: Book = {
        title: this.form.value.title,
        id: 0,
        author: this.form.value.author,
        quantity: Number(this.form.value.quantity),
        description: this.form.value.description

      };
      this.bookService.addBook(newBook).subscribe({
        next: () => {
          console.log('Book inserted successfully');
          this.router.navigate(['../book-table']); 
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error inserting course:', error.message);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['../book-table']);
  }
}
