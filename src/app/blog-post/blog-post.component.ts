import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);

  post: any = null;
  loading = true;

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) return;

    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('slug', '==', slug));

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      this.post = {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data()['createdAt']?.toDate
          ? doc.data()['createdAt'].toDate()
          : doc.data()['createdAt']
      };
    }

    this.loading = false;
  }
}
