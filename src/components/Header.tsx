'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="text-white w-full h-[76px] flex items-center justify-center  bg-zinc-950">
      <section className="p-4 w-full max-w-[1024px] flex items-center justify-between">
        <nav className="flex items-center">
          <Link href={''} className="text-[24px] font-bold">
            <h1>Tarefa+</h1>
          </Link>
          {session?.user && (
            <Link
              href={'/dashboard'}
              className="text-[16px] bg-gray-200 text-black
                rounded-md py-1 px-3 ml-4"
            >
              <h1>Meu painel</h1>
            </Link>
          )}
        </nav>
        {status === 'loading' ? (
          <></>
        ) : session ? (
          <>
            <button
              className="py-1 px-3 rounded-3xl border border-white border-solid duration-[0.4s]
              cursor-pointer hover:scale-[1.08] hover:bg-white hover:text-black hover:font-bold
              flex items-center justify-around gap-5"
              onClick={() => signOut()}
            >
              Olá {session?.user?.name}
              <Image
                alt={`${session?.user?.name}`}
                src={`${session?.user?.image}`}
                width={100}
                height={100}
                className="w-10 h-10 rounded-full bg-cover object-contain"
              />
            </button>
          </>
        ) : (
          <button
            className="py-2 px-8 rounded-md border border-white border-solid duration-[0.4s]
            cursor-pointer hover:scale-[1.08] hover:bg-white hover:text-black hover:font-bold"
            onClick={() => signIn('google')}
          >
            Acessar
          </button>
        )}
      </section>
    </header>
  );
}
