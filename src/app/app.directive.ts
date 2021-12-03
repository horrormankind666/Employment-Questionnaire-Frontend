/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๑๐/๒๕๖๔>
Modify date : <๐๑/๑๒/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Directive, HostListener, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, Input, Type, OnInit } from '@angular/core';

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
