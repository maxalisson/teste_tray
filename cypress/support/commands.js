Cypress.Commands.add("criaNovoUsuario", (nome, email, senha) => {
  cy.visit("https://seubarriga.wcaquino.me/cadastro");

  if (nome !== "") {
    cy.get("#nome").should("be.visible").clear().type(nome);
  } else {
    cy.get("#nome").should("be.visible").clear();
  }

  if (email !== "") {
    cy.get("#email").should("be.visible").clear().type(email);
  } else {
    cy.get("#email").should("be.visible").clear();
  }

  if (senha !== "") {
    cy.get("#senha").should("be.visible").clear().type(senha);
  } else {
    cy.get("#senha").should("be.visible").clear();
  }
  cy.get(".btn").click();
});

Cypress.Commands.add("preencheLogin", (nome, senha) => {
  if (nome !== "") {
    cy.get("#email").should("be.visible").clear().type(nome);
  } else {
    cy.get("#email").should("be.visible").clear();
  }

  if (senha !== "") {
    cy.get("#senha").should("be.visible").clear().type(senha);
  } else {
    cy.get("#senha").should("be.visible").clear();
  }

  cy.get(".btn").should("be.visible").click();
});

Cypress.Commands.add("criaMovimentacao", () => {
  cy.contains("Criar Movimentação").should("be.visible").click();
});

Cypress.Commands.add("adicionaConta", (nomeConta) => {
  cy.get(".dropdown-toggle").click();
  cy.contains("Adicionar").click();
  if (nomeConta !== "") {
    cy.get("#nome").should("be.visible").clear().type(nomeConta);
  } else {
    cy.get("#nome").should("be.visible").clear();
  }
  cy.get(".btn").should("be.visible").click();
});

Cypress.Commands.add("editaConta", (novoNomeConta) => {
  cy.get(".dropdown-toggle").click();
  cy.contains("Listar").click();
  cy.get('[href*="/editarConta?id="] > .glyphicon').click();

  if (novoNomeConta !== "") {
    cy.get("#nome").should("be.visible").clear().type(novoNomeConta);
  } else {
    cy.get("#nome").should("be.visible").clear();
  }
  cy.get(".btn").click();
});

Cypress.Commands.add('criaMovimentacao', (tipoMovimentacao, dataMovimentacao, dataPagamento, descricao, interessado, valor, nomeConta, situacao)=>{
    cy.contains('Criar Movimentação').should('be.visible').click()
    cy.url().should('eq', 'https://seubarriga.wcaquino.me/movimentacao')   
    if (tipoMovimentacao !== "Receita") {
        cy.get('#tipo').select('Despesa')
    } else {
        cy.get('#tipo').select('Receita')
    }

    if (dataMovimentacao !== "") {
        cy.get('#data_transacao').should('be.visible').clear().type(dataMovimentacao)
    } else {
        cy.get('#data_transacao').should('be.visible').clear()
    }

    if (dataPagamento !== "") {
        cy.get('#data_pagamento').should('be.visible').clear().type(dataPagamento)
    } else {
        cy.get('#data_pagamento').should('be.visible').clear()
    }

    if (descricao !== "") {
        cy.get('#descricao').should('be.visible').clear().type(descricao)
    } else {
        cy.get('#descricao').should('be.visible').clear()
    }
    
    if (interessado !== "") {
        cy.get('#interessado').should('be.visible').clear().type(interessado)
    } else {
        cy.get('#interessado').should('be.visible').clear()
    }

    if (valor !== "") {
        cy.get('#valor').should('be.visible').clear().type(valor)
    } else {
        cy.get('#valor').should('be.visible').clear()
    }

    cy.get('#conta').select(nomeConta)
    
    if (situacao === "Pago") {
        cy.get('#status_pago').click()
    } else {
        cy.get('#status_pendente').click()
    }

    cy.get('.btn').click()
})


Cypress.Commands.add('validaMovimentacaoCadastrada', (descricao, dataPagamento, nomeConta, valor, situacao )=>{
    cy.get(':nth-child(4) > a').click()
    cy.contains(descricao).should('be.visible')
    cy.contains(dataPagamento).should('be.visible')
    cy.contains(nomeConta).should('be.visible')
    cy.contains(valor).should('be.visible')
    cy.contains(situacao).should('be.visible')
})