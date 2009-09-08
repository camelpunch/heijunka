Feature: Drag Stories
  As a developer
  I want to drag a story into my box
  So that I can show that I am working on the story

  Scenario: Drag story
    Given I have a role, 'Development'
    And story 'New design' is in the backlog
    And I am on the homepage
    When I drag story 'New design' to role 'Development'
    And I refresh the browser
    Then I should see that 'New design' is assigned to 'Development'

  Scenario: Drag story to new role
    Given story 'Log in system' is in the backlog
    And I am on the homepage
    When I follow 'New Role'
    And I fill in 'Name for role' with 'Test role'
    And I press 'Create'
    When I drag story 'Log in system' to role 'Test role'
    Then I should see that 'Log in system' is assigned to 'Test role'
    When I refresh the browser
    Then I should see that 'Log in system' is assigned to 'Test role'
