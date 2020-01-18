import GraphQLJSON from 'graphql-type-json';
import GraphQLUUID from 'graphql-type-uuid';
import { combineResolvers } from 'graphql-resolvers';
import { isDeviceFullyLinked } from './helpers/authentication';
import { UserInputError } from 'apollo-server';

export default {
    JSON: GraphQLJSON,
    UUID: GraphQLUUID,
    Mutation: {
        draftOrder: combineResolvers(
            //isDeviceFullyLinked,
            async(parent, { draft }, { models, currentUser }) => {
                const outlet = await models.Outlet.findByPk(draft.outletId);
                if (!outlet) {
                    throw new UserInputError("Outlet not found");
                }
                let address;
                if (draft.addressId) {
                    address = await models.Address.findByPk(draft.addressId)
                    if (!address) {
                        throw new UserInputError("Address not found");
                    }
                }
                if (draft.location) {
                    const { latitude, longitude } = draft.location;
                    address = models.Address.findOrCreate({ where: { userId: currentUser.userId, isCurrentLocation: true }, defaults: { name: 'Current Location', address: '' }});
                }
                if (!address) {
                    throw new UserInputError("Address is missing");
                }
                return { address: address, currency: outlet.currency, paymentMethod: "cash", total: 0.0, discount: 0.0, deliveryFee: 0.0 }
            }
        )
    }
}