$(document).ready( function() {
  // add ol to all empty story divs and role div
  $('.stories, #roles').each( function(i) {
    if (!$(this).find('ol')[0]) {
      $(this).append('<ol></ol>');
    }
  });

  var documents = $.jqCouch.connection('doc');

  // instantiate objects with HTML elements
  $('.role').each( function() { new Role(this) });
  Role.enableAll();

  // build stories from backlog
  var stories = documents.all('stories').rows;

  $(stories).each( function() {
    var story = documents.get('stories/' + this.id);
    Story.build(story.name, story.content);
  });

  // activate new role link
  $('a[href="/roles/new"]').click(Role.create);

  // activate new story link
  $('a[href="/stories/new"]').click(Story.create);

  // temporarily add starter role
  Role.build('Starter');
});

