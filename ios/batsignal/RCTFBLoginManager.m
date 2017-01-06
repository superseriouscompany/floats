// RCTFBLoginManager.m
#import <MapKit/MapKit.h>
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
  [self.bridge.eventDispatcher sendAppEventWithName:@"cool" body:@"nice"];
  return button;
}

- (void)  loginButton:  (FBSDKLoginButton *)loginButton
didCompleteWithResult:  (FBSDKLoginManagerLoginResult *)result
                error:  (NSError *)error{
  
  NSLog(@"facebook login button test");
  
}
  
@end
