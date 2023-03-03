import React from "react";
import { BiTrophy } from "react-icons/bi";
import { Challenge, Platform, Status } from "../../generated/graphql";
import calculateProfit from "../../services/Fee";

const InfoCard = ({ challenge }: { challenge: Challenge }) => {
  const datePlayed = new Date(challenge.createdAt);
  return (
    <>
      <h1 className="text-base mb-2 md:text-lg text-white font-semibold">
        Match Settings & Prizes
      </h1>
      <div className="p-4 w-full text-center rounded-md border shadow-md bg-dark border-dark">
        <div className="flex-1">
          <div className="justify-start">
            <div className="flex flex-col justify-center uppercase text-sm lg:text-base font-semibold text-white">
              {challenge.winner && (
                <div className="flex justify-between my-2">
                  <div className="flex space-x-2">
                    <h4>Winner</h4>
                    <BiTrophy className=" text-yellow-400 text-lg" />
                  </div>
                  <div>
                    <div className="flex-grow border-t border-gray-100"></div>
                  </div>
                  <div>
                    <span className="text-primary">
                      {challenge.winner.username}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex justify-between my-2">
                <div>
                  <h4>Prize</h4>
                </div>
                <div>
                  <div className="mx-4"></div>
                </div>
                <div>
                  <span className="text-green-500">
                    ${calculateProfit(challenge.bet)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div>
                  <h4>Platform</h4>
                </div>
                <div>
                  <span className="mx-4"></span>
                </div>
                <div>
                  <span className="">{challenge.platform}</span>
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div>
                  <h4>Video Game</h4>
                </div>
                <div>
                  <span className="mx-4"></span>
                </div>
                <div>
                  <span className="">{challenge.game.name}</span>
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div>
                  <h4>Video Game Mode</h4>
                </div>
                <div>
                  <span className="mx-4"></span>
                </div>
                <div>
                  <span className="">{challenge.gameMode.name}</span>
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div>
                  <h4>Status</h4>
                </div>
                <div>
                  <span className="mx-4"></span>
                </div>
                <div>
                  {challenge.status == Status.Active && (
                    <span className={`text-green-500`}>{challenge.status}</span>
                  )}
                  {challenge.status == Status.Disputed && (
                    <span className={`text-yellow-500`}>{challenge.status}</span>
                  )}
                  {challenge.status == Status.Finished && (
                    <span className={`text-green-600`}>{challenge.status}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div>
                  {challenge.platform === Platform.Ps4 && <h4>Local PSN-ID</h4>}
                  {challenge.platform === Platform.Ps5 && <h4>Local PSN-ID</h4>}

                  {challenge.platform === Platform.Xboxone && (
                    <h4>Local XBOX-ID</h4>
                  )}
                  {challenge.platform === Platform.Xboxseries && (
                    <h4>Local XBOX-ID</h4>
                  )}
                </div>
                <div>
                  <span className="mx-4"></span>
                </div>
                <div className="normal-case">
                  {challenge.platform === Platform.Ps4 &&
                    challenge.homePlayer.psnId}
                  {challenge.platform === Platform.Ps5 &&
                    challenge.homePlayer.psnId}

                  {challenge.platform === Platform.Xboxone &&
                    challenge.homePlayer.xboxId}
                  {challenge.platform === Platform.Xboxseries &&
                    challenge.homePlayer.xboxId}
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div>
                  {challenge.platform === Platform.Ps4 && (
                    <h4>Visitor PSN-ID</h4>
                  )}
                  {challenge.platform === Platform.Ps5 && (
                    <h4>Visitor PSN-ID</h4>
                  )}
                  {challenge.platform === Platform.Xboxone && (
                    <h4>Visitor XBOX-ID</h4>
                  )}
                  {challenge.platform === Platform.Xboxseries && (
                    <h4>Visitor XBOX-ID</h4>
                  )}
                </div>
                <div>
                  <span className="mx-4"></span>
                </div>
                <div className="normal-case">
                  {challenge.platform === Platform.Ps4 &&
                    challenge.awayPlayer?.psnId}
                  {challenge.platform === Platform.Ps5 &&
                    challenge.awayPlayer?.psnId}
                  {challenge.platform === Platform.Xboxone &&
                    challenge.awayPlayer?.xboxId}
                  {challenge.platform === Platform.Xboxseries &&
                    challenge.awayPlayer?.xboxId}
                </div>
              </div>
              {
                challenge.status == Status.Finished &&
                <div className="flex justify-between my-2">
                  <div>
                    <h4>Played on</h4>
                  </div>
                  <div>
                    <span className="mx-4"></span>
                  </div>
                  <div>
                    <h4>{datePlayed.toDateString()} | {datePlayed.getHours() < 10 ? `0${datePlayed.getHours()}` : datePlayed.getHours()} : {datePlayed.getMinutes() < 10 ? `0${datePlayed.getMinutes()}` : datePlayed.getMinutes()}</h4>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
