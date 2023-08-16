# Possible notations

## Full notation

Full notation for DOM trees should be 
described as follows:

```javascript
{
    "tag": "<tag_name>"
    "attributes": {
        "<attr_name>": "<attr_value>",
        "<attr_name>": "<attr_value>"
    },
    "children": [
        <element>,
    ]
}
```

## Short notation

Short notation. If an element has single
text children we can leave it in
`"content": "value"` field, where is `value`
will be parsed into a text node.

```javascript
{
    "tag": "<tag_name>",
    "attributes": {
        "<attr_name>": "<attr_value>",
        "<attr_name>": "<attr_value>",
    },
    "content": "<inner_text_value>"
}
```

## List notation

Lists object has a list of text nodes
inside the `children` field. All the given
children will be parsed into `li` elements
if not explicitly `li`. That is, any string
child, or a node with a non-li tag will be
wrapped in a `li` element automatically.
If a child explicitly has a `li` tag, it will
be left as is.

```javascript
{
    "tag": "<tag_name>",
    "attributes": { <attribs> },
    "children": [
        "<li_value>",
        {
            "tag": "h1",
            "content": "will be wrapped"
        },
        {
            "tag": "li",
            "content": "left as is"
        }
    ]
}
```

# Considerations

## Node structure notation

Tag or content field must be provided as it 
determines node's type. If `tag` field not
provided the `content` will mean to create a 
text node with `innerText` assigned with the 
`content`'s value.

Object must have either `children` field with 
a list value or a `content` with plain text 
value.

An element with `text` tag should have only only 
two fields `tag` and `content`; any other fields 
will be ignored.

## Attributes

`attributes` filed must always be an Object of
`<attr_name>`: `<attr_value>` form.

