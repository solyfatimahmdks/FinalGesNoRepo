import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesComponent } from './notes.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesComponent],
      imports: [ReactiveFormsModule] // Importer ReactiveFormsModule pour les tests utilisant des formulaires réactifs
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form and set editingIndex to null after saving note', () => {
    // Simuler des données dans le formulaire
    component.noteForm.get('semestre')?.setValue(1);
    // ... Simuler d'autres champs du formulaire

    // Simuler l'appel de la méthode saveNote
    component.saveNote();

    // Vérifier si le formulaire est réinitialisé après l'enregistrement
    expect(component.noteForm.pristine).toBe(true);
    expect(component.editingIndex).toBe(null);
  });

  // Vous pouvez écrire d'autres tests pour d'autres méthodes ou fonctionnalités du composant
});




