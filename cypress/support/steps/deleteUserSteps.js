/* global Given, Then, When, And */

import UsersService from '../services/UsersService'
import { deleteUserSchema } from '../schemas/deleteUserSchema'
import { failedSchema } from '../schemas/failedSchema'

const faker = require('faker')
const token = Cypress.config("token")
const userService = new UsersService
const invalidId = 99999
const validId = 42

let invalidToken, idToDelete, dataNoAuth, dataFailed, dataUserDeleted
// To create a valid user for the deletion
let body = {
        "name": faker.name.firstName(),
        "gender": "Male",
        "email": faker.internet.email(),
        "status": "Active"
    }

// Scenario: No authorization to delete user
    Given("I don't have a valid token to delete a user", () => {
        invalidToken = "Bearer invalid"
    })

    When("I try to access the endpoint to delete a user", () => {
        userService.deleteUser(invalidToken, 'noAuth', validId)
        cy.get('@noAuth').then((response) => {
            dataNoAuth = response.body
        })
    })

    Then("the failed deletion response status code should be 401", () => {
        userService.checkStatusCode(401, '@noAuth')
    })

    And("the failed deletion data.message should be 'Authentication failed'", () => {
        userService.checkErrorMessage('Authentication failed', '@noAuth')
    })

    And("the response body should match json schema for no authorization to delete user", () => {
        userService.validateSchema(failedSchema, dataNoAuth)
    })

// Scenario: Delete user successfully
    Given("I have a valid id", () => {
        userService.createUser(token, body, "createUserSuccesfully")
        cy.get('@createUserSuccesfully')
          .then((response) => { idToDelete = response.body.data.id })
    })

    When("I access the endpoint to delete a user", () => {
        userService.deleteUser(token, 'deleteUserSuccesfully', idToDelete)
        cy.get('@deleteUserSuccesfully').then((response) => {
            dataUserDeleted = response.body
        })
    })

    Then("response status code should be 204", () => {
        userService.checkStatusCode(204, '@deleteUserSuccesfully')
    })

    And("the reponse body should match json schema for succesfully deletion", () => {
        userService.validateSchema(deleteUserSchema, dataUserDeleted)
    })

// Scenario: Try to delete a user with invalid id
    Given("I have an invalid id", () => {

    })

    When("I access the endpoint to try to delete a user", () => {
        userService.deleteUser(token, 'deleteUserFailed', invalidId)
        cy.get('@deleteUserFailed').then((response) => {
            dataFailed = response.body
        })
    })

    Then("the failed deletion response status code should be 404", () => {
        userService.checkStatusCode(404, '@deleteUserFailed')
    })
    
    And("the failed deletion message should be 'Resource not found'", () => {
        userService.checkErrorMessage('Resource not found', '@deleteUserFailed')
    })

    And("the response body should match json schema for failed deletion", () => {
        userService.validateSchema(failedSchema, dataFailed)
    })