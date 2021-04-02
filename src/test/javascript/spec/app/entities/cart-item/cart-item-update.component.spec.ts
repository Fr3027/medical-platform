import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DemoTestModule } from '../../../test.module';
import { CartItemUpdateComponent } from 'app/entities/cart-item/cart-item-update.component';
import { CartItemService } from 'app/entities/cart-item/cart-item.service';
import { CartItem } from 'app/shared/model/cart-item.model';

describe('Component Tests', () => {
  describe('CartItem Management Update Component', () => {
    let comp: CartItemUpdateComponent;
    let fixture: ComponentFixture<CartItemUpdateComponent>;
    let service: CartItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DemoTestModule],
        declarations: [CartItemUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CartItemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CartItemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CartItemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CartItem(123);
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
        const entity = new CartItem();
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
