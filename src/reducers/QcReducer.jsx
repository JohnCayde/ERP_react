import * as qc from "../actions/QcAction";


const initialState = {
    notes:[{
        section:"225c0005-38ee-4ade-8a3d-a0bcee313b80",
        status:"pending",
        component:"test",
        details:"test",
        action:"downgrade",
        id:"d17350eb-8d9b-4b9e-863c-8e7741aa730c"
    }],
    
}

export default function(state = initialState, action){
    switch (action.type) {
        case qc.ADD_NOTES:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        case qc.DEL_NOTES:
            const RemainNotes = state.notes.filter(note=> note.id != action.payload)
            return {
                ...state,
                notes: RemainNotes
            }
        case qc.COM_NOTES:
            const nwNotes = state.notes.map((note)=>{
                if (note.id ==  action.payload) {
                    note.status = "resolved"
                }
                return note
            })
            return {
                ...state,
                notes: nwNotes
            }
        default:
            return state
    }
}
