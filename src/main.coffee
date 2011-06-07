# normalize the DOM tree
# extract the text from the DOM tree
# tokenize this text
# parse the tokens

wrapDiv = (textNode) ->
  span = document.createElement('div')
  span.appendChild(document.createTextNode(textNode.nodeValue))
  return span

simpleDOM = []
simpleText = []

normalizeEl = (el) ->
  return if not el?

  if el.nodeType is 3
    simpleDOM.push wrapDiv(el)
    simpleText.push el.nodeValue
  else if el.nodeName is 'BR'
    simpleDOM.push el
    simpleText.push '\n'
  else
    childEl = el.firstChild
    normalizeEl(childEl)

    if childEl?
      while childEl = childEl.nextSibling
        normalizeEl(childEl)

  return

parseDOM = (el) ->
  return

parts = [
  'title'
  'author'
  'body'
]

$ ->

  $content = $('#content')

  $content.bind 'keyup', (e) ->
    el = document.getElementById('content')

    ###
    range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(true)
    ###

    simpleDOM = []
    simpleText = []

    normalizeEl(el)
 
    # el.innerHTML = ''

    tags = document.getElementById('tags')
    tags.innerHTML = ''

    part_i = 0

    for i, node of simpleDOM
      # el.appendChild(node)
      text = simpleText[i]

      tag = document.createElement('li')
      tags.appendChild(tag)

      part = parts[part_i]
      continue if not part?

      if not /\S+/.test text
        continue

      tag.innerHTML = part 
      tag.className = 'tag'

      node.className = part

      part_i++

    tag = document.createElement('li')
    tags.appendChild(tag)
    part = parts[part_i]

    console.log simpleDOM
    console.log simpleText

    ###
    selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    ###

    return
