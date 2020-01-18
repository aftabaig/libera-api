export default `

    scalar JSON
    scalar UUID

    type OrderStatus {
        id: Int!
        key: String!
        title: String!
    }

    type Order {
        id: Int
        udid: UUID,
        currency: String!
        paymentMethod: String!
        couponCode: String
        total: Float!
        discount: Float!
        deliveryFee: Float!
        address: Address
        driver: User
        orderStatus: OrderStatus
        lineItems: [OrderLineItem!]!
    }

    input DraftInput {
        outletId: Int!
        addressId: Int
        location: PointInput
        lineItems: [LineItemInput!]
    }

    type OrderLineItem {
        quantity: Int!
        details: JSON
    }

    input LineItemInput {
        quantity: Int!
        details: JSON
        price: JSON
    }

    type Mutation {
        draftOrder(draft: DraftInput!): Order!
    }

`