Given /^I have a role, '(.*)'$/ do |role_name|
  roles.save_doc(:name => role_name)
end

Then /^I should see the '(.*)' role$/ do |role_name|
  @@browser.element?('//h2[text()="'+role_name+'"]').should be_true
end

Then /^I should not see the '(.*)' role$/ do |role_name|
  @@browser.element?('//h2[text()="'+role_name+'"]').should be_false
end

When /^I press 'Delete' next to role '(.*)'$/ do |role_name|
  role_id = 
    roles.view('groups/by_name', :key => role_name)['rows'].first['id']
  @@browser.click('//li[@id="role_'+role_id+'"]//input[@value="Delete"]')
  sleep 0.2
end

