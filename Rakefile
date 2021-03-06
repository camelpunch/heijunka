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

    if document['views']
      document['views'][view_name] = {}
    else
      document.merge!(
        'views' => {
          view_name => {}
        }
      )
    end

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

  # html files
  %w(home).each do |document_name|
    document = heijunka.get(document_name)

    Dir["#{document_name}/*"].each do |path|
      filename = File.basename(path)
      extension = File.extname(path)
      document.put_attachment filename, File.read(path), {
        'Content-Type' => MIME_TYPES[extension]
      }
    end
  end

  # js and css
  %w(javascripts stylesheets).each do |dir_name|
    document = heijunka.get('static')
    concatenated = ''

    paths = Dir["#{dir_name}/*"].sort
    extension = File.extname(paths.first)

    paths.each do |path|
      concatenated << File.read(path)
    end

    document.put_attachment dir_name, concatenated, {
      'Content-Type' => MIME_TYPES[extension]
    }
  end
  
  Rake::Task['load_views'].execute
end

