import { LogoIcon } from "./assets/icons" // import da logo da aplicação
import CrudUser from "./components/CrudUser" // import do crudUser
import "./styles/App.css" // import css para estilização

function App() { // função que define o componente principal que será renderizado no DOM
	return ( // definição do que a função irá retornar, que é o layout basico da aplicação
		<> {/* fragmento React usado para agrupar múltiplos componentes em  um único nó */}
			<header> {/* tag header do HTML para definir o cabeçalho */}
				<div className='header__content'> {/* container que organiza o conteúdo do cabeçalho, a classe
												      'header__content' é utilizada para a aplicação de css  */}
					<div className='logo'> {/* este elemento contém o logotipo e o nome da aplicação */}
						<LogoIcon /> {/* componete do logo da aplicação que foi importado */}
						<strong>JSON SERVER API</strong> {/* nome da aplicação, a tag <strong> faz com que
															 o texto fique destacado e enfatizado */}
					</div>
				</div>
			</header>
			<main> {/* tag HTML que define o conteúdo principal da aplicação */}
				<CrudUser /> {/* Componente que lida com a interface CRUD
								 (Create, Read, Update, Delete) de usuários */}
			</main>
		</>
	)
}

export default App // exporta o componente App
