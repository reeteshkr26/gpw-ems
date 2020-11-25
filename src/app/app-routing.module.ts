import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ViewBookingComponent } from "./booking-management-system/components/view-booking/view-booking.component";
import { AboutUsComponent } from "./common/components/about-us/about-us.component";
import { BlogComponent } from "./common/components/blog/blog.component";
import { ContactUsComponent } from "./common/components/contact-us/contact-us.component";
import { HomeComponent } from "./common/components/home/home.component";
import { PageNotFoundComponent } from "./common/components/page-not-found/page-not-found.component";
import { CreateEventComponent } from "./event-management-system/components/create-event/create-event.component";
import { EditEventComponent } from "./event-management-system/components/edit-event/edit-event.component";
import { ScheduleEventDetailsComponent } from "./event-management-system/components/schedule-event-details/schedule-event-details.component";
import { ViewEventTableComponent } from "./event-management-system/components/view-event-table/view-event-table.component";
import { ViewEventsComponent } from "./event-management-system/components/view-events/view-events.component";
import { ViewProfileComponent } from "./profile-management-system/components/view-profile/view-profile.component";
import { AdminGuard } from "./router-guard/admin.guard";
import { AuthGuard } from "./router-guard/auth.guard";
import { CustomerGuard } from "./router-guard/customer.guard";
import { LoginGuard } from "./router-guard/login.guard";
import { AddScheduleComponent } from "./schedule-management-system/components/add-schedule/add-schedule.component";
import { EditScheduleComponent } from "./schedule-management-system/components/edit-schedule/edit-schedule.component";
import { ViewScheduleComponent } from "./schedule-management-system/components/view-schedule/view-schedule.component";
import { CreateSpeakerComponent } from "./speaker-management-system/components/create-speaker/create-speaker.component";
import { ModifySpeakerComponent } from "./speaker-management-system/components/modify-speaker/modify-speaker.component";
import { ViewSpeakerComponent } from "./speaker-management-system/components/view-speaker/view-speaker.component";
import { LoginComponent } from "./user-management-system/components/login/login.component";
import { RegistrationComponent } from "./user-management-system/components/registration/registration.component";

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "aboutUs", component: AboutUsComponent },
  { path: "contactUs", component: ContactUsComponent },
  { path: "blog", component: BlogComponent },

  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: "register",
    component: RegistrationComponent,
    canActivate: [LoginGuard],
  },

  {
    path: "create-event",
    component: CreateEventComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "view-events",
    component: ViewEventsComponent,
    canActivate: [AuthGuard, CustomerGuard],
  },
  {
    path: "edit-event/:eventId",
    component: EditEventComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "view-event-table",
    component: ViewEventTableComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "view-events/:eventId/:scheduleCode",
    component: ScheduleEventDetailsComponent,
    canActivate: [AuthGuard, CustomerGuard],
  },

  {
    path: "create-speaker",
    component: CreateSpeakerComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "view-speakers",
    component: ViewSpeakerComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "modify-speaker/:speakerId",
    component: ModifySpeakerComponent,
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: "view-bookings",
    component: ViewBookingComponent,
    canActivate: [AuthGuard, CustomerGuard],
  },

  {
    path: "view-profile",
    component: ViewProfileComponent,
    canActivate: [AuthGuard, CustomerGuard],
  },

  {
    path: "add-schedule",
    component: AddScheduleComponent,
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: "view-schedules",
    component: ViewScheduleComponent,
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: "edit-schedule/:scheduleId",
    component: EditScheduleComponent,
    canActivate: [AuthGuard, AdminGuard],
  },

  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
