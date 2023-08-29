
import { db } from "~/services/firebaseConnection";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  getDoc
} from 'firebase/firestore';
import { redirect } from "next/navigation";

interface taskProps{
  params: {id: string};
}

interface itemProps {
    tarefa: string;
    public: boolean;
    created: string;
    user: string;
    taskId: string
}

export default async function task({params}: taskProps) {

  const id = params?.id;
  const docRef = await doc(db, 'task', id);
  const snapshot = await getDoc(docRef);

  if(snapshot.data() === undefined || !snapshot.data()?.public){
    return redirect('/')
  }

  const miliseconds = snapshot.data()?.created.seconds * 1000;

  const item : itemProps = {
    tarefa: snapshot.data()?.task,
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id
  }

  return (
    <div className="w-full max-w-[1024px] mt-10 mr-auto mb-0 ml-auto flex flex-col justify-center items-center">
      <main className="w-full p-4">
        <h1 className="font-bold text-[32px] mb-4">Tarefa</h1>
        <article className="border-solid border-[1px] border-gray-600 p-4
                leading-[150%] flex items-center justify-center rounded-md">
          <p className="whitespace-pre-wrap w-full">{item.tarefa}</p>
        </article>
      </main>
    </div>
  );
}