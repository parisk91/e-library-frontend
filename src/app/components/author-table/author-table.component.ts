import { Component, Input, OnInit, inject } from '@angular/core';
import { Author } from 'src/app/shared/interfaces/author';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorService } from 'src/app/shared/services/author.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-author-table',
    imports: [MatButtonModule, MatDividerModule, MatIconModule],
    templateUrl: './author-table.component.html',
    styleUrl: './author-table.component.css'
})
export class AuthorTableComponent {
  authorService = inject(AuthorService);
  authors: Author[] = [];
  router = inject(Router);

  @Input() author: Author | undefined;

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe({
      next: (authors) => {
        this.authors = authors;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching authors:', error.message);
      }
    });
  }

  deleteAuthor(author: Author) {
    this.authorService.deleteAuthor(author).subscribe({
      next: () => {
        this.author = this.author.filter(teacher => teacher !== teacher);
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting teacher:', error.message);
      }
    });
  }

  updateAuthor(author: Author) {
    this.router.navigate(['/update-author', author.id]);
  };
  
  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
   
  insertAuthor() {
    this.router.navigate(['insert-author']);
  }

  getBooks(author: Author) {
    this.router.navigate(['/author-books', author.id]);
  };

}
