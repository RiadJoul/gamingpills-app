import React from "react";
import Chat from "../../components/Chat/Chat";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import PageHead from "../../components/shared/PageHead";



const Dashboard = () => {
  //graphql
  // const [result] = useStatsQuery();

  // const { data, fetching } = result;
  return (
    <>
      <PageHead title="Dashboard" />
      <TopNavigation />
      <main className="min-h-screen bg-black grid grid-cols-12">
        <aside className="hidden md:flex flex-col mt-5 col-span-2 items-end text-white shadow mb-5">
          <SideNavigation />
        </aside>
        <div className="col-span-12 md:col-span-6 mt-5">
          <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
            <div className="space-y-4">
              <h1 className="text-white text-2xl font-bold">Dashboard</h1>
                <div className="bg-dark flex justify-center py-14 rounded-lg">
                    <h1 className="text-center text-white text-5xl font-semibold">Coming soon</h1>
                </div>

            </div>
          </div>
        </div>
          <Chat />
      </main>
    </>
  )
}

export default Dashboard;