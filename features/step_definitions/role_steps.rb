Given /^I have a role, '(.*)'$/ do |role_name|
  role = @@roles.get(role_name)
  @@roles.save_doc('_id' => role_name, 
                   '_rev' => role['_rev'],
                   :name => role_name)
end

Then /^I should see a new role, '(.*)'$/ do |role_name|
  @@browser.h2(:text, role_name).exists
end

