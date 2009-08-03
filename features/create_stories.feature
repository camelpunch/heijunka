Feature: Create Stories
  As a user
  I want to create stories for the backlog
  So that I can specify business requirements

  Scenario: Create new story
    Given I am on the homepage
    When I follow 'New Story'
    And I fill in 'Name for story' with 'Log in system'
    And I fill in 'Story content' with 'Some story content'
    And I press 'Create'
    Then I should see story, 'Log in system' with content 'Some story content'

  Scenario: Create story with strange name
    Given I am on the homepage
    When I follow 'New Story'
    And I fill in 'Name for story' with '%/a/asdf'
    And I fill in 'Story content' with 'Some story content'
    And I press 'Create'
    Then I should see story, '%/a/asdf' with content 'Some story content'

  Scenario: Redisplay
    Given story 'Log in system' is in the backlog
    When I go to the homepage
    Then I should see story, 'Log in system'

