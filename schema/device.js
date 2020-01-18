export default `

    type Device {
        id: Int!
        installationId: String!
        type: String!
        manufacturer: String 
        model: String 
        expoToken: String 
        apnToken: String 
        appVersion: String 
        appId: String
    }

    input DeviceInput {
        installationId: String!
        type: String!
        locale: String
        timezone: Int
        manufacturer: String 
        model: String 
        appVersion: String 
        expoToken: String 
        apnToken: String
    }

    input UpdateDeviceInput {
        appVersion: String 
        expoToken: String 
        apnToken: String
    }

    type Query {
        isDeviceRegistered: Boolean!
    }

    type Mutation {
        registerDevice(device: DeviceInput!, appId: String!): String!
        updateDevice(device: UpdateDeviceInput!): Device!
    }

`;