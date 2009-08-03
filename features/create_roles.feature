Feature: Create Roles
  As a manager
  I want to create roles
  So that my Heijunka box fits the structure of my organisation

  Scenario: See new role
    Given I am on the homepage
    When I follow 'New Role'
    And I fill in 'Name for role' with 'Development'
    And I press 'Create'
    Then I should see the 'Development' role
    When I go to the homepage
    Then I should see the 'Development' role

  Scenario: Redisplay
    Given I have a role, 'Deployment'
    When I go to the homepage
    Then I should see the 'Deployment' role

