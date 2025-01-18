import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Author } from 'src/app/shared/interfaces/author';
import { Book } from 'src/app/shared/interfaces/book';
import { AuthorService } from 'src/app/shared/services/author.service';

@Component({
  selector: 'app-insert-author',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './insert-author.component.html',
  styleUrl: './insert-author.component.css'
})
export class InsertAuthorComponent {
  authorService = inject(AuthorService);
  router = inject(Router);
  author: Author;
  book: Book;

  form = new FormGroup ({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    biography: new FormControl('', Validators.required),
  })

ngOnInit(): void {
  };

  insertAuthor() {
    if (this.form.valid) {
      const newAuthor: Author = {
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        biography: this.form.value.biography,
        id: 0,
        books: []
      };
      
      this.authorService.addAuthor(newAuthor).subscribe({
        next: () => {
          console.log('Author inserted successfully');
          this.router.navigate(['/author-table']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error inserting author:', error.message);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/author-table']);
  }
}
