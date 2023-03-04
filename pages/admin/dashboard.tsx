import React from "react";
import Chat from "../../components/Chat/Chat";
import Chart from "../../components/Dashboard/Chart";
import Stats from "../../components/Dashboard/Stats";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import Loading from "../../components/Shared/Loading";
import PageHead from "../../components/Shared/PageHead";
import { useStatsQuery } from "../../generated/graphql";
import { useIsAuth } from "../../services/useIsAuth";



const Dashboard = () => {
  useIsAuth();

  //graphql
  const [result] = useStatsQuery();

  const { data, fetching } = result;
  return (
    <>
      <PageHead title="Dashboard" />
      <TopNavigation />
      <main className="min-h-screen bg-black grid grid-cols-12">
        <aside className="hidden md:flex flex-col mt-5 col-span-2 items-end text-white shadow mb-5">
          <SideNavigation />
        </aside>
        <div className="col-span-12 md:col-span-7 mt-5">
          <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
            <div className="space-y-4">
              <h1 className="text-white text-2xl font-bold">Dashboard</h1>
              {
                !fetching && data ? <>
                  <Stats stats={data.stats}/>
                  <Chart />
                </> : <Loading />
              }

            </div>
          </div>
        </div>
        <div className="hidden md:flex col-span-3 mx-5 h-screen mt-5 pb-36">
          <Chat />
        </div>
      </main>
    </>
  )
}

export default Dashboard;