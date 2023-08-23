/* eslint-disable prettier/prettier */
import Image from 'next/image';
import heroImg from '../../public/assets/hero.png';

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col  bg-zinc-950 h-full">
      <Image
        src={heroImg}
        alt="hero"
        priority={true}
        className="object-contain"
      />
      <h1 className="font-semibold text-[30px] text-white text-center">
        Sistema feito para você organizar <br />
        seus estudos e tarefas
      </h1>

      <div className='flex justify-around items-center max-w-[1120px] w-[50%]'>
        <section className='bg-gray-300 p-3 rounded-md transition-[0.4s] hover:scale-[1.08]'>
          <span>+12 Itens</span>
        </section>
        <section className='bg-gray-300 p-3 rounded-md transition-[0.4s] hover:scale-[1.08]'>
          <span>+90 Comentarios</span>
        </section>
      </div>
    </main>
  );
}
