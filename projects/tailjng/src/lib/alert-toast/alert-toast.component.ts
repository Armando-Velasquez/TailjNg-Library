import { Component, computed, inject, Input } from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations";
import { NgClass } from '@angular/common';
import { CircleCheck, CircleHelp, CircleX, Info, Loader2, LucideAngularModule, TriangleAlert, X } from 'lucide-angular';
import { JButtonComponent } from '../button/button.component';
import { JAlertToastService } from './elements/alert-toast.service';
import { JColorsService } from '../colors/colors.service';

@Component({
  selector: 'JAlertToast',
  imports: [LucideAngularModule, NgClass, JButtonComponent],
  templateUrl: './alert-toast.component.html',
  styleUrl: './alert-toast.component.scss',
  animations: [
    trigger("toastTransition", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(10px)" }),
        animate("300ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
      ]),
      transition(":leave", [
        animate("150ms ease-in", style({ opacity: 0, transform: "translateY(10px)" }))
      ])
    ])
  ]
})
export class JAlertToastComponent {

  @Input() monocromatic: boolean = false;
  @Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'bottom-right';

  private readonly alertToastService = inject(JAlertToastService);

  constructor(private readonly colorsService: JColorsService) { }

  toasts = computed(() => this.alertToastService.toasts());

  icons: { [key: string]: any } = {
    success: CircleCheck,
    error: CircleX,
    warning: TriangleAlert,
    info: Info,
    question: CircleHelp,
    loading: Loader2,
    close: X,
  };

  getIcon(type: string) {
    return this.icons[type as keyof typeof this.icons] || this.icons['info'];
  }

  handleAction(toastId: string, action: "action" | "cancel") {
    this.alertToastService.executeToastAction(toastId, action);
  }

  closeToast(toastId: string) {
    this.alertToastService.closeToastById(toastId);
  }

  // Obtener la clase del toast
  getToastClass(type: string) {
    return this.colorsService.getAlertClass(type, this.monocromatic);
  }

  // Obtener la clase del icono
  getIconClass(type: string) {
    return this.colorsService.getIconClass(type, this.monocromatic);
  }

  // Obtener clase del boton
  getButtonClass(type: string): { [key: string]: boolean } {
    return this.colorsService.getButtonClass(type, this.monocromatic);
  }

  // Obtener la clase secundaria del botón
  getButtonSecondaryClass(type: string): { [key: string]: boolean } {
    return this.colorsService.getButtonSecondaryClass(type, this.monocromatic);
  }

  // Asignar posision del toast
  getPositionClass(): string {
    const base = 'fixed z-1000 flex flex-col gap-2 max-w-md';
    switch (this.position) {
      case 'top-left':
        return `${base} top-4 left-4`;
      case 'top-right':
        return `${base} top-20 right-4`;
      case 'bottom-left':
        return `${base} bottom-4 left-4`;
      case 'bottom-right':
      default:
        return `${base} bottom-4 right-4`;
    }
  }

}