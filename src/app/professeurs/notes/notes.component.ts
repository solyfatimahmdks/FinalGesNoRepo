import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteService, Note } from 'src/app/service/note.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notes: Note[] = [];
  noteForm: FormGroup;
  editingIndex: number | null = null;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private noteService: NoteService) {
    this.noteForm = this.fb.group({
      semestre: [null, Validators.required],
      annee_scolaire: [null, Validators.required],
      type_note: [null, Validators.required],
      matiere: [null, Validators.required],
      apprenant: [null, Validators.required],
      valeur: [null, Validators.required]
    });
  }
  ngOnInit() {
    // Appeler la méthode getNotes du service pour récupérer les notes
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }

  openModal(content: any) {
    this.editingIndex = null;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result: Note) => {
        this.noteService.addNote(result);
      },
      () => {
        // Modal dismissed
      }
    );
  }

  openEditModal(content: any, index: number) {
    this.editingIndex = index;
    this.noteForm.patchValue(this.notes[index]);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result: Note) => {
        this.updateNote(this.editingIndex, result);
        this.editingIndex = null;
      },
      () => {
        // Modal dismissed
        this.editingIndex = null;
      }
    );
  }
  //Méthode pour  supprimer une note
  async deleteNoteAndClose(index: number) {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer cette note ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    });
  
    if (result.isConfirmed) {
      this.noteService.deleteNote(index);
      await Swal.fire('Supprimée !', 'La note a été supprimée avec succès.', 'success');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await Swal.fire('Annulé', 'La suppression de la note a été annulée.', 'info');
    }
  
    this.modalService.dismissAll();
  }
  

  saveNote() {
    if (this.noteForm.valid) {
      this.modalService.dismissAll();
      if (this.editingIndex !== null) {
        // Si nous sommes en mode d'édition, mettez à jour la note existante
        this.updateNote(this.editingIndex, this.noteForm.value);
      } else {
        // Sinon, ajoutez une nouvelle note
        this.noteService.addNote(this.noteForm.value);
      }
      this.noteForm.reset();
      this.editingIndex = null;
    }
  }

  //Méthode pour  modifier une note
  async updateNote(index: number | null, resultData: any) {
    if (index !== null) {
      const updatedNote: Note = { ...this.notes[index], ...resultData };
  
      const swalResult = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez-vous vraiment mettre à jour cette note ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, mettre à jour !',
        cancelButtonText: 'Annuler'
      });
  
      if (swalResult.isConfirmed) {
        this.noteService.updateNote(index, updatedNote);
        await Swal.fire('Note mise à jour', 'La note a été mise à jour avec succès.', 'success');
      } else if (swalResult.dismiss === Swal.DismissReason.cancel) {
        await Swal.fire('Annulé', 'La mise à jour de la note a été annulée.', 'info');
      }
    } else {
      await Swal.fire('Erreur', 'La note n\'a pas pu être mise à jour.', 'error');
    }
  }
  
}
