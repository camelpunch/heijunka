require 'net/http'
require 'rubygems'
require 'couchrest'

task :default do
  couch = CouchRest.new
  database = couch.database! 'heijunka'

  %w(javascripts stylesheets).each do |document_name|
    document = database.get document_name

    Dir["#{document_name}/*"].each do |filename|
      file_path = "/heijunka/#{document_name}/#{filename}"
      document.put_attachment filename, File.read(filename)
    end
  end
end
