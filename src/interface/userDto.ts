import {SocieteDto} from "./societeDto";
import {Role} from "./role";

export interface UserDto {
    id?: number;
    nom?: string;
    prenom?: string;
    email?: string;
    password?: string;
    dateNaissance?: string;
    dateEmbauche?: string;
    matricule?: string;
    cin?: string;
    situation?: string;
    nbrEnfant?: string;
    tel?: string;
    salaireNet?: string;
    grade?: string;
    diplome?: string;
    cnss?: string;
    societeId?: number;
    role?: Role ;
}
