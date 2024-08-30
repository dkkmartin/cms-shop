import { ReactNode } from 'react';
import HeaderNav from './header';
import Footer from './footer';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function HeaderFooterLayout({ children, className }: Props) {
  return (
    <>
      <HeaderNav />
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
}
