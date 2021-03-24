import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoTestModule } from '../../../test.module';
import { AdvisoryComponent } from 'app/entities/advisory/advisory.component';
import { AdvisoryService } from 'app/entities/advisory/advisory.service';
import { Advisory } from 'app/shared/model/advisory.model';

describe('Component Tests', () => {
  describe('Advisory Management Component', () => {
    let comp: AdvisoryComponent;
    let fixture: ComponentFixture<AdvisoryComponent>;
    let service: AdvisoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DemoTestModule],
        declarations: [AdvisoryComponent],
      })
        .overrideTemplate(AdvisoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdvisoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdvisoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Advisory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.advisories && comp.advisories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
