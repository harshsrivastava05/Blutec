'use client';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ReferenceHeader } from '@/components/reference-header';
const links = [['Home','/'],['Puppies','/puppies'],['Happy families','/happy-families'],['How it works','/how-it-works'],['FAQ','/faq'],['Visit & contact','/contact']];
export function Intro() {
  const path = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<'intro' | 'idle' | 'covering' | 'lifting'>('intro');
  const timer = useRef<number | undefined>(undefined);
  const navigating = useRef(false);

  useEffect(() => {
    const start = window.setTimeout(() => setPhase('lifting'), 560);
    const end = window.setTimeout(() => setPhase('idle'), 1040);
    return () => { clearTimeout(start); clearTimeout(end); };
  }, []);

  useEffect(() => {
    if (!navigating.current) return;
    setPhase('lifting');
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      navigating.current = false;
      setPhase('idle');
    }, 460);
  }, [path]);

  useEffect(() => {
    function follow(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || navigating.current) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href]');
      if (!(link instanceof HTMLAnchorElement) || link.target || link.hasAttribute('download')) return;
      const destination = new URL(link.href, location.href);
      if (destination.origin !== location.origin || destination.pathname === location.pathname) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      event.preventDefault();
      navigating.current = true;
      setPhase('covering');
      timer.current = window.setTimeout(() => {
        router.push(destination.pathname + destination.search + destination.hash);
        // A route may fail or take longer than expected. Never leave the curtain stuck.
        timer.current = window.setTimeout(() => {
          navigating.current = false;
          setPhase('lifting');
          timer.current = window.setTimeout(() => setPhase('idle'), 460);
        }, 8000);
      }, 300);
    }
    document.addEventListener('click', follow, true);
    return () => { document.removeEventListener('click', follow, true); clearTimeout(timer.current); };
  }, [router]);

  return <div aria-hidden="true" className="intro" data-phase={phase}>
    <div className="intro-blanket">
      <div className="intro-runner"><img src="/media/teddy-walk.svg" alt="" /><span>🐾　🐾　🐾</span></div>
      <span>every puppy is family</span>
    </div>
  </div>;
}
export function Header(){const dialog=useRef<HTMLDialogElement>(null); const path=usePathname(); const [ready,setReady]=useState(false); useEffect(()=>setReady(true),[]); return <>{path==='/'||path==='/happy-families'||path==='/puppies'||path==='/gone-home'||path.startsWith('/puppies/')||path==='/faq'||path==='/contact'||path==='/how-it-works' ? <ReferenceHeader path={path} links={links} openMenu={()=>dialog.current?.showModal()}/> : <header className="header"><Link className="brand" href="/"><img src="/media/logo.webp" alt=""/> <strong>TeddyPups</strong></Link><nav className="desktop-nav" aria-label="Main">{links.map(([label,href])=><Link key={href} href={href} aria-current={ready&&(href==='/'?path==='/':path.startsWith(href))?'page':undefined}>{label}</Link>)}</nav><Link className="button green header-contact" href="/contact">WhatsApp us</Link><button className="menu-trigger" onClick={()=>dialog.current?.showModal()}>🐾 &nbsp; Menu</button></header>}<dialog aria-label="Site menu" className="menu-dialog" ref={dialog} onClick={e=>{if(e.target===dialog.current)dialog.current?.close()}}><div className="menu-inner"><div className="menu-top"><span>where to, friend?</span><button onClick={()=>dialog.current?.close()}>Close</button></div><nav aria-label="Site menu">{links.map(([label,href],i)=><Link style={{animationDelay:`${i*70}ms`}} onClick={()=>dialog.current?.close()} key={href} href={href} data-active={path===href}>{label}<span> ↗</span></Link>)}</nav><div className="menu-bottom"><Link className="button dark" onClick={()=>dialog.current?.close()} href="/contact">WhatsApp us</Link><span>+971 50 000 0000</span></div></div></dialog></>}
export function MobileActions(){return <div className="tp-mobile-actions"><div><Link href="/contact" className="btn btn-whatsapp">WhatsApp us</Link><a href="tel:+971500000000" className="btn btn-ghost">Call</a></div></div>}
