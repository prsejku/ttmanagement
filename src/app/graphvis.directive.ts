import {Directive, ElementRef, Input} from '@angular/core';
import {DataSet, Graph2d, Network, Timeline, TimelineOptions} from 'vis';

@Directive({
  selector: '[appGraphVis]'
})
export class GraphvisDirective {


    constructor(private el: ElementRef) {}

    @Input() set appGraphVis(graphData: DataSet<any>){
        let options = {
            /*
                um den Ordering-Bug von vis.js zu umgehen, wird hier eine eigene Sortierung implementiert
             */
            groupOrder: function (a, b) {
                return a.orderId - b.orderId;
            },
            editable: true
        };

        var timeline = new Timeline(this.el.nativeElement, graphData["items"], graphData["groups"], options);


    }


}
