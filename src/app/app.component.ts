import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component'
// import { MainComponent } from './main/main.component'
// import { AboutComponent } from './services/about.component'
// import { SobreComponent } from './sobre/sobre.component'
// import { SolucoesComponent } from './solucoes/solucoes.component'
// import { ParceirosComponent } from './parceiros/parceiros.component'
// import { NewslatterComponent } from './newslatter/newslatter.component'
import { FooterComponent } from './footer/footer.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
  FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'envictus-main';
}
