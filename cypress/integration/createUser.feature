Feature: Create user

    Scenario: No authorization to create user
        Given I don't have a valid token
        When I try to access the endpoint to create a user
        Then the response status code should be 401
        And the data.message should be 'Authentication failed'

    Scenario: Create user successfully
        Given A request body with all the required fields
        When I access the endpoint to create a user
        Then the response status code should be 201
        And the reponse body should have all the required fields
    
    Scenario: Try to create a user with none of the required fields
        Given A request body missing all of the required fields
        When I access the endpoint to create a user with empty response body
        Then the response status code should be 422
        And the data.message should be 'can't be blank'