require 'rubygems'
#require 'selenium/client'
require 'celerity'
require 'ruby-debug'

@@browser = Celerity::Browser.new(:javascript_exceptions => true,
                                  :status_code_exceptions => true,
                                  :log_level => :severe)

