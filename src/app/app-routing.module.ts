import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { FriendsComponent } from './friends/friends.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSigninComponent } from './user-signin/user-signin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'chat', component: ChatComponent },
  {
    path: 'chat/:name',
    component: ChatComponent,
  },
  {
    path:"login",
    component:UserLoginComponent
  },
  {
    path:"signin",
    component:UserSigninComponent
  },
  {
    path:"friends",
    component:FriendsComponent
  },
  {
    path:"profile",
    component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
