Feature: Get user details

    Scenario: Get user details with valid id
        Given A valid id
        When I access the endpoint to get user details
        Then response status code should be 200
        And the response body should match json schema for user details

    Scenario: Try to get user details with invalid id
        Given An invalid id
        When I access the endpoint to get user details with the invalid id
        Then the failed response status code should be 404
        And the failed message should be 'Resource not found'
        And the response body should match json schema for failed user details