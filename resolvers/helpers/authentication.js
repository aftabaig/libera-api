import { ForbiddenError, AuthenticationError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isDeviceRegistered = async(parent, args, { models, currentDevice, localize }) => {
    return currentDevice ? skip : new AuthenticationError(localize.translate("Request not authenticated"));
}

export const deviceMustBeLinked = async(parent, args, { models, currentDevice, localize }) => {
    currentDevice && currentDevice.user && currentDevice.isLinked ? skip : new AuthenticationError(localize.translate("The device is not linked with any user"));
}

export const deviceMustNotBeLinked = async(parent, args, { models, currentDevice, localize }) => {
    return currentDevice && !currentDevice.isLinked ? skip : new AuthenticationError(localize.translate("The device is already linked with a user"));
}

export const deviceMustBeConnectedToUser = async(parent, args, { models, currentDevice, localize }) => {
    return currentDevice && currentDevice.user ? skip : new AuthenticationError(localize.translate("Invalid operation"));
}

export const isStaff = async(parent, args, { models, currentDevice }) => {
    const role = currentDevice.user.role;
    return role == 'manager' || role == 'rider' ? skip: new ForbiddenError("User not authorized");
}