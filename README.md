
# Login em Ramais

Este projeto tem como objetivo fornecer um sistema de autenticação e gerenciamento de ramais, com frontend e backend separados. Pode ser utilizado em ambientes corporativos para facilitar o controle de usuários e ramais telefônicos.

## 📁 Estrutura do Projeto

- `ramais-backend/` — Backend do sistema, implementado em Java com Spring Boot.
- `ramais-frontend/` — Frontend do sistema, construído com React e TypeScript.
- `scripts/` — Contém o script SQL para criação das tabelas e estrutura do banco de dados MySQL.



## 🚀 Tecnologias Utilizadas

### Backend
- Java
- Spring Boot
- Spring Security
- JPA / Hibernate
- **MySQL** (banco de dados relacional)

### Frontend
- React
- TypeScript
- Axios
- CSS 



## 🔧 Como Rodar o Projeto

### Pré-requisitos
- Java 17+
- Node.js 18+
- MySQL 8.x
- Docker (opcional)

### Passo 1 — Configurar o Banco de Dados

1. Crie o banco no MySQL (ex: `ramais_db`).
2. Importe o script SQL localizado em `scripts/banco.sql` (ou nome equivalente):
   ```bash
   mysql -u seu_usuario -p ramais_db < scripts/banco.sql


3. Edite o arquivo `application.properties` no backend:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ramais_db
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
   ```

### Passo 2 — Executar o Backend

```bash
cd ramais-backend
./mvnw spring-boot:run
```

### Passo 3 — Executar o Frontend

```bash
cd ramais-frontend
npm install
npm run dev
```

O frontend será iniciado em `http://localhost:5173`.



## 📌 Funcionalidades

* Login com autenticação segura
* Registro e gerenciamento de ramais
* Interface amigável com status em tempo real
* Integração com banco MySQL
* Validação e tratamento de erros


## 🛠️ Scripts

A pasta `scripts/` contém o script SQL necessário para a criação da base de dados no MySQL, incluindo:

* Criação de tabelas
* Relacionamentos
* Inserts iniciais (se houver)


## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Faça suas alterações e commit: `git commit -m 'feat: minha nova feature'`
4. Push na sua branch: `git push origin minha-feature`
5. Abra um Pull Request


## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).


## 👤 Autor

* [@alefadonais5](https://github.com/alefadonais5)



