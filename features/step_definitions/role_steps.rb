Given /^I have a role, '(.*)'$/ do |role_name|
  roles.save_doc(:name => role_name)
end

Then /^I should see a new role, '(.*)'$/ do |role_name|
  @@browser.element?('//h2[text()="'+role_name+'"]').should be_true
end

