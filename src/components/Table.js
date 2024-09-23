import React from "react" 
import Form from "./Form"
// import do React e do componente Form

const Table = ({ users, postUser, updateUser, deleteUser }) => {
	/* define o componente "Table", que recebe quatro parâmetros:
	   users: a lista de usuários a ser exibida
	   postUser: função para adicionar um novo usuário
	   updateUser: função para atualizar um usuário existente
	   deleteUser: função para deletar um usuário */

	const showUpdateUser = id => { // função para exibir/esconder o formulário de edição de um usuário específico
		const form = document.getElementsByClassName(`show-form-${id}`) // seleciona no DOM o formulário correspondente ao ID informado
		form[0].classList.toggle("hide-form")// alterna entre mostrar e esconder o formulário ao adicionar/remover a classe "hide-form"
	}

	const Row = ({ user }) => {
		/* componente "Row" para exibir os dados de um único usuário.
		   Recebe como "user" que é um objeto com as informações do usuário */
		return (
			<>
				<div className='row'> {/* define uma linha da tabela que exibe os dados do usuário */}
					<div>{user.name}</div> {/* exibe o nome do usuário */}
					<div>{user.email}</div> {/* exibe o email do usuário */}
					<div>{user.phone}</div> {/* exibe o telefone do usuário */}
					<div>{user.companies.name}</div>
					{/* exibe o nome da empresa associada ao usuário. O nome vem da propriedade "companies.name" */}
					
					<div className='buttons'> {/* define uma seção de botões para editar ou deletar o usuário */}
						<button onClick={() => showUpdateUser(user.id)}>Update</button>
						{/* botão para exibir/esconder o formulário de atualização do usuário.
							ao ser clicado, chama a função `showUpdateUser` com o ID do usuário. */}

						<button onClick={() => deleteUser(user.id)}>Delete</button>
						{/* botão para deletar o usuário. Ao ser clicado, chama a função "deleteUser" com o ID do usuário */}
					</div>
				</div>
				<div className={`hide-form show-form-${user.id}`}>
					{/* define a área que contém o formulário de edição do usuário. 
						a classe `hide-form` esconde o formulário por padrão. "show-form-${user.id}""
						identifica o formulário de cada usuário */}

					<Form userData={user} postUser={postUser} updateUser={updateUser} />
					{/* renderiza o componente Form passando os dados do usuário, 
						e as funções "postUser" e "updateUser" para criar ou atualizar o usuário */}
				</div>
			</>
		)
	}

	return (
		<div className='table'> {/* define o container da tabela */}
			<div className='titles'> {/* define o cabeçalho da tabela com os títulos das colunas */}
				<div>Name</div>
				<div>Email</div>
				<div>Phone</div>
				<div>Company</div>
				<div>Actions</div>
			</div>
			<div className='rows'> {/* define o container para as linhas da tabela de dados */}
				{users && users.map(u => <Row user={u} key={u.id} />)}
				{/* mapeia sobre a lista de usuários e cria uma linha para cada um deles. 
					cada linha recebe um objeto "user" e é identificada pela chave única "key={u.id}". */}
			</div>
		</div>
	)
}

export default Table // exporta o componente Table
