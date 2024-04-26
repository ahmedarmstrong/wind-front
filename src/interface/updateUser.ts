import {Role} from "./role";

export interface UpdateUser{
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  dateNaissance?: string;
  matricule?: string;
  cin?: string;
  situation?: string;
  nbrEnfant?: string;
  tel?: string;
  salaireNet?: string;
  grade?: string;
}
