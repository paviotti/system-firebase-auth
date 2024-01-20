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

# git

- git init
- git config --global user.name "paviotti"
- git config --global user.email crpaviotti@hotmail.com
- git add .
- git git commit -m "First step with Firebase auth"
- git switch -c 00-firebase-auth
- git branch
- git remote add origin https://github.com/paviotti/system-firebase-auth.git
- git push -u origin 00-firebase-auth

# taillwincss

- https://flowbite.com/docs/getting-started/react/
- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p
- alterar tailwind.config.js:
  content: [
  './src/**/*.{js,jsx,ts,tsx}',
  ],
- alterar index.css:
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

- intalar flowbite
- npm install flowbite flowbite-react

- alterar tailwind.config.js:
  require('flowbite/plugin')
  'node\*modules/flowbite-react/lib/esm/\*\*/\_.js'

- index.js, importar flowbite:
- neste caso é main.jsx
  import "flowbite"

# intalar pacote nanoid

- npm i nanoid
- import {nanoid} from "nanoid"

parei 1:01:15
