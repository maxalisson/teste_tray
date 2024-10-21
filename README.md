# Desafio Tray
> Projeto do desafio técnico proposto pela empresa Tray
> Todos os cenários propostos foram cobertos e acrescentado alguns a mais.
> Utilizei do FakerJs para gerar dados randômicos para meus testes, ele é uma dependência do projeto.
> Todos os testes não possuem dependências com outros, garantindo a execução de toda a suite de teste.



### Instalação

>### Clone

Clone este repositório para sua máquina local usando comando abaixo:


```
$ git clone https://github.com/maxalisson/teste_tray.git
```

Execute comando para instalar as dependências listadas
> Cypress

> FakerJS

```
npm install
```

>### Execução modo headless 

Acessar a raiz do repositório
```
$ cd /{diretorio}/teste_tray
```
Abrir o ```git bash```
Execute comando 
```
npx cypress run
```
###### Este comando irá executar o comando ``` cypress run ``` configurado em scripts do ``` package.json ```.

O resultado da execução dos testes será apresentado no terminal e você poderá abrir na pasta /reports o arquivo mochawesome.html para verificar a execução completa.



