import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DemoTestModule } from '../../../test.module';
import { CustomerDetailsUpdateComponent } from 'app/entities/customer-details/customer-details-update.component';
import { CustomerDetailsService } from 'app/entities/customer-details/customer-details.service';
import { CustomerDetails } from 'app/shared/model/customer-details.model';

describe('Component Tests', () => {
  describe('CustomerDetails Management Update Component', () => {
    let comp: CustomerDetailsUpdateComponent;
    let fixture: ComponentFixture<CustomerDetailsUpdateComponent>;
    let service: CustomerDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DemoTestModule],
        declarations: [CustomerDetailsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CustomerDetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerDetailsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerDetailsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerDetails(123);
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
        const entity = new CustomerDetails();
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
