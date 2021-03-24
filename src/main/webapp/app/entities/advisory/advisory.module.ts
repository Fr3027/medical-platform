import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoSharedModule } from 'app/shared/shared.module';
import { AdvisoryComponent } from './advisory.component';
import { AdvisoryDetailComponent } from './advisory-detail.component';
import { AdvisoryUpdateComponent } from './advisory-update.component';
import { AdvisoryDeleteDialogComponent } from './advisory-delete-dialog.component';
import { advisoryRoute } from './advisory.route';

@NgModule({
  imports: [DemoSharedModule, RouterModule.forChild(advisoryRoute)],
  declarations: [AdvisoryComponent, AdvisoryDetailComponent, AdvisoryUpdateComponent, AdvisoryDeleteDialogComponent],
  entryComponents: [AdvisoryDeleteDialogComponent],
})
export class DemoAdvisoryModule {}
