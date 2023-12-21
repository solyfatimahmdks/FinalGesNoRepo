import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Evaluations } from 'src/app/models/evaluation';
import { GestionNotesService } from 'src/app/service/gestion-notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-evaluation',
  templateUrl: './gestion-evaluation.component.html',
  styleUrls: ['./gestion-evaluation.component.css']
})
export class GestionEvaluationComponent implements OnInit {
  evaluations: Evaluations[] = [];
  evaluationFormModel: any = {
    semester: '',
    date: new Date(),
    type: '',
    status: '',
    subject: '',
    Classe: [],
    grade: null
  };

  modalRef: NgbModalRef | undefined;

  constructor(private evaluationService: GestionNotesService, private modalService: NgbModal) {}

  private saveToLocalStorage() {
    localStorage.setItem('evaluations', JSON.stringify(this.evaluations));
  }

  ngOnInit() {
    this.evaluationService.evaluations$.subscribe((evaluations) => {
      this.evaluations = evaluations;
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  //Méthode d'ajout évaluation"'
  saveEvaluation() {
    const evaluation: Evaluations = {
      idEvaluation: 0,
      semester: this.evaluationFormModel.semester,
      date: this.evaluationFormModel.date,
      type: this.evaluationFormModel.type,
      status: this.evaluationFormModel.status,
      subject: this.evaluationFormModel.subject,
      Classe: this.evaluationFormModel.Classe,
      grade: null
    };

    if (evaluation.status === 'faite') {
      // Seul le professeur peut noter une apprenante si l'évaluation est à l'état "faite"
      evaluation.grade = this.evaluationFormModel.grade;
    }

    this.evaluationService.saveEvaluation(evaluation);

    // Réinitialiser le modèle du formulaire après la soumission
    this.evaluationFormModel = {
      semester: '',
      date: new Date(),
      type: '',
      status: '',
      subject: '',
      Classe: [],
      grade: null
    };

    // Fermer le modal après la soumission
    this.closeModal();
  }


  closeModal() {
    this.modalService.dismissAll();
  }
  
//Méthode de suppression d'une  evaluation enregistrées
  async deleteEvaluation(index: number) {
    if (this.evaluations[index].status === 'faite') {
      // Ne supprimez pas une évaluation faite
      Swal.fire('Impossible de supprimer', 'Impossible de supprimer une évaluation déjà faite.', 'error');
      return;
    }
  
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer cette évaluation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    });
  
    if (result.isConfirmed) {
      // Appel à la méthode de service pour supprimer l'évaluation
      this.evaluationService.deleteEvaluation(index);
      Swal.fire('Supprimé !', 'L\'évaluation a été supprimée.', 'success');
    } else {
      // Si l'utilisateur annule la suppression
      Swal.fire('Annulé', 'La suppression a été annulée.', 'info');
    }
  }
  
  // assignGrade(index: number, gradeInput: number | null) {
  //   const evaluation = this.evaluations[index];

  //   if (evaluation.status === 'en_cours' || evaluation.status === 'reportee') {

  //     alert("Impossible d'attribuer une note à une évaluation en cours ou reportée.");
  //     return;
  //   }

  //   if (gradeInput !== null) {
  //     const grade = parseFloat(gradeInput.toString());
  //     if (!isNaN(grade) && grade >= 0 && grade <= 20) {
  //       this.evaluationService.assignGrade(index, grade);
  //     } else {
  //       alert("Veuillez entrer une note valide entre 0 et 20.");
  //     }
  //   } else {
  //     alert("La note est nulle.");
  //   }
  // }
}
