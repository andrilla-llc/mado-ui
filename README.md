# ストリ <sup>(sutori)</sup> UI

ストリ UI is a collection of opinionated React components built on Tailwind CSS 4. It was originally created for use on websites built by Andrilla, but is now available for anyone.

All of the components are built in similar ways, that always allow for customization.

## How to Use

In general it's best to download the latest versions of components to your project, rather than using `npm i sutori-ui`, so you can modify the colors to fit your branding.

### Install

Install or copy and paste the components you with to use.

```bash
npm i sutori-ui
```

```bash
pnpm i sutori-ui
```

```bash
yarn add sutori-ui
```

```bash
bun i sutori-ui
```

### Add CSS

Import the Tailwind CSS modifications to your `globals.css`, or copy and paste what you need.

```css
@import 'sutori-ui/css';
```

## Tailwind Modifications and Additions

If you use the default `sutori-ui/css` import, then you will have access to the following classes, and you should expect some minor changes.

### Modifications

You can review the `@layer base` to see these changes directly.

1. All elements are positioned relatively by default, instead of static.
2. Browser-defined minimum widths are removed.
3. `:focus-visible` uses Tailwind's ring instead of outline.
4. `color-scheme: light dark;` is enabled.
5. Default background and text colors are modified to `--color-neutral-50` and `--color-neutral-950` respectively.
6. `cursor: pointer;` is back on all buttons, in spite of Tailwind removing this.
7. Color inputs have removed browser default padding on `::-webkit-color-swatch-wrapper`.
8. Similar to borders, `<svg>` elements use `fill: currentColor;` as the default.
9. `<svg>` elements are inline blocks when used as children of `<button>` or `<a>` elements.

### Additions

These apply to `@layer theme`, `@layer components`, `@utility`, and `@custom-variant` as mentioned.

1. Animation utility classes.
2. Modified animations to use the new utility classes.
3. More animations.
4. UI colors that work great in both light and dark mode.
5. Better easing.
6. More border radiuses.
7. Counter utility classes.
8. Change gap to use variables for easy reuse in children.
9. New grid template rows and columns utility classes for 0fr to 1fr transitions.
10. Grid template rows and columns added as transition options.
11. New z-index for making elements always on top.
12. `@custom-variant` for both desktop and mobile, that checks the pointer size.
13. `.error` component class.

## Components

### Modal

This component is a pre-built version of @headless-ui's Dialog component. It handles all of the transitions and additional functionality for you. It has some reasonable pre-defined classes, but still offers great customization to fit your branding.

Exported from 'sutori-ui/modal' are three components.

Default export:
- Modal

Other exports:
- ModalDialog
- ModalTrigger

The Modal component must wrap both the ModalDialog and ModalTrigger components to work.

The ModalTrigger must have a `<button>` element child to handle the opening functionality.

The ModalDialog renders as a `<div>` and is the container for all of the contents of the modal.

#### Example

```tsx
<Modal>
  <ModalTrigger>
    <button>Open Modal</button>
  </ModalTrigger>

  <ModalDialog>
    <h2>You've successfully opened the modal.</h2>

    <p>You may swipe down on it, click the "X" in the top right, click anywhere outside of the modal, or hit the escape key to close it.</p>
  </ModalDialog>
</Modal>
```

Adding classes to the Modal component will edit the container of ModalDialog. This is primarily useful for sizing, and is separate from the ModalDialog to avoid jank. By default the Modal renders a transparent `<div>` and it's recommended to keep it this way.

Add classes to the ModalDialog to style what is acutally visible to users. This is a good place to add padding and change the background color.

Don't add classes to the ModalTrigger, but rather the child `<button>`, as the ModalTrigger renders a Fragment.
