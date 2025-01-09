import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { authGuard } from './shared/guards/auth.guard';
import { InsertUserComponent } from './components/insert-user/insert-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ListMenuComponent } from './components/list-menu/list-menu.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AuthorTableComponent } from './components/author-table/author-table.component';
import { BookTableComponent } from './components/book-table/book-table.component';

export const routes: Routes = [
    {path: '', redirectTo:'/welcome', pathMatch:'full'},
    { path: 'welcome', component: WelcomeComponent},
    { path: 'user-login', component: UserLoginComponent},
    { path: 'user-registration', component: UserRegistrationComponent},
    { path: 'list-menu', component: ListMenuComponent},
    { path: 'user-table', component: UserTableComponent},
    { path: 'author-table', component: AuthorTableComponent},
    { path: 'book-table', component: BookTableComponent},
    { path: 'insert-user', component: InsertUserComponent},
    { path: 'update-user', component: UpdateUserComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent, data:{expectedRole: 'ADMIN'}, canActivate: [authGuard]},
    { path: 'user-dashboard', component: UserDashboardComponent, data:{expectedRole: 'USER'}, canActivate: [authGuard]}
];
