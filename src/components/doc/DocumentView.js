import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import DocumentActions from "./DocumentActions";

const DocumentView = props => (
  <div onClick={event => event.stopPropagation()}>
    <FormDoc />
    <ListDoc docs={props.docs} />
  </div>
);

export default DocumentView;

DocumentView.propTypes = {
  docs: ImmutablePropTypes.listOf(
    PropTypes.shape({
      nombre: PropTypes.string.isRequired
    })
  ).isRequired
};

class FormDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: props.nombre || ""
    };
  }

  changeNombreHandler = e => {
    this.setState({ nombre: e.target.value });
  };

  pulsadoAddHandler = e => {
    DocumentActions.addDocument({
      nombre: this.state.nombre
    });
    this.setState({ nombre: "" });
  };

  render() {
    return (
      <div style={{ border: "solid black" }}>
        <TextField
          id="nombre"
          label="Nombre"
          onChange={this.changeNombreHandler}
          value={this.state.nombre}
        />
        <Button variant="contained" onClick={this.pulsadoAddHandler}>
          Add
        </Button>
      </div>
    );
  }
}

/*
const selectionHandler = i => {
  DocumentActions.selectDocument(i);
};

const ListDoc = props => (
  <div style={{ border: "solid black" }}>
    {props.docs.map((doc, i) => (
      <div
        key={"doc_" + i}
        style={doc.seleccionado ? { border: "solid blue" } : {}}
        onClick={() => selectionHandler(i)}
      >
        {doc.nombre}
      </div>
    ))}
  </div>
);
*/
class ListDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccionado: props.seleccionado || -1
    };
  }
  selectionHandler = i => {
    DocumentActions.selectDocument(i, this.state.seleccionado);
    this.setState({ seleccionado: i });
  };
  render() {
    return (
      <div style={{ border: "solid black" }}>
        {this.props.docs.map((doc, i) => (
          <div
            key={"doc_" + i}
            style={doc.seleccionado ? { border: "solid blue" } : {}}
            onClick={() => this.selectionHandler(i)}
          >
            {doc.nombre}
          </div>
        ))}
      </div>
    );
  }
}
