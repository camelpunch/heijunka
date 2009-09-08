Given /^story '(.*)' is in the backlog$/ do |story_name|
  story = {
    :name => story_name,
    :role_id => 'backlog',
    :content => [
      "As the #{story_name} story", 'I want to be created', 'So that my master can test'
    ]
  }

  result = stories.save_doc(story)
  result['ok'].should be_true
end

When /^I drag story '(.*)' to role '(.*)'$/ do |story_name, role_name|
  story = '//h3[text()="'+story_name+'"]/ancestor::li[@class="story"]'
  role = '//h2[text()="'+role_name+'"]/following-sibling::div//ol'

  @@browser.drag_and_drop_to_object(story, role)
end

Then /^I should see story, '([a-zA-Z ]*)'$/ do |story_name|
  @@browser.element?('//h3[text()="'+story_name+'"]').should be_true
  @@browser.element?('//li[text()="As the '+story_name+' story"]').should be_true
end

Then /^I should see story, '([^']+)' with content '(.*)'$/ do |story_name, content|
  @@browser.element?('//h3[text()="'+story_name+'"]').should be_true
  @@browser.element?('//li[text()="'+content+'"]').should be_true
end

Then /^I should see that '(.*)' is assigned to '(.*)'$/ do |story_name, role_name|
  present =
    @@browser.element?('//h2[text()="'+role_name+'"]/following-sibling::div//h3[text()="'+story_name+'"]')

  present.should be_true
end

