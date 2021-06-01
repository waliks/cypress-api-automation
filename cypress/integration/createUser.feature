Feature: Create user

    Scenario: No authorization to create user
        Given I don't have a valid token
        When I try to access the endpoint to create a user
        Then the response status code should be 401
        And the data.message should be 'Authentication failed'
        And the response body should match json schema for no authorization to create user

    Scenario: Create user successfully
        Given A request body with all the required fields
        When I access the endpoint to create a user
        Then the response status code should be 201
        And the reponse body should have all the required fields

    Scenario: Try to create a user with email already taken
        Given a valid body, but with an email already registered
        When I access the endpoint to create a user with such email
        Then the failed response status code should be 422
        And the error message should be 'has already been taken' 
        And the reponse body should match json schema for failure
    
    Scenario: Try to create a user with none of the required fields
        Given A request body missing all of the required fields
        When I access the endpoint to create a user with empty response body
        Then the response status code should be 422
        And the data.message should be 'can't be blank'
        And the response body should match json schema missing the required fields
