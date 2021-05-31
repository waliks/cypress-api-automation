/* global Given, Then, When, And */

import UsersService from '../services/UsersService'
const userService = new UsersService
const validId = 42
const invalidId = 99999

// Scenario: Get user details with valid id
    Given("A valid id", () => {
    
    })

    When("I access the endpoint to get user details", () => {
        userService.getUserDetails(validId, "userDetails")
    })

    Then("response status code should be 200", () => {
        userService.checkStatusCode(200, "@userDetails");
    }) 

// Scenario: Try to get user details with invalid id
    Given("An invalid id", () => {

    })

    When("I access the endpoint to get user details with the invalid id", () => {
        userService.getUserDetails(invalidId, "invalidUserDetails")
    })

    Then("the failed response status code should be 404", () => {
        userService.checkStatusCode(404, "@invalidUserDetails")
    })

    And("the failed message should be 'Resource not found'", () => {
        userService.checkErrorMessage('Resource not found', "@invalidUserDetails")
    })