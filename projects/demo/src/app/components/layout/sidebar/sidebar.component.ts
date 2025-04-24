import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';
import { Banknote, ChevronDown, CircleDollarSign, ClipboardPen, FileBadge, Home, LucideAngularModule, NotebookTabs, Package, Palette, ScrollText, Settings, ShieldCheck, ShoppingCart, Smartphone, SquareLibrary, TableProperties, UserRoundPlus, UsersRound, Wallet, Component as Compoennts, Heart, SmilePlus, CircleHelp, AlertTriangle, BellRing, Square, CheckSquare, MessageSquare, Type, Tag, ListChecks, Info, RectangleHorizontal, Filter, FileText, ChevronsRight, Table, Radio, HelpCircle } from 'lucide-angular';
import { JTooltipModule } from '../../../../../../tailjng/src/public-api';

export interface MenuDivider {
  divider: string;
  icon?: never;
  name?: never;
  route?: never;
  denyRole?: never;
  elements?: never;
}

export interface SubMenuItem {
  icon: any;
  name: string;
  route: string;
  denyRole?: number[];
}

export interface MenuItem {
  icon: any;
  name: string;
  route?: string;
  denyRole?: number[];
  elements?: SubMenuItem[];
  divider?: never;
}

export type MenuEntry = MenuItem | MenuDivider;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [LucideAngularModule, NgClass, RouterLink, RouterLinkActive, JTooltipModule],
  animations: [
    trigger('slideToggle', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*'
      })),
      transition('collapsed <=> expanded', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  icons = {
    chevronDown: ChevronDown,
    home: Home,
    package: Package,
    settings: Settings,
    palette: Palette,
    component: Compoennts,
    heart: Heart,
    smilePlus: SmilePlus,
    notebookTabs: NotebookTabs,
    circleHelp: CircleHelp,
    
    alertDialog: AlertTriangle,
    alertToast: BellRing,
    button: Square,
    checkbox: CheckSquare,
    dialog: MessageSquare,
    input: Type,
    label: Tag,
    select: ListChecks,
    toggleRadio: Radio,
    tooltip: HelpCircle,
    card: RectangleHorizontal,
    filter: Filter,
    form: FileText,
    paginator: ChevronsRight,
    table: Table,
  }

  @Input() title!: string;
  @Input() sidebarHidden!: boolean;
  @Input() routes!: string[];

  // Elementos de lista
  elementList: { [key: string]: boolean } = {};
  menuList: MenuEntry[] = [];

  constructor(
    private readonly cookieService: CookieService
  ) { }

  ngOnInit(): void {
    // Inicializar la lista de elementos
    this.initList();

    // Cargar estado de las secciones desde las cookies
    const savedElementList = this.cookieService.get('elementList');
    if (savedElementList) {
      this.elementList = JSON.parse(savedElementList);
    }
  }

  // ====================================================================
  // Lista de elementos
  // ====================================================================
  initList(): void {
    this.menuList = [
      {
        icon: this.icons.home,
        name: 'Getting Started',
        elements: [
          {
            icon: this.icons.package,
            name: 'Installation',
            route: this.routes[100],

          },
          {
            icon: this.icons.settings,
            name: 'Configuration',
            route: this.routes[100],
          }
        ],
      },
      {
        icon: this.icons.palette,
        name: 'Theming',
        route: this.routes[3],
      },
      {
        icon: this.icons.component,
        name: 'Components',
        elements: [
          {
            icon: this.icons.alertDialog,
            name: 'Alert dialog',
            route: this.routes[100],

          },
          {
            icon: this.icons.alertToast,
            name: 'Alert toast',
            route: this.routes[100],
          },
          {
            icon: this.icons.button,
            name: 'Button',
            route: this.routes[100],
          },
          {
            icon: this.icons.checkbox,
            name: 'Checkbox',
            route: this.routes[100],
          },
          {
            icon: this.icons.dialog,
            name: 'Dialog',
            route: this.routes[100],
          },
          {
            icon: this.icons.input,
            name: 'Input',
            route: this.routes[100],
          },
          {
            icon: this.icons.label,
            name: 'Label',
            route: this.routes[100],
          },
          {
            icon: this.icons.select,
            name: 'Select',
            route: this.routes[100],
          },
          {
            icon: this.icons.toggleRadio,
            name: 'Toggle radio',
            route: this.routes[100],
          },
          {
            icon: this.icons.tooltip,
            name: 'Tooltip',
            route: this.routes[100],
          },
          {
            icon: this.icons.card,
            name: 'Card',
            route: this.routes[100],
          },
          {
            icon: this.icons.filter,
            name: 'Filter',
            route: this.routes[100],
          },
          {
            icon: this.icons.form,
            name: 'Form',
            route: this.routes[100],
          },
          {
            icon: this.icons.paginator,
            name: 'Paginator',
            route: this.routes[100],
          },
          {
            icon: this.icons.table,
            name: 'Table',
            route: this.routes[100],
          },
        ],
      },
      {
        icon: this.icons.heart,
        name: 'Tailwind CSS',
        route: this.routes[100],
      },
      {
        icon: this.icons.smilePlus,
        name: 'Icons',
        route: this.routes[100],
      },
      {
        icon: this.icons.notebookTabs,
        name: 'Guides',
        route: this.routes[100],
      },
      {
        icon: this.icons.circleHelp,
        name: 'Support',
        route: this.routes[100],
      },
    ]
  }

  // ====================================================================
  // Funciones para elementos en lista
  // ====================================================================
  toggleSection(sectionKey: string): void {
    this.elementList[sectionKey] = !this.elementList[sectionKey];
    this.saveElementListToCookies();
  }

  isSectionVisible(sectionKey: string): boolean {
    return !!this.elementList[sectionKey];
  }

  // Guardar el estado de elementList en cookies
  private saveElementListToCookies(): void {
    this.cookieService.set('elementList', JSON.stringify(this.elementList));
  }

  // ====================================================================
  // Mostrar seccion de autors
  // ====================================================================
  get opacityClass(): string {
    return this.sidebarHidden ? 'opacity-0 transition-[opacity] duration-100' : 'opacity-100 transition-[opacity] duration-1000';
  }
}
