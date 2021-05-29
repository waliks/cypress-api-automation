/* global Given, Then, When, And */

import UsersService from '../services/UsersService'
const userService = new UsersService
const validId = 42
const invalidId = 99999

Given("A valid id", () => {
  
})

When("I access the endpoint to get user details", () => {
    userService.getUserDetails(validId, "userDetails")
})

//When("the format specification is .json or it's implicit", () => {
  //  userService.checkFormatSpecification();
//})

//Then("the response should be in json format", () => {
  //  loginPage.visualizarBotaoRecuperarSenha();
//})
Then("response status code should be 200", () => {
    userService.checkStatusCode(200, "@userDetails");
}) 

Given("An invalid id", () => {

})

When("I access the endpoint to get user details with the invalid id", () => {
    userService.getUserDetails(invalidId, "invalidUserDetails")
})

Then("response status code should be 404", () => {
    userService.checkStatusCode(404, "@invalidUserDetails")
})