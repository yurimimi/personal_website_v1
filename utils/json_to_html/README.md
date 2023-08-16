 Possible notations

## Full notation

The full notation for DOM trees should be
described as follows:

```javascript
{
    "tag": "<tag_name>"
    "attributes": {
        "<attr_name>": "<attr_value>",
        "<attr_name>": "<attr_value>"
    },
    "children": [
        <child_element>,
    ]
}
```

## Short notation

In the short notation, if an element has a
single text child, we can include it in the
`"content": "value"` field, where value will be
parsed into a text node.

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

The lists object has a list of text nodes inside
the `children` field. All the given children
will be parsed into `li` elements if they are
not explicitly specified as an `li`. This means
that any string child or a node with a non-`li`
tag will be automatically wrapped in an `li`
element. If a child explicitly has an `li` tag,
it will remain unchanged.

```javascript
{
    "tag": "<li_or_ul>",
    "attributes": { <attribs> },
    "children": [
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
```javascript
{
    "tag": "<li_or_ul>",
    "children": [
        "<string_value>",
        "<string_value>",
        "<string_value>"
    ]
}
```

# Considerations

## Node structure notation

The `tag` or `content` field must be provided as
it determines the node's type. If the `tag` field
is not provided, the `content` will be used to
create a text node with the `innerText` assigned
to the value of `content`.

An object must have either a `children` field with
a list of children objects or a `content` field
with a plain text value.

An element with a `text` tag should only have two
fields: `tag` with the value of `text` and
`content` with a plain text value. Any other
fields will be ignored.

### Attributes

The `attributes` field must always be an object
with `<attr_name>: <attr_value>` fields.

