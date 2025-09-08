import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

// 

const typeDefs = `#graphql

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const booksDS = [
  {
    title: "The tour of heroes",
    author: "John Wane"
  },
  {
    title: "Lord of the ring",
    author: "Zee Batista"
  }
]

const resolvers = {
  Query: {
    books: () => booksDS
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(
  server,
  {
    listen: { port:4000 },
  }
)

console.log("Server started at: ", url);