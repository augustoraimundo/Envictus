import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NewslatterComponent } from "../newslatter/newslatter.component";
import { ParceirosComponent } from "../parceiros/parceiros.component";
import { SolucoesComponent } from "../solucoes/solucoes.component";
import { SobreComponent } from "../sobre/sobre.component";
import { AboutComponent } from "../services/about.component";
import { MainComponent } from "../main/main.component";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-principal',
  imports: [
    NewslatterComponent,
    ParceirosComponent,
    SolucoesComponent,
    SobreComponent,
    AboutComponent,
    MainComponent,
    ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

}
