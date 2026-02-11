import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { CloudinaryService } from '../../servicesCloud/cloudinary.service';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent {
  form: FormGroup;
  firestore = inject(Firestore);
  private cloudinary = inject(CloudinaryService);

  successMessage = '';
  uploading = false;
  imageUrl: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      published: [true],
      imageUrl: ['']
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    // Preview local
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result;
    reader.readAsDataURL(file);

    this.uploading = true;

    this.cloudinary.uploadImage(file).subscribe({
      next: (res: any) => {
        console.log('Resposta Cloudinary:', res);
        if (res && res.secure_url) {
          this.imageUrl = res.secure_url;
          this.form.patchValue({ imageUrl: this.imageUrl });
        } else {
          console.warn('Resposta Cloudinary inesperada:', res);
        }
        this.uploading = false;
      },
      error: (err) => {
        console.error('Erro ao enviar imagem:', err);
        this.uploading = false;
      }
    });
  }

  async submitPost() {
    if (this.form.invalid) return;

    const post = {
      ...this.form.value,
      createdAt: serverTimestamp(),
      slug: this.generateSlug(this.form.value.title)
    };

    try {
      const postsRef = collection(this.firestore, 'posts');
      await addDoc(postsRef, post);
      this.successMessage = 'Post criado com sucesso!';
      this.form.reset({ published: true });
      this.previewUrl = null;
      this.imageUrl = '';
    } catch (err) {
      console.error('Erro ao criar post:', err);
      this.successMessage = 'Erro ao criar post.';
    }
  }

  generateSlug(title: string): string {
    return title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  }
}
