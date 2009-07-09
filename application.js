$(document).ready( function() {
  // instantiate objects with HTML elements
  $('.stories>ol').each( function() { new Role(this) });
  Role.enableAll();
});

// role class
function Role(element) {
  this.element = element;
  this.name = $(this.element).parents('div').find('h2').html(); 
  console.log('new role: ' + this.name);

  if ($.inArray(this, Role.all) == -1) Role.all.push(this);
}
Role.all = [];
Role.enableAll = function() {
  $(Role.all).each( function() {
    this.connectedSelector = this.getConnectedSelector();

    $(this.element).sortable({
      connectWith: this.connectedSelector,
      receive: function(event, ui) {
        console.log(this, 'received', ui.item, 'from', ui.sender);
      }
    });

    console.log(this.name + ' is draggable to ' + this.connectedSelector);
  });
}
Role.prototype = {
  getConnectedSelector: function() {
    if (this.name == 'Backlog') {
      return '#role_development .stories>ol,#completed_stories .stories>ol';
    } else if (this.name == 'Development') {
      return '#completed_stories .stories>ol,#backlog .stories>ol';
    } else if (this.name == 'Completed Stories') {
      return '#backlog .stories>ol,#role_development .stories>ol';
    }
  }
}

