import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { authGuard } from './shared/guards/auth.guard';
import { InsertUserComponent } from './components/insert-user/insert-user.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ListMenuComponent } from './components/list-menu/list-menu.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AuthorTableComponent } from './components/author-table/author-table.component';
import { BookTableComponent } from './components/book-table/book-table.component';
import { BookTableForUserComponent } from './components/book-table-for-user/book-table-for-user.component';
import { InsertAuthorComponent } from './components/insert-author/insert-author.component';
import { InsertBookComponent } from './components/insert-book/insert-book.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpdateAuthorComponent } from './components/update-author/update-author.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserAddBookComponent } from './components/user-add-book/user-add-book.component';
import { AuthorBooksComponent } from './components/author-books/author-books.component';
import { AuthorAddBookComponent } from './components/author-add-book/author-add-book.component';

export const routes: Routes = [
    { path: '', redirectTo:'/user-login', pathMatch:'full'},
    { path: 'user-login', component: UserLoginComponent},
    { path: 'user-registration', component: UserRegistrationComponent},
    { path: 'list-menu', component: ListMenuComponent},
    { path: 'navbar', component: NavbarComponent},
    { path: 'user-table', component: UserTableComponent},
    { path: 'author-table', component: AuthorTableComponent},
    { path: 'book-table', component: BookTableComponent},
    { path: 'book-table-for-user/:id', component: BookTableForUserComponent},
    { path: 'insert-user', component: InsertUserComponent},
    { path: 'insert-author', component: InsertAuthorComponent},
    { path: 'insert-book', component: InsertBookComponent},
    { path: 'update-author/:id', component: UpdateAuthorComponent},
    { path: 'update-book/:id', component: UpdateBookComponent},
    { path: 'update-user/:id', component: UpdateUserComponent},
    { path: 'update-user-profile:/id', component: UpdateUserComponent}, 
    { path: 'user-add-book/:id', component: UserAddBookComponent},
    { path: 'author-books/:id', component: AuthorBooksComponent},
    { path: 'author-add-book:/id', component: AuthorAddBookComponent},

    { path: 'admin-dashboard', component: AdminDashboardComponent, data:{expectedRole: 'ADMIN'}, canActivate: [authGuard]},
    { path: 'user-dashboard', component: UserDashboardComponent, data:{expectedRole: 'USER'}, canActivate: [authGuard]}
];
