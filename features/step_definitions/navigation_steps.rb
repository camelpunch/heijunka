Given /^I am on the homepage$/ do
  @@browser.open 'http://localhost:5984/heijunka/home/index.html'
  sleep 0.5
end

When /^I (go to|reload) the homepage$/ do |arg|
  @@browser.open 'http://localhost:5984/heijunka/home/index.html'
  sleep 0.5
end

When /^I follow '(.*)'$/ do |link_text|
  @@browser.click("link=#{link_text}")
end

When /^I fill in '(.*)' with '(.*)'$/ do |label, text|
  id = @@browser.get_attribute('//label[text()="'+label+'"]@for')
  @@browser.type(id, text)
end

When /^I press '(.*)'$/ do |button_text|
  @@browser.click('//input[@value="'+button_text+'"]')
end

Then /^I should see '(.*)'$/ do |text|
  @@browser.text?(text).should be_true
end

