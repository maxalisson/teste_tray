/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Testes de Criação de Movimentação', () => {
  const nome = faker.person.fullName();
  const email = faker.internet.email();
  const senha = faker.internet.password();
  const nomeConta = faker.person.firstName();

  before(() => {
    cy.criaNovoUsuario(nome, email, senha);
  });

  beforeEach(() => {
    cy.visit('https://seubarriga.wcaquino.me/');
    cy.preencheLogin(email, senha);
    cy.adicionaConta(nomeConta);
  });

  context('Cenários de Não Sucesso', () => {
    it("Exibe mensagem de erro - Data da Movimentação inválida (DD/MM/YYYY)", () => {
      const tipoMovimentacao = 'Receita';
      const dataMovimentacao = '31-01-2024';
      const dataPagamento = '21/10/2024';
      const descricao = 'Venda de produto';
      const interessado = 'Cliente A';
      const valor = '100.00';
      const situacao = 'Pago';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);

      // Verificar mensagem de erro
      cy.get('.alert').should('be.visible').contains('Data da Movimentação inválida (DD/MM/YYYY)')
    });

    it("Exibe mensagem de erro - Data da Movimentação deve ser menor ou igual à data atual", () => {
      const tipoMovimentacao = 'Despesa';
      const dataMovimentacao = '31/12/2999'; // Data futura
      const dataPagamento = '21/10/2024'; // Formato DD/MM/YYYY
      const descricao = 'Compra de material';
      const interessado = 'Fornecedor B';
      const valor = '50.00';
      const situacao = 'Pendente';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);

      cy.get('.alert').should('be.visible').contains('Data da Movimentação deve ser menor ou igual à data atual')
    });

    it("Exibe mensagem de erro - Data do pagamento inválida (DD/MM/YYYY)", () => {
      const tipoMovimentacao = 'Receita';
      const dataMovimentacao = '20/10/2024'; // Formato DD/MM/YYYY
      const dataPagamento = '31-02-2024'; // Data inválida
      const descricao = 'Venda de produto';
      const interessado = 'Cliente A';
      const valor = '100.00';
      const situacao = 'Pago';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);

      // Verificar mensagem de erro
      cy.get('.alert').should('be.visible').contains('Data do pagamento inválida (DD/MM/YYYY)')
    });

    it("Exibe mensagem de erro - Valor é obrigatório", () => {
      const tipoMovimentacao = 'Despesa';
      const dataMovimentacao = '20/10/2024'; // Formato DD/MM/YYYY
      const dataPagamento = '21/10/2024'; // Formato DD/MM/YYYY
      const descricao = 'Compra de material';
      const interessado = 'Fornecedor B';
      const valor = '';
      const situacao = 'Pendente';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);

      // Verificar mensagem de erro
      cy.get('.alert').should('contain', 'Valor é obrigatório');
    });

    it("Exibe mensagem de erro - Valor deve ser um número", () => {
      const tipoMovimentacao = 'Receita';
      const dataMovimentacao = '20/10/2024'; // Formato DD/MM/YYYY
      const dataPagamento = '21/10/2024'; // Formato DD/MM/YYYY
      const descricao = 'Venda de produto';
      const interessado = 'Cliente A';
      const valor = 'não é um número'; // Valor inválido
      const situacao = 'Pago';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);

      // Verificar mensagem de erro
      cy.get('.alert').should('contain', 'Valor deve ser um número');
    });

    it("Exibe mensagem de campo obrigatório - Data de Movimentação", () => {
      const tipoMovimentacao = 'Receita';
      const dataMovimentacao = ''; 
      const dataPagamento = '21/10/2024'; // Formato DD/MM/YYYY
      const descricao = 'Venda de produto';
      const interessado = 'Cliente A';
      const valor = '100.00';
      const situacao = 'Pago';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);

      cy.get('.alert').should('contain', 'Data da Movimentação é obrigatório');
    });

    it("Exibe mensagem de campo obrigatório - Data de Pagamento", () => {
      const tipoMovimentacao = 'Despesa';
      const dataMovimentacao = '20/10/2024'; // Formato DD/MM/YYYY
      const dataPagamento = '';
      const descricao = 'Compra de material';
      const interessado = 'Fornecedor B';
      const valor = '50.00';
      const situacao = 'Pago';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);
      cy.get('.alert').should('contain', 'Data do pagamento é obrigatório');
    });

    it("Exibe mensagem de campo obrigatório - Descrição", () => {
      const tipoMovimentacao = 'Receita';
      const dataMovimentacao = '20/10/2024'; // Formato DD/MM/YYYY
      const dataPagamento = '21/10/2024'; // Formato DD/MM/YYYY
      const descricao = '';
      const interessado = 'Cliente A';
      const valor = '100.00';
      const situacao = 'Pago';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);

      cy.get('.alert').should('contain', 'Descrição é obrigatório');
    });

    it("Exibe mensagem de campo obrigatório - Interessado", () => {
      const tipoMovimentacao = 'Despesa';
      const dataMovimentacao = '20/10/2024'; // Formato DD/MM/YYYY
      const dataPagamento = '21/10/2024'; // Formato DD/MM/YYYY
      const descricao = 'Compra de material';
      const interessado = '';
      const valor = '50.00';
      const situacao = 'Pendente';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);

      cy.get('.alert').should('contain', 'Interessado é obrigatório');
    });
  });

  context('Cenários de Sucesso', () => {
    it("Cria movimentação de Receita com sucesso", () => {
      const tipoMovimentacao = 'Receita';
      const dataMovimentacao = '20/10/2024'; // Formato DD/MM/YYYY
      const dataPagamento = '20/10/2024'; // Formato DD/MM/YYYY
      const descricao = 'Venda de produto';
      const interessado = 'Cliente A';
      const valor = '100.00';
      const situacao = 'Pago';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);

      cy.get('.alert').should('be.visible').contains('Movimentação adicionada com sucesso!')

      cy.validaMovimentacaoCadastrada(descricao, dataPagamento, nomeConta, valor, situacao)
    });

    it("Cria movimentação de Despesa com sucesso", () => {
      const tipoMovimentacao = 'Despesa';
      const dataMovimentacao = '20/10/2024'; // Formato DD/MM/YYYY
      const dataPagamento = '20/10/2024'; // Formato DD/MM/YYYY
      const descricao = 'Compra de material';
      const interessado = 'Fornecedor B';
      const valor = '50.00';
      const situacao = 'Pago';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);

      cy.get('.alert').should('be.visible').contains('Movimentação adicionada com sucesso!')
      cy.validaMovimentacaoCadastrada(descricao, dataPagamento, nomeConta, valor, situacao)
    });

    it("Cria movimentação de Receita Pendente com sucesso", () => {
      const tipoMovimentacao = 'Receita';
      const dataMovimentacao = '20/10/2024'; // Formato DD/MM/YYYY
      const dataPagamento = '20/10/2024'; // Pendente
      const descricao = 'Venda de serviço';
      const interessado = 'Cliente C';
      const valor = '200.00';
      const situacao = 'Pendente';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);

      cy.get('.alert').should('be.visible').contains('Movimentação adicionada com sucesso!')
      cy.validaMovimentacaoCadastrada(descricao, dataPagamento, nomeConta, valor, situacao)
    });

    it("Cria movimentação de Despesa Pendente com sucesso", () => {
      const tipoMovimentacao = 'Despesa';
      const dataMovimentacao = '20/10/2024'; // Formato DD/MM/YYYY
      const dataPagamento = '20/10/2024'; // Pendente
      const descricao = 'Pagamento de aluguel';
      const interessado = 'Fornecedor D';
      const valor = '800.00';
      const situacao = 'Pendente';

      cy.criaMovimentacao(tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao);

      cy.get('.alert').should('be.visible').contains('Movimentação adicionada com sucesso!')
      cy.validaMovimentacaoCadastrada(descricao, dataPagamento, nomeConta, valor, situacao)
    });
  });
});
