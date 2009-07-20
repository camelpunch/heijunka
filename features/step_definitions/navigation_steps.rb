Given /^I am on the homepage$/ do
  @@browser.goto 'http://localhost:5984/heijunka/home/index.html'
end

When /^I follow '(.*)'$/ do |link_text|
  @@browser.link(:text, link_text).click
end

Then /^I should see '(.*)'$/ do |text|
  @@browser.contains_text(text).should_not be_nil
end

