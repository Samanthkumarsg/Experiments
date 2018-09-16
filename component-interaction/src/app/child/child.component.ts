import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"]
})
export class ChildComponent implements OnInit {
  constructor() {}

  @Input("anotherText")
  childText: string = "**none**";

  @Output()
  changeValue = new EventEmitter();

  ngOnInit() {
    this.changeValue.emit("TextFromChild");
  }
}
