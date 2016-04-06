'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Joi  = require('joi');

const server = new Hapi.Server();
server.connection({ port: 3001 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

// server.route({
//     method: 'GET',
//     path: '/{name}',
//     handler: function (request, reply) {
//         reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
//     }
// });

server.route({
    method: 'GET',
    path: '/{yourname*}',
    config: {  // validate will ensure YOURNAME is valid before replying to your request
        validate: { params: { yourname: Joi.string().max(40).min(2).alphanum() } },
        handler: function (req,reply) {
            reply('Hello '+ req.params.yourname + '!');
        }
    }
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {

        if (err) {
           throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});