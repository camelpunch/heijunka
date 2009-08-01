require 'net/http'
require 'rubygems'
require 'couchrest'

MIME_TYPES = {
  '.js' => 'application/javascript',
  '.html' => 'text/html',
  '.css' => 'text/css',
}

task :default => [:test]

task :test do
  ruby "-S cucumber features"
end

task :load_views do
  Dir["design/*/*/views/*"].each do |view_path|
    database_name, design_document_name, view_name = 
      view_path.scan(/design\/(.*)\/(.*)\/views\/(.*)$/).first

    database = CouchRest.database!(database_name)
    design_document_id = "_design/#{design_document_name}"

    begin
      document = database.get(design_document_id)
    rescue RestClient::ResourceNotFound
      document = {"_id" => design_document_id}
    end

    map_path = File.join(view_path, 'map.js')
    reduce_path = File.join(view_path, 'reduce.js')

    document.merge!(
      'views' => {
        view_name => {}
      }
    )

    begin
      map_function = File.read(map_path)
      document['views'][view_name]['map'] = map_function
    rescue Errno::ENOENT
    end

    begin
      reduce_function = File.read(reduce_path)
      document['views'][view_name]['reduce'] = reduce_function
    rescue Errno::ENOENT
    end

    database.save_doc(document)
  end
end

task :load do
  heijunka = CouchRest.database!('heijunka')

  # static files
  %w(home javascripts stylesheets).each do |document_name|
    document = heijunka.get(document_name)

    Dir["#{document_name}/*"].each do |path|
      filename = File.basename(path)
      file_path = "/heijunka/#{document_name}/#{filename}"
      extension = File.extname(path)
      document.put_attachment filename, File.read(path), {
        'Content-Type' => MIME_TYPES[extension]
      }
    end
  end
  
  Rake::Task['load_views'].execute
end

