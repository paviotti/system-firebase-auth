# criando um app

- sniped rafce
- Criar o App
- crirar as rotas
- alterar Routes e Route em App mostrando os caminhos, nesta hora já é possível exibir login se digitado no browser
- criar o componente Navbar, que é um menu de navegação que aceita click
- Inserir o Navbar em App
- Criar o CreateContext, na pasta context -> UserProvider.jsx, Aqui vai ser criado um usuáro generico para toda a app

* Em main.jsx, envolver toda a aplicação em <UserProvider/> e importa-lo.
* Em Login.jsx adicionar useContext(UserContext)
* Em Navbar.jsx adicionar contexto e botão Logout
* Criar RequireAuth.jsx e criar contexto nele
* em App adicionar RequireAuth.jsx e englobar Home
* em Login alterado ao função onClick para handleClickLogin

# Firebase

- npm install firebase
- vai instalar o firebase local, comando copiado so firebase
- https://console.firebase.google.com/u/0/project/udemy-react-2023-d1847/overview?hl=pt-br
- criar em src o arquivo firebase.js e colar o sdk
- em UsaerProvider.jsx criar register usuário
- Criar componente Register.jsx
- Criar rota em App

- em UserProvider.jsx indentifcar usuário conectado https://firebase.google.com/docs/auth/web/manage-users?hl=pt&authuser=0
  com onAuthStateChanged(auth, (user) => {})
