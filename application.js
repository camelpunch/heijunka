$(document).ready(function() {
  // add ol to all empty story divs
  $('#roles .stories').each( function() {
    if (!$(this).find('ol')[0]) {
      $(this).append('<ol></ol>');
    }
  });

  // on click, move any story to the next role for now
  $('.story').each( function() { new Story(this) });
  $('#roles>ol>li').each( function() { new Role(this) });
});

// story class
function Story(element) {
  $(element).click( Story.move );
}
Story.move = function() {
  console.log('moving');
  var story = $(this).remove();

  $('#role_development .stories ol').append(story);
  $(this).click(Story.move);
  return false;
}

// backlog singleton
var Backlog = {
}

// role class
function Role(element) {
  this.name = $(element).find('h2').html(); 
  console.log(this.name);
}

// completed stories singleton
