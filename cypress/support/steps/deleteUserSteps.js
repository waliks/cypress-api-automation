/* global Given, Then, When, And */

import UsersService from '../services/UsersService'
const faker = require('faker')
const token = Cypress.config("token")
const userService = new UsersService
const invalidId = 99999
const validId = 42

let invalidToken, idToDelete
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
    })
    Then("the failed deletion response status code should be 401", () => {
        userService.checkStatusCode(401, '@noAuth')
    })
    And("the failed deletion data.message should be 'Authentication failed'", () => {
        userService.checkErrorMessage('Authentication failed', '@noAuth')
    })

// Scenario: Delete user successfully
    Given("I have a valid id", () => {
        userService.createUser(token, body, "createUserSuccesfully")
        cy.get('@createUserSuccesfully')
          .then((response) => { idToDelete = response.body.data.id })
    })
    When("I access the endpoint to delete a user", () => {
        userService.deleteUser(token, 'deleteUserSuccesfully', idToDelete)
    })
    Then("response status code should be 204", () => {
        userService.checkStatusCode(204, '@deleteUserSuccesfully')
    })

// Scenario: Try to delete a user with invalid id
    Given("I have an invalid id", () => {

    })
    When("I access the endpoint to try to delete a user", () => {
        userService.deleteUser(token, 'deleteUserFailed', invalidId)
    })
    Then("the failed deletion response status code should be 404", () => {
        userService.checkStatusCode(404, '@deleteUserFailed')
    })
    And("the failed deletion message should be 'Resource not found'", () => {
        userService.checkErrorMessage('Resource not found', '@deleteUserFailed')
    })