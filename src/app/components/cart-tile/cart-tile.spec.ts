import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTile } from './cart-tile';

describe('CartTile', () => {
  let component: CartTile;
  let fixture: ComponentFixture<CartTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
