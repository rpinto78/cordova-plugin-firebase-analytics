var PLUGIN_NAME = "FirebaseAnalytics";
// @ts-ignore
var exec = require("cordova/exec");

exports.logEvent =
/**
 * Logs an app event.
 *
 * @param {string} name Enent name
 * @param {Record<string, number | string | Array<object>>} params Event parameters
 * @returns {Promise<void>} Callback when operation is completed
 *
 * @example
 * cordova.plugins.firebase.analytics.logEvent("my_event", {param1: "value1"});
 */
function(name, params) {
    return new Promise(function(resolve, reject) {
        exec(resolve, reject, PLUGIN_NAME, "logEvent", [name, params || {}]);
    });
};

exports.setUserId =
/**
 * Sets the user ID property. This feature must be used in accordance with Google's Privacy Policy.
 *
 * @param {string} userId User's indentifier string
 * @returns {Promise<void>} Callback when operation is completed
 *
 * @see https://www.google.com/policies/privacy
 *
 * @example
 * cordova.plugins.firebase.analytics.setUserId("12345");
 */
function(userId) {
    return new Promise(function(resolve, reject) {
        exec(resolve, reject, PLUGIN_NAME, "setUserId", [userId]);
    });
};

exports.setUserProperty =
/**
 * Sets a user property to a given value. Be aware of automatically collected user properties.
 *
 * @param {string} name Property name
 * @param {string} value Property value
 * @returns {Promise<void>} Callback when operation is completed
 *
 * @see https://support.google.com/firebase/answer/6317486?hl=en&ref_topic=6317484
 *
 * @example
 * cordova.plugins.firebase.analytics.setUserProperty("name1", "value1");
 */
function(name, value) {
    return new Promise(function(resolve, reject) {
        exec(resolve, reject, PLUGIN_NAME, "setUserProperty", [name, value]);
    });
};

exports.resetAnalyticsData =
/**
 * Clears all analytics data for this instance from the device and resets the app instance ID.
 *
 * @returns {Promise<void>} Callback when operation is completed
 *
 * @example
 * cordova.plugins.firebase.analytics.resetAnalyticsData();
 */
function() {
    return new Promise(function(resolve, reject) {
        exec(resolve, reject, PLUGIN_NAME, "resetAnalyticsData", []);
    });
};

exports.setEnabled =
/**
 * Sets whether analytics collection is enabled for this app on this device.
 *
 * @param {boolean} enabled Flag that specifies new state
 * @returns {Promise<void>} Callback when operation is completed
 *
 * @example
 * cordova.plugins.firebase.analytics.setEnabled(false);
 */
function(enabled) {
    return new Promise(function(resolve, reject) {
        exec(resolve, reject, PLUGIN_NAME, "setEnabled", [enabled]);
    });
};

exports.setCurrentScreen =
/**
 * Sets the current screen name, which specifies the current visual context in your app. This helps identify the areas in your app where users spend their time and how they interact with your app.
 *
 * @param {string} screenName Current screen name
 * @returns {Promise<void>} Callback when operation is completed
 *
 * @example
 * cordova.plugins.firebase.analytics.setCurrentScreen("User dashboard");
 */
function(screenName) {
    return new Promise(function(resolve, reject) {
        exec(resolve, reject, PLUGIN_NAME, "setCurrentScreen", [screenName]);
    });
};

exports.setDefaultEventParameters =
/**
 * Adds parameters that will be set on every event logged from the SDK, including automatic ones.
 * @param {Record<string, number | string | Array<object>>} defaults Key-value default parameters map
 * @returns {Promise<void>} Callback when operation is completed
 *
 * @example
 * cordova.plugins.firebase.analytics.setDefaultEventParameters({foo: "bar"});
 */
function(defaults) {
    return new Promise(function(resolve, reject) {
        exec(resolve, reject, PLUGIN_NAME, "setDefaultEventParameters", [defaults || {}]);
    });
};

// adapted from from https://github.com/dpa99c/cordova-plugin-firebasex
exports.AnalyticsConsentMode = {
    ANALYTICS_STORAGE: "ANALYTICS_STORAGE",
    AD_STORAGE: "AD_STORAGE",
    AD_USER_DATA: "AD_USER_DATA",
    AD_PERSONALIZATION: "AD_PERSONALIZATION"
};

exports.AnalyticsConsentStatus = {
    GRANTED: "GRANTED",
    DENIED: "DENIED"
};

exports.setAnalyticsConsentMode =
/**
 * Sets the user's consent mode status for various types of data collection in the application. This includes consent for analytics data storage, ad storage, ad personalization, and ad user data. The consent status can be set to 'GRANTED' or 'DENIED
 * @param {object} consents  map of the consent modes as AnalyticsConsentMode and their status as AnalyticsConsentStatus
 * @returns {Promise<void>} Callback when operation is completed
 * 
 * @example
 * var FirebasePlugin = cordova.plugins.firebase.analytics;
 * var consents = {};
 * 
 * consents[FirebasePlugin.AnalyticsConsentMode.ANALYTICS_STORAGE] = FirebasePlugin.AnalyticsConsentStatus.GRANTED;
 * consents[FirebasePlugin.AnalyticsConsentMode.AD_STORAGE] = FirebasePlugin.AnalyticsConsentStatus.GRANTED;
 * consents[FirebasePlugin.AnalyticsConsentMode.AD_USER_DATA] = FirebasePlugin.AnalyticsConsentStatus.GRANTED;
 * consents[FirebasePlugin.AnalyticsConsentMode.AD_PERSONALIZATION] = FirebasePlugin.AnalyticsConsentStatus.DENIED;
 * 
 * FirebasePlugin.setAnalyticsConsentMode(consents);
 */
function(consent) {
    return new Promise(function(resolve, reject) {
        exec(resolve, reject, PLUGIN_NAME, "setAnalyticsConsentMode", [consent]);
    });
}
