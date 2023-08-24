'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { TextArea } from './TextArea';

import { db } from '~/services/firebaseConnection';
import {addDoc, collection} from 'firebase/firestore';

interface addTaskProps {
  user: string
}

export const AddTask = (props: addTaskProps ) => {
  const [input, setInput] = useState('');
  const [publicTask, setPublicTask] = useState(false);

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>){
    setPublicTask(event.target.checked)
  }

  async function handleRegisterTask(event: FormEvent){
    event.preventDefault();

    if(input === "") return;

    try{
      await addDoc(collection(db, "task") , {
        task: input,
        created: new Date(),
        user: props.user,
        public: publicTask
      })
      setInput('');
      setPublicTask(false);
    }catch(err){
      console.log(err)
    }

  }

  return (
    <main className="bg-zinc-950 w-full flex items-center justify-center flex-col">
      <section className=" max-w-[1024px] w-full p-4">
        <div>
          <h1 className="text-white font-semibold text-[29px]">
            Qual sua tarefa?
          </h1>

          <form onSubmit={handleRegisterTask}>
            <TextArea
              placeholder="Digite uma tarefa..."
              value={input}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setInput(e.target.value)
              }
            />
            <div className="flex mb-3">
              <input
                type="checkbox"
                className="w-5 h-5 mx-2 my-1"
                checked={publicTask}
                onChange={handleChangePublic}

              />
              <label className="text-white ml-2">Deixar tarefa publica?</label>
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
  );
};
