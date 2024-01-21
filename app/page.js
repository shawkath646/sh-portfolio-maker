import 'server-only';
import Welcome from '@/components/landingPage/Welcome';
import UsersTable from '@/components/landingPage/UsersTable';
import ButtonsContainer from '@/components/landingPage/ButtonsContainer';
import getDeveloperData from '@/lib/getDeveloperData';


export default async function Home() {

  const developerData = await getDeveloperData();

  return (
    <main>
      <div className='container mx-auto p-3 lg:p-0'>
        <Welcome />
        <ButtonsContainer developerData={developerData} />
        <UsersTable />
      </div>
    </main>
  )
}
