import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { FaTrash } from 'react-icons/fa';
import { authOption } from '~/app/api/auth/[...nextauth]/route';
import { db } from '~/services/firebaseConnection';

interface searchCommentProps {
  id: string;
}

interface commentProps {
  comment: string;
  name: string;
  user: string;
  id: string;
  TaskId: string;
  created: string;
}
export const SessionSearchComments = async ({ id }: searchCommentProps) => {
  const session = await getServerSession(authOption);

  const q = query(collection(db, 'comments'), where('taskId', '==', id));
  const snapShotComments = await getDocs(q);
  let allComments: commentProps[] = [];

  snapShotComments.forEach((doc) => {
    const miliseconds = doc.data()?.created.seconds * 1000;

    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      created: new Date(miliseconds).toLocaleDateString(),
      name: doc.data().name,
      TaskId: doc.data().taskId,
      user: doc.data().user
    });
  });

  async function handleDeletComment(id: string){
    const docRef = doc(db, 'comments', id);

    await deleteDoc(docRef);

  }

  return (
    <section className="my-5 mx-auto w-full p-4">
      <h2 className="text-2xl font-semibold my-4">Todos os comentários!</h2>
      {allComments.length === 0 && (
        <span>Não encontramos nem um comentário!</span>
      )}

      {allComments.map((item) => (
        <article
          key={item.id}
          className="border-[1px] border-solid border-gray-400 py-4
          rounded mb-4 p-3 relative"
        >
          <div className="flex items-center gap-3">
            <label className="bg-gray-300 px-2 py-1 rounded">{item.name}</label>
            {item.user === session?.user?.email &&(
              <button className="cursor-pointer"
                      onClick={() =>handleDeletComment(item.TaskId)}
              >
                <FaTrash size={18} color={'#EA3140'} />
              </button>
            )}
          </div>

          <p className="mt-4 whitespace-pre-wrap">{item.comment}</p>

          <p className="absolute bottom-2 right-2 text-[10px]">
            {item.created}
          </p>
        </article>
      ))}
    </section>
  );
};
