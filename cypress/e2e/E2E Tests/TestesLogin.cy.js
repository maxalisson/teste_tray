/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe("Testes de Login", () => {
  const nome = faker.name.fullName();
  const email = faker.internet.email();
  const senha = faker.internet.password();

  before(() => {
    cy.criaNovoUsuario(nome, email, senha);
  });
  beforeEach(()=>{
    cy.visit("https://seubarriga.wcaquino.me/login");
  })

  it("Exibe mensagem de erro - Senha inválida", () => {
    cy.preencheLogin(email, "senhainvalida");

    cy.get(".alert")
      .should("be.visible")
      .contains("Problemas com o login do usuário");
  });

  it("Exibe mensagem de erro - Email inválida", () => {
    cy.get('#email')
      .type("emailInvalido")
      .invoke("prop", "validationMessage")
      .should("include", 'Inclua um "@" no endereço de e-mail');
  });

  it("Exibe mensagem erro - Email Obrigatório", () => {
    cy.preencheLogin("", senha);
    cy.get('.alert').should('be.visible').contains('Email é um campo obrigatório')
  });

  it("Exibe mensagem erro - Senha Obrigatória", () => {
    cy.preencheLogin(email, "");
    cy.get('.alert').should('be.visible').contains('Senha é um campo obrigatório')
  });

  it("Exibe mensagem erro - Email e Senha obrigatórios", () => {
    cy.get('.btn').click()
    cy.get('.alert').should('be.visible').contains('Email é um campo obrigatório')
    cy.get('.alert').should('be.visible').contains('Senha é um campo obrigatório')
  });

  it("Realiza Login com sucesso", () => {
    cy.preencheLogin(email, senha);
    cy.get('.alert').should('be.visible').contains(`Bem vindo, ${nome}!`)
    cy.get('.footer > span').should('be.visible')
    cy.url().should('eq', 'https://seubarriga.wcaquino.me/logar')
  });

});
