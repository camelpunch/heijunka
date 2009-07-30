function Request(options) {
  $('form#request').remove();

  $('body').append(
    '<form id="request">'+
    '<h2>'+options.title+'</h2>'+
    '<p><input type="submit" value="'+options.submitButtonText+'" /></p>'+
    '</form>'
  );

  $(options.elements).each( function() {
    var content;

    if (this.type == 'text') {
      content = '<p>'+
                '<label for="'+this.name+'">'+this.label+'</label>'+
                '<input id="'+this.name+'" type="text" name="'+this.name+'" value="'+this.value+'" />'+
                '</p>';
    } else if (this.type == 'textarea') {
      content = '<p>'+
                '<label for="'+this.name+'">'+this.label+'</label>'+
                '<textarea id="'+this.name+'" name="'+this.name+'">'+
                this.value+
                '</textarea>'+
                '</p>';
    }

    $('form#request input[type="submit"]').parents('p').before(content);
  });

  $('form#request input')[0].focus();

  $('form#request').submit( function() {
    options.submit(); 
    $(this).remove();
    return false;
  });
}

