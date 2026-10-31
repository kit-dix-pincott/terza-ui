# Getting started

> terza-ui has not been published to npm yet. These steps apply from the
> first published version.

## Install

```sh
pnpm add terza-ui
# or
npm install terza-ui
```

terza-ui requires Angular 22 (`@angular/core` is a peer dependency).

## Use a component

Components are standalone: import them where you use them.

```ts
import { Component } from '@angular/core';
import { Ui } from 'terza-ui';

@Component({
  selector: 'app-root',
  imports: [Ui],
  template: `<tz-ui />`,
})
export class App {}
```

`Ui` is the placeholder component of the initial scaffold; it is replaced by
real components as they land.
