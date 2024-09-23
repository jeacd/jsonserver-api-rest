import React, { useState, useEffect } from "react" // import do React e os hooks useState e useEffect
import { httpHelper } from "../helpers/httpHelper" // import do httpHelper

const DropCompanies = ({ companiesId, handleValue }) => {
	/* define o componente DropCompanies, que recebe dois parâmetros: 
	   companiesId: o ID da empresa selecionada inicialmente.
	   handleValue: uma função de callback para lidar com mudanças no valor selecionado */

	const [companies, setCompanies] = useState(null)
	/* cria um estado chamado "companies" para armazenar a lista de empresas.
	   O valor inicial é null até que os dados sejam carregados */

	const [company, setCompany] = useState(companiesId)
	/* cria um estado chamado "company" para armazenar a empresa atualmente selecionada.
	   O valor inicial vem de "companiesId" */

	const url = "http://localhost:5000/companies" // URL base da API onde os dados de usuários estão localizados
	const api = httpHelper() // cria uma instância do helper, função de ajuda para fazer requisições HTTP (GET, POST, PUT, DELETE)

	useEffect(() => { // useEffect é utilizado para carregar a lista de empresas quando o componente é montado
		api
			.get(url) // faz uma requisição GET para a API para buscar a lista de empresas
			.then(res => {

				setCompanies([{ id: 0, name: "Select Company" }, ...res])
				/* quando os dados são recebidos, atualiza o estado "companies" com a 
				   desfragmentação da resposta da requisição em uma nova lista e
				   adiciona um item "Select Company" no início da lista para ser a opção padrão */
			})
			.catch(err => console.log(err)) // Caso ocorra um erro durante a requisição, exibe o erro no console
	}, []) // o array vazio [] faz com que o useEffect seja executado apenas uma vez, logo após a montagem do componente

	if (!companies) return null
	/* se o estado "companies" for null, os dados ainda não foram carregado.
	   Então é retornado null, impedindo a renderização do dropdown até que os dados sejam recebidos */

	return (
		<select
			name='companiesId' // define o nome do elemento select como 'companiesId', que será enviado no formulário
			value={company} // define o valor selecionado do dropdown com base no estado "company"
			onChange={e => {
				setCompany(e.target.value) // atualiza o estado "company" com o valor selecionado quando o usuário faz uma mudança
				handleValue(e) // chama a função "handleValue" para lidar com a mudança no valor
			}}
		>
			{companies.map(c => (
				<option value={c.id} key={c.id}>
					{c.name}
				</option>
				/* mapeia sobre a lista de empresas armazenada no estado "companies" e cria um <option> para cada empresa.
				   O valor de cada <option> é o ID da empresa, e o conteúdo da <option> é o nome da empresa */
			))}
		</select> 
		// retorna o elemento <select> com a lista de empresas como opções
	)
}

export default DropCompanies // exporta o componente DropCompanies
