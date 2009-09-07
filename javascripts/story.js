function Story(doc) {
  this.doc = doc;
  this.build();
}
Story.buildAll = function() {
  $.getJSON('/stories/_design/groups/_view/all', 
            function(data) {
    $(data.rows).each( function() {
      new Story(this.value);
    });

    Role.enableAll();
  });
}
Story.create = function() {
  var request = new Request({
    title: 'New Story', 
    elements: [
      {label: 'Name for story', name: 'name', type: 'text', value: ''},
      {label: 'Story content', name: 'content', type: 'textarea', value: ''}
    ],
    submitButtonText: 'Create',
    submit: function() {
      var name = $('#request #name').val();
      var doc = {
        name: name,
        content: $('#request #content').val().split('\n'),
        role_id: 'backlog'
      };

      $.ajax({
        processData: false,
        type: 'POST',
        url: '/stories',
        dataType: 'json',
        data: JSON.stringify(doc),
        success: function(data) {
          doc._id = data.id;
          new Story(doc);
        }
      });
    }
  });

  return false;
}

Story.prototype = {
  build: function() {
    $('#role_'+this.doc.role_id+'>.stories>ol').append(
      '<li id="story_'+this.doc._id+'" class="story">'+
        '<div>'+
          '<h3>'+this.doc.name+'</h3>'+
          '<div class="content">'+
            '<ol><li>'+
            this.doc.content.join('</li><li>') +
            '</li></ol>'+
          '</div>'+
        '</div>'+
      '</li>'
    );   
  }
}
