/**
 * user.js
 *
 * A GraphQL schema needs a store and field definition
 * and a schema allows query of a store
 * and wraps the store and wil return the store
 */

import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import articles from "../database/articles.json"
import faker from "faker"

const STORE = {
  articles: articles
}

var Article = new GraphQLObjectType({
  name: "Article",
  fields: () => ({
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    body: {type: GraphQLString}
  })
})

var ArticleStore = new GraphQLObjectType({
  name: "Store",
  fields: () => ({
    articles: {type: new GraphQLList(Article)}
  })
})

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      store: {
        type: ArticleStore,
        resolve: () => STORE
      }
    })
  })
})
