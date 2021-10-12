/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๑๐/๒๕๖๔>
Modify date : <๐๓/๑๐/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Directive, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, Input, Type, OnInit } from '@angular/core';

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
