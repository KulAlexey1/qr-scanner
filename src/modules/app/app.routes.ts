import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    {
        path: 'scan',
        loadChildren: () => import('@qr/modules/scanner')
            .then(m => m.SCANNER_ROUTES)
    },
    {
        path: 'generate',
        loadChildren: () => import('@qr/modules/generator')
            .then(m => m.GENERATOR_ROUTES)
    },
    {
        path: '**',
        redirectTo: 'scan'
    }
];
