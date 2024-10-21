/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe("Testes de Contas", () => {
  const nome = faker.person.fullName();
  const email = faker.internet.email();
  const senha = faker.internet.password();
  const nomeConta = faker.person.firstName()
  
  before(()=>{
    cy.criaNovoUsuario(nome, email, senha)
  })
  beforeEach(()=>{
    cy.visit('https://seubarriga.wcaquino.me/')
    cy.preencheLogin(email, senha)
  })

  it("Exibe mensagem de campo obrigatório - Nome", () => {
    cy.adicionaConta("")
    cy.get('.alert').should('be.visible').contains('Informe o nome da conta')
  });

  it("Cria uma Conta com sucesso", () => {
    cy.adicionaConta(nomeConta)
    cy.get('.alert').should('be.visible').contains('Conta adicionada com sucesso!')
    
    cy.contains(nomeConta).should('be.visible')
  });

  it("Exibe mensagem de nome obrigatório - Editar", () => {
    cy.editaConta("")
    cy.contains('.alert', 'Informe o nome da conta').should('be.visible')
  });

  it("Edita Conta com sucesso", () => {
    const novoNomeConta = faker.person.firstName()
    cy.editaConta(novoNomeConta)
    cy.contains('.alert', 'Conta alterada com sucesso!').should('be.visible')
  });

  it("Exclui Conta com sucesso", () => {
    cy.get(".dropdown-toggle").click();
    cy.contains("Listar").click();
    cy.get('[href*="/removerConta?id="] > .glyphicon').click();
    cy.contains('.alert', 'Conta removida com sucesso!').should('be.visible')
  });

});

