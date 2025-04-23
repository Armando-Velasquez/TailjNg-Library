import { Component } from '@angular/core';
import { Ruler } from 'lucide-angular';
import { JModeToggleComponent, JTooltipModule, JLabelComponent, JInputComponent, JButtonComponent } from 'tailjng';

@Component({
  selector: 'app-root',
  imports: [JModeToggleComponent, JTooltipModule, JLabelComponent, JInputComponent, JButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';

  icons = {
    ruler: Ruler
  }
}