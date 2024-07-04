import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './app.css';

import api from './services/api';

function App() {

  const [input, setInput ] = useState('')
  // input = armazena
  // setInput = agregar valor

  const [cep, setCep] = useState({});
  // cep = armazena
  // setCep = agregar valor



  async function cepSearch(){
    if ( input === ""){
      alert("Preencha um CEP válido!")
    }

    try {
      const response = await api.get(`${input}/json`) // requisição
      // api.get(`${input}/json`) = link da api + valor digitador no input + /json
      setCep(response.data)
      // acessa os dados do arquivo de resposta
      setInput("")
      // limpa o campo de pesquisa
    } catch {
      alert("Ops, tente novamente!");
      setInput("")
      // limpa o campo de pesquisa

    }

  } 
  return (
    <div className="container">
      
      <h2 className="title" >Buscador de CEP</h2>
      
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={ (event) => setInput(event.target.value) }
          // a propriedade onChace tem uma função com evento 'event' que agrega um valor com setInput atravez do que foi digitado com event.target.value  
        />
        <button className="buttonSearch" onClick={cepSearch}>
          <FiSearch size={25} color='#fff'/>
        </button>
      </div>
      
      {/* CONDICIONAL DE ESTADO 'legth maior que 0' PARA MONSTRAR O MAIN */}
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>{cep.cep}</h2>
            <span>Rua: {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Número: {cep.unidade}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade} - {cep.uf}</span>
            <span>Código de area: {cep.ddd}</span>
            <span>Código IBGE: {cep.ibge}</span>

      </main>
      )}
    </div>
  );
}

export default App;
