# Leonardo Pottmayer - MTV API

API de frases [LINK](https://mtv.pottmayer.dev).

## Descrição

Este projeto é divido em Client e API, esta é a API. A ideia do projeto é ter uma base de frases, e alguém possa acessar
a aplicação sempre que quiser e buscar uma frase (normalmente motivacional). O client está dividido em duas partes (user e admin).
O usuário comum não necessita de autenticação e pode apenas acessar a página principal ("/") da aplicação para ver uma frase. Sempre que a página
é aberta ou atualizada é realizado um fetch de alguma frase aleatória na base. Já o administrator precisa se autenticar, após realizar o login
o usuário pode cadastrar, editar ou remover frases através de um CRUD simples.
Nesta aplicação utilizei React.js para o frontend, uma API node/express para o backend, MongoDB para guardar as frases e JWT para criar os tokens
de autenticação necessários.

O registro de usuários está disponível, porém, por motivos de segurança há uma trava, ao criar um usuário ele fica com um status de bloqueado,
impossibilitando o login até que outro usuário realize o desbloqueio. Por isso em caso de clone do repositório será possível apenas utilizar a
parte do usuário comum.