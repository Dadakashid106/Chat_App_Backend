'use strict';

/**
 * authtication service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::authtication.authtication');
