import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './store';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoOverviewComponent } from './todo-overview/todo-overview.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoOverviewComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor (ngRedux: NgRedux<IAppState>) {
    // configure app store with initial values/state.
    /**
     * Accepts a Redux store, then sets it in NgRedux and
     * allows NgRedux to observe and dispatch to it.
     *
     * This should only be called once for the lifetime of your app, for
     * example in the constructor of your root component. If configureStore
     * has been used this cannot be used.
     *
     * @param store Your app's store
     */
      ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}

