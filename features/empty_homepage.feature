Feature: Empty homepage
  As a user
  I want to be able to visit the homepage with an empty database
  So that I can begin working

  Scenario: Visit empty homepage
    Given there is an empty database
    When I go to the homepage
    Then I should see the 'Backlog' role

