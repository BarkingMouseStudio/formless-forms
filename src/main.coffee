# TOKENIZE THE CONTENT
# SPECIFY WHAT'S WHAT
# VALIDATE WHAT YOU GET
# LET USERS KNOW [DISCOVERY]:
#   WHAT "FIELD" THEY'RE WORKING ON
#   WHAT "FIELDS" THEY'VE WORKED ON BEFORE

$ ->

  $content = $('textarea#content')
  $metadata = $('dl#metadata')

  parse_content = (content) ->
    lines = content.split(/\r?\n/g)
    lines = _.select lines, (line) ->
      return line.length > 0

    title = lines.shift()
    author = lines.shift()

    possible_date = lines.shift()
    date = new Date(possible_date)
    date = null if date.toString() is 'Invalid Date'

    # validation/preparsing

    metadata =
      title: title
      author: author

    metadata['date'] = date if date? # date is optional

    if lines.length or not date? and possible_date
      body = lines.join('<br>')
      body = possible_date + '<br>' + body if not date? # if the user didn't specify a date it must be part of the body

    metadata['body'] = body

    return metadata


  update_metadata = (metadata) ->
    $metadata.empty()

    _.each metadata, (val, key) ->
      if val?
        $metadata.append("<dt>#{key}</dt>")
        $metadata.append("<dd>#{val}</dd>")
      else
        $metadata.append("<dt class='error'>#{key}</dt>")
        $metadata.append("<dd class='error'>missing</dd>")


  $content.bind 'keyup', (e) ->
    metadata = parse_content($content.val())
    update_metadata(metadata)
