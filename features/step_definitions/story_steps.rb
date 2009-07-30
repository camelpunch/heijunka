Given /^story '(.*)' is in the backlog$/ do |story_name|
  story = @@stories.get(story_name)
  @@stories.save_doc('_id' => story_name, 
                     '_rev' => story['_rev'],
                     :name => story_name)
end

