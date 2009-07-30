require 'rubygems'
require 'selenium/client'
require 'couchrest'
require 'ruby-debug'

@@roles = CouchRest.database! 'roles'
@@stories = CouchRest.database! 'stories'

@@browser = Selenium::Client::Driver.new(
    :host => 'localhost', 
    :port => 4444,
    :browser => '*firefox', 
    :url => 'http://localhost:5984'
  )
@@browser.start_new_browser_session

at_exit do
  @@browser.close_current_browser_session
end

