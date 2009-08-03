$(document).ready( function() {
  // add ol to all empty story divs and role div
  $('.stories, #roles').each( function(i) {
    if (!$(this).find('ol')[0]) {
      $(this).append('<ol></ol>');
    }
  });

  var documents = $.jqCouch.connection('doc');

  Role.buildAll();

  // build all stories
  Story.buildAll();

  // activate new role link
  $('a[href="/roles/new"]').click(Role.create);

  // activate new story link
  $('a[href="/stories/new"]').click(Story.create);
});

