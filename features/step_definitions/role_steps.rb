Then /^I should see a new role, '(.*)'$/ do |role_name|
  @@browser.h2(:text, role_name).exists
end

