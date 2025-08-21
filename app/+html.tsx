import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

// Root HTML for Expo Router Web (static rendering)
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {/* Disable body scrolling to match native ScrollView behavior */}
        <ScrollViewStyleReset />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17461418440"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17486244338"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17486357143"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', 'AW-17461418440');
              gtag('config', 'AW-17461126438');
              gtag('config', 'AW-17486244338');
              gtag('config', 'AW-17486357143');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
