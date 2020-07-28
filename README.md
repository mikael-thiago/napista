# Dependencias

* NodeJS
* Algum servidor de banco de dados MySQL
* Algum gerenciador de pacotes JavaScript

# Instalação

* Acesse a pasta raiz do projeto e execute o comando "npm install"
* Acesse a pasta node do projeto e execute o comando "npm install"
* Acesse seu servidor de banco de dados e execute o dump encontrado na pasta database_dump

# Configuração

## Banco de dados

Acesse o arquivo "node/src/database/databaseConfig.json" e coloque as credenciais necessárias para que o servidor node possa acessar seu servidor de banco de dados, isto é:

* Porta
* Usuário
* Senha

## Acesso a API

Adiquira uma API_KEY e em seguida acesse o arquivo "node/src/api_config/api_config.js" e a atribua como valor para o campo "API_KEY".

# Execução

* Abra um terminal, acesse a pasta node e execute o comando "node index.js".
* Abra outro terminal, acesse a pasta raiz do projeto e execute npm start.
* Por fim, o navegador será aberto e a aplicação estará pronta para ser utilizada.



