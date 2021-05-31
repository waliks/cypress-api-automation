/* global Given, Then, When, And */

import UsersService from '../services/UsersService'
import { createUserEmptyBodySchema } from '../schemas/createUserEmptyBodySchema'
import { userDetailsSchema } from '../schemas/userDetailsSchema'
import { failedSchema } from '../schemas/failedSchema'

const faker = require('faker')
const token = Cypress.config("token")
const userService = new UsersService

let body, emptyBody, invalidToken, userCreatedId, dataEmptyBody,
    dataNoAuth, dataUserCreated

// Scenario: No authorization to create user
    Given("I don't have a valid token", () => {
        invalidToken = "Bearer invalid"
    })

    When("I try to access the endpoint to create a user", () => {
        userService.createUser(invalidToken, body, "noAuth")
        cy.get('@noAuth').then((response) => {
            dataNoAuth = response.body
        })
    })

    Then("the response status code should be 401", () => {
        userService.checkStatusCode(401, "@noAuth")
    })

    And("the data.message should be 'Authentication failed'", () => {
        userService.checkErrorMessage('Authentication failed', "@noAuth")
    })

    And("the response body should match json schema for no authorization to create user", () => {
        userService.validateSchema(failedSchema, dataNoAuth)
    })

//Scenario: Create user successfully
    Given("A request body with all the required fields", () => {
        body = {
            "name": faker.name.firstName(),
            "gender": "Male",
            "email": faker.internet.email(),
            "status": "Active"
        }
    })

    When("I access the endpoint to create a user", () => {
        userService.createUser(token, body, "userCreated")
        // Getting the id of the new user
        cy.get('@userCreated').then((response) => {
            userCreatedId = response.body.data.id
            dataUserCreated = response.body
        })
    })

    Then("the response status code should be 201", () => {
        userService.checkStatusCode(201, '@userCreated');
    })

    And("the reponse body should have all the required fields", () => {
        userService.validateSchema(userDetailsSchema, dataUserCreated)
    // Deleting the user after the validations
        userService.deleteUser(token, 'userDeleted', userCreatedId)
    })

// Scenario: Try to create a user with none of the required fields

    Given("A request body missing all of the required fields", () => {
        emptyBody = {}
    })

    When("I access the endpoint to create a user with empty response body", () => {
        userService.createUser(token, emptyBody, "userEmptyBody")
        cy.get('@userEmptyBody').then((response) => {
            dataEmptyBody = response.body
        })
    })

    Then("the response status code should be 422", () => {
        userService.checkStatusCode(422, "@userEmptyBody")
    })

    And("the data.message should be 'can't be blank'", () => {
        userService.checkBlankFieldMessage("can't be blank", "@userEmptyBody")
    })

    And("the response body should match json schema missing the required fields", () => {
        userService.validateSchema(createUserEmptyBodySchema, dataEmptyBody)
    })
