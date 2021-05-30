/* global Given, Then, When, And */

import UsersService from '../services/UsersService'
const faker = require('faker')
const token = Cypress.config("token")
const userService = new UsersService
let body, emptyBody

Given("I don't have a valid token", () => {

})

When("I try to access the endpoint to create a user", () => {
    userService.createUser("invalidToken", body, "noAuth")
})

Then("the response status code should be 401", () => {
    userService.checkStatusCode(401, "@noAuth")
})

And("the data.message should be 'Authentication failed'", () => {
    userService.checkErrorMessage('Authentication failed', "@noAuth")
})

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
})

Then("the response status code should be 201", () => {
    userService.checkStatusCode(201, "@userCreated");
})

And("the reponse body should have all the required fields", () => {

})

Given("A request body missing all of the required fields", () => {
    emptyBody = {}
})

When("I access the endpoint to create a user with empty response body", () => {
    userService.createUser(token, emptyBody, "userEmptyBody")
})

Then("the response status code should be 422", () => {
    userService.checkStatusCode(422, "@userEmptyBody")
})

And("the data.message should be 'can't be blank'", () => {
    userService.checkBlankFieldMessage("can't be blank", "@userEmptyBody")
})
