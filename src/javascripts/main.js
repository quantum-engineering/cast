import React, {Component} from "react"
import ReactDOM, {render, findDOMNode} from "react-dom"
import Relay from "react-relay"
import RelayLocalSchema from 'relay-local-schema';

import schema from "../data/schema"

Relay.injectNetworkLayer(new RelayLocalSchema.NetworkLayer({schema}));

class Article extends Component {
  constructor(props) {
    super(props)

    this.state = {
      body: ""
    }
  }

  componentDidMount() {
    if (this.props.article && this.props.article.body) {
      this.setState({ body: this.props.article.body })
    }
  }

  render() {

    var {title, description, body} = this.props.article

    return (
      <li>
        <h2>{title}</h2>
        <p>{description}</p>
        {/*

          @TODO:

        <div dangerouslySetInnerHTML={ {__html: body} } />
          I need to think of a better way to
          inject html elements into the DOM, componentDidMount maybe?
          via ref? finDOMNODE?

          */}

        <div>{this.state.body}</div>

      </li>
    )
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
