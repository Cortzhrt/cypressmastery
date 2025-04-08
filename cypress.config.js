//npx cypress run --record --key 3f54f3ba-54d3-41ff-a63b-f5bdce64a2b5
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "319yxc",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
