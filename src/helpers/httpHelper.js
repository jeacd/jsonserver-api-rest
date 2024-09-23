// função que cria um objeto para realizar requisições HTTP (GET, POST, PUT, DELETE)
// e exporta o httpHelper para ser usado em outras partes do aplicativo
export const httpHelper = () => {
	const customFetch = async (url, options = {}) => {
		/* função assíncrona que faz a requisição HTTP utilizando fetch.
		   recebe como parâmetros a url para onde a requisição será enviada e um objeto 
		   "options" com as opções da requisição. */

		const defaultMethod = "GET" // define o método padrão como GET
		const defaultHeaders = {
			"Content-Type": "application/json",
			Accept: "application/json",
		}
		// define o cabeçalho padrão para as requisições. Todas as requisições esperam e enviam JSON

		const controller = new AbortController() // cria um controlador para permitir o cancelamento de requisições com base em tempo limite
		options.signal = controller.signal // associa o "signal" do controlador à requisição para permitir o cancelamento

		options.method = options.method || defaultMethod // se o método não for definido em "options", usa o método padrão GET
		options.headers = options.headers
			? { ...defaultHeaders, ...options.headers }
			: defaultHeaders
		// mescla os cabeçalhos padrão com quaisquer cabeçalhos adicionais passados em "options"

		options.body = JSON.stringify(options.body) || false // converte o corpo da requisição, caso exista, em uma string JSON
		if (!options.body) delete options.body // se não houver corpo, remove a propriedade "body" de "options"

		setTimeout(() => {
			controller.abort()
		}, 3000)
		// define um tempo limite de 3 segundos para a requisição. Se demorar mais que isso, a requisição é abortada

		try { /* try/catch para tratamento de exceções. o try executa um bloco de código e caso ocorra um erro
			     é capturado pelo catch, onde será feito o tratamento deste erro */
			const response = await fetch(url, options) // faz a requisição usando fetch com a url e as options fornecidas
			return await response.json() // retorna a resposta como JSON, se a requisição for um sucesso
		} catch (err) {
			return err // se ocorrer algum erro durante a requisição, retorna o erro
		}
	}

	const get = (url, options = {}) => customFetch(url, options) // função para realizar requisições do tipo GET chamando "customFetch".

	const post = (url, options) => {
		options.method = "POST"
		return customFetch(url, options)
	}
	// função para realizar requisições do tipo POST. Define o método como "POST" e chama "customFetch"

	const put = (url, options) => {
		options.method = "PUT"
		return customFetch(url, options)
	}
	// função para realizar requisições do tipo PUT. Define o método como "PUT" e chama "customFetch"

	const del = (url, options) => {
		options.method = "DELETE"
		return customFetch(url, options)
	}
	// função para realizar requisições do tipo DELETE. Define o método como "DELETE" e chama 'customFetch'

	return { // retorna um objeto com as funções GET, POST, PUT e DELETE
		get,
		post,
		put,
		del,
	}
}
