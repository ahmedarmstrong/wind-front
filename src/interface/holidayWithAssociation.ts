import {HolidayDto} from "./holidayDto";

 export interface HolidayWithAssociation extends HolidayDto {
  isHolidayOfSociete?: boolean; // Assuming HolidayDto is your base holiday object type
}
