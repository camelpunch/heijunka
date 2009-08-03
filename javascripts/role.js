function Role(doc) {
  this.doc = doc;
  this.build();

  this.element = $('#role_'+doc._id);
  this.sortableElement = $(this.element).find('.stories>ol');

  // disallow creation of roles with existing names
  if ($.inArray(this.doc.name, Role.names()) > -1) {
    this.element.remove();
    return false;
  }

  // keep all new roles in Role.all
  if ($.inArray(this, Role.all) == -1) {
    Role.all.push(this);
  }
}
Role.all = [];
Role.buildAll = function() {
  new Role({_id: 'backlog', name: 'Backlog'});
  new Role({_id: 'completed_stories', name: 'Completed Stories'});
  $.getJSON('/roles/_design/groups/_view/all', function(data) {
    $(data.rows).each( function() {
      new Role(this.value);
    });
  });
}
Role.find = function(id) {
  var foundRole;
  $(Role.all).each( function() {
    if (this.doc._id == id) foundRole = this;
  });
  return foundRole;
}
// prompts user for name and builds
Role.create = function() {
  var request = new Request({
    title: 'New Role', 
    elements: [
      {label: 'Name for role', name: 'name', type: 'text', value: ''}
    ],
    submitButtonText: 'Create',
    submit: function() {
      var name = $('#request #name').val();
      new Role({_id: name, name: name})
    }
  });

  return false;
}
Role.names = function() {
  return $.map(Role.all, function(role) { return role.doc.name });
}
Role.enableAll = function() {
  $(Role.all).each( function() { this.enable() });
}
Role.receive = function(event, ui) {
  // get story document
  var currentRoleId = $(this).parents('.role').attr('id').substring(5);
  var storyId = $(ui.item).attr('id').substring(6);

  $.getJSON('/stories/'+storyId, function(story) {
    // update story document with new role 
    story.role_id = currentRoleId;
    $.ajax({
      processData: false,
      type: 'PUT',
      url: '/stories/'+storyId,
      data: JSON.stringify(story),
      success: function() {
      }
    });
  });
}
Role.prototype = {
  build: function() {
    $('#roles>ol').append(
        '<li class="role" id="role_'+this.doc._id+'">'+
        '<h2>'+this.doc.name+'</h2>'+
        '<div class="stories active"><ol></ol></div>'+
//        '<div class="stories buffer"><ol></ol></div>'+
        '</li>');
  },
  enable: function() {
    $(this.sortableElement).sortable({
      connectWith: '.role .stories>ol',
      receive: Role.receive
    }); 
  }
}

