import { Component } from '@angular/core';
import { Ruler } from 'lucide-angular';
import { JModeToggleComponent, JTooltipModule, JLabelComponent, JInputComponent, JCheckboxComponent, JButtonComponent, JDialogComponent, JAlertToastComponent, JAlertDialogComponent, JAlertToastService, JAlertDialogService } from 'tailjng';

@Component({
  selector: 'app-root',
  imports: [JModeToggleComponent, JTooltipModule, JLabelComponent, JInputComponent, JCheckboxComponent, JButtonComponent, JDialogComponent, JAlertToastComponent, JAlertDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';

  icons = {
    ruler: Ruler
  }

  checked = false;

  isDialogOpen = false;

  constructor(
    private readonly alertToastService: JAlertToastService,
    private readonly alertDialogService: JAlertDialogService,
  ) { }


  openToast() {
    this.alertToastService.AlertToast({
      type: 'success',
      title: 'Titulo del toast',
      description: 'Descripcion del toast',
    })
  }

  openDialog() {
    this.alertDialogService.AlertDialog({
      type: 'success',
      title: 'Titulo del dialogo',
      description: 'Descripcion del dialogo',
      onConfirm: () => {
        console.log('Confirmado')
      }
    })
  }
}