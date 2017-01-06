// RCTFBLoginManager.m
#import <MapKit/MapKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import "React/RCTViewManager.h"

@interface RCTFBLoginManager : RCTViewManager
@end

@implementation RCTFBLoginManager
  
RCT_EXPORT_MODULE()
  
- (UIView *)view
{
  return [[FBSDKLoginButton alloc] init];
}
  
@end
