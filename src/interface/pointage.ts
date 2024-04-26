import {UserDto} from "./userDto";

export interface Pointage{
  id: number;
  idSociete: string;
  matricule: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  totalHeure: string;
  userId: UserDto;
}
