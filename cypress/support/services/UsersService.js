/// <reference types="Cypress" />

const url = Cypress.config("baseUrl")
const Ajv = require("ajv")
const ajv = new Ajv()

class UsersService {
    
    getUserDetails(id, alias){
        cy.request({
            method: "GET", 
            url: `${url}/users/${id}`
        }).as(alias)
    }

    createUser(auth, body, alias){
        cy.request({
            method: 'POST',
            url: `${url}/users`,
            body: body,
            auth: {
                'bearer': auth
              }
        }).as(alias)
    }

    deleteUser(auth, alias, id){
        cy.request({
            method: 'DELETE',
            url: `${url}/users/${id}`,
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

    checkErrorFieldMessage(message, alias){
        cy.get(`${alias}`).should((response) => {
            expect(response.body.data[0].message).to.eq(message)
        })
    }

    validateSchema(schema, data){
        const valid = ajv.validate(schema, data)
        if (!valid) console.log(ajv.errors)
        expect(valid).to.eq(true)
    }
}

module.exports = UsersService