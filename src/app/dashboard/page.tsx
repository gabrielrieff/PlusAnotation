import { getServerSession } from 'next-auth';
import { authOption } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { TextArea } from '~/components/TextArea';

import { FiShare2 } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';

export default async function dashboard() {
  const session = await getServerSession(authOption);

  if (!session) redirect('/');
  return (
    <div className="w-full">
      <main className="bg-zinc-950 w-full flex items-center justify-center">
        <section className="max-w-[1024px] w-full p-4">
          <div>
            <h1 className="text-white font-semibold text-[29px]">
              Qual sua tarefa?
            </h1>

            <form>
              <TextArea placeholder="Digite uma tarefa..." />
              <div className="flex mb-3">
                <input type="checkbox" className="w-5 h-5 mx-2 my-1" />
                <label className="text-white ml-2">
                  Deixar tarefa publica?
                </label>
              </div>

              <button
                type="submit"
                className="rounded-xl w-full text-white bg-blue-500 hover:bg-blue-800 duration-[.5s] py-3 text-xl"
              >
                Registrar
              </button>
            </form>
          </div>
        </section>
      </main>
      <section className="mt-9 px-5 w-full max-w-[1024px] flex flex-col">
        <h1 className="text-center text-4xl">Minhas tarefas</h1>
        <article className="mb-4 leading-[150%] flex flex-col items-start border-solid border-[1px] border-gray-600 rounded-md p-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <label className='bg-[#3183ff] px-[4px] py-[6px] rounded-md text-white'>publico</label>
            <button className='cursor-pointer'>
              <FiShare2 size="22" color="#3183ff" />
            </button>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className='whitespace-pre-wrap'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
            <button className="hover:scale-[1.05] duration-[.2s]">
              <FaTrash size="24" color="#ea3140" />
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}
