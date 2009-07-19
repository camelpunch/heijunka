function Request(options) {
  $('form#request').remove();

  $('body').append(
    '<form id="request">'+
    '<h2>'+options.title+'</h2>'+
    '</form>'
  );

  $(options.elements).each( function() {
    if (this.type == 'text') {
      $('form#request').append(
        '<p>'+
        '<label for="'+this.name+'">'+this.label+'</label>'+
        '<input id="'+this.name+'" type="text" name="'+this.name+'" value="'+this.value+'" />'+
        '</p>'
      );
    }
  });

  $('form#request input')[0].focus();

  $('form#request').submit( function() {
    options.submit(); 
    $(this).remove();
    return false;
  });
}

