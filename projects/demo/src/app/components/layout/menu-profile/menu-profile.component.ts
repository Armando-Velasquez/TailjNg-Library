import { Component, Input, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { LogOut, LucideAngularModule, Settings, UserRoundCog, Users } from 'lucide-angular';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.scss'],
  imports: [LucideAngularModule, RouterLinkActive, RouterLink]
})
export class MenuProfileComponent implements OnInit {

  icons = {
    user: UserRoundCog,
    users: Users,
    settings: Settings,
    logout: LogOut
  }

  @Input() routes: string[] = [];

  menuList: any[] = [];

  constructor(
  ) {
  }

  ngOnInit(): void {
    // Inicializar la lista de elementos
    this.initList();
  }

  // ====================================================================
  // Lista de elementos
  // ====================================================================
  initList(): void {
    this.menuList = [
      {
        icon: this.icons.user,
        name: 'Perfil',
        route: this.routes[1],
      },
      {
        icon: this.icons.settings,
        name: 'Configuracion',
        route: this.routes[2],
        denyRole: [4, 5, 6],
      },
    ]
  }
}
