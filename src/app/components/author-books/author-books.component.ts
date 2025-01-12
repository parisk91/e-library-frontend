import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Author } from 'src/app/shared/interfaces/author';
import { Book } from 'src/app/shared/interfaces/book';
import { AuthorService } from 'src/app/shared/services/author.service';
import { BookService } from 'src/app/shared/services/book.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-author-books',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, RouterLink],
  templateUrl: './author-books.component.html',
  styleUrl: './author-books.component.css'
})
export class AuthorBooksComponent {
  authorService = inject(AuthorService);
  bookService = inject(BookService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  books: Book[];
  author: Author

  @Input() book: Book | undefined;

  ngOnInit(): void {
    const authorId = this.route.snapshot.params['id'];
    this.authorService.getBooksByAuthorId(authorId).subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching courses:', error.message);
      }
    });
    this.authorService.getAuthorById(authorId).subscribe({
      next: (author) => {
        this.author = author;
      },
      error: (error) => {
        console.error('Error fetching teacher:', error);
      }
    });
  }

  removeBook(book: Book) {
    const authorId = this.route.snapshot.params['id'];
    this.authorService.removeBookFromAuthor(authorId, book.id).subscribe({
      next: () => {
        this.books = this.books.filter(book => book !== book);
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting book:', error.message);
      }
    });
  }

  addBook(author: Author) {
    this.router.navigate(['/author-add-book/', author.id])
  }

  goBack() {
    this.router.navigate(['/author-table']);
  }
}
