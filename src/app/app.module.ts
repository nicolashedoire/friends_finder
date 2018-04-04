import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angular5-social-login';

import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './login/login.component';

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('155209321969529')
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('142771585417-2d87tilqo36mivtmomhnjd2au29vo42v.apps.googleusercontent.com')
    }
  ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    MembersComponent,
    LoginComponent
  ],
  imports: [BrowserModule, NgbModule.forRoot(), SocialLoginModule],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
