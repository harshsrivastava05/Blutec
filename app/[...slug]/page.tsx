import Link from "next/link";
export default async function Upcoming({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const title = slug[0].replaceAll("-", " ");
  return (
    <main id="main" className="upcoming">
      <p className="hand">coming in the next phase</p>
      <h1>{title}</h1>
      <p>
        We’re still putting this page together. Explore the homepage while we
        prepare the rest of TeddyPups.
      </p>
      <Link className="button primary" href="/">
        Back home
      </Link>
    </main>
  );
}
