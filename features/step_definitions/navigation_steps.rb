Given /^I am on the homepage$/ do
#  @browser.open '/heijunka/home/index.html' 
  @@browser.goto 'http://localhost:5984/heijunka/home/index.html'
end

When /^I follow '(.*)'$/ do |link_text|
  @@browser.link(:text, link_text).click
#  @browser.click("link=#{link_text}", :wait_for => :ajax)
end

Then /^I should see '(.*)'$/ do |text|
  @@browser.contains_text(text).should_not be_nil
#  included = @browser.text?(text)
#  included.should be_true
end
