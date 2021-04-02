import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DemoTestModule } from '../../../test.module';
import { CartItemDetailComponent } from 'app/entities/cart-item/cart-item-detail.component';
import { CartItem } from 'app/shared/model/cart-item.model';

describe('Component Tests', () => {
  describe('CartItem Management Detail Component', () => {
    let comp: CartItemDetailComponent;
    let fixture: ComponentFixture<CartItemDetailComponent>;
    const route = ({ data: of({ cartItem: new CartItem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DemoTestModule],
        declarations: [CartItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CartItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CartItemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cartItem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cartItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
