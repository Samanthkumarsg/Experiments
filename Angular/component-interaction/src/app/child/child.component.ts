import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { SiblingComponent } from "../sibling/sibling.component";

import { CommonService } from "../common.service";
@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"]
})
export class ChildComponent implements OnInit {
  constructor(public cs: CommonService) {}

  @Input("anotherText")
  childText: string = "**none**";

  @Output()
  changeValue = new EventEmitter();

  @ViewChild(SiblingComponent)
  sibcomp: SiblingComponent;

  changeSiblingValue() {
    this.cs.siblingValue++;
  }

  ngOnInit() {
    this.cs.siblingValue = 40;
    this.changeValue.emit("TextFromChild");
  }
}
