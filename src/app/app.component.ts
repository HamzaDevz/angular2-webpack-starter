import { Component, ViewEncapsulation } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  moduleId: module.id + '',
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
      <main>
          <router-outlet></router-outlet>
      </main>
  `
})

export class AppComponent {}
