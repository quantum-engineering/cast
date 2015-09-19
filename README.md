# Cast
*A static blogging engine built on top of Relay and Relay-Local*

version: 0.0.1 (*pre-alpha*)

## Features

- YAML Front-Matter Support
- Full markdown support
- Local Relay-GraphQL (without GraphQL server)
- Using React 0.14.0-rc (release candidate)
- CSSNext

## How to build the project

1. `npm i`
2. `npm run update-schema`
3. `npm run build`

**Development**

- `npm start` (starts the node server)
- `npm run watch` (watches for client-side changes)
- everytime you add a new article, please run `npm run format-articles`

**SCHEMA**

Whenever you make a change to the schema, please stop the server and run:

```
npm run update-schema
```


## Project Structure

```
project/
  articles/
    *.md --> you should store your markdown articles here
  builder/
    babelRelayPlugin.js --> do not delete this file, this is what compiles your relay app
    updateSchema.js
  dist/ --> all your files will be compiled here
    javascripts/
    stylesheets/
  src/
    data/
      schema.graphql
      schema.js
      schema.json
    database/
      articles.js
      articles.json
    javascripts/
      main.js
    stylesheets/
      main.css

  index.html
  parser.js --> this is what parses your markdown files to valid markups
```

## Credits
- [marked](https://github.com/chjj/marked)
- [front-matter](https://github.com/jxson/front-matter)
- [relay-local-schema](https://github.com/relay-tools/relay-local-schema)

## Roadmap

- Better build system
- Routing
- Tests
- static type analyzer
- Theming
- Pagination module
- Server implementation
