import { Component, OnInit } from "@angular/core";
import { GetRedditService } from "../../services/get-reddit.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  constructor(private service: GetRedditService) {}

  selectedCategory: string;

  getContent(content): void {
    this.selectedCategory = content;
  }

  ngOnInit() {}
}
