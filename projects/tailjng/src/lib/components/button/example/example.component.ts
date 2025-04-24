import { Component } from '@angular/core';
import { Cpu, LucideAngularModule } from 'lucide-angular';
import { JButtonComponent } from '../button.component';

@Component({
  selector: 'app-button-example',
  imports: [LucideAngularModule, JButtonComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ButtonExampleComponent {
  icon = Cpu;
}
