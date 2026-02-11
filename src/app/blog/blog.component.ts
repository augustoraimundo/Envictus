import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, query, where, orderBy } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet} from '@angular/router'

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  private firestore = inject(Firestore);
  posts: any[] = [];

  ngOnInit() {
    const postsRef = collection(this.firestore, 'posts');

    const q = query(
      postsRef,
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    );

    collectionData(q, { idField: 'id' }).subscribe(data => {
      this.posts = data.map(post => ({
        ...post,
        // Converte createdAt se for Timestamp
        createdAt: post['createdAt']?.toDate ? post['createdAt'].toDate() : post['createdAt'],
        // Gera slug se não existir
        slug: post['slug'] ? post['slug'] : post['title'] ? this.generateSlug(post['title']) : 'post-sem-titulo'
      }));

      console.log('POSTS COM SLUG:', this.posts);
    });
  }

  // Função para gerar slug
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')  // remove caracteres especiais
      .replace(/\s+/g, '-');     // troca espaços por -
  }
}