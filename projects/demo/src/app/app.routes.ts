import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ThemingComponent } from './views/theming/theming.component';

const home: string = '';            // 0
const install: string = 'installation';            // 1
const config: string = 'settings';            // 2
const theming: string = 'theming';            // 3

// Convertir primera en mayuscula
function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Definir el array de rutas en el constructor
export const routesArray: string[] = [
    '/' + home,
    '/' + install,
    '/' + config,
    '/' + theming,
];

export const routes: Routes = [
    { path: home, redirectTo: home, pathMatch: 'full' },
    {
        path: home, component: HomeComponent,
        data: { title: capitalizeFirstLetter(home) },
    },
    {
        path: theming, component: ThemingComponent,
        data: { title: capitalizeFirstLetter(theming) },
    },
];
