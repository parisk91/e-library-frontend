import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Author } from 'src/app/shared/interfaces/author';
import { Book } from 'src/app/shared/interfaces/book';
import { AuthorService } from 'src/app/shared/services/author.service';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-insert-book',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatOptionModule],
  templateUrl: './insert-book.component.html',
  styleUrl: './insert-book.component.css'
})
export class InsertBookComponent {
  bookService = inject(BookService);
  router = inject(Router);
  book: Book;
  author: Author;
  authorService: AuthorService;
  authors: Author[];

  form = new FormGroup ({
    title: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    description: new FormControl(''),
    author: new FormControl(Validators.required)
  })

ngOnInit(): any { 
  this.authorService.getAuthors().subscribe({
    next: (authors) => {
      this.authors = authors;
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error fetching authors:', error.message);
    }
  }); 
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

  insertNewAuthor() {
    this.router.navigate(['/insert-author'])
  }

  goBack() {
    this.router.navigate(['../book-table']);
  }
}
