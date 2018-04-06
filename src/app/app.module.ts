import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

// providers
import { AuthGuard } from './shared/security/auth.guard';
import { AuthLogin } from './shared/security/auth.login';
import { AuthentificationService } from './shared/security/auth.service';
import { LocalstorageService } from './shared/storage/localstorage.service';
import { ActivityService } from './services/activity';

// routing
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { ActivityComponent } from './components/activity/activity.component';

// Configs Auth
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('155209321969529')
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        '142771585417-2d87tilqo36mivtmomhnjd2au29vo42v.apps.googleusercontent.com'
      )
    }
  ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    MembersComponent,
    LoginComponent,
    DashboardComponent,
    MainComponent,
    ActivityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    SocialLoginModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBh3vbT19X2EIzKfYlOYnfBET22Usjro_c',
      libraries: ['places']
    })
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    LocalstorageService,
    AuthGuard,
    AuthLogin,
    AuthentificationService,
    ActivityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
