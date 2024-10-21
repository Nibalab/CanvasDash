/**
 * gridstack.component.ts 10.3.1
 * Copyright (c) 2022 Alain Dumesny - see GridStack root license
 */
import { Component, ContentChildren, EventEmitter, Input, Output, ViewChild, ViewContainerRef, reflectComponentType } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridStack } from 'gridstack';
import { GridstackItemComponent } from './gridstack-item.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * HTML Component Wrapper for gridstack, in combination with GridstackItemComponent for the items
 */
export class GridstackComponent {
    constructor(
    // private readonly zone: NgZone,
    // private readonly cd: ChangeDetectorRef,
    elementRef) {
        this.elementRef = elementRef;
        /** individual list of GridStackEvent callbacks handlers as output
         * otherwise use this.grid.on('name1 name2 name3', callback) to handle multiple at once
         * see https://github.com/gridstack/gridstack.js/blob/master/demo/events.js#L4
         *
         * Note: camel casing and 'CB' added at the end to prevent @angular-eslint/no-output-native
         * eg: 'change' would trigger the raw CustomEvent so use different name.
         */
        this.addedCB = new EventEmitter();
        this.changeCB = new EventEmitter();
        this.disableCB = new EventEmitter();
        this.dragCB = new EventEmitter();
        this.dragStartCB = new EventEmitter();
        this.dragStopCB = new EventEmitter();
        this.droppedCB = new EventEmitter();
        this.enableCB = new EventEmitter();
        this.removedCB = new EventEmitter();
        this.resizeCB = new EventEmitter();
        this.resizeStartCB = new EventEmitter();
        this.resizeStopCB = new EventEmitter();
        this.ngUnsubscribe = new Subject();
        this.el._gridComp = this;
    }
    /** initial options for creation of the grid */
    set options(val) { this._options = val; }
    /** return the current running options */
    get options() { return this._grid?.opts || this._options || {}; }
    /** return the native element that contains grid specific fields as well */
    get el() { return this.elementRef.nativeElement; }
    /** return the GridStack class */
    get grid() { return this._grid; }
    /** add a list of ng Component to be mapped to selector */
    static addComponentToSelectorType(typeList) {
        typeList.forEach(type => GridstackComponent.selectorToType[GridstackComponent.getSelector(type)] = type);
    }
    /** return the ng Component selector */
    static getSelector(type) {
        return reflectComponentType(type).selector;
    }
    ngOnInit() {
        // init ourself before any template children are created since we track them below anyway - no need to double create+update widgets
        this.loaded = !!this.options?.children?.length;
        this._grid = GridStack.init(this._options, this.el);
        delete this._options; // GS has it now
        this.checkEmpty();
    }
    /** wait until after all DOM is ready to init gridstack children (after angular ngFor and sub-components run first) */
    ngAfterContentInit() {
        // track whenever the children list changes and update the layout...
        this.gridstackItems?.changes
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => this.updateAll());
        // ...and do this once at least unless we loaded children already
        if (!this.loaded)
            this.updateAll();
        this.hookEvents(this.grid);
    }
    ngOnDestroy() {
        delete this.ref;
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        this.grid?.destroy();
        delete this._grid;
        delete this.el._gridComp;
    }
    /**
     * called when the TEMPLATE list of items changes - get a list of nodes and
     * update the layout accordingly (which will take care of adding/removing items changed by Angular)
     */
    updateAll() {
        if (!this.grid)
            return;
        const layout = [];
        this.gridstackItems?.forEach(item => {
            layout.push(item.options);
            item.clearOptions();
        });
        this.grid.load(layout); // efficient that does diffs only
    }
    /** check if the grid is empty, if so show alternative content */
    checkEmpty() {
        if (!this.grid)
            return;
        const isEmpty = !this.grid.engine.nodes.length;
        if (isEmpty === this.isEmpty)
            return;
        this.isEmpty = isEmpty;
        // this.cd.detectChanges();
    }
    /** get all known events as easy to use Outputs for convenience */
    hookEvents(grid) {
        if (!grid)
            return;
        grid
            .on('added', (event, nodes) => { this.checkEmpty(); this.addedCB.emit({ event, nodes }); })
            .on('change', (event, nodes) => this.changeCB.emit({ event, nodes }))
            .on('disable', (event) => this.disableCB.emit({ event }))
            .on('drag', (event, el) => this.dragCB.emit({ event, el }))
            .on('dragstart', (event, el) => this.dragStartCB.emit({ event, el }))
            .on('dragstop', (event, el) => this.dragStopCB.emit({ event, el }))
            .on('dropped', (event, previousNode, newNode) => this.droppedCB.emit({ event, previousNode, newNode }))
            .on('enable', (event) => this.enableCB.emit({ event }))
            .on('removed', (event, nodes) => { this.checkEmpty(); this.removedCB.emit({ event, nodes }); })
            .on('resize', (event, el) => this.resizeCB.emit({ event, el }))
            .on('resizestart', (event, el) => this.resizeStartCB.emit({ event, el }))
            .on('resizestop', (event, el) => this.resizeStopCB.emit({ event, el }));
    }
}
/**
 * stores the selector -> Type mapping, so we can create items dynamically from a string.
 * Unfortunately Ng doesn't provide public access to that mapping.
 */
GridstackComponent.selectorToType = {};
GridstackComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: GridstackComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GridstackComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: GridstackComponent, selector: "gridstack", inputs: { options: "options", isEmpty: "isEmpty" }, outputs: { addedCB: "addedCB", changeCB: "changeCB", disableCB: "disableCB", dragCB: "dragCB", dragStartCB: "dragStartCB", dragStopCB: "dragStopCB", droppedCB: "droppedCB", enableCB: "enableCB", removedCB: "removedCB", resizeCB: "resizeCB", resizeStartCB: "resizeStartCB", resizeStopCB: "resizeStopCB" }, queries: [{ propertyName: "gridstackItems", predicate: GridstackItemComponent }], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
    <!-- content to show when when grid is empty, like instructions on how to add widgets -->
    <ng-content select="[empty-content]" *ngIf="isEmpty"></ng-content>
    <!-- where dynamic items go -->
    <ng-template #container></ng-template>
    <!-- where template items go -->
    <ng-content></ng-content>
  `, isInline: true, styles: [":host{display:block}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: GridstackComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gridstack', template: `
    <!-- content to show when when grid is empty, like instructions on how to add widgets -->
    <ng-content select="[empty-content]" *ngIf="isEmpty"></ng-content>
    <!-- where dynamic items go -->
    <ng-template #container></ng-template>
    <!-- where template items go -->
    <ng-content></ng-content>
  `, styles: [":host{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { gridstackItems: [{
                type: ContentChildren,
                args: [GridstackItemComponent]
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], options: [{
                type: Input
            }], isEmpty: [{
                type: Input
            }], addedCB: [{
                type: Output
            }], changeCB: [{
                type: Output
            }], disableCB: [{
                type: Output
            }], dragCB: [{
                type: Output
            }], dragStartCB: [{
                type: Output
            }], dragStopCB: [{
                type: Output
            }], droppedCB: [{
                type: Output
            }], enableCB: [{
                type: Output
            }], removedCB: [{
                type: Output
            }], resizeCB: [{
                type: Output
            }], resizeStartCB: [{
                type: Output
            }], resizeStopCB: [{
                type: Output
            }] } });
/**
 * can be used when a new item needs to be created, which we do as a Angular component, or deleted (skip)
 **/
export function gsCreateNgComponents(host, w, add, isGrid) {
    if (add) {
        //
        // create the component dynamically - see https://angular.io/docs/ts/latest/cookbook/dynamic-component-loader.html
        //
        if (!host)
            return;
        if (isGrid) {
            const container = host.parentElement?._gridItemComp?.container;
            // TODO: figure out how to create ng component inside regular Div. need to access app injectors...
            // if (!container) {
            //   const hostElement: Element = host;
            //   const environmentInjector: EnvironmentInjector;
            //   grid = createComponent(GridstackComponent, {environmentInjector, hostElement})?.instance;
            // }
            const gridRef = container?.createComponent(GridstackComponent);
            const grid = gridRef?.instance;
            if (!grid)
                return;
            grid.ref = gridRef;
            grid.options = w;
            return grid.el;
        }
        else {
            const gridComp = host._gridComp;
            const gridItemRef = gridComp?.container?.createComponent(GridstackItemComponent);
            const gridItem = gridItemRef?.instance;
            if (!gridItem)
                return;
            gridItem.ref = gridItemRef;
            // IFF we're not a subGrid, define what type of component to create as child, OR you can do it GridstackItemComponent template, but this is more generic
            if (!w.subGridOpts) {
                const selector = w.selector;
                const type = selector ? GridstackComponent.selectorToType[selector] : undefined;
                if (type) {
                    const childWidget = gridItem.container?.createComponent(type)?.instance;
                    // if proper BaseWidget subclass, save it and load additional data
                    if (childWidget && typeof childWidget.serialize === 'function' && typeof childWidget.deserialize === 'function') {
                        gridItem.childWidget = childWidget;
                        childWidget.deserialize(w);
                    }
                }
            }
            return gridItem.el;
        }
    }
    else {
        //
        // REMOVE - have to call ComponentRef:destroy() for dynamic objects to correctly remove themselves
        // Note: this will destroy all children dynamic components as well: gridItem -> childWidget
        //
        const n = w;
        if (isGrid) {
            const grid = n.el?._gridComp;
            if (grid?.ref)
                grid.ref.destroy();
            else
                grid?.ngOnDestroy();
        }
        else {
            const gridItem = n.el?._gridItemComp;
            if (gridItem?.ref)
                gridItem.ref.destroy();
            else
                gridItem?.ngOnDestroy();
        }
    }
    return;
}
/**
 * called for each item in the grid - check if additional information needs to be saved.
 * Note: since this is options minus gridstack private members using Utils.removeInternalForSave(),
 * this typically doesn't need to do anything. However your custom Component @Input() are now supported
 * using BaseWidget.serialize()
 */
export function gsSaveAdditionalNgInfo(n, w) {
    const gridItem = n.el?._gridItemComp;
    if (gridItem) {
        const input = gridItem.childWidget?.serialize();
        if (input) {
            w.input = input;
        }
        return;
    }
    // else check if Grid
    const grid = n.el?._gridComp;
    if (grid) {
        //.... save any custom data
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0YWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FuZ3VsYXIvcHJvamVjdHMvbGliL3NyYy9saWIvZ3JpZHN0YWNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFDakUsTUFBTSxFQUFtQixTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ3JJLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBd0MsU0FBUyxFQUFvRCxNQUFNLFdBQVcsQ0FBQztBQUU5SCxPQUFPLEVBQTJCLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7OztBQWdDN0Y7O0dBRUc7QUFnQkgsTUFBTSxPQUFPLGtCQUFrQjtJQStEN0I7SUFDRSxpQ0FBaUM7SUFDakMsMENBQTBDO0lBQ3pCLFVBQTJDO1FBQTNDLGVBQVUsR0FBVixVQUFVLENBQWlDO1FBbkQ5RDs7Ozs7O1dBTUc7UUFDYyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN2QyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN4QyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUN2QyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFhLENBQUM7UUFDNUMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFhLENBQUM7UUFDM0MsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFhLENBQUM7UUFDMUMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdkMsY0FBUyxHQUFHLElBQUks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QUNELE9BQU87QUFDVCxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsQ0FBa0IsRUFBRSxDQUFvQjtJQUM3RSxNQUFNLFFBQVEsR0FBSSxDQUFDLENBQUMsRUFBOEIsRUFBRSxhQUFhLENBQUM7SUFDbEUsSUFBSSxRQUFRLEVBQUU7UUFDWixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDO1FBQ2hELElBQUksS0FBSyxFQUFFO1lBQ1QsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDakI7UUFDRCxPQUFPO0tBQ1I7SUFDRCxxQkFBcUI7SUFDckIsTUFBTSxJQUFJLEdBQUksQ0FBQyxDQUFDLEVBQTBCLEVBQUUsU0FBUyxDQUFDO0lBQ3RELElBQUksSUFBSSxFQUFFO1FBQ1IsMkJBQTJCO0tBQzVCO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZ3JpZHN0YWNrLmNvbXBvbmVudC50cyAxMC4zLjFcbiAqIENvcHlyaWdodCAoYykgMjAyMiBBbGFpbiBEdW1lc255IC0gc2VlIEdyaWRTdGFjayByb290IGxpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCxcbiAgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0LCBUeXBlLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYsIHJlZmxlY3RDb21wb25lbnRUeXBlLCBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEdyaWRIVE1MRWxlbWVudCwgR3JpZEl0ZW1IVE1MRWxlbWVudCwgR3JpZFN0YWNrLCBHcmlkU3RhY2tOb2RlLCBHcmlkU3RhY2tPcHRpb25zLCBHcmlkU3RhY2tXaWRnZXQgfSBmcm9tICdncmlkc3RhY2snO1xuXG5pbXBvcnQgeyBHcmlkSXRlbUNvbXBIVE1MRWxlbWVudCwgR3JpZHN0YWNrSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZ3JpZHN0YWNrLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuL2Jhc2Utd2lkZ2V0JztcblxuLyoqIGV2ZW50cyBoYW5kbGVycyBlbWl0dGVycyBzaWduYXR1cmUgZm9yIGRpZmZlcmVudCBldmVudHMgKi9cbmV4cG9ydCB0eXBlIGV2ZW50Q0IgPSB7ZXZlbnQ6IEV2ZW50fTtcbmV4cG9ydCB0eXBlIGVsZW1lbnRDQiA9IHtldmVudDogRXZlbnQsIGVsOiBHcmlkSXRlbUhUTUxFbGVtZW50fTtcbmV4cG9ydCB0eXBlIG5vZGVzQ0IgPSB7ZXZlbnQ6IEV2ZW50LCBub2RlczogR3JpZFN0YWNrTm9kZVtdfTtcbmV4cG9ydCB0eXBlIGRyb3BwZWRDQiA9IHtldmVudDogRXZlbnQsIHByZXZpb3VzTm9kZTogR3JpZFN0YWNrTm9kZSwgbmV3Tm9kZTogR3JpZFN0YWNrTm9kZX07XG5cbmV4cG9ydCB0eXBlIE5nQ29tcElucHV0cyA9IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuXG4vKiogZXh0ZW5kcyB0byBzdG9yZSBOZyBDb21wb25lbnQgc2VsZWN0b3IsIGluc3RlYWQvaW5BZGRpdGlvbiB0byBjb250ZW50ICovXG5leHBvcnQgaW50ZXJmYWNlIE5nR3JpZFN0YWNrV2lkZ2V0IGV4dGVuZHMgR3JpZFN0YWNrV2lkZ2V0IHtcbiAgc2VsZWN0b3I/OiBzdHJpbmc7IC8vIGNvbXBvbmVudCB0eXBlIHRvIGNyZWF0ZSBhcyBjb250ZW50XG4gIGlucHV0PzogTmdDb21wSW5wdXRzOyAvLyBzZXJpYWxpemVkIGRhdGEgZm9yIHRoZSBjb21wb25lbnQgaW5wdXQgZmllbGRzXG59XG5leHBvcnQgaW50ZXJmYWNlIE5nR3JpZFN0YWNrTm9kZSBleHRlbmRzIEdyaWRTdGFja05vZGUge1xuICBzZWxlY3Rvcj86IHN0cmluZzsgLy8gY29tcG9uZW50IHR5cGUgdG8gY3JlYXRlIGFzIGNvbnRlbnRcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTmdHcmlkU3RhY2tPcHRpb25zIGV4dGVuZHMgR3JpZFN0YWNrT3B0aW9ucyB7XG4gIGNoaWxkcmVuPzogTmdHcmlkU3RhY2tXaWRnZXRbXTtcbiAgc3ViR3JpZE9wdHM/OiBOZ0dyaWRTdGFja09wdGlvbnM7XG59XG5cbi8qKiBzdG9yZSBlbGVtZW50IHRvIE5nIENsYXNzIHBvaW50ZXIgYmFjayAqL1xuZXhwb3J0IGludGVyZmFjZSBHcmlkQ29tcEhUTUxFbGVtZW50IGV4dGVuZHMgR3JpZEhUTUxFbGVtZW50IHtcbiAgX2dyaWRDb21wPzogR3JpZHN0YWNrQ29tcG9uZW50O1xufVxuXG4vKiogc2VsZWN0b3Igc3RyaW5nIHRvIHJ1bnRpbWUgVHlwZSBtYXBwaW5nICovXG5leHBvcnQgdHlwZSBTZWxlY3RvclRvVHlwZSA9IHtba2V5OiBzdHJpbmddOiBUeXBlPE9iamVjdD59O1xuXG4vKipcbiAqIEhUTUwgQ29tcG9uZW50IFdyYXBwZXIgZm9yIGdyaWRzdGFjaywgaW4gY29tYmluYXRpb24gd2l0aCBHcmlkc3RhY2tJdGVtQ29tcG9uZW50IGZvciB0aGUgaXRlbXNcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3JpZHN0YWNrJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tIGNvbnRlbnQgdG8gc2hvdyB3aGVuIHdoZW4gZ3JpZCBpcyBlbXB0eSwgbGlrZSBpbnN0cnVjdGlvbnMgb24gaG93IHRvIGFkZCB3aWRnZXRzIC0tPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltlbXB0eS1jb250ZW50XVwiICpuZ0lmPVwiaXNFbXB0eVwiPjwvbmctY29udGVudD5cbiAgICA8IS0tIHdoZXJlIGR5bmFtaWMgaXRlbXMgZ28gLS0+XG4gICAgPG5nLXRlbXBsYXRlICNjb250YWluZXI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8IS0tIHdoZXJlIHRlbXBsYXRlIGl0ZW1zIGdvIC0tPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgc3R5bGVzOiBbYFxuICAgIDpob3N0IHsgZGlzcGxheTogYmxvY2s7IH1cbiAgYF0sXG4gIC8vIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLCAvLyBJRkYgeW91IHdhbnQgdG8gb3B0aW1pemUgYW5kIGNvbnRyb2wgd2hlbiBDaGFuZ2VEZXRlY3Rpb24gbmVlZHMgdG8gaGFwcGVuLi4uXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRzdGFja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAvKiogdHJhY2sgbGlzdCBvZiBURU1QTEFURSBncmlkIGl0ZW1zIHNvIHdlIGNhbiBzeW5jIGJldHdlZW4gRE9NIGFuZCBHUyBpbnRlcm5hbHMgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihHcmlkc3RhY2tJdGVtQ29tcG9uZW50KSBwdWJsaWMgZ3JpZHN0YWNrSXRlbXM/OiBRdWVyeUxpc3Q8R3JpZHN0YWNrSXRlbUNvbXBvbmVudD47XG4gIC8qKiBjb250YWluZXIgdG8gYXBwZW5kIGl0ZW1zIGR5bmFtaWNhbGx5ICovXG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSkgcHVibGljIGNvbnRhaW5lcj86IFZpZXdDb250YWluZXJSZWY7XG5cbiAgLyoqIGluaXRpYWwgb3B0aW9ucyBmb3IgY3JlYXRpb24gb2YgdGhlIGdyaWQgKi9cbiAgQElucHV0KCkgcHVibGljIHNldCBvcHRpb25zKHZhbDogR3JpZFN0YWNrT3B0aW9ucykgeyB0aGlzLl9vcHRpb25zID0gdmFsOyB9XG4gIC8qKiByZXR1cm4gdGhlIGN1cnJlbnQgcnVubmluZyBvcHRpb25zICovXG4gIHB1YmxpYyBnZXQgb3B0aW9ucygpOiBHcmlkU3RhY2tPcHRpb25zIHsgcmV0dXJuIHRoaXMuX2dyaWQ/Lm9wdHMgfHwgdGhpcy5fb3B0aW9ucyB8fCB7fTsgfVxuXG4gIC8qKiB0cnVlIHdoaWxlIG5nLWNvbnRlbnQgd2l0aCAnbm8taXRlbS1jb250ZW50JyBzaG91bGQgYmUgc2hvd24gd2hlbiBsYXN0IGl0ZW0gaXMgcmVtb3ZlZCBmcm9tIGEgZ3JpZCAqL1xuICBASW5wdXQoKSBwdWJsaWMgaXNFbXB0eT86IGJvb2xlYW47XG5cbiAgLyoqIGluZGl2aWR1YWwgbGlzdCBvZiBHcmlkU3RhY2tFdmVudCBjYWxsYmFja3MgaGFuZGxlcnMgYXMgb3V0cHV0XG4gICAqIG90aGVyd2lzZSB1c2UgdGhpcy5ncmlkLm9uKCduYW1lMSBuYW1lMiBuYW1lMycsIGNhbGxiYWNrKSB0byBoYW5kbGUgbXVsdGlwbGUgYXQgb25jZVxuICAgKiBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2dyaWRzdGFjay9ncmlkc3RhY2suanMvYmxvYi9tYXN0ZXIvZGVtby9ldmVudHMuanMjTDRcbiAgICpcbiAgICogTm90ZTogY2FtZWwgY2FzaW5nIGFuZCAnQ0InIGFkZGVkIGF0IHRoZSBlbmQgdG8gcHJldmVudCBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW5hdGl2ZVxuICAgKiBlZzogJ2NoYW5nZScgd291bGQgdHJpZ2dlciB0aGUgcmF3IEN1c3RvbUV2ZW50IHNvIHVzZSBkaWZmZXJlbnQgbmFtZS5cbiAgICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgYWRkZWRDQiA9IG5ldyBFdmVudEVtaXR0ZXI8bm9kZXNDQj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBjaGFuZ2VDQiA9IG5ldyBFdmVudEVtaXR0ZXI8bm9kZXNDQj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBkaXNhYmxlQ0IgPSBuZXcgRXZlbnRFbWl0dGVyPGV2ZW50Q0I+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZHJhZ0NCID0gbmV3IEV2ZW50RW1pdHRlcjxlbGVtZW50Q0I+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZHJhZ1N0YXJ0Q0IgPSBuZXcgRXZlbnRFbWl0dGVyPGVsZW1lbnRDQj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBkcmFnU3RvcENCID0gbmV3IEV2ZW50RW1pdHRlcjxlbGVtZW50Q0I+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZHJvcHBlZENCID0gbmV3IEV2ZW50RW1pdHRlcjxkcm9wcGVkQ0I+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZW5hYmxlQ0IgPSBuZXcgRXZlbnRFbWl0dGVyPGV2ZW50Q0I+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcmVtb3ZlZENCID0gbmV3IEV2ZW50RW1pdHRlcjxub2Rlc0NCPigpO1xuICBAT3V0cHV0KCkgcHVibGljIHJlc2l6ZUNCID0gbmV3IEV2ZW50RW1pdHRlcjxlbGVtZW50Q0I+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcmVzaXplU3RhcnRDQiA9IG5ldyBFdmVudEVtaXR0ZXI8ZWxlbWVudENCPigpO1xuICBAT3V0cHV0KCkgcHVibGljIHJlc2l6ZVN0b3BDQiA9IG5ldyBFdmVudEVtaXR0ZXI8ZWxlbWVudENCPigpO1xuXG4gIC8qKiByZXR1cm4gdGhlIG5hdGl2ZSBlbGVtZW50IHRoYXQgY29udGFpbnMgZ3JpZCBzcGVjaWZpYyBmaWVsZHMgYXMgd2VsbCAqL1xuICBwdWJsaWMgZ2V0IGVsKCk6IEdyaWRDb21wSFRNTEVsZW1lbnQgeyByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7IH1cblxuICAvKiogcmV0dXJuIHRoZSBHcmlkU3RhY2sgY2xhc3MgKi9cbiAgcHVibGljIGdldCBncmlkKCk6IEdyaWRTdGFjayB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLl9ncmlkOyB9XG5cbiAgLyoqIENvbXBvbmVudFJlZiBvZiBvdXJzZWxmIC0gdXNlZCBieSBkeW5hbWljIG9iamVjdCB0byBjb3JyZWN0bHkgZ2V0IHJlbW92ZWQgKi9cbiAgcHVibGljIHJlZjogQ29tcG9uZW50UmVmPEdyaWRzdGFja0NvbXBvbmVudD4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgc2VsZWN0b3IgLT4gVHlwZSBtYXBwaW5nLCBzbyB3ZSBjYW4gY3JlYXRlIGl0ZW1zIGR5bmFtaWNhbGx5IGZyb20gYSBzdHJpbmcuXG4gICAqIFVuZm9ydHVuYXRlbHkgTmcgZG9lc24ndCBwcm92aWRlIHB1YmxpYyBhY2Nlc3MgdG8gdGhhdCBtYXBwaW5nLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBzZWxlY3RvclRvVHlwZTogU2VsZWN0b3JUb1R5cGUgPSB7fTtcbiAgLyoqIGFkZCBhIGxpc3Qgb2YgbmcgQ29tcG9uZW50IHRvIGJlIG1hcHBlZCB0byBzZWxlY3RvciAqL1xuICBwdWJsaWMgc3RhdGljIGFkZENvbXBvbmVudFRvU2VsZWN0b3JUeXBlKHR5cGVMaXN0OiBBcnJheTxUeXBlPE9iamVjdD4+KSB7XG4gICAgdHlwZUxpc3QuZm9yRWFjaCh0eXBlID0+IEdyaWRzdGFja0NvbXBvbmVudC5zZWxlY3RvclRvVHlwZVsgR3JpZHN0YWNrQ29tcG9uZW50LmdldFNlbGVjdG9yKHR5cGUpIF0gPSB0eXBlKTtcbiAgfVxuICAvKiogcmV0dXJuIHRoZSBuZyBDb21wb25lbnQgc2VsZWN0b3IgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRTZWxlY3Rvcih0eXBlOiBUeXBlPE9iamVjdD4pOiBzdHJpbmcge1xuICAgIHJldHVybiByZWZsZWN0Q29tcG9uZW50VHlwZSh0eXBlKSEuc2VsZWN0b3I7XG4gIH1cblxuICBwcml2YXRlIF9vcHRpb25zPzogR3JpZFN0YWNrT3B0aW9ucztcbiAgcHJpdmF0ZSBfZ3JpZD86IEdyaWRTdGFjaztcbiAgcHJpdmF0ZSBsb2FkZWQ/OiBib29sZWFuO1xuICBwcml2YXRlIG5nVW5zdWJzY3JpYmU6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIC8vIHByaXZhdGUgcmVhZG9ubHkgem9uZTogTmdab25lLFxuICAgIC8vIHByaXZhdGUgcmVhZG9ubHkgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZjxHcmlkQ29tcEhUTUxFbGVtZW50PixcbiAgKSB7XG4gICAgdGhpcy5lbC5fZ3JpZENvbXAgPSB0aGlzO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIGluaXQgb3Vyc2VsZiBiZWZvcmUgYW55IHRlbXBsYXRlIGNoaWxkcmVuIGFyZSBjcmVhdGVkIHNpbmNlIHdlIHRyYWNrIHRoZW0gYmVsb3cgYW55d2F5IC0gbm8gbmVlZCB0byBkb3VibGUgY3JlYXRlK3VwZGF0ZSB3aWRnZXRzXG4gICAgdGhpcy5sb2FkZWQgPSAhIXRoaXMub3B0aW9ucz8uY2hpbGRyZW4/Lmxlbmd0aDtcbiAgICB0aGlzLl9ncmlkID0gR3JpZFN0YWNrLmluaXQodGhpcy5fb3B0aW9ucywgdGhpcy5lbCk7XG4gICAgZGVsZXRlIHRoaXMuX29wdGlvbnM7IC8vIEdTIGhhcyBpdCBub3dcblxuICAgIHRoaXMuY2hlY2tFbXB0eSgpO1xuICB9XG5cbiAgLyoqIHdhaXQgdW50aWwgYWZ0ZXIgYWxsIERPTSBpcyByZWFkeSB0byBpbml0IGdyaWRzdGFjayBjaGlsZHJlbiAoYWZ0ZXIgYW5ndWxhciBuZ0ZvciBhbmQgc3ViLWNvbXBvbmVudHMgcnVuIGZpcnN0KSAqL1xuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIHRyYWNrIHdoZW5ldmVyIHRoZSBjaGlsZHJlbiBsaXN0IGNoYW5nZXMgYW5kIHVwZGF0ZSB0aGUgbGF5b3V0Li4uXG4gICAgdGhpcy5ncmlkc3RhY2tJdGVtcz8uY2hhbmdlc1xuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubmdVbnN1YnNjcmliZSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlQWxsKCkpO1xuICAgIC8vIC4uLmFuZCBkbyB0aGlzIG9uY2UgYXQgbGVhc3QgdW5sZXNzIHdlIGxvYWRlZCBjaGlsZHJlbiBhbHJlYWR5XG4gICAgaWYgKCF0aGlzLmxvYWRlZCkgdGhpcy51cGRhdGVBbGwoKTtcbiAgICB0aGlzLmhvb2tFdmVudHModGhpcy5ncmlkKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5yZWY7XG4gICAgdGhpcy5uZ1Vuc3Vic2NyaWJlLm5leHQoKTtcbiAgICB0aGlzLm5nVW5zdWJzY3JpYmUuY29tcGxldGUoKTtcbiAgICB0aGlzLmdyaWQ/LmRlc3Ryb3koKTtcbiAgICBkZWxldGUgdGhpcy5fZ3JpZDtcbiAgICBkZWxldGUgdGhpcy5lbC5fZ3JpZENvbXA7XG4gIH1cblxuICAvKipcbiAgICogY2FsbGVkIHdoZW4gdGhlIFRFTVBMQVRFIGxpc3Qgb2YgaXRlbXMgY2hhbmdlcyAtIGdldCBhIGxpc3Qgb2Ygbm9kZXMgYW5kXG4gICAqIHVwZGF0ZSB0aGUgbGF5b3V0IGFjY29yZGluZ2x5ICh3aGljaCB3aWxsIHRha2UgY2FyZSBvZiBhZGRpbmcvcmVtb3ZpbmcgaXRlbXMgY2hhbmdlZCBieSBBbmd1bGFyKVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUFsbCgpIHtcbiAgICBpZiAoIXRoaXMuZ3JpZCkgcmV0dXJuO1xuICAgIGNvbnN0IGxheW91dDogR3JpZFN0YWNrV2lkZ2V0W10gPSBbXTtcbiAgICB0aGlzLmdyaWRzdGFja0l0ZW1zPy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgbGF5b3V0LnB1c2goaXRlbS5vcHRpb25zKTtcbiAgICAgIGl0ZW0uY2xlYXJPcHRpb25zKCk7XG4gICAgfSk7XG4gICAgdGhpcy5ncmlkLmxvYWQobGF5b3V0KTsgLy8gZWZmaWNpZW50IHRoYXQgZG9lcyBkaWZmcyBvbmx5XG4gIH1cblxuICAvKiogY2hlY2sgaWYgdGhlIGdyaWQgaXMgZW1wdHksIGlmIHNvIHNob3cgYWx0ZXJuYXRpdmUgY29udGVudCAqL1xuICBwdWJsaWMgY2hlY2tFbXB0eSgpIHtcbiAgICBpZiAoIXRoaXMuZ3JpZCkgcmV0dXJuO1xuICAgIGNvbnN0IGlzRW1wdHkgPSAhdGhpcy5ncmlkLmVuZ2luZS5ub2Rlcy5sZW5ndGg7XG4gICAgaWYgKGlzRW1wdHkgPT09IHRoaXMuaXNFbXB0eSkgcmV0dXJuO1xuICAgIHRoaXMuaXNFbXB0eSA9IGlzRW1wdHk7XG4gICAgLy8gdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvKiogZ2V0IGFsbCBrbm93biBldmVudHMgYXMgZWFzeSB0byB1c2UgT3V0cHV0cyBmb3IgY29udmVuaWVuY2UgKi9cbiAgcHJpdmF0ZSBob29rRXZlbnRzKGdyaWQ/OiBHcmlkU3RhY2spIHtcbiAgICBpZiAoIWdyaWQpIHJldHVybjtcbiAgICBncmlkXG4gICAgLm9uKCdhZGRlZCcsIChldmVudDogRXZlbnQsIG5vZGVzOiBHcmlkU3RhY2tOb2RlW10pID0+IHsgdGhpcy5jaGVja0VtcHR5KCk7IHRoaXMuYWRkZWRDQi5lbWl0KHtldmVudCwgbm9kZXN9KTsgfSlcbiAgICAub24oJ2NoYW5nZScsIChldmVudDogRXZlbnQsIG5vZGVzOiBHcmlkU3RhY2tOb2RlW10pID0+IHRoaXMuY2hhbmdlQ0IuZW1pdCh7ZXZlbnQsIG5vZGVzfSkpXG4gICAgLm9uKCdkaXNhYmxlJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5kaXNhYmxlQ0IuZW1pdCh7ZXZlbnR9KSlcbiAgICAub24oJ2RyYWcnLCAoZXZlbnQ6IEV2ZW50LCBlbDogR3JpZEl0ZW1IVE1MRWxlbWVudCkgPT4gdGhpcy5kcmFnQ0IuZW1pdCh7ZXZlbnQsIGVsfSkpXG4gICAgLm9uKCdkcmFnc3RhcnQnLCAoZXZlbnQ6IEV2ZW50LCBlbDogR3JpZEl0ZW1IVE1MRWxlbWVudCkgPT4gdGhpcy5kcmFnU3RhcnRDQi5lbWl0KHtldmVudCwgZWx9KSlcbiAgICAub24oJ2RyYWdzdG9wJywgKGV2ZW50OiBFdmVudCwgZWw6IEdyaWRJdGVtSFRNTEVsZW1lbnQpID0+IHRoaXMuZHJhZ1N0b3BDQi5lbWl0KHtldmVudCwgZWx9KSlcbiAgICAub24oJ2Ryb3BwZWQnLCAoZXZlbnQ6IEV2ZW50LCBwcmV2aW91c05vZGU6IEdyaWRTdGFja05vZGUsIG5ld05vZGU6IEdyaWRTdGFja05vZGUpID0+IHRoaXMuZHJvcHBlZENCLmVtaXQoe2V2ZW50LCBwcmV2aW91c05vZGUsIG5ld05vZGV9KSlcbiAgICAub24oJ2VuYWJsZScsIChldmVudDogRXZlbnQpID0+IHRoaXMuZW5hYmxlQ0IuZW1pdCh7ZXZlbnR9KSlcbiAgICAub24oJ3JlbW92ZWQnLCAoZXZlbnQ6IEV2ZW50LCBub2RlczogR3JpZFN0YWNrTm9kZVtdKSA9PiB7IHRoaXMuY2hlY2tFbXB0eSgpOyB0aGlzLnJlbW92ZWRDQi5lbWl0KHtldmVudCwgbm9kZXN9KTsgfSlcbiAgICAub24oJ3Jlc2l6ZScsIChldmVudDogRXZlbnQsIGVsOiBHcmlkSXRlbUhUTUxFbGVtZW50KSA9PiB0aGlzLnJlc2l6ZUNCLmVtaXQoe2V2ZW50LCBlbH0pKVxuICAgIC5vbigncmVzaXplc3RhcnQnLCAoZXZlbnQ6IEV2ZW50LCBlbDogR3JpZEl0ZW1IVE1MRWxlbWVudCkgPT4gdGhpcy5yZXNpemVTdGFydENCLmVtaXQoe2V2ZW50LCBlbH0pKVxuICAgIC5vbigncmVzaXplc3RvcCcsIChldmVudDogRXZlbnQsIGVsOiBHcmlkSXRlbUhUTUxFbGVtZW50KSA9PiB0aGlzLnJlc2l6ZVN0b3BDQi5lbWl0KHtldmVudCwgZWx9KSlcbiAgfVxufVxuXG4vKipcbiAqIGNhbiBiZSB1c2VkIHdoZW4gYSBuZXcgaXRlbSBuZWVkcyB0byBiZSBjcmVhdGVkLCB3aGljaCB3ZSBkbyBhcyBhIEFuZ3VsYXIgY29tcG9uZW50LCBvciBkZWxldGVkIChza2lwKVxuICoqL1xuZXhwb3J0IGZ1bmN0aW9uIGdzQ3JlYXRlTmdDb21wb25lbnRzKGhvc3Q6IEdyaWRDb21wSFRNTEVsZW1lbnQgfCBIVE1MRWxlbWVudCwgdzogTmdHcmlkU3RhY2tXaWRnZXQgfCBHcmlkU3RhY2tOb2RlLCBhZGQ6IGJvb2xlYW4sIGlzR3JpZDogYm9vbGVhbik6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgaWYgKGFkZCkge1xuICAgIC8vXG4gICAgLy8gY3JlYXRlIHRoZSBjb21wb25lbnQgZHluYW1pY2FsbHkgLSBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2RvY3MvdHMvbGF0ZXN0L2Nvb2tib29rL2R5bmFtaWMtY29tcG9uZW50LWxvYWRlci5odG1sXG4gICAgLy9cbiAgICBpZiAoIWhvc3QpIHJldHVybjtcbiAgICBpZiAoaXNHcmlkKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSAoaG9zdC5wYXJlbnRFbGVtZW50IGFzIEdyaWRJdGVtQ29tcEhUTUxFbGVtZW50KT8uX2dyaWRJdGVtQ29tcD8uY29udGFpbmVyO1xuICAgICAgLy8gVE9ETzogZmlndXJlIG91dCBob3cgdG8gY3JlYXRlIG5nIGNvbXBvbmVudCBpbnNpZGUgcmVndWxhciBEaXYuIG5lZWQgdG8gYWNjZXNzIGFwcCBpbmplY3RvcnMuLi5cbiAgICAgIC8vIGlmICghY29udGFpbmVyKSB7XG4gICAgICAvLyAgIGNvbnN0IGhvc3RFbGVtZW50OiBFbGVtZW50ID0gaG9zdDtcbiAgICAgIC8vICAgY29uc3QgZW52aXJvbm1lbnRJbmplY3RvcjogRW52aXJvbm1lbnRJbmplY3RvcjtcbiAgICAgIC8vICAgZ3JpZCA9IGNyZWF0ZUNvbXBvbmVudChHcmlkc3RhY2tDb21wb25lbnQsIHtlbnZpcm9ubWVudEluamVjdG9yLCBob3N0RWxlbWVudH0pPy5pbnN0YW5jZTtcbiAgICAgIC8vIH1cbiAgICAgIGNvbnN0IGdyaWRSZWYgPSBjb250YWluZXI/LmNyZWF0ZUNvbXBvbmVudChHcmlkc3RhY2tDb21wb25lbnQpO1xuICAgICAgY29uc3QgZ3JpZCA9IGdyaWRSZWY/Lmluc3RhbmNlO1xuICAgICAgaWYgKCFncmlkKSByZXR1cm47XG4gICAgICBncmlkLnJlZiA9IGdyaWRSZWY7XG4gICAgICBncmlkLm9wdGlvbnMgPSB3IGFzIEdyaWRTdGFja09wdGlvbnM7XG4gICAgICByZXR1cm4gZ3JpZC5lbDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ3JpZENvbXAgPSAoaG9zdCBhcyBHcmlkQ29tcEhUTUxFbGVtZW50KS5fZ3JpZENvbXA7XG4gICAgICBjb25zdCBncmlkSXRlbVJlZiA9IGdyaWRDb21wPy5jb250YWluZXI/LmNyZWF0ZUNvbXBvbmVudChHcmlkc3RhY2tJdGVtQ29tcG9uZW50KTtcbiAgICAgIGNvbnN0IGdyaWRJdGVtID0gZ3JpZEl0ZW1SZWY/Lmluc3RhbmNlO1xuICAgICAgaWYgKCFncmlkSXRlbSkgcmV0dXJuO1xuICAgICAgZ3JpZEl0ZW0ucmVmID0gZ3JpZEl0ZW1SZWZcblxuICAgICAgLy8gSUZGIHdlJ3JlIG5vdCBhIHN1YkdyaWQsIGRlZmluZSB3aGF0IHR5cGUgb2YgY29tcG9uZW50IHRvIGNyZWF0ZSBhcyBjaGlsZCwgT1IgeW91IGNhbiBkbyBpdCBHcmlkc3RhY2tJdGVtQ29tcG9uZW50IHRlbXBsYXRlLCBidXQgdGhpcyBpcyBtb3JlIGdlbmVyaWNcbiAgICAgIGlmICghdy5zdWJHcmlkT3B0cykge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9ICh3IGFzIE5nR3JpZFN0YWNrV2lkZ2V0KS5zZWxlY3RvcjtcbiAgICAgICAgY29uc3QgdHlwZSA9IHNlbGVjdG9yID8gR3JpZHN0YWNrQ29tcG9uZW50LnNlbGVjdG9yVG9UeXBlW3NlbGVjdG9yXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICBjb25zdCBjaGlsZFdpZGdldCA9IGdyaWRJdGVtLmNvbnRhaW5lcj8uY3JlYXRlQ29tcG9uZW50KHR5cGUpPy5pbnN0YW5jZSBhcyBCYXNlV2lkZ2V0O1xuICAgICAgICAgIC8vIGlmIHByb3BlciBCYXNlV2lkZ2V0IHN1YmNsYXNzLCBzYXZlIGl0IGFuZCBsb2FkIGFkZGl0aW9uYWwgZGF0YVxuICAgICAgICAgIGlmIChjaGlsZFdpZGdldCAmJiB0eXBlb2YgY2hpbGRXaWRnZXQuc2VyaWFsaXplID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBjaGlsZFdpZGdldC5kZXNlcmlhbGl6ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZ3JpZEl0ZW0uY2hpbGRXaWRnZXQgPSBjaGlsZFdpZGdldDtcbiAgICAgICAgICAgIGNoaWxkV2lkZ2V0LmRlc2VyaWFsaXplKHcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ3JpZEl0ZW0uZWw7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vXG4gICAgLy8gUkVNT1ZFIC0gaGF2ZSB0byBjYWxsIENvbXBvbmVudFJlZjpkZXN0cm95KCkgZm9yIGR5bmFtaWMgb2JqZWN0cyB0byBjb3JyZWN0bHkgcmVtb3ZlIHRoZW1zZWx2ZXNcbiAgICAvLyBOb3RlOiB0aGlzIHdpbGwgZGVzdHJveSBhbGwgY2hpbGRyZW4gZHluYW1pYyBjb21wb25lbnRzIGFzIHdlbGw6IGdyaWRJdGVtIC0+IGNoaWxkV2lkZ2V0XG4gICAgLy9cbiAgICBjb25zdCBuID0gdyBhcyBHcmlkU3RhY2tOb2RlO1xuICAgIGlmIChpc0dyaWQpIHtcbiAgICAgIGNvbnN0IGdyaWQgPSAobi5lbCBhcyBHcmlkQ29tcEhUTUxFbGVtZW50KT8uX2dyaWRDb21wO1xuICAgICAgaWYgKGdyaWQ/LnJlZikgZ3JpZC5yZWYuZGVzdHJveSgpO1xuICAgICAgZWxzZSBncmlkPy5uZ09uRGVzdHJveSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBncmlkSXRlbSA9IChuLmVsIGFzIEdyaWRJdGVtQ29tcEhUTUxFbGVtZW50KT8uX2dyaWRJdGVtQ29tcDtcbiAgICAgIGlmIChncmlkSXRlbT8ucmVmKSBncmlkSXRlbS5yZWYuZGVzdHJveSgpO1xuICAgICAgZWxzZSBncmlkSXRlbT8ubmdPbkRlc3Ryb3koKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuO1xufVxuXG4vKipcbiAqIGNhbGxlZCBmb3IgZWFjaCBpdGVtIGluIHRoZSBncmlkIC0gY2hlY2sgaWYgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBuZWVkcyB0byBiZSBzYXZlZC5cbiAqIE5vdGU6IHNpbmNlIHRoaXMgaXMgb3B0aW9ucyBtaW51cyBncmlkc3RhY2sgcHJpdmF0ZSBtZW1iZXJzIHVzaW5nIFV0aWxzLnJlbW92ZUludGVybmFsRm9yU2F2ZSgpLFxuICogdGhpcyB0eXBpY2FsbHkgZG9lc24ndCBuZWVkIHRvIGRvIGFueXRoaW5nLiBIb3dldmVyIHlvdXIgY3VzdG9tIENvbXBvbmVudCBASW5wdXQoKSBhcmUgbm93IHN1cHBvcnRlZFxuICogdXNpbmcgQmFzZVdpZGdldC5zZXJpYWxpemUoKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ3NTYXZlQWRkaXRpb25hbE5nSW5mbyhuOiBOZ0dyaWRTdGFja05vZGUsIHc6IE5nR3JpZFN0YWNrV2lkZ2V0KSB7XG4gIGNvbnN0IGdyaWRJdGVtID0gKG4uZWwgYXMgR3JpZEl0ZW1Db21wSFRNTEVsZW1lbnQpPy5fZ3JpZEl0ZW1Db21wO1xuICBpZiAoZ3JpZEl0ZW0pIHtcbiAgICBjb25zdCBpbnB1dCA9IGdyaWRJdGVtLmNoaWxkV2lkZ2V0Py5zZXJpYWxpemUoKTtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIHcuaW5wdXQgPSBpbnB1dDtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGVsc2UgY2hlY2sgaWYgR3JpZFxuICBjb25zdCBncmlkID0gKG4uZWwgYXMgR3JpZENvbXBIVE1MRWxlbWVudCk/Ll9ncmlkQ29tcDtcbiAgaWYgKGdyaWQpIHtcbiAgICAvLy4uLi4gc2F2ZSBhbnkgY3VzdG9tIGRhdGFcbiAgfVxufVxuIl19