Given /^I am on the homepage$/ do
  @@browser.open 'http://localhost:5984/heijunka/home/index.html'
  sleep 0.2
end

When /^I refresh the browser$/ do
  sleep 2
  @@browser.refresh
  sleep 2
end

When /^I go to the homepage$/ do
  @@browser.open 'http://localhost:5984/heijunka/home/index.html'
end

When /^I follow '(.*)'$/ do |link_text|
  @@browser.click("link=#{link_text}")
end

When /^I fill in '(.*)' with '(.*)'$/ do |label, text|
  id = @@browser.get_attribute('//label[text()="'+label+'"]@for')
  @@browser.type(id, text)
end

When /^I press '([^']*)'$/ do |button_text|
  @@browser.click('//input[@value="'+button_text+'"]')
  sleep 0.2
end

Then /^I should see '(.*)'$/ do |text|
  @@browser.text?(text).should be_true
end

