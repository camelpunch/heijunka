function Request(options) {
  $('#request').remove();

  $('body').append(
    '<div id="request">'+
    '<h2>'+options.title+'</h2>'+
    '<form>'+
    '</form>'+
    '</div>'
  );

  $(options.elements).each( function() {
    if (this.type == 'text') {
      $('#request form').append(
        '<p>'+
        '<label for="'+this.name+'">'+this.label+'</label>'+
        '<input id="'+this.name+'" type="text" name="'+this.name+'" value="'+this.value+'" />'+
        '</p>'
      );
    }
  });

  $('#request form input')[0].focus();

  $('#request form').submit( function() {
    options.submit(); 
    $('#request').remove();
    return false;
  });
}

