import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ParticlesModule } from 'angular-particle';


import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angular5-social-login';

import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { MembersComponent } from './components/members/members.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

// providers
import { AuthGuard } from './shared/security/auth.guard';
import { AuthLogin } from './shared/security/auth.login';
import { AuthentificationService } from './shared/security/auth.service';
import { LocalstorageService } from './shared/storage/localstorage.service';
import { ActivityService } from './services/activity.service';
import { PlaceService } from './services/place.service';
import { QueryService } from './services/querie.service';
import { CountriesService } from './shared/countries/countries.service';
import { WebsocketService } from './shared/websocket/websocket.service';

// routing
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './components/search/search.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ModalMembersInfosComponent } from './components/members/modal-members-infos/modal-members-infos.component';
import { HeaderComponent } from './components/header/header.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { QueriesComponent } from './queries/queries.component';
import { ActivityCardComponent } from './components/activity-card/activity-card.component';
import { BarListComponent } from './components/bar-list/bar-list.component';
import { ActivityChoiceComponent } from './activity-choice/activity-choice.component';
import { ActivityMenuComponent } from './activity-menu/activity-menu.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { SportListComponent } from './components/sport-list/sport-list.component';
import { ReturnButtonComponent } from './components/return-button/return-button.component';
import { ActivityItemComponent } from './activity-item/activity-item.component';
import { ActivityCompleteComponent } from './activity-complete/activity-complete.component';
import { CreateBarComponent } from './components/create-bar/create-bar.component';
import { TchatComponent } from './components/tchat/tchat.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { CreateFoodComponent } from './components/create-food/create-food.component';

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
    SearchComponent,
    UserProfileComponent,
    ModalMembersInfosComponent,
    HeaderComponent,
    PreferencesComponent,
    QueriesComponent,
    ActivityCardComponent,
    BarListComponent,
    ActivityChoiceComponent,
    ActivityMenuComponent,
    FoodListComponent,
    SportListComponent,
    ReturnButtonComponent,
    ActivityItemComponent,
    ActivityCompleteComponent,
    CreateBarComponent,
    TchatComponent,
    HistoricalComponent,
    CreateFoodComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    SocialLoginModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBh3vbT19X2EIzKfYlOYnfBET22Usjro_c',
    //   libraries: ['places']
    // }),
    // ParticlesModule
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
    ActivityService,
    PlaceService,
    QueryService,
    CountriesService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
