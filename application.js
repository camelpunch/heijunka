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

// request class
function Request(title, options) {
  $('#request').remove();

  $('body').append(
    '<div id="request">'+
    '<h2>'+title+'</h2>'+
    '<form>'+
    '</form>'+
    '</div>'
  );

  $(options).each( function() {
    if (this.type == 'text') {
      $('#request form').append(
        '<p>'+
        '<label for="'+this.name+'">'+this.label+'</label>'+
        '<input id="'+this.name+'" type="text" name="'+this.name+'" value="'+this.value+'" />'+
        '</p>'
      );
    }
  });

  this.params = {
    name: ''
  }
}

// story class
function Story(name, content) {
  this.name = name;
  this.content = content;
  Role.backlog().stories.push(this);
}

// role class
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
Role.buildFromPrompt = function() {
  var request = new Request('New Role', [
    {label: 'Name', name: 'name', type: 'text', value: ''}
  ]);

  if (request.params.name) Role.build(request.params.name);
  return false;
}
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
