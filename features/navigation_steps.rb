Given /^I am on the home page$/ do
  @browser.open '/heijunka/home/index.html' 
end

When /^I follow '(.*)'$/ do |link_text|
  @browser.click("link=#{link_text}")
end

Then /^I should see '(.*)'$/ do |text|
  included = @browser.text?(text)
  included.should be_true
end
