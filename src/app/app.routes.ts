import { Routes } from '@angular/router';

export const routes: Routes = [
        {
                path:'ecofiber3d',
                loadComponent: ()=> import('@shared/stlCard/stlCard.component'),
                children:[
                {
                        path:'',
                        title: 'ecofiber3d',
                        loadComponent: () => import('@shared/stlCard/stlCard.component')
                }
                /*,
                {
                        path:'artist/:name',
                        title: 'spotify',
                        loadComponent: () => import('@components/artist/artist.component')
                },
                {
                        path:'add',
                        title: 'spotify',
                        loadComponent: () => import('@shared/formField/formField.component')
                }*/
                ]
        },
        {
                path:'',
                redirectTo: '/ecofiber3d',
                pathMatch: 'full'
        }
];
