import React, { useState, useEffect } from "react" // import do React e os hooks useState e useEffect
import Form from "./Form" // import do componente Form
import Table from "./Table" // import do componente Table

import { httpHelper } from "../helpers/httpHelper" // import do httpHelper

const CrudUser = () => { // definição do componente CrudUser
	const [users, setUsers] = useState(null)
	/* useState será usado para gerenciar o estado dos usuários
	   criando um estado chamado "users" que será usado para armazenar a lista de usuários,
	   tendo null como valor inicial. A função setUsers será usada para atualizar esse estado */

	const url = "http://localhost:5000/users" // URL base da API onde os dados de usuários estão localizados
	const api = httpHelper() // cria uma instância do helper, função de ajuda para fazer requisições HTTP (GET, POST, PUT, DELETE)

	useEffect(() => {
		getUsers()
	}, [])
	/* useEffect executa código no ciclo de vida do componente.
	   aqui será utilizado para executar a função getUsers quando o componente for montado pela primeira vez.
	   O array vazio [] garante que isso aconteça apenas uma vez */

	const postUser = user => { // função para adicionar um novo usuário com POST
		api
			.post(`${url}`, { body: user }) // usa a função post do httpHelper para enviar os dados do novo usuário para a API
			.then(res => getUsers()) // se a requisição for um sucesso, chama getUsers para atualizar a lista de usuários
			.catch(err => console.log(err)) // caso ocorra um erro, ele é exibido no console
	}

	const updateUser = (id, user) => { // função para atualizar os dados de um usuário existente com PUT
		api
			.put(`${url}/${id}`, { body: user }) // usa a função put do httpHelper para atualizar os dados de um usuário específico, passando seu id
			.then(res => getUsers()) // após a atualização bem-sucedida, chama getUsers para atualizar a lista de usuários
			.catch(err => console.log(err)) // caso ocorra um erro, ele é exibido no console
	}

	const deleteUser = id => { // função para deletar um usuário com DELETE
		api
			.del(`${url}/${id}`, {}) // usa a função del do httpHelper para remover um usuário da API com base no seu ID
			.then(res => getUsers()) // após a exclusão bem-sucedida, chama getUsers para atualizar a lista de usuários.
			.catch(err => console.log(err)) // caso ocorra um erro, ele é exibido no console
	}

	const getUsers = () => { // função para buscar a lista de usuários da API com GET
		api
			.get(`${url}?_expand=companies`) // usa a função get do httpHelper para buscar a lista de usuários, incluindo as empresas associadas (via _expand)
			.then(res => {
				setUsers(res) // quando os dados são recebidos, atualiza o estado "users" com os usuários retornados.
			})
			.catch(err => console.log(err)) // caso ocorra um erro, ele é exibido no console
	}

	if (!users) return null
	// se o estado "users" for null (ou seja, os dados ainda não foram carregados), não renderiza nada

	return (
		<>
			<h3>New user</h3> {/* tag HTML para exibir um título */}
			<Form postUser={postUser} /> {/* exibe o componente Form, passando a função postUser como argumento para adicionar novos usuários. */}
			<div className='all-users'>
				<h3>All users</h3>
				<Table
					users={users}
					setUsers={setUsers}
					postUser={postUser}
					updateUser={updateUser}
					deleteUser={deleteUser}
				/>
			</div>
			{/* Exibe o componente Table, passando os usuários e as funções de CRUD. 
				usado para exibir a lista de usuários e utilizar os métodos HTTP */}
		</>
	)
}

export default CrudUser // exporta o componente CrudUser
