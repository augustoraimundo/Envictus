import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  activeTab = 0;

  tabs = [
    {
      title: 'Envictus Lite',
      price: '15000.00 AOA',
      description: `Navegação diária - 10 mbps de download 
      / 5 mbps de upload,
      QoE baseline WIFI gerenciado, portal de utilizador`
    },
    {
      title: 'Envictus Plus',
      price: '25000.00 AOA',
      description: `Mais velocidade, melhor QoE e suporte prioritário`
    },
    {
      title: 'Envictus Ultra',
      price: '40000.00 AOA',
      description: `Alta performance para uso intensivo`
    },
    {
      title: 'Envictus Business Starter (PME)',
      price: '60000.00 AOA',
      description: `Solução ideal para pequenas empresas`
    },
    {
      title: 'Envictus Enterprise',
      price: 'Sob consulta',
      description: `Infraestrutura dedicada e personalizada`
    }
  ];

  setTab(index: number) {
    this.activeTab = index;
  }
}
