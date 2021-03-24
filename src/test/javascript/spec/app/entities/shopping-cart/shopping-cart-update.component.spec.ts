import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DemoTestModule } from '../../../test.module';
import { ShoppingCartUpdateComponent } from 'app/entities/shopping-cart/shopping-cart-update.component';
import { ShoppingCartService } from 'app/entities/shopping-cart/shopping-cart.service';
import { ShoppingCart } from 'app/shared/model/shopping-cart.model';

describe('Component Tests', () => {
  describe('ShoppingCart Management Update Component', () => {
    let comp: ShoppingCartUpdateComponent;
    let fixture: ComponentFixture<ShoppingCartUpdateComponent>;
    let service: ShoppingCartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DemoTestModule],
        declarations: [ShoppingCartUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ShoppingCartUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShoppingCartUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShoppingCartService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ShoppingCart(123);
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
        const entity = new ShoppingCart();
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
