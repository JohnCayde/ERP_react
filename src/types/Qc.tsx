import * as QcConstants from "../constants/Qc";

export type Note = {
  section: string;
  status: "pending" | "resolved" | "received";
  component: string;
  details: string;
  action: string;
};

export type NoteModel = Note & {
  id: string;
};

export type AddNote = {
  type: typeof QcConstants.ADD_NOTES;
  payload: NoteModel;
};

export type DelNote = {
  type: typeof QcConstants.DEL_NOTES;
  payload: string;
};

export type ComNote = {
  type: typeof QcConstants.COM_NOTES;
  payload: string;
};

export type QcState = {
  notes: Array<NoteModel>;
};
export type QcAction = AddNote | DelNote | ComNote;
