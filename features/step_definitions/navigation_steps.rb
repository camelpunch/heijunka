Given /^I am on the homepage$/ do
  @@browser.open 'http://localhost:5984/heijunka/home/index.html'
end

When /^I follow '(.*)'$/ do |link_text|
  @@browser.click("link=#{link_text}")
end

When /^I fill in '(.*)' with '(.*)'$/ do |label, text|
  pending
  id = @@browser.label(:text, label).for
  @@browser.text_field(:id, id).value = text
end

When /^I press '(.*)'$/ do |button_text|
  pending
  @@browser.button(button_text).click
end

Then /^I should see '(.*)'$/ do |text|
  @@browser.text?(text).should be_true
end

