import { getServerSession } from 'next-auth';
import { authOption } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { SectionTask } from '~/components/SectionTask';
import { AddTask } from '~/components/AddTask';

export default async function dashboard() {
  const session = await getServerSession(authOption);

  if (!session) redirect('/');
  return (
    <div className="w-full">
      <AddTask user={ session?.user?.email! } />
      <SectionTask user={ session?.user?.email! } />
    </div>
  );
}
