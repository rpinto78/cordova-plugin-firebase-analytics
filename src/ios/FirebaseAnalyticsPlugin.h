#import <Cordova/CDV.h>

@interface FirebaseAnalyticsPlugin : CDVPlugin

- (void)logEvent:(CDVInvokedUrlCommand*)command;
- (void)setUserId:(CDVInvokedUrlCommand*)command;
- (void)setUserProperty:(CDVInvokedUrlCommand*)command;
- (void)setEnabled:(CDVInvokedUrlCommand*)command;
- (void)setCurrentScreen:(CDVInvokedUrlCommand*)command;
- (void)resetAnalyticsData:(CDVInvokedUrlCommand*)command;
- (void)setDefaultEventParameters:(CDVInvokedUrlCommand*)command;
// adapted from from https://github.com/dpa99c/cordova-plugin-firebasex
- (void)setAnalyticsConsentMode:(CDVInvokedUrlCommand*)command;

@end
