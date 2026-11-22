import type {MetadataRoute} from 'next';
import {allPuppies} from '@/lib/puppies';
export default function sitemap():MetadataRoute.Sitemap{const base=(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000').replace(/\/$/,'');return ['','/puppies','/gone-home','/happy-families','/how-it-works','/faq','/contact',...allPuppies.map(p=>'/puppies/'+p.slug)].map(path=>({url:base+path}))}
