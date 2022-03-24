import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { BlocksComponent } from './blocks/blocks.component';
import { LoginComponent } from './login/login.component';
import { BlogsListComponent } from './blogs/blogs-list/blogs-list.component';
import { BlogComponent } from './blogs/blog/blog.component';
import { ResumComponent } from './resum/resum.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members',component: MemberListComponent,},
      { path: 'members/:username', component: MemberDetailComponent, resolve: {member: MemberDetailedResolver}},
      { path: 'member/edit', component: MemberEditComponent, canDeactivate:[PreventUnsavedChangesGuard]},
      { path: 'lists', component: ListComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'blocks', component: BlocksComponent},
      { path: 'blogs', component: BlogsListComponent},
      { path: 'blogs/:id', component: BlogComponent},
      { path: 'admin', component: AdminPanelComponent,  canActivate:[AdminGuard] },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'resum', component: ResumComponent },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
