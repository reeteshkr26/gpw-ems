import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { HomeComponent } from "./common/components/home/home.component";
import { HeaderComponent } from "./common/components/header/header.component";
import { FooterComponent } from "./common/components/footer/footer.component";
import { NavComponent } from "./common/components/nav/nav.component";
import { AboutUsComponent } from "./common/components/about-us/about-us.component";
import { BlogComponent } from "./common/components/blog/blog.component";
import { ContactUsComponent } from "./common/components/contact-us/contact-us.component";
import { CreateEventComponent } from "./event-management-system/components/create-event/create-event.component";
import { EditEventComponent } from "./event-management-system/components/edit-event/edit-event.component";
import { ViewEventsComponent } from "./event-management-system/components/view-events/view-events.component";
import { EventDetailsComponent } from "./event-management-system/components/event-details/event-details.component";
import { LocationService } from "./common/service/location.service";
import { CategoryService } from "./common/service/event-category";

import { NgpImagePickerModule } from "ngp-image-picker";
import { EventService } from "./event-management-system/service/event.service";
import { ViewEventTableComponent } from "./event-management-system/components/view-event-table/view-event-table.component";
import { ScheduleEventDetailsComponent } from "./event-management-system/components/schedule-event-details/schedule-event-details.component";
import { PageNotFoundComponent } from "./common/components/page-not-found/page-not-found.component";
import { LoginComponent } from "./user-management-system/components/login/login.component";
import { RegistrationComponent } from "./user-management-system/components/registration/registration.component";
import { UserService } from "./user-management-system/service/user.service";
import { LoginService } from "./user-management-system/service/login.service";
import { ScheduleService } from "./schedule-management-system/service/schedule.service";
import { BookingComponent } from "./booking-management-system/components/booking/booking.component";
import { ViewBookingComponent } from "./booking-management-system/components/view-booking/view-booking.component";
import { CreateSpeakerComponent } from "./speaker-management-system/components/create-speaker/create-speaker.component";
import { ViewSpeakerComponent } from "./speaker-management-system/components/view-speaker/view-speaker.component";
import { ModifySpeakerComponent } from "./speaker-management-system/components/modify-speaker/modify-speaker.component";
import { TokenStorageService } from "./user-management-system/service/token-storage.service";

import { ModuleWithProviders } from "@angular/core";
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatIconRegistry } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRadioModule } from "@angular/material/radio";
import { MatRippleModule } from "@angular/material/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { AuthGuard } from "./router-guard/auth.guard";
import { LoginGuard } from "./router-guard/login.guard";
import { CustomerGuard } from "./router-guard/customer.guard";
import { AdminGuard } from "./router-guard/admin.guard";
import { SpeakerService } from "./speaker-management-system/service/speaker.service";
import { BookingService } from "./booking-management-system/service/booking.service";
import { ViewProfileComponent } from "./profile-management-system/components/view-profile/view-profile.component";
import { AddScheduleComponent } from "./schedule-management-system/components/add-schedule/add-schedule.component";
import { ViewScheduleComponent } from "./schedule-management-system/components/view-schedule/view-schedule.component";
import { EditScheduleComponent } from "./schedule-management-system/components/edit-schedule/edit-schedule.component";
import { EditProfileContactDetailsComponent } from "./profile-management-system/components/edit-profile-contact-details/edit-profile-contact-details.component";
import { EditProfileImageComponent } from "./profile-management-system/components/edit-profile-image/edit-profile-image.component";
import { ProfileService } from "./profile-management-system/service/profile.service";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AboutUsComponent,
    BlogComponent,
    ContactUsComponent,
    CreateEventComponent,
    EditEventComponent,
    ViewEventsComponent,
    EventDetailsComponent,
    ViewEventTableComponent,
    ScheduleEventDetailsComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegistrationComponent,
    BookingComponent,
    ViewBookingComponent,
    CreateSpeakerComponent,
    ViewSpeakerComponent,
    ModifySpeakerComponent,
    ViewProfileComponent,
    AddScheduleComponent,
    ViewScheduleComponent,
    EditScheduleComponent,
    EditProfileContactDetailsComponent,
    EditProfileImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    YouTubePlayerModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    NgpImagePickerModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatNativeDateModule,

    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  entryComponents: [
    BookingComponent,
    EditProfileContactDetailsComponent,
    EditProfileImageComponent,
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    CustomerGuard,
    AdminGuard,
    UserService,
    LoginService,
    TokenStorageService,
    ProfileService,
    SpeakerService,
    BookingService,
    ScheduleService,
    LocationService,
    CategoryService,
    EventService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "fill" },
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
