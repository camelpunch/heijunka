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
  Story.buildAllForRoleId('backlog');

  // activate new role link
  $('a[href="/roles/new"]').click(Role.create);

  // activate new story link
  $('a[href="/stories/new"]').click(Story.create);

  // build roles from database
  $.getJSON('/roles/_design/groups/_view/all', function(data) {
    if (data.rows[0]) {
      $(data.rows[0].value).each( function() {
        Role.build(this.name);
      });
    }
  });
});

