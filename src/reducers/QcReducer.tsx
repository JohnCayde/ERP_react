// import * as qc from "../actions/QcAction";
import * as QcConstants from "../constants/Qc";
import * as QcTypes from "../types/Qc";

const initialState: QcTypes.QcState = {
  notes: [
    {
      section: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
      status: "pending",
      component: "test",
      details: "test",
      action: "downgrade",
      id: "d17350eb-8d9b-4b9e-863c-8e7741aa730c",
    },
  ],
};

export default function QcReducer(
  state = initialState,
  action: QcTypes.QcAction
): QcTypes.QcState {
  switch (action.type) {
    case QcConstants.ADD_NOTES:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case QcConstants.DEL_NOTES:
      const RemainNotes = state.notes.filter(
        (note) => note.id !== action.payload
      );
      return {
        ...state,
        notes: RemainNotes,
      };
    case QcConstants.COM_NOTES:
      const nwNotes = state.notes.map((note) => {
        if (note.id === action.payload) {
          note.status = "resolved";
        }
        return note;
      });
      return {
        ...state,
        notes: nwNotes,
      };
    default:
      return state;
  }
}
