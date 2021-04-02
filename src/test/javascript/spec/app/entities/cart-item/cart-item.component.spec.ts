import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoTestModule } from '../../../test.module';
import { CartItemComponent } from 'app/entities/cart-item/cart-item.component';
import { CartItemService } from 'app/entities/cart-item/cart-item.service';
import { CartItem } from 'app/shared/model/cart-item.model';

describe('Component Tests', () => {
  describe('CartItem Management Component', () => {
    let comp: CartItemComponent;
    let fixture: ComponentFixture<CartItemComponent>;
    let service: CartItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DemoTestModule],
        declarations: [CartItemComponent],
      })
        .overrideTemplate(CartItemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CartItemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CartItemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CartItem(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cartItems && comp.cartItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
