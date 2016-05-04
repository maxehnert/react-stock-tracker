'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const loopExp = require('../app').tickerScrape;
var Xray = require("x-ray");
var xray = new Xray();

exports.register = function(server, options, next) {

  const db = server.app.db;
  const stocks = db.collection('stocks');

  server.route({
    method: 'GET',
    path: '/ticker',
    handler: function(request, reply) {

    }
  });

  server.route({
    method: 'GET',
    path: '/ticker/{id}',
    config: {
      validate: {
        query: {
          ticker: Joi.string().alphanum(),
        },
      },
    },
    handler: function(request, reply) {
      console.log('asdf', request.params.id);
       reply (
        loopExp(request.params.id)
        );
      // stocks.findOne({
      //   _id: request.params.id
      // }, (err, doc) => {

      //   if (err) {
      //     return reply(Boom.badData('Internal MongoDB error', err));
      //   }

      //   if (!doc) {
      //     return reply(Boom.notFound());
      //   }

      //   reply(doc);
      // });
    }
  });

  server.route({
    method: 'POST',
    path: '/ticker',
    handler: function(request, reply) {

      const stock = request.payload;

      //Create an id
      stock._id = uuid.v1();

      stocks.save(stock, (err, result) => {

        if (err) {
          return reply(Boom.badData('Internal MongoDB error', err));
        }

        reply(stock);
      });
    },
    config: {
      validate: {
        payload: {
          ticker: Joi.string().min(1).max(10).required(),
          strike: Joi.number(),
          expire: Joi.string(),
          last: Joi.number()
        }
      }
    }
  });

  server.route({
    method: 'PATCH',
    path: '/ticker/{id}',
    handler: function(request, reply) {

      stocks.update({
        _id: request.params.id
      }, {
        $set: request.payload
      }, function(err, result) {

        if (err) {
          return reply(Boom.badData('Internal MongoDB error', err));
        }

        if (result.n === 0) {
          return reply(Boom.notFound());
        }

        reply().code(204);
      });
    },
    config: {
      validate: {
        payload: Joi.object({
          ticker: Joi.string().min(1).max(10).required(),
          strike: Joi.number(),
          expire: Joi.string(),
          last: Joi.number()
        }).required().min(1)
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/ticker/{id}',
    handler: function(request, reply) {

      stocks.remove({
        _id: request.params.id
      }, function(err, result) {

        if (err) {
          return reply(Boom.badData('Internal MongoDB error', err));
        }

        if (result.n === 0) {
          return reply(Boom.notFound());
        }

        reply().code(204);
      });
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'routes-stocks'
};
