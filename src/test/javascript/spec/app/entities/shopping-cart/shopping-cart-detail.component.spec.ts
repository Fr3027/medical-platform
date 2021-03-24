import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DemoTestModule } from '../../../test.module';
import { ShoppingCartDetailComponent } from 'app/entities/shopping-cart/shopping-cart-detail.component';
import { ShoppingCart } from 'app/shared/model/shopping-cart.model';

describe('Component Tests', () => {
  describe('ShoppingCart Management Detail Component', () => {
    let comp: ShoppingCartDetailComponent;
    let fixture: ComponentFixture<ShoppingCartDetailComponent>;
    const route = ({ data: of({ shoppingCart: new ShoppingCart(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DemoTestModule],
        declarations: [ShoppingCartDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ShoppingCartDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShoppingCartDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load shoppingCart on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shoppingCart).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
