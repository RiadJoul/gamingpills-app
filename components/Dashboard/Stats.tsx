import React from "react";
import { Stats } from "../../generated/graphql";
import Stat from "./Stat";

interface Props {
    stats: Stats;
}


const Stats = ({stats}:Props) => {
    return (
        <div>
        <h1 className="text-primary text-xl font-bold">Bets</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 md:space-y-0  items-center">
            <Stat title={"Acitve bets"} amount={`${stats.betsStats.active} $`}/>
            <Stat title={"Today bets"} amount={`${stats.betsStats.today} $`}/>
            <Stat title={"All time bets"} amount={`${stats.betsStats.allTime} $`}/>
        </div>
        <h1 className="text-primary text-xl font-bold">Challenges</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 md:space-y-0  items-center">
            <Stat title={"Pending challenges"} amount={stats.challengesStats.pendingChallenges}/>
            <Stat title={"Active challenges"} amount={stats.challengesStats.activeChallenges}/>
            <Stat title={"Disputed challenges"} amount={stats.challengesStats.disputedChallenges}/>
            <Stat title={"Finished challenges"} amount={stats.challengesStats.finishedChallenges}/>         
        </div>
        <h1 className="text-primary text-xl font-bold">Profits</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 md:space-y-0  items-center">
            <Stat title={"Today Profits"} amount={`${stats.profitsStats.today} $`}/>
            <Stat title={"This months profits"} amount={`${stats.profitsStats.thisMonth} $`}/>
            <Stat title={"All time profits"} amount={`${stats.profitsStats.allTime} $`}/>       
        </div>
        <h1 className="text-primary text-xl font-bold">Wallets</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 md:space-y-0  items-center">
            <Stat title={"Total Balance amounts"} amount={`${stats.walletsStats.totalBalance} $`}/>
            <Stat title={"Pending amount withdraws $ "} amount={`${stats.walletsStats.pendingAmountWithdraws} $`}/>
            <Stat title={"Total deposit $ "} amount={`${stats.walletsStats.totalDeposit} $`}/>       
        </div>
        </div>
    )
}

export default Stats;