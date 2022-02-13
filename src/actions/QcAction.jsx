import { v4 as uuidv4 } from 'uuid'


export const ADD_NOTES = "ADD_NOTES"
export const DEL_NOTES = "DEL_NOTES"
export const COM_NOTES = "COM_NOTES"

export function AddNote(note){
    note.id = uuidv4()
    return {
        type: ADD_NOTES,
        payload: note
    }
}

export function DelNote(noteId){
    return {
        type: DEL_NOTES,
        payload: noteId
    }
}

export function ComNote(noteId){
    return {
        type: COM_NOTES,
        payload: noteId
    }
}