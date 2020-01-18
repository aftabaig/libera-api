export default `

    type Brand {
        id: Int!
        key: String!
        name: String!       
        outlets: [Outlet!]!
    }

    type Query {
        getBrand(key: String!): Brand
    }
    
`;