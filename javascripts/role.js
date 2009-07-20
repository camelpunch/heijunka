// constructor expects element to exist
function Role(element) {
  this.element = element;
  this.sortableElement = $(this.element).find('.stories>ol');
  this.name = $(this.element).find('h2').html(); 

  // disallow creation of roles with existing names
  if ($.inArray(this.name, Role.names()) > -1) {
    Role.destroy(this.element);
    return false;
  }

  // keep all new roles in Role.all
  if ($.inArray(this, Role.all) == -1) {
    Role.all.push(this);
    console.log('new role: ' + Role.all.length);
  }
}
Role.all = [];
// prompts user for name and builds
Role.create = function() {
  var request = new Request({
    title: 'New Role', 
    elements: [
      {label: 'Name for role', name: 'name', type: 'text', value: ''}
    ],
    submit: function() {
      Role.build($('#request #name').val());
    }
  });

  return false;
}
// builds a role element and calls constructor
Role.build = function(name) {
  $('#roles>ol').append(
      '<li class="role">'+
      '<h2>'+name+'</h2>'+
      '<div class="stories active"><ol></ol></div>'+
      '<div class="stories buffer"><ol></ol></div>'+
      '</li>');
  new Role($('#roles>ol>li:last-child'));

  // re-enable all roles so each is draggable to/from
  Role.enableAll();
}
Role.names = function() {
  return $.map(Role.all, function(role) { return role.name });
}
Role.destroy = function(element) {
  $(element).remove(); 
}
Role.enableAll = function() {
  $(Role.all).each( function() { this.enable() });
}
Role.receive = function(event, ui) {
  // TODO: disallow dragging if role has reached limit
  console.log($(this).parent().attr('class'), 'received', ui.item, 'from', ui.sender);
}
Role.prototype = {
  enable: function() {
    $(this.sortableElement).sortable({
      connectWith: '.role .stories>ol',
      receive: Role.receive
    }); 
  }
}

