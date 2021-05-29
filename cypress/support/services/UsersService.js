/// <reference types="Cypress" />

const url = Cypress.config("baseUrl")

class UsersService {
    
    getUserDetails(id, alias){
        cy.request("GET", `${url}/users/${id}`).as(alias)
    }

    checkStatusCode(statusCode, alias){
        cy.get(`${alias}`).should((response) => {
            console.log(response.body.code)
            expect(response.body.code).to.eq(statusCode)
        })
    }
}

module.exports = UsersService