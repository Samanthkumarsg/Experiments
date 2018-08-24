import { Component, OnInit } from "@angular/core";
import { GetRedditService } from "../../services/get-reddit.service";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})
export class ContentComponent implements OnInit {
  constructor(private service: GetRedditService) {}

  ngOnInit() {
    this.service.getReddit("sports");
  }
}
