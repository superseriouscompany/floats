//
//  ViewController.m
//  fbtest
//
//  Created by Neil Sarkar on 06/01/17.
//  Copyright © 2017 Super Serious Company. All rights reserved.
//

#import "ViewController.h"
#import <FBSDKLoginKit/FBSDKLoginKit.h>

@interface ViewController ()
  
@end

@implementation ViewController
  
- (void)viewDidLoad {
  [super viewDidLoad];
  
  FBSDKLoginButton *loginButton = [[FBSDKLoginButton alloc] init];
  loginButton.center = self.view.center;
  [self.view addSubview:loginButton];
  // Do any additional setup after loading the view, typically from a nib.
}
  
  
- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}
  
  
@end
