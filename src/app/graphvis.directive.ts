import {Directive, ElementRef, Input} from '@angular/core';
import {DataSet, Graph2d, Network, Timeline, TimelineOptions} from 'vis';

@Directive({
  selector: '[appGraphVis]'
})
export class GraphvisDirective {


    constructor(private el: ElementRef) {}

    @Input() set appGraphVis(graphData: DataSet<any>){
        console.log('graph data ', graphData);
        let options = {};

        var timeline = new Timeline(this.el.nativeElement, graphData["items"], graphData["groups"], options);


    }


}
