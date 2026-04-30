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

    const antiFlickerCode = `var timeout=${antiFlickerTimeout};!function(t,e,r,n){function i(){var e=t.getElementById(n);e&&e.parentNode&&e.parentNode.removeChild(e)}if(e.rmfk=i,!(e.performance&&performance.getEntriesByName&&performance.getEntriesByName("first-contentful-paint")[0])){var o,a,c,l,f,u,d,e=_("_abcache"),m=w(e,[]),p=w(_("_variant_result"),{}),s=[],h={},g=!e,y=k(location.href);if(m&&m.length)for(o=0;o<m.length;o++)if((f=m[o])&&0!=+f.cache){for(a in l=w(f.data,{}))if(k(a)==y||-1<a.indexOf("*")&&RegExp("^"+k(a).replace(/\\*/g,".*")+"$").test(y)){if(+f.is_split_test){g=1;break}for(u=p[f.test_id]&&p[f.test_id].vaId,d=l[a]||[],c=0;c<d.length;c++)if(!u||d[c].name==u)for(var b,v=d[c].data||[],E=0;E<v.length;E++)v[E].url?g=1:((b=N(v[E].target))&&!h[b]&&(h[b]=1,s.push(b)),(b=N(v[E].rm))&&!h[b]&&(h[b]=1,s.push(b)),(b=N(v[E].oriEl))&&!h[b]&&(h[b]=1,s.push(b)),v[E].htmlBlock&&(b=N(v[E].refEl))&&!h[b]&&(h[b]=1,s.push(b)));break}if(g)break}if(!(u=g?'body{position:relative;overflow:hidden}body::after{position:absolute;top:0;bottom:0;left:0;right:0;content:"";background:#fff;z-index:2147483647}':s.length?s.join(",")+"{opacity:0!important;visibility:hidden!important}":""))return i();(d=t.createElement("style")).id=n,d.innerHTML=u,(t.head||t.documentElement).appendChild(d),setTimeout(i,r)}function w(e,t){try{return e?JSON.parse(e):t}catch(e){return t}}function _(e){try{return localStorage.getItem(e)||sessionStorage.getItem(e)||""}catch(e){return""}}function k(e){return String(e||"").replace(/^https?:\\/\\/(www\\.)?/,"").replace(/[?#].*$/,"").replace(/\\/$/,"").toLowerCase()}function N(e){try{return e&&"body"!=e&&"html"!=e&&(t.documentElement.querySelector(e),e)}catch(e){return""}}}(document,window,timeout,"abhide");`;
    
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
