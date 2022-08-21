import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserBalance from '../../components/UserBalance';

export default function GroupPage({ group }) {
  console.log({ group });
  const router = useRouter();

  useEffect(() => {
    if (!group) router.push('/');
  }, [group, router]);

  return (
    group && (
      <div className="w-1/3 p-4 mx-auto mt-10 border border-orange-600 rounded-lg">
        <h1 className="text-3xl font-semibold text-center">{group.name}</h1>
        <p className="text-center">{group.description}</p>
        <div className="flex flex-col gap-2">
          {group.members.map((member) => (
            <UserBalance user={member} key={member} balance={1} />
          ))}
        </div>
      </div>
    )
  );
}

export async function getServerSideProps(context) {
  try {
    const { id } = context.query;
    const group = await axios
      .get(`http://localhost:3000/api/groups/${id}`)
      .then((res) => res.data);
    return {
      props: { group },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        group: null,
      },
    };
  }
}
