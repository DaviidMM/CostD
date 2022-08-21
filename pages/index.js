import axios from 'axios';
import GroupContainer from '../components/GroupsContainer';

export default function HomePage({ groups }) {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center">Home page</h1>
      <GroupContainer groups={groups} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const groups = await axios
    .get('http://localhost:3000/api/groups')
    .then((res) => res.data);
  console.log('getServerSideProps', { groups });
  return {
    props: { groups },
  };
}
