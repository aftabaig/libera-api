export default `

    type Menu {
        id: Int!
        name: String!
        description: String
        openingTime: Int!
        closingTime: Int!
        categories: [Category!]!
    }

    type Query {
        getMenu(outletId: Int!): Menu
    }

`;