import {Component, Input, Output, ElementRef, EventEmitter} from 'angular2/core';
import {BrowserDomAdapter} from 'angular2/src/platform/browser/browser_adapter';



@Component({
    selector: 'volume',
    template: `
    <p>{{title}} z app component {{mouse_x}} {{left}} width: {{width}} start {{start_x}}</p>
    <div class="wrapper">
        <div></div>
        <span [style.left]="left + '%'" (mousedown)="drag=true;" (mouseup)="drag=false"></span>
    </div>
  `,
    styles: [`
    span {
        display:block;
        border: 1px solid #d3d3d3;
        background: #e6e6e6 url("images/ui-bg_glass_75_e6e6e6_1x400.png") 50% 50% repeat-x;
        font-weight: normal;
        color: #555555;
        top: -.3em;
        margin-left: -.6em;
        position: absolute;
        z-index: 2;
        width: 1.2em;
        height: 1.2em;
        cursor: pointer;
        -ms-touch-action: none;
        touch-action: none;
        text-align: left;
    }
    .wrapper {
        width: 40%;
        border: 1px solid #aaaaaa;
        background: #ffffff url("images/ui-bg_flat_75_ffffff_40x100.png") 50% 50% repeat-x;
        color: #222222;\n\
        height: .8em;\n\
        position: relative;
        text-align: left;
        left: 100px;
    }
    .wrapper div {
        position: absolute;
        z-index: 1;
        font-size: .7em;
        display: block;
        border: 0;
        background-position: 0 0;
        background: #cccccc url("images/ui-bg_highlight-soft_75_cccccc_1x100.png") 50% 50% repeat-x;
    }
    `],

})

export class SliderComponent {
    public title = 'Volume';
    public mouse_x;
    public left;
    public drag = false;
    private width : number;
    private start_x: number;
    
    @Output() leftEmitter: EventEmitter<number> = new EventEmitter<number>();


    constructor(private el: ElementRef) { 
        console.log('---: ', this.el.nativeElement.children[0].offsetWidth);
        console.log('---: ', this.el.nativeElement.querySelector(".wrapper").offsetLeft);
        this.width = this.el.nativeElement.querySelector(".wrapper").offsetWidth;
        this.start_x = this.el.nativeElement.querySelector(".wrapper").offsetLeft;
    }
    
    onDrag(m:boolean) {
        console.log('drag ' + m);
        this.drag = m;
        
    }
    updateX(x) {
        
    }
    ngOnInit() {
        var dom = new BrowserDomAdapter();
        dom.on(dom.query("body"), "mousemove", e => {
            if(e.buttons == 0) this.drag =false;
            this.mouse_x = e.clientX;
            if(this.start_x && this.drag) {
                this.left = (this.mouse_x - this.start_x) * 100 / this.width;
                this.left = parseFloat(this.left.toFixed(4));
                if(this.left>100) this.left = 100;
                if(this.left<0) this.left = 0;
                this.leftEmitter.emit(this.left);

            }
            
        });
        dom.on(dom.query("body"), "mouseup", e => { this.drag=false;});
        
        
    }

    ngOnDestroy() {
    } 

}
