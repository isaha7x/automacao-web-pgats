const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    openMode: 0,
    runMode: 1
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    supportFile: 'cypress/support/e2e.js',
  },

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
});
