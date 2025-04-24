import { Component } from '@angular/core';
import { JThemeComponent } from '../../../../../tailjng/src/public-api';
import { JCodeBlockComponent } from '../../../../../tailjng/src/lib/components/code-block/code-block.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JThemeComponent, JCodeBlockComponent],
  templateUrl: './theming.component.html',
})
export class ThemingComponent {


}