'use client'
import { ChangeEvent, FormEvent, useState } from 'react';
import { TextArea } from './TextArea';
import { useSession } from 'next-auth/react'
import { addDoc, collection} from 'firebase/firestore';
import { db } from '~/services/firebaseConnection';

interface commentProps{
  id: string;
}

export const SessionComment = ({id}: commentProps) => {
  const {data: session} = useSession()
  const [comment, setComment] = useState("");


  async function handleComment(event:FormEvent){
    event.preventDefault();

    if(comment === '') return;

    if(!session?.user?.email || !session?.user?.email) return;

    try{
      const docRef = await addDoc(collection(db, "comments"), {
        comment: comment,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user.name,
        taskId: id
      })
      
      setComment("")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <section className="my-5 mx-auto w-full p-4">
      <h2 className="text-3xl font-semibold my-4">Deixe um comentário!</h2>

      <form onSubmit={handleComment}>
        <TextArea
          value={comment}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
          disabled={!session?.user}
          placeholder="Digite seu comentário..."
        />

        <button
          className="w-full py-3 text-lg rounded-md bg-blue-500 disabled:bg-blue-300
          text-white cursor-pointer disabled:cursor-not-allowed"
          disabled={!session?.user}
        >
          Enviar comentário
        </button>
      </form>
    </section>
  );
};
