require 'rubygems'
require 'celerity'
require 'couchrest'
require 'ruby-debug'

@@browser = Celerity::Browser.new(:javascript_exceptions => true,
                                  :status_code_exceptions => true,
                                  :log_level => :severe)
@@roles = CouchRest.database! 'roles'
@@stories = CouchRest.database! 'stories'


