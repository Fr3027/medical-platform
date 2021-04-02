import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoTestModule } from '../../../test.module';
import { CustomerDetailsComponent } from 'app/entities/customer-details/customer-details.component';
import { CustomerDetailsService } from 'app/entities/customer-details/customer-details.service';
import { CustomerDetails } from 'app/shared/model/customer-details.model';

describe('Component Tests', () => {
  describe('CustomerDetails Management Component', () => {
    let comp: CustomerDetailsComponent;
    let fixture: ComponentFixture<CustomerDetailsComponent>;
    let service: CustomerDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DemoTestModule],
        declarations: [CustomerDetailsComponent],
      })
        .overrideTemplate(CustomerDetailsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerDetailsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerDetailsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerDetails(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customerDetails && comp.customerDetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
