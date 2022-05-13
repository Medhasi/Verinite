import { AddPublisherComponent } from './components/add-publisher/add-publisher.component';
import { UrlGuardGuard } from './url-guard.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { BookListComponent } from './components/book-list/book-list.component';
// import { BookService } from './service/book.service';
import { BookCategoryComponent } from './components/book-category/book-category.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { ViewbookComponent } from './components/viewbook/viewbook.component';
import { ViewRegistrationComponent } from './components/view-registration/view-registration.component';
import { UpdateRegistrationComponent } from './components/update-registration/update-registration.component';
import { ShowRegistrationComponent } from './components/show-registration/show-registration.component';
import { UpdatebookComponent } from './components/updatebook/updatebook.component';
import { AddBookcategoryComponent } from './components/add-bookcategory/add-bookcategory.component';
import { ViewBookcategoryComponent } from './components/view-bookcategory/view-bookcategory.component';
import { ListBookcategoryComponent } from './components/list-bookcategory/list-bookcategory.component';
import { UpdateBookcategoryComponent } from './components/update-bookcategory/update-bookcategory.component';
import { BookCategory } from './entity/book-category';
import { ListOrderbookComponent } from './components/list-orderbook/list-orderbook.component';
import { ListAuthorComponent } from './components/list-author/list-author.component';
import { UpdateAuthorComponent } from './components/update-author/update-author.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UpdatePublishersComponent } from './components/update-publishers/update-publishers.component';
import { ViewPublishersComponent } from './components/view-publishers/view-publishers.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ListDeliveryComponent } from './components/list-delivery/list-delivery.component';
import { AddDeliveryComponent } from './components/add-delivery/add-delivery.component';
import { UpdateDeliveryComponent } from './components/update-delivery/update-delivery.component';
import { ViewDeliveryComponent } from './components/view-delivery/view-delivery.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ImageAddComponent } from './components/image-add/image-add.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';
import { BooksPageComponent } from './components/books-page/books-page.component';
import { ForgotPasswordComponent } from './components/forgotPassword/forgotPassword.component';
import { UniqueEmailValidatorDirective } from './components/UniqueEmailValidator.directive';
import { UniqueUsernameValidatorDirective } from './components/UniqueUsernameValidator.directive';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PassWordEqualValidatorDirective } from './components/PassWordEqualValidator.directive';
import { OrderNowComponent } from './components/OrderNow/OrderNow.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { AuthSecurityGuardGuard } from './auth-security-guard.guard';
import { QuantityComponent } from './components/quantity/quantity.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { ViewFeedbackComponent } from './components/view-feedback/view-feedback.component';
import { AddFeedbackComponent } from './components/add-feedback/add-feedback.component';
import {MatIconModule} from '@angular/material/icon';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  // {path: 'books/:id', component: BookDetailsComponent},
  { path: 'users', component: RegistrationComponent },
  { path: 'books',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: BookListComponent },
  { path: 'addBooks',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: AddbookComponent },
  { path: 'viewBooks/:bookId',canActivate:[AuthSecurityGuardGuard], component: ViewbookComponent },
  { path: 'search/:keyword',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: BookListComponent },
  { path: 'category/:id',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: BookListComponent },
  { path: 'view-registration',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: ViewRegistrationComponent },
  { path: 'update-registration/:registerId',canActivate:[AuthSecurityGuardGuard], component: UpdateRegistrationComponent },
  { path: 'show-registration/:registerId',canActivate:[AuthSecurityGuardGuard], component: ShowRegistrationComponent },
  { path: 'bookcategory',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: ListBookcategoryComponent },
  { path: 'createbook',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: BookCategory },
  { path: 'update/:id',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: UpdateBookcategoryComponent },
  { path: 'addbookcategory',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: BookCategoryComponent },
  { path: 'getby/:id',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: ViewBookcategoryComponent },
  { path: 'orders',canActivate:[AuthSecurityGuardGuard], component: ListOrderbookComponent },
  { path: 'home',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: ListAuthorComponent },
  { path: 'updateAuthor/:id',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: UpdateAuthorComponent },
  { path: 'addAuthor',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard] ,component: AddAuthorComponent },
  { path: 'Author',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: ListAuthorComponent },
  { path: 'Customers',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: ListCustomersComponent },
  { path: 'addCustomer', component: AddCustomerComponent },
  { path: 'updateCustomer/:id',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: UpdateCustomerComponent },
  { path: 'addPublishers',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: AddPublisherComponent },
  { path: 'updatePublisher/:id',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: UpdatePublishersComponent },
  { path: 'publishers',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: ViewPublishersComponent },
  { path: 'categorys',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: ListCategoryComponent },
  { path: 'updateCategory/:id',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard], component: UpdateCategoryComponent },
  { path: 'add-category',canActivate:[AuthSecurityGuardGuard], component: AddCategoryComponent },
  {path: 'adddelivery',canActivate:[AuthSecurityGuardGuard],component:AddDeliveryComponent },
  {path: 'viewdelivery',canActivate:[AuthSecurityGuardGuard],component:ViewDeliveryComponent },
  {path: 'deliveryby/:id',canActivate:[AuthSecurityGuardGuard],component:ListDeliveryComponent },
  {path: 'updatedelivery/:id',canActivate:[AuthSecurityGuardGuard],component:UpdateDeliveryComponent },
  { path: 'login',component:LoginComponent },
{path:'forgotPassword',component:ForgotPasswordComponent},
  { path: 'logout',canActivate:[AuthSecurityGuardGuard], component: LogoutComponent },
  { path: 'frontInvoice/:paymentId',canActivate:[AuthSecurityGuardGuard], component: EditProfileComponent },
  { path:'landingPage',canActivate:[AuthSecurityGuardGuard],component:BooksPageComponent},
  {path:'viewfeedback',canActivate:[AuthSecurityGuardGuard],component:ViewFeedbackComponent},
  {path:'ordernow/:amount',canActivate:[AuthSecurityGuardGuard],component:OrderNowComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'payment',canActivate:[AuthSecurityGuardGuard],component:PaymentDetailsComponent},
  {path:'cart',canActivate:[AuthSecurityGuardGuard],component:CartComponent},
  {path:'stockdeatailsList',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard],component:StockDetailsComponent},
  {path:'quantity/:bookId',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard],component:QuantityComponent},
  {path:'addfeedback',canActivate:[AuthSecurityGuardGuard],component:AddFeedbackComponent},
  {path:'updateBook/:bookId',canActivate:[AuthSecurityGuardGuard,UrlGuardGuard],component:UpdatebookComponent}



  // { path: 'image',component:ImageAddComponent },
  // { path: '', redirectTo: '/books', pathMatch: 'full' }
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    // PageNotFoundComponent,
    BookCategoryComponent,
    MenuComponent,
    QuantityComponent,
    RegistrationComponent,
    AddbookComponent,
    StockDetailsComponent,
    ViewbookComponent,
    ViewRegistrationComponent,
    UpdateRegistrationComponent,
    ShowRegistrationComponent,
    UpdatebookComponent,
    AddBookcategoryComponent,
    ViewBookcategoryComponent,
    ListBookcategoryComponent,
    UpdateBookcategoryComponent,
    ListOrderbookComponent,
    ListAuthorComponent,
    UpdateAuthorComponent,
    AddAuthorComponent,
    ListCustomersComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    AddPublisherComponent,
    UpdatePublishersComponent,
    ViewPublishersComponent,
    ListCategoryComponent,
    LoginComponent,
    LogoutComponent,
    ListDeliveryComponent,
    AddDeliveryComponent,
    UpdateDeliveryComponent,
    ViewDeliveryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    ForgotPasswordComponent,
    BooksPageComponent,
    UniqueEmailValidatorDirective,
    UniqueUsernameValidatorDirective,
    PassWordEqualValidatorDirective,
    OrderNowComponent,
    CartComponent,
    PaymentDetailsComponent,
    ViewFeedbackComponent,
    AddFeedbackComponent,
    AddAdminComponent,
    EditProfileComponent,



    // ImageAddComponent
    // SearchComponent,
    // BookDetailsComponent,
    // CartDetailsComponent,
    // CartStatusComponent,
    // CheckoutComponent
    // JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule,ReactiveFormsModule, Ng2SearchPipeModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,MatPaginatorModule,NgxPaginationModule,MatFormFieldModule,MatIconModule,MdbCollapseModule
  ],
  providers: [
    // BookService,
   // RegistrationService
   AuthSecurityGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
