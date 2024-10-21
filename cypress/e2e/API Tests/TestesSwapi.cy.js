/// <reference types="cypress" />
describe('API Tests - SWAPI', () => {
    it('Deve retornar uma lista de filmes', () => {
      cy.request('GET', 'https://swapi.dev/api/films/').then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.exist;
        expect(response.body).to.have.property('results');
        expect(response.body.results).to.be.an('array');
        expect(response.body.results.length).to.be.greaterThan(0);

        const firstFilm = response.body.results[0];
        expect(firstFilm).to.have.property('title');
        expect(firstFilm).to.have.property('episode_id');
        expect(firstFilm).to.have.property('opening_crawl');
        expect(firstFilm).to.have.property('director');
        expect(firstFilm).to.have.property('producer');
        expect(firstFilm).to.have.property('release_date');
      });
    });

    it('Valida retorno negativo para filme 10', () => {
        cy.request({
            method:'GET',
            url: 'https://swapi.dev/api/films/10',
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(404);
            expect(response.body).to.exist;
        })
      });

      it('Valida retorno positivo para filme 2', () => {
        cy.request({
            method:'GET',
            url: 'https://swapi.dev/api/films/2',
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body).to.exist;
        })
      });

      it('Valida retorno de episódio correto', () => {
        cy.request({
            method:'GET',
            url: 'https://swapi.dev/api/films/2',
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body).to.exist;
            expect(response.body.title).to.equal('The Empire Strikes Back')
        })
      });

      it('Valida id do Episódio com sucesso', () => {
        cy.request({
            method:'GET',
            url: 'https://swapi.dev/api/films/2',
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body).to.exist;
            expect(response.body.episode_id).to.equal(5)
        })
      });

      it('Valida se id do Episódio é number com sucesso', () => {
        cy.request({
            method:'GET',
            url: 'https://swapi.dev/api/films/2',
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body).to.exist;
            expect(response.body.episode_id).to.equal(5)
            expect(response.body.episode_id).to.be.a('number')
        })
      });

      it('Valida formato de data - yyyy-mm-dd', () => {
        cy.request({
            method:'GET',
            url: 'https://swapi.dev/api/films/2',
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body).to.exist;
            expect(response.body.release_date).to.match(/^\d{4}-\d{2}-\d{2}$/)
        })
      });
    
    it('Deve retornar 404 para requisição inválida', () => {
        cy.request({
          method: 'GET',
          url: 'https://swapi.dev/api/people/?format=jsonx',
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(404);
          expect(response.body).to.exist;
        });
      });

      it('Valida peso e altura personagem - C-3PO', () => {
        cy.request({
            method:'GET',
            url: 'https://swapi.dev/api/people/2/',
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body).to.exist;
            expect(response.body.height).to.eq('167')
            expect(response.body.mass).to.eq('75')
        })
      });

      it('Valida filmes do personagem - C-3PO', () => {
        cy.request({
            method:'GET',
            url: 'https://swapi.dev/api/people/2/',
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body).to.exist;
            expect(response.body.films[0]).to.eq('https://swapi.dev/api/films/1/')
            expect(response.body.films[1]).to.eq('https://swapi.dev/api/films/2/')
            expect(response.body.films[2]).to.eq('https://swapi.dev/api/films/3/')
            expect(response.body.films[3]).to.eq('https://swapi.dev/api/films/4/')
            expect(response.body.films[4]).to.eq('https://swapi.dev/api/films/5/')
            expect(response.body.films[5]).to.eq('https://swapi.dev/api/films/6/')
        })
      });

  });
  