#import "FirebaseAnalyticsPlugin.h"

@import FirebaseCore;
@import FirebaseAnalytics;

@implementation FirebaseAnalyticsPlugin

- (void)pluginInitialize {
    NSLog(@"Starting Firebase Analytics plugin");

    if(![FIRApp defaultApp]) {
        [FIRApp configure];
    }
}

- (void)logEvent:(CDVInvokedUrlCommand *)command {
    NSString* name = [command.arguments objectAtIndex:0];
    NSDictionary* parameters = [command.arguments objectAtIndex:1];

    [FIRAnalytics logEventWithName:name parameters:parameters];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setUserId:(CDVInvokedUrlCommand *)command {
    NSString* id = [command.arguments objectAtIndex:0];

    [FIRAnalytics setUserID:id];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setUserProperty:(CDVInvokedUrlCommand *)command {
    NSString* name = [command.arguments objectAtIndex:0];
    NSString* value = [command.arguments objectAtIndex:1];

    [FIRAnalytics setUserPropertyString:value forName:name];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setEnabled:(CDVInvokedUrlCommand *)command {
    bool enabled = [[command.arguments objectAtIndex:0] boolValue];

    [FIRAnalytics setAnalyticsCollectionEnabled:enabled];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setCurrentScreen:(CDVInvokedUrlCommand *)command {
    NSString* screenName = [command.arguments objectAtIndex:0];

    [FIRAnalytics logEventWithName:kFIREventScreenView parameters:@{
        kFIRParameterScreenName: screenName
    }];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)resetAnalyticsData:(CDVInvokedUrlCommand *)command {
    [FIRAnalytics resetAnalyticsData];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setDefaultEventParameters:(CDVInvokedUrlCommand *)command {
    NSDictionary* params = [command.arguments objectAtIndex:0];

    [FIRAnalytics setDefaultEventParameters:params];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

// adapted from from https://github.com/dpa99c/cordova-plugin-firebasex
- (void)setAnalyticsConsentMode:(CDVInvokedUrlCommand*)command {
    NSDictionary* consentObject = [command.arguments objectAtIndex:0];
    NSMutableDictionary* consentSettings = [[NSMutableDictionary alloc] init];
    NSEnumerator *enumerator = [consentObject keyEnumerator];
    id key;

    while ((key = [enumerator nextObject])) {
        NSString* consentType = [self consentTypeFromString:key];
        NSString* consentStatus = [self consentStatusFromString:[consentObject objectForKey:key]];
        [consentSettings setObject:consentStatus forKey:consentType];
    }

    [FIRAnalytics setConsent:consentSettings];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (NSString*)consentTypeFromString:(NSString*)consentTypeString {
    if ([consentTypeString isEqualToString:@"ANALYTICS_STORAGE"]) {
        return FIRConsentTypeAnalyticsStorage;
    } else if ([consentTypeString isEqualToString:@"AD_STORAGE"]) {
        return FIRConsentTypeAdStorage;
    } else if ([consentTypeString isEqualToString:@"AD_PERSONALIZATION"]) {
        return FIRConsentTypeAdPersonalization;
    } else if ([consentTypeString isEqualToString:@"AD_USER_DATA"]) {
        return FIRConsentTypeAdUserData;
    } else {
        return nil;
    }
}

- (NSString*)consentStatusFromString:(NSString*)consentStatusString {
    if ([consentStatusString isEqualToString:@"GRANTED"]) {
        return FIRConsentStatusGranted;
    } else if ([consentStatusString isEqualToString:@"DENIED"]) {
        return FIRConsentStatusDenied;
    } else {
        return nil;
    }
}

@end
