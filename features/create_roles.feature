Feature: Create Roles
  As a manager
  I want to create roles
  So that my Heijunka box fits the structure of my organisation

  Scenario: Click new role
    Given I am on the homepage
    When I follow 'New Role'
    Then I should see 'Name for role'

