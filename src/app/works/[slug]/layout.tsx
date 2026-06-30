//src/app/works/[slug]/layout.tsx
export { generateStaticParams, generateMetadata } from './metadata';

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
