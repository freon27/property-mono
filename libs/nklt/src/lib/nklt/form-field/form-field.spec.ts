import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormField } from './form-field';

describe('FormField', () => {
  let component: FormField;
  let fixture: ComponentFixture<FormField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormField],
    }).compileComponents();

    fixture = TestBed.createComponent(FormField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label when provided', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
    
    const element = fixture.nativeElement as HTMLElement;
    const label = element.querySelector('.nklt-form-field-label');
    
    expect(label?.textContent?.trim()).toContain('Test Label');
  });

  it('should display required asterisk when required is true', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    
    const element = fixture.nativeElement as HTMLElement;
    const required = element.querySelector('.nklt-form-field-required');
    
    expect(required).toBeTruthy();
    expect(required?.textContent).toBe('*');
  });

  it('should display hint when provided and no error', () => {
    fixture.componentRef.setInput('hint', 'This is a hint');
    fixture.detectChanges();
    
    const element = fixture.nativeElement as HTMLElement;
    const hint = element.querySelector('.nklt-form-field-hint');
    
    expect(hint?.textContent?.trim()).toBe('This is a hint');
  });

  it('should display error when provided', () => {
    fixture.componentRef.setInput('error', 'This field is required');
    fixture.detectChanges();
    
    const element = fixture.nativeElement as HTMLElement;
    const error = element.querySelector('.nklt-form-field-error');
    
    expect(error?.textContent?.trim()).toBe('This field is required');
  });

  it('should hide hint when error is displayed', () => {
    fixture.componentRef.setInput('hint', 'This is a hint');
    fixture.componentRef.setInput('error', 'This field is required');
    fixture.detectChanges();
    
    const element = fixture.nativeElement as HTMLElement;
    const hint = element.querySelector('.nklt-form-field-hint');
    const error = element.querySelector('.nklt-form-field-error');
    
    expect(hint).toBeFalsy();
    expect(error).toBeTruthy();
  });

  it('should add invalid class when error present', () => {
    fixture.componentRef.setInput('error', 'This field is required');
    fixture.detectChanges();
    
    const element = fixture.nativeElement as HTMLElement;
    const formField = element.querySelector('.nklt-form-field');
    
    expect(formField?.classList.contains('nklt-form-field-invalid')).toBe(true);
  });

  it('should add disabled class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    
    const element = fixture.nativeElement as HTMLElement;
    const formField = element.querySelector('.nklt-form-field');
    
    expect(formField?.classList.contains('nklt-form-field-disabled')).toBe(true);
  });
});
