import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, collectionData, query, where, limit } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-post.component.html',  // HTML separado
  styleUrls: ['./blog-post.component.css']   // CSS separado
})
export class BlogPostComponent implements OnInit {
  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);

  post: any;
  postNotFound = false;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.postNotFound = true;
      return;
    }

    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('published', '==', true), limit(50)); // pega todos publicados

   collectionData(q, { idField: 'id' }).subscribe((data: any[]) => {
  // Adiciona slug a cada post (gera se não existir)
  const postsWithSlug = data.map((p: any) => {
    let createdAt: any = null;
    if (p.createdAt) {
      // Se for Timestamp do Firestore, converte para Date
      createdAt = typeof p.createdAt.toDate === 'function' ? p.createdAt.toDate() : p.createdAt;
    }

    return {
      ...p,
      slug: p.slug ? p.slug : this.generateSlug(p.title),
      createdAt
    };
  });

  // Filtra pelo slug
  const found = postsWithSlug.find(p => p.slug === slug);
  if (found) {
    this.post = found;
  } else {
    this.postNotFound = true;
  }
});

  }

  // Função para gerar slug a partir do título
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
}
