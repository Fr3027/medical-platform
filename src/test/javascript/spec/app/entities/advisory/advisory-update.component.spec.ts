import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DemoTestModule } from '../../../test.module';
import { AdvisoryUpdateComponent } from 'app/entities/advisory/advisory-update.component';
import { AdvisoryService } from 'app/entities/advisory/advisory.service';
import { Advisory } from 'app/shared/model/advisory.model';

describe('Component Tests', () => {
  describe('Advisory Management Update Component', () => {
    let comp: AdvisoryUpdateComponent;
    let fixture: ComponentFixture<AdvisoryUpdateComponent>;
    let service: AdvisoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DemoTestModule],
        declarations: [AdvisoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AdvisoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdvisoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdvisoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Advisory(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Advisory();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
