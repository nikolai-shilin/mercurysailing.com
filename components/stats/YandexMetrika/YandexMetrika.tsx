"use client";
 
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
 
const base = "https://wildworkation.com";
 
export default function YandexMetrika() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
 
  useEffect(() => {
    const params = searchParams.toString();
    const url = base + pathName + (params && "?" + params);
 
    if (process.env.NODE_ENV === 'production') {
      (window as any).ym(106875173, "hit", url);
    }
  }, [pathName, searchParams]);
 

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }


  return (
    <Script id="metrika">
      {`
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
  })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106875173', 'ym');

  ym(106875173, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
      `}
    </Script>
  );
}