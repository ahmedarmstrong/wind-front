import {SocieteDto} from "./societeDto";
import {HolidayDto} from "./holidayDto";
import {Status} from "./status";

export interface SocieteHolidaysDto{
  id?:number;
  societe?: SocieteDto;
  holidayDto?: HolidayDto;
  status?:Status;
}
