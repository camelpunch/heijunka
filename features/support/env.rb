require 'rubygems'
#require 'selenium/client'
require 'celerity'

@@browser = Celerity::Browser.new(:javascript_exceptions => true,
                                  :status_code_exceptions => true,
                                  :log_level => :severe)
Before do
=begin
  @browser = Selenium::Client::Driver.new(
    :host => 'localhost', 
    :port => 4444,
    :browser => '*firefox', 
    :url => 'http://localhost:5984',
    :javascript_framework => :jquery
  )
  @browser.start_new_browser_session
=end
end

After do
  #@browser.close_current_browser_session
end
