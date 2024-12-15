# Projeto Frontend - React

Este projeto é o frontend desenvolvido em React para o sistema de gerenciamento de viagens. Ele se comunica com o backend que está disponível no repositório [processo-seletivo-trainee](https://github.com/motora-ai/processo-seletivo-trainee). Para que o frontend funcione corretamente, o backend deve estar em funcionamento.

## Requisitos

Antes de começar, verifique os seguintes requisitos:

1. **Node.js e npm**: Certifique-se de que você tem o Node.js e o npm instalados em sua máquina. Caso não tenha, instale o [Node.js](https://nodejs.org/).
2. **Backend em funcionamento**: O backend deve estar rodando para que o frontend consiga se comunicar com ele.

### Instruções de Instalação

1. **Clone o Repositório Backend e Frontend**

   Para clonar o repositório backend e frontend, execute os seguintes comandos em seu terminal:

   ```bash
   git clone https://github.com/motora-ai/processo-seletivo-trainee.git

### Instalar as Dependências do Backend

1. **Navegue até o diretório do backend:**

   ```bash
   cd processo-seletivo-trainee/backend

2. **Instale as dependências necessárias do backend:**

   ```bash
   npm install
   
### Iniciar o Backend

1. **Para rodar o backend, execute:**

   ```bash
   npm run start
   
O backend estará rodando na URL http://localhost:3000.

### Instalar as Dependências do Frontend

1. **Agora, navegue até o diretório do frontend:**

   ```bash
   cd ../frontend
   
2. **Instale as dependências necessárias do frontend:**

   ```bash
   npm install
   
### Iniciar o Frontend

1. **Para iniciar o frontend, execute:**

   ```bash
   npm run dev
   
O frontend estará rodando na URL http://localhost:5173.

### Como Funciona
 **Backend**
 
O backend é responsável por gerenciar as informações das viagens, motoristas e veiculos. As rotas expostas pelo backend são as seguintes:

1. **Viagens**
- **GET** `/travels` - Retorna a lista completa de viagens.
- **GET** `/travels/{id}` - Retorna uma viagem específica pelo ID.
- **GET** `/travels/travelsByStatus/{status}` - Retorna viagens filtradas por status.
- **GET** `/travels/travelsByDriver/{driverId}` - Retorna viagens filtradas pelo ID do motorista.
- **GET** `/travels/travelsByVehicle/{vehicleId}` - Retorna viagens filtradas pelo ID do veículo.
- **POST** `/travels` - Cria uma nova viagem.
- **PUT** `/travels/{id}` - Atualiza uma viagem completamente pelo ID.
- **PATCH** `/travels/{id}` - Atualiza uma viagem parcialmente pelo ID.
- **DELETE** `/travels/{id}` - Exclui uma viagem pelo ID.

2. **Motoristas**
- **GET** `/drivers` - Retorna a lista completa de motoristas.
- **GET** `/drivers/{id}` - Retorna um motorista específico pelo ID.
- **GET** `/drivers/driversByStatus/{status}` - Retorna uma lista de motoristas específica pelo status.
- **POST** `/drivers` - Cria um novo motorista.
- **PUT** `/drivers/{id}` - Atualiza um motorista completamente pelo ID.
- **PATCH** `/drivers/{id}` - Atualiza um motorista parcialmente pelo ID.
- **DELETE** `/drivers/{id}` - Exclui um motorista pelo ID.

3. **Veiculos**
- **GET** `/vehicles` - Retorna a lista completa de veiculos.
- **GET** `/vehicles/{id}` - Retorna um veiculo específico pelo ID.
- **POST** `/vehicles` - Cria um novo veiculo.
- **PUT** `/vehicles/{id}` - Atualiza um veiculo completamente pelo ID.
- **PATCH** `/vehicles/{id}` - Atualiza um veiculo parcialmente pelo ID.
- **DELETE** `/vehicles/{id}` - Exclui um veiculo pelo ID.

### Frontend
O frontend utiliza React e comunica-se com o backend para realizar as operações de CRUD (Criar, Ler, Atualizar, Deletar) para as viagens. As funcionalidades incluem:

1. **Viagens**
- **Consulta Geral:** Exibe todas as viagens.
- **Consulta por ID:** Exibe uma viagem específica com base no ID.
- **Consulta por Status:** Exibe viagens filtradas por status.
- **Consulta por Motorista:** Exibe viagens filtradas pelo ID do motorista.
- **Consulta por Veículo:** Exibe viagens filtradas pelo ID do veículo.
- **Cadastrar Viagem:** Permite cadastrar uma nova viagem.
- **Atualizar Viagem:** Permite atualizar uma viagem existente.
- **Excluir Viagem:** Permite excluir uma viagem.

2. **motoristas**
- **Consulta Geral:** Exibe todos os motoristas.
- **Consulta por ID:** Exibe um motorista específico com base no ID.
- **Consulta por Status:** Exibe motoristas filtrados por status.
- **Cadastrar motorista:** Permite cadastrar um novo motorista.
- **Atualizar Viagem:** Permite atualizar um motorista existente.
- **Excluir Viagem:** Permite excluir um motorista.

3. **Veiculos**
- **Consulta Geral:** Exibe todos os veiculos.
- **Consulta por ID:** Exibe um veiculo específico com base no ID.
- **Cadastrar veiculo:** Permite cadastrar um novo veiculo.
- **Atualizar veiculo:** Permite atualizar um veiculo existente.
- **Excluir veiculo:** Permite excluir um veiculo.

### Requisitos do Backend
O backend precisa ser iniciado antes do frontend para que as rotas funcionem corretamente. Ele deve estar rodando em http://localhost:3000.

