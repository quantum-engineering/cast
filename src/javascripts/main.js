import React, {Component} from "react"
import ReactDOM, {render, findDOMNode} from "react-dom"
import Relay from "react-relay"
import RelayLocalSchema from 'relay-local-schema'
import marked from "marked"

import schema from "../data/schema"

Relay.injectNetworkLayer(new RelayLocalSchema.NetworkLayer({schema}));

class Article extends Component {
  render() {

    var {title, description, body} = this.props.article

    return (
      <li>
        <h2>{title}</h2>
        <p>{description}</p>

        <div dangerouslySetInnerHTML={ {__html: this._parseRawMarkup()} } />

      </li>
    )
  }

  _parseRawMarkup() {
    var content = this.props.article ? marked(this.props.article.body.toString(), {sanitize: true}) : "";
    return content;
  }
}

Article = Relay.createContainer(Article, {
  fragments: {
    article: () => Relay.QL`
      fragment on Article {
        title,
        description,
        body
      }
    `,
  }
})

class ArticleStore extends Component {
  render() {
    return (
      <ul>
        {this.props.store.articles.map((article, index) => {
          return <Article key={index} article={article} />
        })}
      </ul>
    )
  }
}

ArticleStore = Relay.createContainer(ArticleStore, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        articles { ${Article.getFragment('article')} }
      }
    `
  }
})

class ArticleHomeRoute extends Relay.Route {
  static routeName = 'Home';
  static queries = {
    store: (Component) => Relay.QL`
      query ArticleStoreQuery {
        store { ${Component.getFragment('store')} },
      }
    `,
  };
}

ReactDOM.render(
  <Relay.RootContainer
    Component={ArticleStore}
    route={new ArticleHomeRoute()} />, document.getElementById("main")
)
