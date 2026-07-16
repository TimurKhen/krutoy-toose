import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appClickReactionAnimation]',
})
export class ClickReactionAnimation {
  private el = inject(ElementRef).nativeElement as HTMLElement;

  private activeAnimation: Animation | null = null;

  private currentTiltX = 0;
  private currentTiltY = 0;

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent) {
    event.preventDefault();

    const rect = this.el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (event.clientX - centerX) / (rect.width / 2);
    const offsetY = (event.clientY - centerY) / (rect.height / 2);

    const percentChange = 15;
    const clickTiltX = -offsetY * percentChange;
    const clickTiltY = offsetX * percentChange;

    const currentScale = this.getCurrentScale();

    if (this.activeAnimation) {
      this.activeAnimation.cancel();
    }

    this.activeAnimation = this.el.animate(
      [
        {
          transform: `rotateX(${this.currentTiltX}deg) rotateY(${this.currentTiltY}deg) scale(${currentScale})`,
          offset: 0,
        },
        {
          transform: `rotateX(${clickTiltX + this.currentTiltX}deg) rotateY(${clickTiltY + this.currentTiltY}deg) scale(0.88)`,
          offset: 0.12,
        },
        {
          transform: `rotateX(${this.currentTiltX}deg) rotateY(${this.currentTiltY}deg) scale(1.04)`,
          offset: 0.55,
        },
        {
          transform: `rotateX(${this.currentTiltX}deg) rotateY(${this.currentTiltY}deg) scale(1)`,
          offset: 1,
        },
      ],
      {
        duration: 1200,
        easing: 'ease-out',
        fill: 'forwards',
      },
    );
  }

  private getCurrentScale(): number {
    const style = window.getComputedStyle(this.el);
    const transform = style.transform;
    if (transform === 'none' || !transform) return 1;

    const values = transform.split('(')[1].split(')')[0].split(',');
    const scale = parseFloat(values[0]);
    return isNaN(scale) ? 1 : scale;
  }
}
