Feature: Delete user

    Scenario: No authorization to delete user
        Given I don't have a valid token to delete a user
        When I try to access the endpoint to delete a user
        Then the failed deletion response status code should be 401
        And the failed deletion data.message should be 'Authentication failed'
        And the response body should match json schema for no authorization to delete user

    Scenario: Delete user successfully
        Given I have a valid id
        When I access the endpoint to delete a user
        Then response status code should be 204
        And the reponse body should match json schema for succesfully deletion

    Scenario: Try to delete a user with invalid id
        Given I have an invalid id
        When I access the endpoint to try to delete a user
        Then the failed deletion response status code should be 404
        And the failed deletion message should be 'Resource not found'
        And the response body should match json schema for failed deletion