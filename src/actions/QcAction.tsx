import { v4 as uuidv4 } from "uuid";
import * as QcConstants from "../constants/Qc";
import * as QcTypes from "../types/Qc";

export function AddNote(note: QcTypes.Note): QcTypes.AddNote {
  const nt: QcTypes.NoteModel = {
    ...note,
    id: uuidv4(),
  };
  return {
    type: QcConstants.ADD_NOTES,
    payload: nt,
  };
}

export function DelNote(noteId: string): QcTypes.DelNote {
  return {
    type: QcConstants.DEL_NOTES,
    payload: noteId,
  };
}

export function ComNote(noteId: string): QcTypes.ComNote {
  return {
    type: QcConstants.COM_NOTES,
    payload: noteId,
  };
}
