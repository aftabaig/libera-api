import { combineResolvers } from 'graphql-resolvers';
import { 
    isDeviceRegistered, 
    deviceMustBeLinked, 
    deviceMustNotBeLinked, 
    deviceMustBeConnectedToUser 
} from './helpers/authentication';
import { ForbiddenError, UserInputError, AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
var rn = require('random-number');

const linkUserToDeviceAndDanglingAddresses = async(currentDevice, user, models) => {
    await currentDevice.update({ userId: user.id, isLinked: true });
    const danglingAddresses = await models.Address.scope({ method: [ 'dangling', currentDevice.id ]}).findAll();
    for (var address in danglingAddresses) {
        await address.update({ userId: user.id })
    }
}

export default {
    Query: {
        me: combineResolvers(
            //isDeviceRegistered,
            async(parent, args, { models, currentDevice }) => {
                if (!currentDevice.isLinked) { 
                    return null 
                }
                return currentDevice.user
            }
        )
    },
    Mutation: {
        // registerMobile: combineResolvers(
        //     isDeviceRegistered,
        //     async(parent, { mobile }, { models, currentDevice }) => {
        //         let completeMobileNumber = mobile.countryCode + mobile.number
        //         var user = await models.User.findOne({ where: { mobile: completeMobileNumber }});
        //         var response;
        //         if (user) {
        //             if (user.password == null) {
        //                 const randomNumber = rn({ min: 100000, max: 999999, integer: true });
        //                 await currentDevice.update({ userId: user.id, isLinked: false, mobileCode: randomNumber });
        //             }
        //             else {
        //                 await currentDevice.update({ userId: user.id, isLinked: false });
        //             }
        //             response = { isRegistered: user.password != null }
        //         }
        //         else {
        //             user = await models.User.create({ mobile: completeMobileNumber });
        //             const randomNumber = rn({ min: 100000, max: 999999, integer: true });
        //             await currentDevice.update({ userId: user.id, isLinked: false, mobileCode: randomNumber });
        //             response = { isRegistered: false }
        //         }
        //         return response;
        //     }
        // ),
        verifyCode: combineResolvers(
            isDeviceRegistered,
            deviceMustNotBeLinked,
            deviceMustBeConnectedToUser,
            async(parent, { code }, { models, currentDevice, localize }) => {
                if (currentDevice.mobileCode == code) {
                    await currentDevice.update({ isLinked: true, mobileCode: null });
                    return true
                }
                return new UserInputError(localize.translate("Invalid code."));
            }
        ),
        verifyPassword: combineResolvers(
            isDeviceRegistered,
            deviceMustNotBeLinked,
            deviceMustBeConnectedToUser,
            async(parent, { password }, { models, currentDevice, localize }) => {
                const matched = await bcrypt.compare(password, currentDevice.user.password)
                if (matched) {
                    await linkUserToDeviceAndDanglingAddresses(currentDevice, currentDevice.user, models);
                    return currentDevice.user;
                }
                else {
                    return new ForbiddenError(localize.translate("Invalid password."));
                }
            }
        ),
        registerEmail: combineResolvers(
            isDeviceRegistered,
            deviceMustBeLinked,
            async(parent, { details }, { models, currentDevice, currentUser, localize }) => {
                if (currentUser.password != null) {
                    return new UserInputError(localize.translate("Email already registered with this user"));
                }
                const userWithSameEmail = await models.User.findOne({ where: { email: details.email }});
                if (userWithSameEmail) {
                    return new UserInputError(localize.translate("Email already exists."));
                }
                details.password = await bcrypt.hash(details.password, 10);
                await currentDevice.user.update({ ...details });
                await linkUserToDeviceAndDanglingAddresses(currentDevice, currentDevice.user, models);
                return currentDevice.user;
            }
        ),
        resendCode: combineResolvers(
            isDeviceRegistered,
            deviceMustNotBeLinked,
            deviceMustBeConnectedToUser,
            async(parent, args, { models, currentDevice, currentUser, localize }) => {
                if (currentDevice.user.password == null) {
                    const randomNumber = rn({ min: 100000, max: 999999, integer: true });
                    await currentDevice.update({ userId: user.id, isLinked: false, mobileCode: randomNumber });
                    return true;
                }
                else {
                    return new AuthenticationError(localize.translate("User already verified"));
                }
            }
        ),
        emailLogin: combineResolvers(
            isDeviceRegistered,
            async(parent, { email, password }, { models, currentDevice, localize }) => {
                const user = await models.User.findOne({ where: { email: email }});
                var matched = false;
                if (user) {
                    matched = await bcrypt.compare(password, user.password);
                }
                if (matched) {
                    await linkUserToDeviceAndDanglingAddresses(currentDevice, user, models);
                    return user;
                }
                else {
                    return new UserInputError(localize.translate("Invalid username and/or password."));
                }
            }
        ),
        logout: combineResolvers(
            isDeviceRegistered,
            async(parent, args, { models, currentDevice}) => {
                await currentDevice.update({ userId: null, isLinked: false });
                return true;
            }
        )
    }
}