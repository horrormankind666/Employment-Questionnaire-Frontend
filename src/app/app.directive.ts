/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๑๐/๒๕๖๔>
Modify date : <๑๐/๑๒/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Directive, HostListener, ElementRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, Input, Type, OnInit } from '@angular/core';
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
    private dispatchEvent(el: any, eventType: any) {
        const event = document.createEvent('Event');

        event.initEvent(eventType, false, false);
        el.dispatchEvent(event);
    }

    @HostListener('blur', ['$event.target', '$event.target.value'])
    onBlur(el: any, value: string) {
        if ('function' === typeof value.trim && value.trim() !== value) {
            el.value = value.trim();

            this.dispatchEvent(el, 'input');
            this.dispatchEvent(el, 'textarea')
            this.dispatchEvent(el, 'blur');
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
