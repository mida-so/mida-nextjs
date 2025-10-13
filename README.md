# Next.js component for Mida.so Optimization

[![npm version](https://img.shields.io/npm/v/mida-nextjs?style=for-the-badge&color=grey&logo=npm)](https://www.npmjs.com/package/mida-nextjs)

## Overview

The **Mida Next.js** package enables seamless integration of **Mida Optimization** into Next.js applications. This component is designed to work with both **Page Router** and **App Router**, allowing developers to integrate Mida tracking efficiently.

## Installation

Install the package using npm or yarn:

```bash
# via npm
npm install mida-nextjs

# via yarn
yarn add mida-nextjs
```

## Usage

### Page Router (Legacy `pages/` Directory)

For applications using the **Page Router**, add the `MidaScript` component inside `_document.js` (or `_document.tsx` if using TypeScript) to include it in the `<head>` of your HTML document.

```javascript
// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { MidaScript } from 'mida-nextjs';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <MidaScript projectKey="YOUR_PROJECT_KEY" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

### App Router (`app/` Directory)

For applications using the **App Router**, include the `MidaScript` component in `layout.tsx` to ensure it loads correctly within the `<head>` of your HTML document.

```tsx
// app/layout.tsx
import { MidaScript } from 'mida-nextjs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <MidaScript projectKey="YOUR_PROJECT_KEY" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Using Anti-Flicker Script

To prevent flickering during A/B tests, you can enable the anti-flicker script:

```tsx
<MidaScript
  projectKey="YOUR_PROJECT_KEY"
  useAntiFlicker={true}
  antiFlickerTimeout={3000} // Optional: default is 3000ms
/>
```

### Using Nonce

To add a nonce attribute for Content Security Policy:

```tsx
<MidaScript
  projectKey="YOUR_PROJECT_KEY"
  scriptAttributes={{
    nonce: 'your-nonce-value',
  }}
/>
```

### Using Regional CDN Servers

To use a regional CDN server (e.g., EU region), specify the `server` prop:

```tsx
<MidaScript
  projectKey="YOUR_PROJECT_KEY"
  server="eu" // Uses cdn-eu.mida.so instead of cdn.mida.so
/>
```

## Props

The `MidaScript` component accepts the following props:

| Prop                | Type                                        | Required | Default | Description                                         |
| ------------------- | ------------------------------------------- | -------- | ------- | --------------------------------------------------- |
| `projectKey`        | `string`                                    | ✅ Yes   | `null`  | Your Mida project key                               |
| `useAntiFlicker`    | `boolean`                                   | No       | `false` | Whether to include the anti-flicker script          |
| `antiFlickerTimeout`| `number`                                    | No       | `3000`  | Timeout for anti-flicker script (in milliseconds)   |
| `scriptAttributes`  | `React.ScriptHTMLAttributes<HTMLScriptElement>` | No   | `{}`    | Additional attributes to be added to the script tag |
| `isSPA`             | `boolean`                                   | No       | `true`  | Whether the application is a Single Page Application|
| `sync`              | `boolean`                                   | No       | `false` | Whether to load the script synchronously            |
| `server`            | `string`                                    | No       | `undefined` | Regional CDN server (e.g., "eu" for cdn-eu.mida.so) |

## Development and Testing

### Install Dependencies

```bash
yarn install
```

### Compile TypeScript to JavaScript

```bash
yarn build
```

## License

[Apache License, Version 2.0](https://github.com/mida-solutions/mida-nextjs/blob/master/LICENSE)

&copy; 2025 Mida.so
