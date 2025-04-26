import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumSpaceComponent } from './premium-space.component';

describe('PremiumSpaceComponent', () => {
  let component: PremiumSpaceComponent;
  let fixture: ComponentFixture<PremiumSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumSpaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
