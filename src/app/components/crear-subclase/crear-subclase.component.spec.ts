import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSubclaseComponent } from './crear-subclase.component';

describe('CrearSubclaseComponent', () => {
  let component: CrearSubclaseComponent;
  let fixture: ComponentFixture<CrearSubclaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearSubclaseComponent]
    });
    fixture = TestBed.createComponent(CrearSubclaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
