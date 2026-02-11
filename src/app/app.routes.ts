import { Routes } from '@angular/router';
import { EmpresasComponent } from './paginas/empresas/empresas.component';
import { PrincipalComponent } from './principal/principal.component';
import { SolutionsComponent } from './paginas/solutions/solutions.component';
import { BlogComponent } from './blog/blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';

export const routes: Routes = [
    {path: '', component: PrincipalComponent},
    {path: 'empresas', component: EmpresasComponent},
    {path: 'solutions', component: SolutionsComponent},
    {path: 'blog', component: BlogComponent},
    { path: 'blog/:slug', component: BlogPostComponent },
    { path: 'admin/blog', component: AdminBlogComponent },
    { path: '**', redirectTo: 'blog' }
];
