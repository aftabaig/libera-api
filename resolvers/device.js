import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { isDeviceRegistered } from './helpers/authentication';

export default {
    Mutation: {
        registerDevice: async(parent, { device, appId }, { models, secret }) => {
            const app = await models.App.findOne({ where: { identifier: appId }})
            if (app) {
                const response = await models.Device.findOrCreate({ where: { installationId: device.installationId }, defaults: { ...device, appId: app.id }});
                return await jwt.sign({ id: response[0].installationId }, secret);
            }
            else {
               throw new Error("App not found");
            }
        },
        updateDevice: combineResolvers(
            isDeviceRegistered,
            async(parent, { device }, { models, currentDevice, secret }) => {
                return await currentDevice.update(device);
            }
        )
    }
}