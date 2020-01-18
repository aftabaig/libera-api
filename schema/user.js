export default `

    type User {
        id: Int!
        email: String
        mobile: String
        firstName: String 
        lastName: String 
        avatarUrl: String
        devices: [Device]!
    }

    input RegisterMobileInput {
        countryCode: String!
        number: String!
    }

    input RegisterEmailInput {
        email: String!
        password: String!
        firstName: String!
        lastName: String!
    }

    type RegisterMobileOutput {
        isRegistered: Boolean!
    }

    type Query {
        me: User
    }

    type Mutation {
        registerCustomerMMobile(mobile: RegisterMobileInput!): RegisterMobileOutput!
        registerEmail(details: RegisterEmailInput!): User
        verifyCode(code: String!): Boolean!
        verifyPassword(password: String!): User
        resendCode: Boolean
        emailLogin(email: String!, password: String!): User
        logout: Boolean!
    }

`;