# 窓 <sup>(mado)</sup> UI

窓 UI is a collection of opinionated React components built on Tailwind CSS 4. It was originally created for use on websites built by Andrilla, but is now available for anyone.

All of the components are built in similar ways, that always allow for customization.

## How to Use

In general it's best to download the latest versions of components to your project, rather than using `npm i mado-ui`, so you can modify the colors to fit your branding.

### Install

Install or copy and paste the components you with to use.

```bash
npm i mado-ui
```

```bash
pnpm i mado-ui
```

```bash
yarn add mado-ui
```

```bash
bun i mado-ui
```

### Add CSS

Import the Tailwind CSS modifications to your `globals.css`, or copy and paste what you need.

```css
@import 'mado-ui/css';
```

## Tailwind Modifications and Additions

If you use the default `mado-ui/css` import, then you will have access to the following classes, and you should expect some minor changes.

### Modifications

You can review the `@layer base` to see these changes directly.

1. All elements are positioned relatively by default, instead of static.
2. Browser-defined minimum widths are removed.
3. `:focus-visible` uses Tailwind's ring instead of outline.
4. Default background and text colors are modified to `--color-neutral-50` and `--color-neutral-950` respectively.
5. `cursor: pointer;` is back on all buttons, in spite of Tailwind removing this.
6. Color inputs have removed browser default padding on `::-webkit-color-swatch-wrapper`.
7. Similar to borders, `<svg>` elements use `fill: currentColor;` as the default.

### Additions

These apply to `@layer theme`, `@layer components`, `@utility`, and `@custom-variant` as mentioned.

1. Animation utility classes.
2. Modified animations to use the new utility classes.
3. More animations.
4. UI colors that work great in both light and dark mode.
5. More easing options.
6. More border radiuses.
7. Change gap to use variables for easy reuse in children.
8. New grid template rows and columns utility classes for 0fr to 1fr transitions.
9. Grid template rows and columns added as transition options.

## Components

### Button

A pre-styled button component with utility props for easy customization. Supports both button and anchor functionality.

Exported from `mado-ui/button`:

Default export:
- Button

Props include `padding`, `rounded`, `theme`, and standard button/anchor attributes.

#### Example

```tsx
import Button from 'mado-ui/button'

<Button theme="primary" padding="md" rounded="lg">
  Click me
</Button>

<Button href="/about" theme="blue-gradient">
  Link Button
</Button>
```

### Form

A comprehensive form component with built-in validation and status management. Works with controlled or uncontrolled inputs.

Exported from `mado-ui/form`:

Default export:
- Form

Other exports:
- Input
- SubmitButton

#### Example

```tsx
import Form, { Input, SubmitButton } from 'mado-ui/form'

<Form onSubmit={({ formContext }) => ({ status: 'success' })}>
  <Input name="email" type="email" label="Email Address" />
  <Input name="password" type="password" label="Password" />
  <SubmitButton>Submit Form</SubmitButton>
</Form>
```

### Ghost

A loading placeholder component with animated pulse effect.

Exported from `mado-ui/ghost`:

Default export:
- Ghost

#### Example

```tsx
import Ghost from 'mado-ui/ghost'

<Ghost className="h-4 w-32" />
```

### Heading

A heading component that renders HTML heading elements (h1-h6) with appropriate styling. Automatically generates IDs for targeting.

Exported from `mado-ui/heading`:

Default export:
- Heading

#### Example

```tsx
import Heading from 'mado-ui/heading'

<Heading as="h1">Page Title</Heading>
<Heading as="h2">Section Title</Heading>
```

### Input

A form input component with built-in validation, labels, and descriptions. Integrates with the Form component's context.

Exported from `mado-ui/form`:

- Input

Props include validation options, styling props, and standard input attributes.

#### Example

```tsx
import { Input } from 'mado-ui/form'

<Input 
  name="username" 
  label="Username" 
  description="Choose a unique username"
  required 
/>
```

### Link

A link component with various animation styles and theming options. Supports both single-line and multiline text.

Exported from `mado-ui/link`:

Default export:
- Link

Other exports:
- Anchor

#### Example

```tsx
import Link from 'mado-ui/link'

<Link href="/about" type="ltr" theme="blue">
  Learn more
</Link>

<Link href="/contact" type="fill-center" theme="primary">
  Get in touch
</Link>
```

### Modal

A pre-built modal component based on @headlessui's Dialog. Handles transitions, drag-to-close functionality, and backdrop interactions.

Exported from `mado-ui/modal`:

Default export:
- Modal

Other exports:
- ModalDialog
- ModalTrigger
- ModalTitle
- ModalClose

The Modal component must wrap both the ModalDialog and ModalTrigger components to work.

#### Example

```tsx
import Modal, { ModalDialog, ModalTrigger } from 'mado-ui/modal'

<Modal>
  <ModalTrigger>Open Modal</ModalTrigger>
  <ModalDialog>
    <h2>Modal Content</h2>
    <p>This is the modal content.</p>
  </ModalDialog>
</Modal>
```

### SubmitButton

A specialized button for form submission with status-aware styling and content.

Exported from `mado-ui/form`:

- SubmitButton

#### Example

```tsx
import { SubmitButton } from 'mado-ui/form'

<SubmitButton 
  loading="Submitting..."
  success="Form Submitted!"
  error="Submission Failed"
>
  Submit
</SubmitButton>
```

### Time

A time component that displays formatted dates and times with customizable precision.

Exported from `mado-ui/time`:

Default export:
- Time

#### Example

```tsx
import Time from 'mado-ui/time'

<Time dateObject={new Date()} day month year hours minutes />
<Time dateTime="2024-01-01T12:00:00Z" />
```
