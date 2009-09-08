Feature: Delete roles
  As a manager
  I want to delete roles
  So that my Heijunka box fits the structure of my organisation

  Scenario: Delete existing role
    Given I have a role, 'Deployment'
    And I am on the homepage
    When I press 'Delete' next to role 'Deployment'
    Then I should not see the 'Deployment' role
    When I go to the homepage
    Then I should not see the 'Deployment' role

  Scenario: Delete new role
    Given I am on the homepage
    When I follow 'New Role'
    And I fill in 'Name for role' with 'Development'
    And I press 'Create'
    And I press 'Delete' next to role 'Development'
    Then I should not see the 'Development' role
