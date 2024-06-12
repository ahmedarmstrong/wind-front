import {DuplicateRecordDto} from "./DuplicateRecordDto";

export interface UploadResponseDto {
  message: string;
  duplicateCount: number;
  duplicateRecords?: DuplicateRecordDto[];
}
