$(document).ready( function() {
  // add ol to all empty story divs
  $('.stories').each( function(i) {
    if (!$(this).find('ol')[0]) {
      $(this).append('<ol></ol>');
    }
  });

  // instantiate objects with HTML elements
  $('.stories>ol').each( function() { new Role(this) });
  Role.enableAll();

  // activate new role link
  $('a[href="/roles/new"]').click(Role.newFromName);
    
});

// role class
function Role(element) {
  this.element = element;
  this.name = $(this.element).parents('.role').find('h2').html(); 
  if ($.inArray(this, Role.all) == -1) {
    Role.all.push(this);
    console.log('new role: ' + Role.all.length);
  }
}
Role.all = [];
Role.newFromName = function() {
  var name = prompt('Role name');

  if (name) {
    $('#roles>ol').append('<li class="role"><h2>'+name+'</h2><div class="stories><ol></ol></div></li>');
    new Role($('#roles>ol>li:last-child>.stories>ol'));
    Role.enableAll();
    return false;
  } else {
    Role.newFromName();     
  }

  return false
}
Role.enableAll = function() {
  $(Role.all).each( function() {
    $(this.element).sortable({
      connectWith: '.role .stories>ol',
      receive: function(event, ui) {
        console.log(this, 'received', ui.item, 'from', ui.sender);
      }
    });
  });
}

