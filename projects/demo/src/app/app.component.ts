import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SidebarService } from './services/layout/sidebar.service';
import { JAlertDialogComponent, JAlertToastComponent } from '../../../tailjng/src/public-api';
import { routesArray } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass, SidebarComponent, NavbarComponent, JAlertToastComponent, JAlertDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {

  // Titulos
  title = 'Libreria TailjNg';
  title_component = '';

  // Timer
  timeRemaining: number | null = null;

  // Sidebar
  sidebarHidden: boolean = true;
  routesArray: string[] = [];

  constructor(
    private readonly titleService: Title,
    private readonly sidebarService: SidebarService,
    private readonly router: Router,
  ) {
    // Suscribirse a eventos de cambio de navegación
    this.router.events.subscribe((event) => {
      this.updateTitle();
    });
  }



  ngOnInit(): void {
    // Rutas
    this.routesArray = routesArray;

    // Actualizar el título cuando se carga la página por primera vez
    this.updateTitle();

    // Obtener el valor de 'sidebar' del localStorage
    this.sidebarHidden = this.sidebarService.checkSidebarStorage();
  }

  // Cambiar estado del sidebar
  toggleSidebar() {
    this.sidebarHidden = this.sidebarService.toggleSidebar();
  }

  // Función para actualizar el título de la página
  updateTitle() {
    const path: string = window.location.pathname;
    let newPath: string;

    // Verificar si la ruta incluye "/sistema"
    const index = path.indexOf(`/`);

    if (index !== -1) {
      // Obtener la parte de la ruta después de "/sistema"
      newPath = path.substring(index + `/`.length);
    } else {
      // Si no hay "/sistema" en la ruta, simplemente usar la ruta completa
      newPath = path;
    }

    // Titulo de componente
    if (this.routesArray.includes(newPath)) {
      const parts: string[] = newPath.split('/');
      const lastPart: string = parts[parts.length - 1];
      const newTitle: string = this.formatTitle(lastPart) || 'Default Title';

      // Decorador de titulo de componente
      if (this.title_component !== newTitle) {

        let real_title;

        switch (newTitle) {
          case 'Matriculas':
            real_title = 'Matrículas';
            break;
          case 'Expedientes academicos':
            real_title = 'Expedientes académicos';
            break;
          case 'Nominas':
            real_title = 'Nóminas';
            break;
          case 'Validacion':
            real_title = 'Validación';
            break;
          case 'Configuracion':
            real_title = 'Configuración';
            break;
          case 'Gestion del sistema':
            real_title = 'Gestión del sistema';
            break;
          case 'Periodos':
            real_title = 'Períodos';
            break;
          case 'Prestamos':
            real_title = 'Préstamos';
            break;
          // Agrega más casos según sea necesario
          default:
            real_title = newTitle;
            break;
        }

        this.title_component = real_title;
        this.titleService.setTitle(this.title_component);
        document.documentElement.style.setProperty('--title-length', this.title_component.length.toString());
      }
    }
  }


  // Capitalizar la primera letra de una cadena y reemplazar guiones con espacios
  formatTitle(text: string): string {
    const titleWithoutDash = text.replace(/-/g, ' ');
    return this.capitalizeFirstLetter(titleWithoutDash);
  }

  // Convertir primera en mayuscula
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  // Redimencionar el contenido del contenedor
  ngAfterViewInit() {
    this.adjustViewsMinHeight();
    window.addEventListener('resize', () => this.adjustViewsMinHeight());

    // Cambiar nombre de dividers a -
    this.sidebarService.changeNameDividers(this.sidebarHidden);
  }

  adjustViewsMinHeight() {
    const viewsElement = document.querySelector('.views') as HTMLElement;
    if (viewsElement) {
      const windowHeight = window.innerHeight;
      const currentTop = viewsElement.getBoundingClientRect().top;
      const minHeight = Math.max(windowHeight - currentTop - 45, 0);
      viewsElement.style.minHeight = `${minHeight}px`;
    }
  }
}