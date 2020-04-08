import DocumentActionTypes from "./DocumentActionTypes";
import DocumentDispatcher from "./DocumentDispatcher";

const Actions = {
  addDocument(doc) {
    DocumentDispatcher.dispatch({
      type: DocumentActionTypes.ADD_DOC,
      doc
    });
  },
  selectDocument(i, j) {
    DocumentDispatcher.dispatch({
      type: DocumentActionTypes.SELECT_DOC,
      nuevo: i,
      viejo: j
    });
  }
};

export default Actions;
