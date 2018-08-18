import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./components/root/app.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { SearchComponent } from "./components/search/search.component";

@NgModule({
  declarations: [AppComponent, NavigationComponent, SearchComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
