import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// composants importés
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './administrateur/admin/admin.component';
import { ProfsComponent } from './professeurs/profs/profs.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { GestionEvaluationComponent } from './professeurs/gestion-evaluation/gestion-evaluation.component';
import { NotesComponent } from './professeurs/notes/notes.component';
import { NotesModule } from './professeurs/note/note.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';


const routes: Routes = [
  { path: '', redirectTo : 'connexion', pathMatch: 'full' },
  { path: 'connexion', component: LoginComponent},
  { path: 'formateur', component: ProfsComponent},

  { path: 'admin', component: AdminComponent},
  { path: 'formateur/:id', component: ProfsComponent},
  { path: 'etudiant/:id', component: EtudiantsComponent},
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
//   { path: 'connexion', component: LoginComponent },
//   { path: 'admin', component: AdminComponent },
//   { path: 'formateur', component: ProfsComponent },
  // { path: 'etudiant/:id', component: EtudiantsComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'evaluation', component: GestionEvaluationComponent },
  { path: 'maintenance', component: MaintenanceComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), NotesModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
