import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title: string;
  @Input() body: string;
  @Input() link: string;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();


  @ViewChild('truncator',{static:true}) truncator: ElementRef<HTMLElement>;
  @ViewChild('bodytext',{static:true}) bodytext: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2){}

  ngOnInit(): void {
    //workout if there is a text overflow and if not, then hide the truncator
    let style = window.getComputedStyle(this.bodytext.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    //If to much text is in the box
    if (this.bodytext.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  onXButtonClick(){
    this.deleteEvent.emit();

  }

  /*
  ngAfterViewInit(): void{
    let style = window.getComputedStyle(this.bodytext.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("ClientHeight"), 10);

    //If to much text is in the box
    if (this.bodytext.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }
*/

}
