import {UserDto} from "./userDto";
import {RegimeDto} from "./regimeDto";
import {Secteur} from "./Secteur";

export interface SocieteDto{
  id?: number;
  nom?: string;
  idSociete?: string;
  matriculeFiscale?: string;
  adresse?: string;
  secteur?: Secteur ;
  regime?: RegimeDto ;
}
