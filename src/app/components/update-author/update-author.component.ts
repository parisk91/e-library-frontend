import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Author } from 'src/app/shared/interfaces/author';
import { AuthorService } from 'src/app/shared/services/author.service';

@Component({
  selector: 'app-update-author',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './update-author.component.html',
  styleUrl: './update-author.component.css'
})
export class UpdateAuthorComponent {
  authorService = inject(AuthorService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  author: Author;

  form = new FormGroup ({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    biography: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    const authorId = this.route.snapshot.params['id'];
    this.authorService.getAuthorById(authorId).subscribe({
      next: (author) => {
        this.author = author;
        this.form.patchValue({ firstname: author.firstname });
        this.form.patchValue({ lastname: author.lastname });
        this.form.patchValue({ biography: author.biography });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching author:', error.message);
      }
    });
  }

  updateAuthor() {
    if (this.form.valid) {

      this.author.firstname = this.form.value.firstname;
      this.author.lastname = this.form.value.lastname;
      this.author.biography = this.form.value.biography;
       
      this.authorService.updateAuthor(this.author).subscribe({
        next: () => {
            this.router.navigate(['/author-table']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating author:', error.message);
        }
      });
    }
  }

  goBack() {
      this.router.navigate(['/author-table']);
  }
}
