import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NgClass, AsyncPipe } from '@angular/common';
import { MenuProfileComponent } from '../menu-profile/menu-profile.component';
import { ChartNoAxesGantt, ChevronsUp, LucideAngularModule, Menu, User } from 'lucide-angular';
import { ModeToggleComponent } from '../../mode-toggle/mode-toggle.component';
import { MenuService } from '../../../services/layout/menu-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [LucideAngularModule, ModeToggleComponent, NgClass, MenuProfileComponent, AsyncPipe]
})
export class NavbarComponent implements OnInit {

  icons = {
    user: User,
    menu: Menu,
    chartNoAxesGrantt: ChartNoAxesGantt,
    chevronUp: ChevronsUp,
  }

  // Sidebar y rutas
  @Input() sidebarHidden!: boolean;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() routes!: string[];

  // Notificaciones
  countNotifications: number = 9;

  // Botones flotantes
  controlData: any[] = [];

  chat_whatsapp: any;
  isCheckedChatWhatsapp: boolean = false;
  chatbot: any;
  isCheckedChatBot: boolean = false;
  chat_general: any;
  isCheckedChatGeneral: boolean = false;

  // Button top
  showScrollButton: boolean = false;

  constructor(
    public menuService: MenuService,
  ) {  }

  ngOnInit(): void {
     // Detectar el scroll y mostrar/ocultar el botón
    window.addEventListener('scroll', () => {
      this.showScrollButton = window.scrollY > 100;
      this.toggleButtonOpacity(); // Controlar la opacidad del botón top
    });
  }

  //===================================================================
  // Sidebar
  //===================================================================
  triggerToggleSidebar() {
    this.toggleSidebar.emit();
  }

  //===================================================================
  // Menu perfil
  //===================================================================

  // Mostrar / Ocultar menu de perfil
  toggleMenuProfile() {
    this.menuService.toggleMenuProfile();
  }

  //===================================================================
  // Boton top
  //===================================================================

  // Función para volver hacia arriba
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Transición de boton top
  toggleButtonOpacity() {
    const button = document.getElementById('btn_top');
    if (button) {
      if (this.showScrollButton) {
        button.classList.add('opacity-100');
        button.classList.remove('opacity-0');
      } else {
        button.classList.add('opacity-0');
        button.classList.remove('opacity-100');
      }
    }
  }

  //===================================================================
  // Otros
  //===================================================================

  // Evento para ocultar el menu perfil / Notificaciones
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    // Verificar si se hace clic fuera del menú de perfil
    if (this.menuService.showMenuProfile$ && !(target.closest('.profile-icon') || target.closest('app-menu-profile'))) {
      this.menuService.closeMenuProfile();
    }
  }
}
