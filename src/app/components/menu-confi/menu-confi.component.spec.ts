import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConfiComponent } from './menu-confi.component';

describe('MenuConfiComponent', () => {
  let component: MenuConfiComponent;
  let fixture: ComponentFixture<MenuConfiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuConfiComponent]
    });
    fixture = TestBed.createComponent(MenuConfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
