export default `

    type Topping {
        id: Int!
        name: String!
        minQuantity: Int!
        maxQuantity: Int!
        options: [ToppingOption!]!
    }

    type ToppingOption {
        id: Int!
        name: String!
        description: String!
        price: Float!
    }

`;