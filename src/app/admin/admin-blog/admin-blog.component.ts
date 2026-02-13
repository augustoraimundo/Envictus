import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from '@angular/fire/firestore';
import { CloudinaryService } from '../../servicesCloud/cloudinary.service';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent implements OnInit {

  private firestore = inject(Firestore);
  private fb = inject(FormBuilder);
  private cloudinary = inject(CloudinaryService);

  form: FormGroup;
  posts: any[] = [];

  editingPostId: string | null = null;
  uploading = false;

  imageUrl = '';
  previewUrl: string | null = null;

  constructor() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      published: [true],
      imageUrl: ['']
    });
  }

  ngOnInit() {
    const ref = collection(this.firestore, 'posts');
    collectionData(ref, { idField: 'id' }).subscribe(data => {
      this.posts = data;
    });
  }

  // 📷 UPLOAD
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.uploading = true;

    // preview
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result as string;
    reader.readAsDataURL(file);

    this.cloudinary.uploadImage(file).subscribe({
      next: res => {
        this.imageUrl = res.secure_url;
        this.form.patchValue({ imageUrl: this.imageUrl });
        this.uploading = false;
      },
      error: err => {
        console.error('Erro upload:', err);
        this.uploading = false;
      }
    });
  }

  // 💾 SALVAR
  async submit() {
    if (this.form.invalid || this.uploading) return;

    const data = {
      ...this.form.value,
      slug: this.generateSlug(this.form.value.title)
    };

    if (this.editingPostId) {
      await updateDoc(
        doc(this.firestore, 'posts', this.editingPostId),
        data
      );
    } else {
      await addDoc(collection(this.firestore, 'posts'), {
        ...data,
        createdAt: serverTimestamp()
      });
    }

    this.resetForm();
  }

  editPost(post: any) {
    this.editingPostId = post.id;
    this.form.patchValue(post);
    this.previewUrl = post.imageUrl || null;
    this.imageUrl = post.imageUrl || '';
  }

  async deletePost(id: string) {
    if (!confirm('Remover post?')) return;
    await deleteDoc(doc(this.firestore, 'posts', id));
  }

  resetForm() {
    this.form.reset({ published: true });
    this.editingPostId = null;
    this.previewUrl = null;
    this.imageUrl = '';
  }

  generateSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
}
