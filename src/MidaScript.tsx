/**
 * Copyright 2025 Mida.so
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

interface MidaScriptProps {
  projectKey: string;
  useAntiFlicker?: boolean;
  antiFlickerTimeout?: number;
  scriptAttributes?: React.ScriptHTMLAttributes<HTMLScriptElement>;
  isSPA?: boolean;
  sync?: boolean;
  server?: string;
}

export const MidaScript: React.FC<MidaScriptProps> = ({
  projectKey,
  useAntiFlicker = false,
  antiFlickerTimeout = 3000,
  scriptAttributes = {},
  isSPA = true,
  sync = false,
  server,
}) => {
  try {
    if (!projectKey) {
      console.error('Mida: Project Key is required');
      return null;
    }

    // Determine CDN URL based on server prop
    const cdnUrl = server ? `https://cdn-${server}.mida.so` : 'https://cdn.mida.so';

    const antiFlickerCode = `var timeout = ${antiFlickerTimeout}; !function(h,i,d,e){var t,n=h.createElement("style");n.id=e,n.innerHTML="body{opacity:0}",h.head.appendChild(n),t=d,i.rmfk=function(){var t=h.getElementById(e);t&&t.parentNode.removeChild(t)},setTimeout(i.rmfk,t)}(document,window,timeout,"abhide");`;
    
    const spaCode = isSPA ? `window.isSPA = true;` : '';

    return (
      <>
        <link rel="preconnect" href={cdnUrl} />
        {useAntiFlicker && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: antiFlickerCode }}
          />
        )}
        {isSPA && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: spaCode }}
          />
        )}
        <script
          {...scriptAttributes}
          type="text/javascript"
          async={!sync}
          src={`${cdnUrl}/js/optimize.js?key=${projectKey}`}
        />
      </>
    );
  } catch (e) {
    console.error('Mida Script Error:', e);
    return null;
  }
};
