$(document).ready( function() {
  // add ol to all empty story divs and role div
  $('.stories, #roles').each( function(i) {
    if (!$(this).find('ol')[0]) {
      $(this).append('<ol></ol>');
    }
  });

  // instantiate objects with HTML elements
  $('.role').each( function() { new Role(this) });
  Role.enableAll();

  // activate new role link
  $('a[href="/roles/new"]').click(Role.buildFromPrompt);

  // activate new story link
  $('a[href="/stories/new"]').click(Story.buildFromPrompt);

  // temporarily add starter role
  Role.build('Starter');
});

