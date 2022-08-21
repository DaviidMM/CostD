import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Group from '../../components/Group';

export default function GroupPage({ group }) {
  console.log({ group });
  const router = useRouter();

  useEffect(() => {
    if (!group) router.push('/');
  }, [group, router]);

  return group && <Group group={group} />;
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
