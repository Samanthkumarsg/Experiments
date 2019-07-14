import { Component, OnInit } from "@angular/core";
import { CommonService } from "../common.service";

@Component({
  selector: "app-sibling",
  templateUrl: "./sibling.component.html",
  styleUrls: ["./sibling.component.css"]
})
export class SiblingComponent implements OnInit {
  constructor(public cs: CommonService) {}

  siblingVal: number = 0;

  ngOnInit() {
    this.siblingVal = this.cs.siblingValue;
  }
}
