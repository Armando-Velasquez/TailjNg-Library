import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'JLabel',
  standalone: true,
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
  imports: [NgClass]
})
export class JLabelComponent {
  @Input() for: string = '';
  @Input() isRequired: boolean = false;
  @Input() isConditioned: boolean = false;
  @Input() isAutomated: boolean = false;
  @Input() classes: string = '';
  @Input() ngClass: { [key: string]: boolean } = {};
}
