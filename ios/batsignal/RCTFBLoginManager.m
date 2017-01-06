// RCTFBLoginManager.m
#import <MapKit/MapKit.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import "React/RCTViewManager.h"
#import "React/RCTBridge.h"
#import "React/RCTEventDispatcher.h"

@interface RCTFBLoginManager : RCTViewManager <FBSDKLoginButtonDelegate>
@end

@implementation RCTFBLoginManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()
  
- (UIView *)view
{
  FBSDKLoginButton *button = [[FBSDKLoginButton alloc] init];
  [button setDelegate:self];
  return button;
}

- (void)  loginButton:  (FBSDKLoginButton *)loginButton
didCompleteWithResult:  (FBSDKLoginManagerLoginResult *)result
                error:  (NSError *)error{
  

  if( error != nil ) {
    [self.bridge.eventDispatcher sendAppEventWithName:@"FBLoginFailure" body:@"TODO: pass along error"];
    return;
  }

  [self.bridge.eventDispatcher sendAppEventWithName:@"FBLoginSuccess" body:[[result token] tokenString]];
  
  
  NSLog(@"facebook login button test");
  
}
  
@end
