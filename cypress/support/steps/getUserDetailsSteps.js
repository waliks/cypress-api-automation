/* global Given, Then, When, And */

import UsersService from '../services/UsersService'
import { userDetailsSchema } from '../schemas/userDetailsSchema'
import { failedSchema } from '../schemas/failedSchema'

const userService = new UsersService
const validId = 42
const invalidId = 99999
let dataUserDatails, dataFailed

// Scenario: Get user details with valid id
    Given("A valid id", () => {
    
    })

    When("I access the endpoint to get user details", () => {
        userService.getUserDetails(validId, "userDetails")
        cy.get('@userDetails').then((response) => {
            dataUserDatails = response.body
        })
    })

    Then("response status code should be 200", () => {
        userService.checkStatusCode(200, "@userDetails")
    })
    
    And("the response body should match json schema for user details", () => {
        userService.validateSchema(userDetailsSchema, dataUserDatails)
    })

// Scenario: Try to get user details with invalid id
    Given("An invalid id", () => {

    })

    When("I access the endpoint to get user details with the invalid id", () => {
        userService.getUserDetails(invalidId, "invalidUserDetails")
        cy.get('@invalidUserDetails').then((response) => {
            dataFailed = response.body
        })
    })

    Then("the failed response status code should be 404", () => {
        userService.checkStatusCode(404, "@invalidUserDetails")
    })

    And("the failed message should be 'Resource not found'", () => {
        userService.checkErrorMessage('Resource not found', "@invalidUserDetails")
    })

    And("the response body should match json schema for failed user details", () => {
        userService.validateSchema(failedSchema, dataFailed)
    })