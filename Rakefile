require 'net/http'
require 'rubygems'
require 'couchrest'

task :default do
  couch = CouchRest.new
  database = couch.database! 'heijunka'

  %w(home javascripts stylesheets).each do |document_name|
    document = database.get document_name

    Dir["#{document_name}/*"].each do |path|
      filename = File.basename(path)
      file_path = "/heijunka/#{document_name}/#{filename}"
      document.put_attachment filename, File.read(path)
    end
  end
end
