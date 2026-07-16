import { Directive, DOCUMENT, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClickEffect]',
})
export class ClickEffect {
  private readonly animationDuration = 1000;
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent) {
    const x = event.clientX;
    const y = event.clientY;

    this.createEffect(x, y);
  }

  createEffect(x: number, y: number) {
    const reaction = Math.floor(Math.random() * 3) + 1;

    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', `images/image-${reaction}.png`);

    const min = -45;
    const max = min * -1;
    const rotation = Math.floor(Math.random() * (max - min + 1)) + min;

    this.renderer.setStyle(img, 'position', 'fixed');
    this.renderer.setStyle(img, 'left', `${x}px`);
    this.renderer.setStyle(img, 'top', `${y}px`);

    this.renderer.setStyle(img, 'transform', 'translate(-50%, -50%)');
    this.renderer.setStyle(img, 'rotate', rotation + 'deg');
    this.renderer.setStyle(img, 'width', '28px');
    this.renderer.setStyle(img, 'height', '28px');
    this.renderer.setStyle(img, 'opacity', '1');
    this.renderer.setStyle(img, 'pointer-events', 'none');
    this.renderer.setStyle(img, 'z-index', '9999');

    this.renderer.setStyle(img, 'transition', `all ${this.animationDuration}ms ease-out`);

    this.renderer.appendChild(this.document.body, img);

    setTimeout(() => {
      this.renderer.setStyle(img, 'top', `${y - 100}px`);
      this.renderer.setStyle(img, 'opacity', '0');
    }, 50);

    setTimeout(() => {
      this.renderer.removeChild(this.document.body, img);
    }, this.animationDuration + 10);
  }
}
