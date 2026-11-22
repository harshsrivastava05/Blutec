import { Suspense } from 'react';
import { Catalogue } from '@/components/catalogue';
export const metadata={title:'Available puppies | TeddyPups U.A.E.'};
export default function PuppiesPage(){return <Suspense fallback={<main id="main" className="catalogue wrap"><h1>Available puppies</h1></main>}><Catalogue/></Suspense>}
