import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class FormularioSinHooks extends Component {
  constructor(props) {
    super(props);
    this.state = { nombre: props.nombre };
  }

  cambiosHandler = event => {
    this.setState({ nombre: event.target.value });
  };

  pulsadoHandler = event => {
    event.stopPropagation();
    if (this.props.onSave) {
      this.props.onSave(this.state);
    }
  };

  render() {
    console.log("Sin Hooks", this.state);
    return (
      <div onClick={event => event.stopPropagation()}>
        <TextField
          label="Nombre"
          id="Nombre"
          value={this.state.nombre}
          onChange={this.cambiosHandler}
        />
        <Button variant="contained" onClick={this.pulsadoHandler}>
          Accion
        </Button>
      </div>
    );
  }
}

export default FormularioSinHooks;
