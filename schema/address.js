export default `

    type Point {
        latitude: Float!
        longitude: Float!
    }

    input PointInput {
        latitude: Float!
        longitude: Float!
    }

    type Address {
        id: Int!
        name: String!
        type: String
        address: String!
        location: Point!
    }

    input AddressInput {
        name: String!
        type: String
        address: String!
        latitude: Float!
        longitude: Float!
    }

    type Query {
        danglingAddresses: [Address!]!
        userAddresses: [Address!]!
    }

    type Mutation {
        addAddress(address: AddressInput!): Address!
        updateAddress(addressId: Int!, address: AddressInput!): Address!
        deleteAddress(addressId: Int!): Int!
    }

`;