import { Container } from "flux/utils";
import DocumentStore from "./doc/DocumentStore";
import DocumentView from "./doc/DocumentView";

const getStores = () => [DocumentStore];
const getState = () => ({ docs: DocumentStore.getState() });

export default Container.createFunctional(DocumentView, getStores, getState);
