'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function Item({
    href,
    label,
    Icon: Icon,
  }: {
    href: string;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
  }) {
    
    const pathname = usePathname();

    console.log(pathname);

    return (
      <Link href={href} className="flex flex-col items-center content-center relative">
        <Icon className={clsx("text-cinza1 text-lg", {'text-azul1': pathname.split('/')[2] === label.toLocaleLowerCase()})} />
        <span  className={clsx("text-xs text-cinza1 absolute top-7", {'text-azul1': pathname.split('/')[2] === label.toLocaleLowerCase()})}>{label}</span>
      </Link>
    );
}