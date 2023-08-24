'use client'

import { useEffect, useState } from 'react';

import { db } from '~/services/firebaseConnection';
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot
} from 'firebase/firestore';

import { FaTrash } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';

interface sectionTaskProps {
  user: string
}

interface tasksProps{
  id: string;
  created: Date;
  public: boolean;
  task: string;
  user: string
}

export const SectionTask = (props: sectionTaskProps) => {

  const [tasks, setTasks] = useState<tasksProps[]>([])

  useEffect(() => {
    async function loadingTask(){
      const taskRef = collection(db, "task");
      const queryRef = query(
        taskRef,
        orderBy("created", "desc"),
        where("user", "==", props.user)
      )
      onSnapshot(queryRef, (snapshot) => {
        let list = [] as tasksProps[];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            created: doc.data().created,
            task: doc.data().task,
            public: doc.data().public,
            user: doc.data().user
          })
        })

        setTasks(list)
      });
    }

    loadingTask()
  }, [props.user]);

  return (
    <section className="mt-9 px-5 w-full flex flex-col items-center">
      <div className="w-full max-w-[1024px]">
        <h1 className="text-center text-4xl font-semibold mb-4">
          Minhas tarefas
        </h1>

        {
          tasks.map((task) => (
            <article 
              key={task.id}
              className="mb-4 leading-[150%] flex flex-col items-start border-solid border-[1px] border-gray-600 rounded-md p-2">
              {task.public &&(
                <div className="flex items-center justify-center gap-3 mb-2">
                  <label className="bg-[#3183ff] px-[4px] py-[6px] rounded-md text-white">
                    publico
                  </label>
                  <button className="cursor-pointer">
                    <FiShare2 size="22" color="#3183ff" />
                  </button>
                </div>

              )}
              
              <div className="flex items-center justify-between w-full">
                <p className="whitespace-pre-wrap">
                  {task.task}
                </p>
                <button className="hover:scale-[1.05] duration-[.2s]">
                  <FaTrash size="24" color="#ea3140" />
                </button>
              </div>
            </article>

          ))
        }
      </div>
    </section>
  );
};
