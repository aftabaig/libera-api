export default `

    type Outlet {
        id: Int!
        name: String!
        address: String
        latitude: Float!
        longitude: Float!
        menus: [Menu!]!
    }

`;