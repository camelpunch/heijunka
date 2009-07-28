Feature: Drag Stories
  As a developer
  I want to drag a story into my box
  So that I can show that I am working on the story

  Scenario: Drag story
    Given I have a role, 'Development'
    And story 'New design' is in the backlog
    And I am on the homepage
    When I drag 'New design' to 'Development'
    And I reload the page
    Then I should see that 'New design' is assigned to 'Development'

