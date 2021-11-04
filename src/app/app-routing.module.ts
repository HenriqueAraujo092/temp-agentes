import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'form-familia', loadChildren: './form-familia/form-familia.module#FormFamiliaPageModule' },
  { path: 'familia/nis/:nis', loadChildren: './familia/familia.module#FamiliaPageModule' },
  { path: 'familia/form-membro/:id', loadChildren: './form-membro/form-membro.module#FormMembroPageModule' },
  { path: 'agente', loadChildren: './agente/agente.module#AgentePageModule' },
  { path: 'visita/nis/:nis', loadChildren: './visita/visita.module#VisitaPageModule' },
  { path: 'form-visita/nis/:nis', loadChildren: './form-visita/form-visita.module#FormVisitaPageModule' },
  { path: 'evento', loadChildren: './evento/evento.module#EventoPageModule' },
  { path: 'form-evento', loadChildren: './form-evento/form-evento.module#FormEventoPageModule' },
  { path: 'pesq-familia', loadChildren: './pesq-familia/pesq-familia.module#PesqFamiliaPageModule' },
  { path: 'pesq-visita', loadChildren: './pesq-visita/pesq-visita.module#PesqVisitaPageModule' },  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'resetar-senha', loadChildren: './resetar-senha/resetar-senha.module#ResetarSenhaPageModule' }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
