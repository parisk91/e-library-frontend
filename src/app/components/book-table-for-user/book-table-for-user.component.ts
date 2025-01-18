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

        this.userService.getUserWithBooksById(userId).subscribe({
            next: (user) => {
                this.user = user;
            },
            error: (error: HttpErrorResponse) => {
                console.error('Error fetching user:', error.message);
            }
            });

        this.userService.getUserWithBooksById(userId).subscribe({
        next: (user) => {
            this.books = user.books;
        },
        error: (error) => {
            console.log('Error fetching books:', error)
        }
        })
    }
  
    removeBook(book: Book) {
        const userId = this.route.snapshot.params['id'];
        this.userService.removeBookFromUser(userId,book.id).subscribe({
        next: () => {
            this.books = this.books.filter(book => book !== book);
            this.ngOnInit();
        },
        error: (error: HttpErrorResponse) => {
            console.error('Error removing book:', error.message);
        }
        });
    }
      
    goBack() {
        this.router.navigate([`/user-dashboard/${this.user.id}`]);
        }
      
    addBook(user: UserWithBooks) {
        this.router.navigate([`/user-add-book/${this.user.id}`]);
    }   
}


