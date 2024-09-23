import React, { useState } from "react" // import do React e o hook useState
import DropComapies from "./DropCompanies" // import do componente DropCompanies

const Form = ({ userData = {}, postUser, updateUser }) => {
	/* define o componente `Form`, que recebe três parâmetros:
	   "userData": objeto que contém os dados do usuário. Se vazio, será usado um valor padrão para criar um novo usuário
	   "postUser": função usada para adicionar um novo usuário
	   "updateUser": função usada para atualizar um usuário existente */

	const [user, setUser] = useState({
		/* cria o estado "user" que contém os dados do formulário do usuário e
	       a função setUser para gerenciar o estado do formulário.
	       o estado inicial é baseado em `userData` ou valores padrões */

		name: userData.name ?? "",
		username: userData.username ?? "",
		email: userData.email ?? "",
		phone: userData.phone ?? "",
		/* se "userData.name" estiver disponível, ele é usado; caso contrário, o valor será uma string vazia,
		o mesmo vale para: "userData.username", "userData.email" e "userData.phone" */
		companiesId: userData.companiesId ?? "0",
		// se userData.companiesId não estiver disponivel, companiesId é definido como "0", que representa "Selecione uma empresa" no dropdown
	})


	const handleValue = e => { // função para lidar com a mudança de valor nos campos de entrada
		setUser({ ...user, [e.target.name]: e.target.value })
		// atualiza o estado do usuário com o novo valor baseado no nome do campo alterado (name, email, phone ou companiesId)
	}

	const submitUser = e => { // função para lidar com o envio do formulário
		e.preventDefault() // evita que o comportamento padrão do formulário que é recarregar a página aconteça

		if (user.companiesId === "0") return
		// se o usuário não selecionar uma empresa válida, não envia o formulário

		if (userData.id) {
			updateUser(userData.id, user)
			/* se "userData.id" estiver presente, chama a função "updateUser"
			   para atualizar os dados do usuário existente */
		} else {
			postUser(user)
			/* se "userData.id" estiver ausente, chama "postUser"
			   para criar um novo usuário com os dados do formulário */
		}
	}

	return (
		<form onSubmit={submitUser} className='row'>
			{/* define o formulário e especifica que a função `submitUser` será chamada para submeter o formulário */}

			<input
				type='text' // tipo de dado do formulário
				name='name'
				value={user.name}
				placeholder='Name' // texto que aparecerá quando não houver texto digitado
				onChange={e => handleValue(e)}
			/>
			{/* campo de entrada para o nome do usuário. O valor atual é o estado "user.name".
			    quando o valor muda, "handleValue" é chamado */}

			<input
				type='email' // tipo de dado do formulário
				name='email'
				value={user.email}
				placeholder='Email' // texto que aparecerá quando não houver texto digitado
				onChange={e => handleValue(e)}
			/>
			{/* campo de entrada para o email do usuário. mesma lógica do campo de nome */}

			<input
				type='tel' // tipo de dado do formulário
				name='phone'
				value={user.phone}
				placeholder='Phone (10)' // texto que aparecerá quando não houver texto digitado
				pattern='[0-9]{10}'
				onChange={e => handleValue(e)}
			/>
			{/* campo de entrada para o telefone. segue a mesma lógica do campo de nome
			    e o padrão "pattern" restringe a entrada a 10 dígitos */}

			<DropComapies companiesId={user.companiesId} handleValue={handleValue} />
			{/* componente DropCompanies para selecionar a empresa associada ao usuário 
			    o valor atual do dropdown é "user.companiesId", e "handleValue" é chamado quando a seleção muda */}
			
			<input
				className='btn-submit'
				type='submit'
				value={`${!userData.id ? "Add new user" : "Save user"}`}
			/>
			{/* botão de submissão. o texto exibido depende se `userData.id` existe ou não, 
			    indicando se o formulário é para adicionar um novo usuário ou salvar um existente */}
		</form>
	)
}

export default Form // exporta o componente Form
