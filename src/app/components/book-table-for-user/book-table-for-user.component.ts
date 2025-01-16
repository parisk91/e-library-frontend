import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from 'src/app/shared/interfaces/book';
import { UserWithBooks } from 'src/app/shared/interfaces/user';
import { BookService } from 'src/app/shared/services/book.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-book-table-for-user',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './book-table-for-user.component.html',
  styleUrl: './book-table-for-user.component.css'
})
export class BookTableForUserComponent {
  bookService = inject(BookService);
      books: Book[];
      user: UserWithBooks;
      router = inject(Router);
      route = inject(ActivatedRoute);
      userService = inject(UserService)
  
      @Input() book: Book | undefined;
  
      ngOnInit(): void {
          const userId = this.route.snapshot.params['id'];

          const user = this.userService.getUserWithBooksById(userId)

          this.userService.getUserWithBooksById(userId).subscribe({
          next: (books) => {
              this.books = this.user.books;
          },
          error: (error: HttpErrorResponse) => {
              console.error('Error fetching books:', error.message);
          }
          });
      }
  
      deleteBook(book: Book) {
          this.bookService.deleteBook(book).subscribe({
          next: () => {
              this.books = this.books.filter(book => book.id !== book.id);
              this.ngOnInit();
          },
          error: (error: HttpErrorResponse) => {
              console.error('Error deleting book:', error.message);
          }
          });
      }
      
      goBack() {
          this.router.navigate(['/user-dashboard']);
          }
      
      addBook() {
          this.router.navigate(['user-add-book']);
      }   
}


