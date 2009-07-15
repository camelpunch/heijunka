require 'net/http'
require 'rubygems'
require 'couchrest'

task :default do
  couch = CouchRest.new
  database = couch.database! 'heijunka'

  javascript = database.get 'javascript'

  Dir['request.js'].each do |filename|
    file_path = "/heijunka/javascript/#{filename}"
    javascript.put_attachment filename, File.read(filename)
  end
end
