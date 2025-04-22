//npx cypress run --record --key 3f54f3ba-54d3-41ff-a63b-f5bdce64a2b5
/*const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
 // projectId: "319yxc",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('before:run', async (details) => {
        console.log('override before:run');
        console.log('Running tests');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();


      });
    },
  },
}); */

const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const dotenv = require("dotenv");
require("dotenv").config();

module.exports = defineConfig({
  projectId: "319yxc",
  experimentalStudio: true,
  retries: 3,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Regression testing',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  env: {
    projectName: process.env.PROJECT_NAME || "Cypress Test Automation",
    environment: process.env.ENVIRONMENT || "QA",
    API_KEY: process.env.API_KEY,
    API_BASE_URL: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
  },
  e2e: {
    baseUrl: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
    setupNodeEvents(on, config) {
      on('before:run', async (details) => {
        console.log('override before:run');
        console.log('Running tests');
        await beforeRunHook(details);
      });
      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
    },
  },
});

// 4-22-25

 
 
