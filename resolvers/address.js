import { combineResolvers } from 'graphql-resolvers';
import { isDeviceRegistered, isDeviceFullyLinked } from './helpers/authentication';
import { UserInputError, ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

const addressExists = async(parent, { addressId }, { models, currentDevice, currentUser }) => {
    var where = { id: addressId }
    if (currentUser) {
        where.userId = currentUser.id
    }
    else {
        where.deviceId = currentDevice.id
    }
    const address = await models.Address.findOne({ where : where })
    return address ? skip : new ForbiddenError("Address not found");
}

export default {
    Query: {
        danglingAddresses: combineResolvers(
            isDeviceRegistered,
            async(parent, args, { models, currentDevice }) => {
                return await models.Address.scope('defaultScope', { method: [ 'dangling', currentDevice.id ]}).findAll();
            }
        ),
        userAddresses: combineResolvers(
            isDeviceFullyLinked,
            async(parent, args, { models, currentUser }) => {
                return await models.Address.find({ where: { userId: currentUser.id }});
            }
        )
    },
    Mutation: {
        addAddress: combineResolvers(
            isDeviceRegistered,
            async(parent, { address }, { models, currentDevice, currentUser, localize }) => {
                const duplicateAddress = await models.Address.duplicate(currentDevice, currentUser, address.latitude, address.longitude);
                console.log("duplicateAddress", duplicateAddress);
                if (duplicateAddress) {
                    return  new UserInputError(localize.translate("You already have and address near this location"));
                }
                const location = { type: 'Point', coordinates: [address.longitude, address.latitude] }
                const newAddress = await models.Address.create({ 
                    ...address, 
                    location: location, 
                    deviceId: currentDevice.id, 
                    userId: currentUser ? currentUser.id : null 
                })
                return { 
                    ...newAddress.dataValues, 
                    location: { 
                        latitude: newAddress.location.coordinates[1], 
                        longitude: newAddress.location.coordinates[0] 
                    } 
                }
            }
        ),
        updateAddress: combineResolvers(
            isDeviceRegistered,
            addressExists,
            async(parent, { addressId, address }, { models, currentDevice }) => {
                await models.Address.update(address, { where: { id: addressId }})
                const updatedAddress = await models.Address.findByPk(addressId);
                return {
                    ...updatedAddress.dataValues,
                    location: {
                        latitude: updatedAddress.location.coordinates[1],
                        longitude: updatedAddress.location.coordinates[0],
                    }
                }
            }
        ),
        deleteAddress: combineResolvers(
            isDeviceRegistered,
            addressExists,
            async(parent, { addressId }, { models, currentDevice }) => {
                await models.Address.destroy({
                    where: { id: addressId }
                })
                return addressId;
            }
        )
    }
}