import React from "react"; // importação do react
import ReactDOM from "react-dom"; // importação do react-dom
import App from "./App"; // importação do App.js

ReactDOM.render( 
  /* função que renderiza o componente React no DOM,
     StrictMode é utilizado para evidenciar potenciais problemas na aplicação e 
     só é executado em estágios de desenvolvimento
     App é o componete que será renderizado e servirá de base para toda a aplicação */
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // elemento DOM onde o componente React será montado
);
