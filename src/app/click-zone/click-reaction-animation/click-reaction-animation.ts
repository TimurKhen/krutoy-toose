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
  private currentScale = 1;

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

    if (this.activeAnimation) {
      // Approximate current scale to avoid visual snapping if animation is interrupted mid-way
      const currentTime = this.activeAnimation.currentTime as number;
      if (currentTime !== null) {
        const progress = currentTime / 1200;
        if (progress < 0.12) {
          // Initial to 0.88
          this.currentScale = this.currentScale + (0.88 - this.currentScale) * (progress / 0.12);
        } else if (progress < 0.55) {
          // 0.88 to 1.04
          this.currentScale = 0.88 + (1.04 - 0.88) * ((progress - 0.12) / 0.43);
        } else if (progress < 1) {
          // 1.04 to 1
          this.currentScale = 1.04 + (1 - 1.04) * ((progress - 0.55) / 0.45);
        } else {
          this.currentScale = 1;
        }
      }
      this.activeAnimation.cancel();
    }

    const currentScale = this.currentScale;

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
}
