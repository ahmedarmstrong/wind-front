import {SocieteDto} from "./societeDto";
import {Role} from "./role";

export interface UserDto {
    id?: number;
    nom?: string;
    prenom?: string;
    email?: string;
    password?: string;
    dateNaissance?: string;
    matricule?: string;
    cin?: string;
    situation?: string;
    nbrEnfant?: string;
    tel?: string;
    salaireNet?: string;
    grade?: string;
    societeId?: number;
    role?: Role ;
}
