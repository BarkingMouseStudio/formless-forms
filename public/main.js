(function() {
  $(function() {
    var $content, $metadata, parse_content, update_metadata;
    $content = $('textarea#content');
    $metadata = $('dl#metadata');
    parse_content = function(content) {
      var author, body, date, lines, metadata, possible_date, title;
      lines = content.split(/\r?\n/g);
      lines = _.select(lines, function(line) {
        return line.length > 0;
      });
      title = lines.shift();
      author = lines.shift();
      possible_date = lines.shift();
      date = new Date(possible_date);
      if (date.toString() === 'Invalid Date') {
        date = null;
      }
      metadata = {
        title: title,
        author: author
      };
      if (date != null) {
        metadata['date'] = date;
      }
      if (lines.length || !(date != null) && possible_date) {
        body = lines.join('<br>');
        if (!(date != null)) {
          body = possible_date + '<br>' + body;
        }
      }
      metadata['body'] = body;
      return metadata;
    };
    update_metadata = function(metadata) {
      $metadata.empty();
      return _.each(metadata, function(val, key) {
        if (val != null) {
          $metadata.append("<dt>" + key + "</dt>");
          return $metadata.append("<dd>" + val + "</dd>");
        } else {
          $metadata.append("<dt class='error'>" + key + "</dt>");
          return $metadata.append("<dd class='error'>missing</dd>");
        }
      });
    };
    return $content.bind('keyup', function(e) {
      var metadata;
      metadata = parse_content($content.val());
      return update_metadata(metadata);
    });
  });
}).call(this);
