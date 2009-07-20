require 'rubygems'
require 'selenium/client'

Before do
  @browser = Selenium::Client::Driver.new(
    :host => 'localhost', 
    :port => 4444,
    :browser => '*firefox', 
    :url => 'http://localhost:5984'
  )
  @browser.start_new_browser_session
end

After do
  @browser.close_current_browser_session
end
