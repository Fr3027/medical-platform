import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoTestModule } from '../../../test.module';
import { ShoppingCartComponent } from 'app/entities/shopping-cart/shopping-cart.component';
import { ShoppingCartService } from 'app/entities/shopping-cart/shopping-cart.service';
import { ShoppingCart } from 'app/shared/model/shopping-cart.model';

describe('Component Tests', () => {
  describe('ShoppingCart Management Component', () => {
    let comp: ShoppingCartComponent;
    let fixture: ComponentFixture<ShoppingCartComponent>;
    let service: ShoppingCartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DemoTestModule],
        declarations: [ShoppingCartComponent],
      })
        .overrideTemplate(ShoppingCartComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShoppingCartComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShoppingCartService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ShoppingCart(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.shoppingCarts && comp.shoppingCarts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
