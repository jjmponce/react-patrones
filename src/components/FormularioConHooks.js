import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Reduce el código
// No hemos usado this ni una sola vez
// webpack no puede reducir/minificar classes, pero sí funciones
const FormularioConHooks = ({ nombre, apellidos, tlf, onSave }) => {
  const [nombreValor, setNombre] = useState(nombre);
  const [apellidosValor, setApellidos] = useState(apellidos);
  const [tlfValor, setTlf] = useState(tlf);

  const pulsadoHandler = event => {
    if (onSave) {
      onSave({ nombre: nombreValor, apellidos: apellidosValor, tlf: tlfValor });
    }
  };

  console.log("Con Hooks", {
    nombre: nombreValor,
    apellidos: apellidosValor,
    tlf: tlfValor
  });
  return (
    <div onClick={event => event.stopPropagation()}>
      <TextField
        label="Nombre"
        id="Nombre"
        value={nombreValor}
        onChange={e => setNombre(e.target.value)}
      />
      <TextField
        label="Apellidos"
        id="Apellidos"
        value={apellidosValor}
        onChange={e => setApellidos(e.target.value)}
      />
      <TextField
        label="Telefono"
        id="tlf"
        value={tlfValor}
        onChange={e => setTlf(e.target.value)}
      />
      <Button variant="contained" onClick={pulsadoHandler}>
        Accion
      </Button>
    </div>
  );
};

export default FormularioConHooks;
