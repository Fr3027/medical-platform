import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DemoTestModule } from '../../../test.module';
import { AdvisoryDetailComponent } from 'app/entities/advisory/advisory-detail.component';
import { Advisory } from 'app/shared/model/advisory.model';

describe('Component Tests', () => {
  describe('Advisory Management Detail Component', () => {
    let comp: AdvisoryDetailComponent;
    let fixture: ComponentFixture<AdvisoryDetailComponent>;
    const route = ({ data: of({ advisory: new Advisory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DemoTestModule],
        declarations: [AdvisoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AdvisoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdvisoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load advisory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.advisory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
