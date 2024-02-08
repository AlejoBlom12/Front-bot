import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSubclaseComponent } from './lista-subclase.component';

describe('ListaSubclaseComponent', () => {
  let component: ListaSubclaseComponent;
  let fixture: ComponentFixture<ListaSubclaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaSubclaseComponent]
    });
    fixture = TestBed.createComponent(ListaSubclaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
