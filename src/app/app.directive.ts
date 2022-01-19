/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๑๐/๒๕๖๔>
Modify date : <๑๙/๐๑/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Directive, Pipe, PipeTransform, HostListener, ElementRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, Input, Type, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[dynamicComponent]'
})
export class DynamicComponentDirective implements OnInit {
    @Input('dynamicComponent') component!: Type<any>;
    @Input('data') data: any;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component)

        this.viewContainerRef.clear();
        const newViewContainerRef = this.viewContainerRef.createComponent(componentFactory);

        if (this.data)
            newViewContainerRef.instance.data$ = this.data;

        this.changeDetectorRef.detectChanges();
    }
}

@Directive({
    selector: 'input[trimOnBlur], textarea[trimOnBlur]'
})
export class TrimOnBlurDirective {
    private doDispatchEvent(el: any, eventType: any) {
        const event = document.createEvent('Event');

        event.initEvent(eventType, false, false);
        el.dispatchEvent(event);
    }

    @HostListener('blur', ['$event.target', '$event.target.value'])
    onBlur(el: any, value: string) {
        if ('function' === typeof value.trim && value.trim() !== value) {
            el.value = value.trim();

            this.doDispatchEvent(el, 'input');
            this.doDispatchEvent(el, 'textarea')
            this.doDispatchEvent(el, 'blur');
        }
    }
}

@Directive({
    selector: '[ngModel][empty2Null]'
})
export class NullValueDirective {
    constructor(
        private el: ElementRef,
        private model: NgModel
    ) {}

    @HostListener('input', ['$event.target'])
    onEvent(target: HTMLInputElement) {
        if (target.value === '' || target.value.length === 0)
            this.model.viewToModelUpdate(null);
    }
}

@Pipe({
    name: 'nl2br'
})
export class Nl2BrPipe implements PipeTransform {
    transform(value: string): string {
        if (!value)
            return value;

        let breakTag = '<br />';

        return (value + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }
}
