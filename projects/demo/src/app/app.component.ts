import { Component } from '@angular/core';
import { Ruler } from 'lucide-angular';
import { JModeToggleComponent, JTooltipModule, JLabelComponent, JInputComponent, JCheckboxComponent, JButtonComponent, JDialogComponent } from 'tailjng';

@Component({
  selector: 'app-root',
  imports: [JModeToggleComponent, JTooltipModule, JLabelComponent, JInputComponent, JCheckboxComponent, JButtonComponent, JDialogComponent],
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
  
}