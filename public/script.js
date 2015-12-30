window.onload = function() {
  var converter = new showdown.Converter();
  var pad = document.getElementById('pad');
  var markdown_area = document.getElementById('markdown');


  // fix the tab, make the tab act like a tab

  pad.addEventListener('keydown', function(e) {
    if (e.keyCode === 9) {
      var start = this.selectionStart;
      var end = this.selectionEnd;

      var target = e.target;
      var value = target.value;

      target.value = value.substring(0, start)
                      + "\t"
                      + value.substring(end);

      this.selectionStart = this.selectionEnd = start + 1;

      e.preventDefault();
    }
  });


  // showdown stuff

  var prevous_value;

  var convert_text = function() {
    var markdown_text = pad.value;
    prevous_value = markdown_text;
    var html = converter.makeHtml(markdown_text);
    markdown_area.innerHTML = html;
  };

  var did_change_occur = function() {
    if(prevous_value != pad.value) {
      return true;
    }
    return false;
  };

  setInterval(function() {
    if(did_change_occur()) {
      convert_text();
    }
  }, 1000);

  pad.addEventListener('input', convert_text);

  if (document.location.pathname.length > 1) {
    var document_name = document.location.pathname.substring(1);
    sharejs.open(document_name, 'text', function(error, doc) {
      doc.attach_textarea(pad);
      convert_text();
    });
  }

  convert_text();

};
