import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { notfoundComponent } from './components/not-found/not-found.component';
// import { NotfoundComponent } from './demo/components/notfound/notfound.component';
// import { ProductService } from './demo/service/product.service';
// import { CountryService } from './demo/service/country.service';
// import { CustomerService } from './demo/service/customer.service';
// import { EventService } from './demo/service/event.service';
// import { IconService } from './demo/service/icon.service';
// import { NodeService } from './demo/service/node.service';
// import { PhotoService } from './demo/service/photo.service';
import { userLayoutComponent } from './userLayout/user.layout.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule, AppLayoutModule, userLayoutComponent, notfoundComponent,BrowserAnimationsModule,CarouselModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        // CountryService, CustomerService, EventService, IconService, NodeService,
        // PhotoService, ProductService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
