import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import DocumentActionTypes from "./DocumentActionTypes";
import DocumentDispatcher from "./DocumentDispatcher";
import data from "./docs.json";

class DocumentStore extends ReduceStore {
  constructor() {
    super(DocumentDispatcher);
  }

  getInitialState() {
    return Immutable.List([...data.docs]);
  }

  reduce(state, action) {
    switch (action.type) {
      case DocumentActionTypes.ADD_DOC:
        if (!action.doc.nombre) {
          return state;
        }
        return state.push({ nombre: action.doc.nombre });
      case DocumentActionTypes.SELECT_DOC:
        console.log("SELECT_DOC", state.toArray(), action.i);
        let d = state.get(action.viejo);
        d.seleccionado = false;
        state.set(action.viejo, d);

        d = state.get(action.nuevo);
        d.seleccionado = true;
        state.set(action.nuevo, d);

        return state;
      /*return state.map((d, i) => {
          d.seleccionado = i === action.i;
          return d;
        });*/
      default:
        return state;
    }
  }
}

export default new DocumentStore();
