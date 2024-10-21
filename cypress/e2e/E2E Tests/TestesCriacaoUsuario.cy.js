/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe("Testes de Criacao de Usuario", () => {
  const nome = faker.name.fullName();
  const email = faker.internet.email();
  const senha = faker.internet.password();
  it("Exibe mensagem de campo obrigatório - Nome", () => {
    cy.criaNovoUsuario("", email, senha);
    cy.get('.alert').should('be.visible').contains('Nome é um campo obrigatório')
  });

  it("Exibe mensagem de campo obrigatório - Email", () => {
    cy.criaNovoUsuario(nome, "", senha);
    cy.get('.alert').should('be.visible').contains('Email é um campo obrigatório')
  });

  it("Exibe mensagem de campo obrigatório - Senha", () => {
    cy.criaNovoUsuario(nome, email, "");
    cy.get('.alert').should('be.visible').contains('Senha é um campo obrigatório')
  });

  it("Exibe mensagem de campo obrigatório - Todos os campos", () => {
    cy.criaNovoUsuario("", "", "");
    cy.get('.alert').should('be.visible').contains('Nome é um campo obrigatório')
    cy.get('.alert').should('be.visible').contains('Email é um campo obrigatório')
    cy.get('.alert').should('be.visible').contains('Senha é um campo obrigatório')
  });

  it("Cria usuário com sucesso", () => {
    cy.criaNovoUsuario(nome, email, senha);
    cy.get('.alert').should('be.visible').contains('Usuário inserido com sucesso')
  });
});
