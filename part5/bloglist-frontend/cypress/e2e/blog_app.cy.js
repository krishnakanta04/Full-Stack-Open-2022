describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Krishnakanta Naik',
      username: 'krishna',
      password: 'helloWorld'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000/')
  })

  it('login form is shown', function() {
    cy.contains('Username').get('input[type=text]')
    cy.contains('Password').get('input[type=password]')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[type=text]').type('krishna')
      cy.get('input[type=password]').type('helloWorld')
      cy.contains('login').click()
      cy.contains('Krishnakanta Naik logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[type=text]').type('krishna')
      cy.get('input[type=password]').type('wrongPassword')
      cy.contains('login').click()
      cy.get('.notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'krishna', password: 'helloWorld'
      }).then(res => {
        localStorage.setItem('loggedInUser', JSON.stringify(res.body))
        cy.visit('http://localhost:3000/')
      })
    })

    it('user can create a blog', function() {
      cy.contains('create new blog').click()
      cy.get('input[name=Title]').type('How to perform cypress test')
      cy.get('input[name=Author]').type('CTO of Cypress')
      cy.get('input[name=Url]').type('testing url')
      cy.get('.create').click()
      cy.contains('How to perform cypress test - CTO of Cypress')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('input[name=Title]').type('How to perform cypress test')
        cy.get('input[name=Author]').type('CTO of Cypress')
        cy.get('input[name=Url]').type('testing url')
        cy.get('.create').click()
      })

      it('user can like a blog', function() {
        cy.contains('view').click()
        cy.get('.likes-btn').click()
        cy.contains('likes- 1')
      })

      it('correct user can delete the blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.on('window:confirm', () => true)
        cy.contains('How to perform cypress test - CTO of Cypress').should('not.exist')
      })

      it('correct user can delete the blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.on('window:confirm', () => true)
        cy.contains('How to perform cypress test - CTO of Cypress').should('not.exist')
      })

      it('other users can\'t delete the blog', function() {
        cy.contains('logout').click()
        const user = {
          name: 'Radha Naik',
          username: 'radha',
          password: 'helloEarth'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.request('POST', 'http://localhost:3003/api/login', {
          username: 'radha', password: 'helloEarth'
        }).then(res => {
          localStorage.setItem('loggedInUser', JSON.stringify(res.body))
          cy.visit('http://localhost:3000/')
        })
        cy.contains('How to perform cypress test - CTO of Cypress').contains('view').click()
        cy.contains('remove').should('not.exist')
      })
    })

    describe('and more than one blog exist', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('input[name=Title]').type('How to perform cypress test')
        cy.get('input[name=Author]').type('CTO of Cypress')
        cy.get('input[name=Url]').type('testing url for cypress')
        cy.get('.create').click().wait(500)

        cy.contains('create new blog').click()
        cy.get('input[name=Title]').type('How to perform jest test')
        cy.get('input[name=Author]').type('CTO of Jest')
        cy.get('input[name=Url]').type('testing url for jest')
        cy.get('.create').click().wait(500)
      })
      it.only('blogs with most likes are at the top', function() {
        cy.contains('How to perform cypress test - CTO of Cypress').contains('view').click()
        cy.get('.likes-btn').click().wait(500).click().wait(500)
        cy.contains('hide').click()
        cy.contains('How to perform jest test - CTO of Jest').contains('view').click()
        cy.get('.likes-btn')
          .click()
          .wait(500)
          .click()
          .wait(500)
          .click()
          .wait(500)

        cy.get('.blog').eq(0).should('contain', 'How to perform jest test')
        cy.get('.blog').eq(1).should('contain', 'How to perform cypress test')
      })
    })
  })
})