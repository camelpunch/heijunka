$(document).ready( function() {
  // add ol to all empty story divs
  $('#roles .stories').each( function(i) {
    if (!$(this).find('ol')[0]) {
      $(this).append('<ol id="role_stories_list_' + i + '"></ol>');
    }
  });

  // instantiate objects with HTML elements
  $('.story').each( function() { new Story(this) });
  $('#roles .stories>ol').each( function() { new Role(this) });
});

// story class
function Story(element) {
  $(element).draggable({
    cursor: 'pointer',
    revert: 'invalid'
  });
}

// backlog singleton
function Backlog() {
}

// role class
function Role(element) {
  this.element = element;
  this.name = $(element).parents('ol').find('h2').html(); 

  if ($.inArray(this.element.id, Role.droppableElementIds) == -1) {
    Role.droppableElementIds.push(this.element.id);
    $(element).droppable({
      hoverClass: 'hover',
      tolerance: 'pointer',
      drop: function(event, ui) {
        var storyElement = ui.draggable;

        storyElement.remove();

        $(this).append(storyElement);
        storyElement.css('position', 'static');
      }
    });
  }
}
Role.droppableElementIds = [];

// completed stories singleton
function CompletedStories() {
}
