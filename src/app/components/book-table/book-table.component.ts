import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Book } from 'src/app/shared/interfaces/book';
import { BookService } from 'src/app/shared/services/book.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-book-table',
    standalone: true,
    imports: [MatButtonModule, MatDividerModule, MatIconModule],
    templateUrl: './book-table.component.html',
    styleUrl: './book-table.component.css'
})
export class BookTableComponent {
    bookService = inject(BookService);
    books: Book[] = [];
    router = inject(Router);
    userService = inject(UserService)

    @Input() book: Book | undefined;

    ngOnInit(): void {
        this.bookService.getBooks().subscribe({
        next: (books) => {
            this.books = books;
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

    updateBook(book: Book) {
        this.router.navigate(['/update-book', book.id]);
    };
    
    goBack() {
        if (this.userService.getRole() === "ADMIN") {
        this.router.navigate(['/admin-dashboard']);
        } else {
        this.router.navigate(['user-dashboard/']);
        }
    }
    
    insertBook() {
        this.router.navigate(['insert-book']);
    }
}
