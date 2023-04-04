import React, { useEffect, useState } from "react";
import { Status, Transaction, Type, useTransactionsQuery } from "../../generated/graphql";
import format from "../../services/dateFormatter";
import Button from "../shared/Button";
import Loading from "../shared/Loading";
import NoData from "../shared/NoData";

const Transactions = () => {
  const [skip, setSkip] = useState<number>(0);
  const [take] = useState<number>(10);

  const [transactions,setTransactions] = useState<Transaction[]>();

  const [result, executeQuery] = useTransactionsQuery({requestPolicy:"cache-and-network",variables:{skip:skip,take:take}});
  const { data, fetching } = result;

  useEffect(() => {
    setSkip(0)
  },[])

  useEffect(() => {
    if(data && skip == 0) {
      setTransactions(data.transactions.transactions)
    }
},[data])




const loadMore = () => {
  executeQuery({
    variables: { skip: skip + take, take: 10 },
    requestPolicy: "network-only",
  });
  setSkip(skip + take);
};

useEffect(() => {
  if (data && skip > 0) {
    const newTransactions = data.transactions.transactions;
    if (newTransactions.every((t) => transactions.includes(t))) {
      
      return;
    }
    setTransactions([...transactions, ...newTransactions]);
  }
}, [data, transactions]);
  
  return (
    <>
      <h1 className="text-base mb-2 md:text-lg text-white font-semibold uppercase">
        Transactions:
      </h1>

      {fetching ? (
        <Loading />
      ) : (
        [
          transactions && transactions.length > 0 ? (
            <>
            <div className="bg-dark p-4 lg:p-8 rounded-xl w-full">
              <div className="flex justify-center">
                <div className="inline-block min-w-full shadow rounded-md overflow-hidden overflow-x-auto">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 bg-black border-black text-center text-xs font-semibold text-gray-100 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-5 py-3 border-b-2 bg-black border-black text-center text-xs font-semibold text-gray-100 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-5 py-3 border-b-2 bg-black border-black text-center text-xs font-semibold text-gray-100 uppercase tracking-wider">
                          amount
                        </th>
                        <th className="px-5 py-3 border-b-2 bg-black border-black text-center text-xs font-semibold text-gray-100 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-white capitalize">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-2 py-2 border-b bg-black border-black text-sm">
                            {
                              transaction.type == Type.Negative && <p className="text-center text-red-500">
                              - {transaction.description}
                             </p>
                            }
                           {
                              transaction.type == Type.Positive && <p className="text-center text-green-500">
                              + {transaction.description}
                             </p>
                            }
                          </td>
                          <td className="border-b bg-black border-black text-sm text-center">
                            <p className="whitespace-no-wrap">
                              {format(new Date(transaction.createdAt))}
                            </p>
                          </td>
                          <td className="border-b bg-black border-black text-sm text-center">
                            <p className="whitespace-no-wrap">
                              $ {transaction.amount}
                            </p>
                          </td>
                          <td className="border-b bg-black border-black text-xs text-center">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                              {transaction.status == Status.Completed && (
                                <span
                                  aria-hidden
                                  className="absolute inset-0 text-sm bg-green-700 opacity-50 rounded-md"
                                ></span>
                              )}
                              {transaction.status == Status.Pending && (
                                <span
                                  aria-hidden
                                  className="absolute inset-0 text-sm bg-yellow-500 opacity-50 rounded-md"
                                ></span>
                              )}
                              {transaction.status == Status.Rejected && (
                                <span
                                  aria-hidden
                                  className="absolute inset-0 text-sm bg-red-700 opacity-50 rounded-md"
                                ></span>
                              )}
                              <span className="relative text-white">
                                {transaction.status}
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {
                data.transactions.hasMore && <div className="flex justify-end">
                <Button 
                  text="Load more" 
                  textColor={"white"} 
                  bgColor={"dark"} 
                  size={"small"} 
                  width={"xmin"} 
                  onClick={() => loadMore()} 
                />
              </div> 
              }
            </>
          ) : (
            <NoData
              title={"No Transaction yet"}
              description="You can deposit money in the Buy Funds Section"
            />
          ),
        ]
      )}
    </>
  );
};

export default Transactions;
