require 'rubygems'
require 'selenium/client'
require 'couchrest'
require 'ruby-debug'

def roles
  @@roles ||= CouchRest.database! 'roles'
end

def stories
  @@stories ||= CouchRest.database! 'stories'
end

@@browser = Selenium::Client::Driver.new(
    :host => 'localhost', 
    :port => 4444,
    :browser => '*firefox', 
    :url => 'http://localhost:5984'
  )
@@browser.start_new_browser_session

@@browser.get_eval('window.resizeTo(1280,800)')

at_exit do
  @@browser.close_current_browser_session
  roles
  stories
end

Before do
  roles.delete!
  @@roles = nil
  roles

  stories.delete!
  @@stories = nil
  stories
end

