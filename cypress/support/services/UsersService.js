/// <reference types="Cypress" />

const url = Cypress.config("baseUrl")

class UsersService {
    
    getUserDetails(id, alias){
        cy.request("GET", `${url}/users/${id}`).as(alias)
    }

    createUser(auth, body, alias){
        //cy.request("POST", `${url}/users`, body).auth(null, null, true, auth).as(alias)
        cy.request({
            method: 'POST',
            url: `${url}/users`,
            body: body,
            auth: {
                'bearer': auth
              }
        }).as(alias)
    }

    checkStatusCode(statusCode, alias){
        cy.get(`${alias}`).should((response) => {
            expect(response.body.code).to.eq(statusCode)
        })
    }

    checkErrorMessage(message, alias){
        cy.get(`${alias}`).should((response) => {
            expect(response.body.data.message).to.eq(message)
        })
    }

    checkBlankFieldMessage(message, alias){
        cy.get(`${alias}`).should((response) => {
            expect(response.body.data[0].message).to.eq(message)
        })
    }
}

module.exports = UsersService