function Story(element) {
}
Story.buildAllForRoleId = function(roleId) {
  $.getJSON('/stories/_design/groups/_view/by_role?key="'+roleId+'"', 
            function(data) {
    if (data.rows[0]) {
      $(data.rows[0].value).each( function() {
        Story.build(this.name, this.content);
      });
    }
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
      var documents = $.jqCouch.connection('doc');
      var storyDocument = {
        name: $('#request #name').val(),
        content: $('#request #content').val().split('\n')
      };
      documents.save('stories', storyDocument);
      Story.build(storyDocument.name, storyDocument.content);
    }
  });

  return false;
}
// builds a story element and calls constructor
Story.build = function(name, content) {
  $('#backlog>.stories>ol').append(
      '<li class="story">'+
        '<div>'+
          '<h3>'+name+'</h3>'+
          '<div class="content">'+
            '<ol><li>'+
            content.join('</li><li>') +
            '</li></ol>'+
          '</div>'+
        '</div>'+
      '</li>');
  new Story($('#backlog>.stories>ol>li:last-child'));
}
