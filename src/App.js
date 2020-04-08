import React, { Component } from "react";
import "./styles.css";
import FormularioSinHooks from "./components/FormularioSinHooks";
import FormularioConHooks from "./components/FormularioConHooks";
import DocumentContainer from "./components/DocumentContainer";

// Patron: presentational component
export const Patron = ({ children, isExpanded, ...props }) => (
  <div {...props}>
    <div>
      {isExpanded && <span style={{ fontWeight: "bold" }}>- Titulo: </span>}
      {!isExpanded && "+"} {props.titulo}
    </div>
    {isExpanded && (
      <div>
        <span style={{ fontWeight: "bold" }}>Componente: </span>
        {props.componente}
      </div>
    )}
    {isExpanded && <div style={{ marginLeft: "35px" }}>{children}</div>}
  </div>
);

export const PatronSimple = ({ children, ...props }) => (
  <div {...props}>
    <div>
      <span style={{ fontWeight: "bold" }}>- Titulo: </span>
      {props.titulo}
    </div>
    <div>
      <span style={{ fontWeight: "bold" }}>Componente: </span>
      {props.componente}
    </div>
    <div style={{ marginLeft: "35px" }}>{children}</div>
  </div>
);

export const EnlaceBibli = ({ ...props }) => (
  <li {...props}>
    <a href={props.url}>{props.descripcion}</a>
  </li>
);

export const Bibliografia = ({ children, titulo, ...props }) => (
  <div style={alineadoIzqd} {...props}>
    <h2>{titulo}</h2>
    <ul>{children}</ul>
  </div>
);

export const hazContraible = Componente =>
  class extends Component {
    render() {
      // Desestructuramos las properties para sacar la que afecta a la expansión
      const { isExpanded, ...restoProps } = this.props;
      if (isExpanded) {
        return <Componente {...restoProps} />;
      } else {
        return <div {...restoProps}>+ {this.props.titulo}</div>;
      }
    }
  };

const PatronSimpleContraible = hazContraible(PatronSimple);

const estiloResaltado = {
  border: "solid red"
};

const alineadoIzqd = {
  textAlign: "left"
};

export const hazResaltado = Componente => props => (
  <div style={estiloResaltado}>
    <Componente {...props} />
  </div>
);

const PatronSimpleContraibleResaltado = hazResaltado(
  hazContraible(PatronSimple)
);

export default class App extends Component {
  constructor(props) {
    super(props);

    // Notese que no hace falta ni definir inicialmente valor en el estado para componentes nuevos
    this.state = {
      expandedPC: false,
      nombre: "Con",
      apellidos: "Hooks",
      tlf: "+34 963 002 435"
    };
  }

  expandOrCollapse = comp => {
    this.setState({ ["expanded" + comp]: !this.state["expanded" + comp] });
  };

  estiloPatron = {
    ...alineadoIzqd,
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderTopStyle: "solid"
  };

  estiloPatronUltimo = {
    ...this.estiloPatron,
    borderBottomStyle: "solid"
  };

  cambioNombre = d => {
    this.setState(d);
  };

  render() {
    console.log("Repintado de APP");
    return (
      <div className="App">
        <h1>Ejemplo de implementación de patrones</h1>
        <p>Pulsa en cada uno para expandirlo</p>
        <Patron
          style={this.estiloPatron}
          isExpanded={this.state.expandedPC}
          titulo="Presentational component"
          componente="Implementado en la clase Patron"
          onClick={() => this.expandOrCollapse("PC")}
        >
          Desacopla los componetes de la lógica y los hace más flexibles.
          <br />
          El componente sólo hace uso de las properties y es el padre el que
          tiene los datos en su estado y las funciones de gestión de los
          eventos.
          <br />
          Esto no permite diseñar componentes muy reutilizables ya que están
          acoplados los eventos y las properties.
          <br /> Pero se puede utlizar para aligerar el código de algún
          componente y hacerlo más mantenible.
          <br /> Puede evitar escribir mucho código repetido en la parte del
          render.
          <br /> Es muy interesante el uso que se ha hecho del operador lógico
          && y de ...props para pasar todas las propiedades a un hijo concreto.
        </Patron>
        <Patron
          style={this.estiloPatron}
          isExpanded={this.state.expandedCC}
          titulo="Container component"
          componente="Implementado en la clase App"
          onClick={() => this.expandOrCollapse("CC")}
        >
          Esta misma aplicación implementa este patrón
          <br />
          El componente "Hijo" no contiene lógica
          <br />
          El componente "Padre" encapsula la lógica y la oculta a otros
          componentes
        </Patron>
        <PatronSimpleContraible
          style={this.estiloPatron}
          isExpanded={this.state.expandedHOC}
          titulo="HOC component"
          componente="Implementado en la clase hazContraible que crea PatronSimpleContraible a enriqueciendo PatronSimple. No es el mejor de los ejemplos por como se pinta el título."
          onClick={() => this.expandOrCollapse("HOC")}
        >
          <a href="https://reactjs.org/docs/higher-order-components.html">
            Higher-Order Components
          </a>
          <br />
          Básicamente se trata de una función que recibe un componente como
          parámetro y devuelve un componente nuevo.
          <br />
          Se trata de un caso de composición, ya que no se modifica el
          componente original ni se extiende en ninguna forma, sólo se le añade
          un envoltorio.
        </PatronSimpleContraible>
        <PatronSimpleContraibleResaltado
          style={this.estiloPatronUltimo}
          isExpanded={this.state.expandedHOCM}
          titulo="HOC component - multiple"
          componente="Implementado en PatronSimpleContraibleResaltado."
          onClick={() => this.expandOrCollapse("HOCM")}
        >
          Este es composición de dos HOC hazContraible y hazResaltado
        </PatronSimpleContraibleResaltado>
        <PatronSimpleContraible
          style={this.estiloPatron}
          titulo="uso de hooks"
          componente="FormularioConHooks"
          isExpanded={this.state.expandedHOOK}
          onClick={() => this.expandOrCollapse("HOOK")}
        >
          Este es el paso siguiente al HOC
          <br />
          Reduce el código
          <br />
          No hemos usado this ni una sola vez
          <br />
          webpack no puede reducir/minificar classes, pero sí funciones
          <br />
          Ojo que tal y como hemos implementado el contraible, hay que usar por
          teclado el acceso a los botones para que el evento onclick no se
          dispare y colapse el patron.
          <br />
          He dejado el comportamiento este extraño para que se tenga en cuenta.
          Cambiar valor, colapsar y volver a desplegar. Hasta que no se destruye
          y se vuelve a crear el objeto no actualiza el valor con la property.
          Pasa lo mismo cuando copias las props en el state en el constructor de
          un componente.
          <br />
          <FormularioSinHooks
            nombre={this.state.nombre}
            onSave={this.cambioNombre}
          />
          <br />
          <FormularioConHooks
            nombre={this.state.nombre}
            apellidos={this.state.apellidos}
            tlf={this.state.tlf}
            onSave={this.cambioNombre}
          />
        </PatronSimpleContraible>
        <PatronSimpleContraible
          style={this.estiloPatron}
          titulo="One-direction dataflow pattern"
          componente="sin componente"
          isExpanded={this.state.expandedODDP}
          onClick={() => this.expandOrCollapse("ODDP")}
        >
          Antes de entrar en otros patrones vamos a ver la razón de existencia
          de ellos. El partón MVC se emplea para desacoplar el modelo de datos,
          de la lógica de la aplicación y de la vista. <br />
          Si tratamos de adoptar este patrón en la capa de presentación, en
          sistemas grandes, acaberemos encontrando que la capacidad que tiene de
          mover datos en ambos sentidos hace que sea dificl de trazar el flujo y
          de entenderlo. Incluso se podrían presentar ocasiones en las que
          hubiera ciclos.
          <br />
          La solución que planteó el equipo de react fue el patron de fujo de
          datos unidireccional. Esto significa que la capa de la vista la
          mantiene un componente y sólo él pude alterar la vista.
          <br />
          El código nativo resultante lo calcula la función render del
          componente y lo muestra al usuario. <br />
          Si la vista necesita responder a las interacciones del usuario, sólo
          puude lanzar eventos que gestionará el componente. No puede
          directamente modificar el estado o las propiedades.
          <br />
          Los cambios en propiedades o estado hacen que se ejecute la función
          render del componente.
          <br />
          ¿Qué ocurre si un evento tiene que generar un cambio en un componente
          distinto? En estos casos necesitamos "subir" el listener a un
          componente contenedor que tenga acceso a los dos componentes
          afectados.
          <br />
          A medida que se va haciendo esto, cada vez acoplamos más los
          componentes incrementando el número de listeners que pasamos como
          propiedades a los componentes.
          <br />
        </PatronSimpleContraible>
        <PatronSimpleContraible
          style={this.estiloPatron}
          titulo="FLUX"
          componente="sin componente"
          isExpanded={this.state.expandedFLUX}
          onClick={() => this.expandOrCollapse("FLUX")}
        >
          En Flux, la capa de presentación responde a las acciones del usuario
          mandando actions a Dispatcher.
          <br /> El rol del dispatcher es mandar cada acción a los stores
          suscritos.
          <br />
          Se pueden tener varios stores y que cada uno de ellos actue de forma
          distinta en respuesta a las acciones del usuario.
          <br />
          <DocumentContainer />
        </PatronSimpleContraible>
        <PatronSimple style={this.estiloPatronUltimo}>El último</PatronSimple>

        <Bibliografia titulo="Bibliografia">
          <EnlaceBibli
            url="https://en.reactjs.org/docs/composition-vs-inheritance.html"
            descripcion="Composition vs Inheritance"
          />
          <EnlaceBibli
            url="https://github.com/airbnb/javascript/tree/master/react#naming"
            descripcion="Airbnb React/JSX Style Guide"
          />
          <EnlaceBibli
            url="https://reactjs.org/docs/higher-order-components.html"
            descripcion="Higher-Order Components"
          />
          <EnlaceBibli
            url="https://reactjs.org/docs/hooks-intro.html"
            descripcion="Introducing Hooks"
          />
          <EnlaceBibli
            url="https://reactjs.org/docs/hooks-custom.html"
            descripcion="Building Your Own Hooks"
          />
          <EnlaceBibli
            url="https://reactjs.org/docs/hooks-rules.html"
            descripcion="Rules of Hooks"
          />
          <EnlaceBibli
            url="https://youtu.be/ISGCTngdp8c"
            descripcion="React.js Hooks en menos de 20 minutos (Youtube)"
          />
        </Bibliografia>
      </div>
    );
  }
}
