import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SecondaryLayoutComponent } from './layouts/secondary-layout/secondary-layout.component';
import { NcrFormComponent } from './pages/ncr-form/ncr-form.component';
import { AccountComponent } from './pages/account/account.component';
import { NcrReplyComponent } from './pages/ncr-reply/ncr-reply.component';
import { NcrFollowResultComponent } from './pages/ncr-follow-result/ncr-follow-result.component';
import { NcrListComponent } from './pages/ncr-list/ncr-list.component';
import { IorFormComponent } from './pages/ior-form/ior-form.component';
import { IorFollowOnComponent } from './pages/ior-follow-on/ior-follow-on.component';
import { IorListComponent } from './pages/ior-list/ior-list.component';
import { NcrViewDgcaComponent } from './pages/ncr-view-dgca/ncr-view-dgca.component';
import { NcrViewEasaComponent } from './pages/ncr-view-easa/ncr-view-easa.component';
import { IorViewComponent } from './pages/ior-view/ior-view.component';
import { AuthGuard } from './services/auth/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuditPlanComponent } from './pages/audit-plan/audit-plan.component';
import { EditNcrFormComponent } from './pages/edit/edit-ncr-form/edit-ncr-form.component';
import { EditIorFormComponent } from './pages/edit/edit-ior-form/edit-ior-form.component';
import { EditNcrReplyComponent } from './pages/edit/edit-ncr-reply/edit-ncr-reply.component';
import { EditNcrFollowResultComponent } from './pages/edit/edit-ncr-follow-result/edit-ncr-follow-result.component';
import { NcrViewDgcaFormComponent } from './pages/ncr-view-dgca-form/ncr-view-dgca-form.component';
import { NcrViewDgcaReplyComponent } from './pages/ncr-view-dgca-reply/ncr-view-dgca-reply.component';
import { NcrViewDgcaFollowResultComponent } from './pages/ncr-view-dgca-follow-result/ncr-view-dgca-follow-result.component';
import { NcrViewEasaFormComponent } from './pages/ncr-view-easa-form/ncr-view-easa-form.component';
import { NcrViewEasaReplyComponent } from './pages/ncr-view-easa-reply/ncr-view-easa-reply.component';
import { NcrViewEasaFollowResultComponent } from './pages/ncr-view-easa-follow-result/ncr-view-easa-follow-result.component';
import { NvsFormComponent } from './pages/nvs-form/nvs-form.component';
import { NvsPreviewComponent } from './pages/nvs-preview/nvs-preview.component';
import { IorViewFormComponent } from './pages/ior-view-form/ior-view-form.component';
import { IorViewFollowOnComponent } from './pages/ior-view-follow-on/ior-view-follow-on.component';
import { EditIorFollowOnComponent } from './pages/edit/edit-ior-follow-on/edit-ior-follow-on.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { AuditPlanViewDgcaComponent } from './pages/audit-plan-view-dgca/audit-plan-view-dgca.component';
import { AuditPlanViewEasaComponent } from './pages/audit-plan-view-easa/audit-plan-view-easa.component';
import { AuditStatusLogViewDgcaComponent } from './pages/audit-status-log-view-dgca/audit-status-log-view-dgca.component';
import { AuditStatusLogViewEasaComponent } from './pages/audit-status-log-view-easa/audit-status-log-view-easa.component';
import { AuditStatusLogComponent } from './pages/audit-status-log/audit-status-log.component';
import { AuditStatusLogListComponent } from './pages/audit-status-log-list/audit-status-log-list.component';
import { ActionLogComponent } from './pages/action-log/action-log.component';
import { ActionLogListComponent } from './pages/action-log-list/action-log-list.component';
import { EditActionLogComponent } from './pages/edit/edit-action-log/edit-action-log.component';
import { EditAuditStatusLogComponent } from './pages/edit/edit-audit-status-log/edit-audit-status-log.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { adminGuard } from './services/admin/admin.guard';
import { AccountAdminComponent } from './pages/account-admin/account-admin.component';
import { roleGuard } from './services/role/role.guard';

export const routes: Routes = [

    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'forbidden', component: ForbiddenComponent },  // Halaman Forbidden
            { path: 'ncr-form', component: NcrFormComponent, canActivate: [adminGuard] },
            { path: 'account', component: AccountComponent, canActivate: [roleGuard] },
            { path: 'ncr-reply/:NCR_init_ID', component: NcrReplyComponent },
            { path: 'ncr-follow-result/:NCR_init_ID', component: NcrFollowResultComponent, canActivate: [adminGuard] },
            { path: 'ncr-list', component: NcrListComponent },
            { path: 'ior-form', component: IorFormComponent, canActivate: [adminGuard] },
            { path: 'ior-follow-on/:id_IOR', component: IorFollowOnComponent, canActivate: [adminGuard] },
            { path: 'ior-list', component: IorListComponent },
            { path: 'ncr-view-dgca/:NCR_init_ID', component: NcrViewDgcaComponent },
            { path: 'ncr-view-easa/:NCR_init_ID', component: NcrViewEasaComponent },
            { path: 'ior-view/:id_IOR', component: IorViewComponent },
            { path: 'audit-plan', component: AuditPlanComponent, canActivate: [adminGuard] },
            { path: 'edit-ncr-form/:NCR_init_ID', component: EditNcrFormComponent, canActivate: [adminGuard] },
            { path: 'edit-ncr-reply/:NCR_init_ID', component: EditNcrReplyComponent },
            { path: 'edit-ncr-follow-result/:NCR_init_ID', component: EditNcrFollowResultComponent, canActivate: [adminGuard] },
            { path: 'edit-ior-form/:id_IOR', component: EditIorFormComponent, canActivate: [adminGuard] },
            { path: 'edit-ior-follow-on/:id_IOR', component: EditIorFollowOnComponent, canActivate: [adminGuard] },
            { path: 'ncr-view-dgca-form/:NCR_init_ID', component: NcrViewDgcaFormComponent },
            { path: 'ncr-view-dgca-reply/:NCR_init_ID', component: NcrViewDgcaReplyComponent },
            { path: 'ncr-view-dgca-follow-result/:NCR_init_ID', component: NcrViewDgcaFollowResultComponent },
            { path: 'ncr-view-easa-form/:NCR_init_ID', component: NcrViewEasaFormComponent },
            { path: 'ncr-view-easa-reply/:NCR_init_ID', component: NcrViewEasaReplyComponent },
            { path: 'ncr-view-easa-follow-result/:NCR_init_ID', component: NcrViewEasaFollowResultComponent },
            { path: 'nvs-form/:id', component: NvsFormComponent },
            { path: 'nvs-preview/:id', component: NvsPreviewComponent },
            { path: 'ior-view-form/:id_IOR', component: IorViewFormComponent },
            { path: 'ior-view-follow-on/:id_IOR', component: IorViewFollowOnComponent },
            { path: 'coming-soon', component: ComingSoonComponent },
            { path: 'audit-plan-view-dgca', component: AuditPlanViewDgcaComponent },
            { path: 'audit-plan-view-easa', component: AuditPlanViewEasaComponent },
            { path: 'audit-status-log-view-dgca/:auditStatusLog_id', component: AuditStatusLogViewDgcaComponent },
            { path: 'audit-status-log-view-easa/:auditStatusLog_id', component: AuditStatusLogViewEasaComponent },
            { path: 'audit-status-log', component: AuditStatusLogComponent, canActivate: [adminGuard] },
            { path: 'audit-status-log-list', component: AuditStatusLogListComponent },
            { path: 'action-log', component: ActionLogComponent, canActivate: [adminGuard] },
            { path: 'action-log-list', component: ActionLogListComponent },
            { path: 'edit-action-log/:actionLog_id', component: EditActionLogComponent, canActivate: [adminGuard] },
            { path: 'edit-audit-status-log/:auditStatusLog_id', component: EditAuditStatusLogComponent, canActivate: [adminGuard] },
            { path: 'account-admin', component: AccountAdminComponent, canActivate: [adminGuard] },
        ],
    },
    {
        path: '',
        component: SecondaryLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: '**', component: NotFoundComponent },
        ],
    },

];
