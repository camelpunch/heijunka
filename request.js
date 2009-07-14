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

