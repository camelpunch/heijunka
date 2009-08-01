Feature: Create Roles
  As a manager
  I want to create roles
  So that my Heijunka box fits the structure of my organisation

  Scenario: Click new role
    Given I am on the homepage
    When I follow 'New Role'
    And I fill in 'Name for role' with 'Development'
    And I press 'Create'
    Then I should see the 'Development' role

