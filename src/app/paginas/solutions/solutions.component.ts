import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { NewslatterComponent } from "../../newslatter/newslatter.component";

@Component({
  selector: 'app-solutions',
  imports: [HeaderComponent, FooterComponent, NewslatterComponent],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css'
})
export class SolutionsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('scrollContainer') container!: ElementRef;

  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;

  private autoScrollInterval: any;
  private autoScrollSpeed = 2; // px
  private autoScrollDelay = 5000; // 5s

  ngAfterViewInit() {
    const el = this.container.nativeElement;

    /* ===== DRAG COM MOUSE ===== */
    el.addEventListener('mousedown', (e: MouseEvent) => {
      this.isDown = true;
      this.stopAutoScroll();
      this.startX = e.pageX - el.offsetLeft;
      this.scrollLeft = el.scrollLeft;
    });

    el.addEventListener('mouseup', () => {
      this.isDown = false;
      this.startAutoScrollWithDelay();
    });

    el.addEventListener('mouseleave', () => {
      this.isDown = false;
    });

    el.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - this.startX) * 2;
      el.scrollLeft = this.scrollLeft - walk;
    });

    /* ===== TOUCH (mobile) ===== */
    el.addEventListener('touchstart', (e: TouchEvent) => {
      this.stopAutoScroll();
      this.startX = e.touches[0].pageX;
      this.scrollLeft = el.scrollLeft;
    });

    el.addEventListener('touchend', () => {
      this.startAutoScrollWithDelay();
    });

    el.addEventListener('touchmove', (e: TouchEvent) => {
      const x = e.touches[0].pageX;
      const walk = (x - this.startX) * 2;
      el.scrollLeft = this.scrollLeft - walk;
    });

    /* ===== INICIA AUTO SCROLL ===== */
    this.startAutoScrollWithDelay();
  }

  /* ===== AUTO SCROLL ===== */
  startAutoScrollWithDelay() {
    setTimeout(() => {
      this.startAutoScroll();
    }, this.autoScrollDelay);
  }

  startAutoScroll() {
    this.stopAutoScroll();

    const el = this.container.nativeElement;

    this.autoScrollInterval = setInterval(() => {
      el.scrollLeft += this.autoScrollSpeed;

      // quando chegar ao fim, volta ao início
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollLeft = 0;
      }
    }, 16); // ~60fps
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }
}