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
    standalone: true,
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

  deleteAuthor(authorId: number) {
    this.authorService.deleteAuthor(authorId).subscribe({
      next: () => {
        this.authors = this.authors.filter(author => author !== author);
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting author:', error.message);
      }
    });
  }

  updateAuthor(author: Author) {
    this.router.navigate(['/update-author', author.id]);
  };
   
  insertAuthor() {
    this.router.navigate(['insert-author']);
  }

  getBooks(author: Author) {
    this.router.navigate(['/author-books', author.id]);
  };

  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }

}
