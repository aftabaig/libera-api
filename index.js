import 'dotenv/config';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import models from './models';
import jwt from 'jsonwebtoken';
import Localize from 'localize';

const getDevice = async (req) => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            const deviceJson = await jwt.verify(token, process.env.SECRET)
            console.log(deviceJson);
            return await models.Device.findOne({ 
                where: { 
                    installationId: deviceJson.id 
                },
                include: [{
                    model: models.User,
                    as: 'user'
                }]
            });
        } catch (e) {
            return null;
        }
    }
    else {
        return null;
    }
}

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers'), { recursive: false }));
const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: '/graphql',
        settings: {
            'editor.fontFamily.theme': 'light'
        }
    },
    context: async({ req }) => {
        const device = await getDevice(req);
        const localize = new Localize('./translations/');
        localize.setLocale("ur");
        return {
            currentDevice: device,
            currentUser: device ? device.user : null,
            localize: localize,
            models,
            secret: process.env.SECRET
        }
    },
    formatError(error) {
        return {
            message: error.message,
            locations: error.locations,
            path: error.path
        }
    }
});
const app = express();
server.applyMiddleware({ app });
app.listen({ port: 8081 });