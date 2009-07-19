require 'net/http'
require 'rubygems'
require 'couchrest'

MIME_TYPES = {
  '.js' => 'application/javascript',
  '.html' => 'text/html',
  '.css' => 'text/css',
}

task :default do
  couch = CouchRest.new
  database = couch.database! 'heijunka'

  %w(home javascripts stylesheets).each do |document_name|
    document = database.get document_name

    Dir["#{document_name}/*"].each do |path|
      filename = File.basename(path)
      file_path = "/heijunka/#{document_name}/#{filename}"
      document.put_attachment filename, File.read(path), {
        'Content-Type' => MIME_TYPES[File.extname(path)]
      }
    end
  end
end

