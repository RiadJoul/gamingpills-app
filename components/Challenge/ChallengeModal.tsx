import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import Button from "../shared/Button";
import { modes, platforms, bets } from "../../services/server";
import { CgPill } from "react-icons/cg";
import SearchPlayerModal from "../Modals/SearchPlayerModal";
import { GameMode, useCreateChallengeMutation, useGamesQuery, User } from "../../generated/graphql";
import { useRouter } from "next/router";
import FeedbackModal from "../Modals/FeedbackModal";
import useAuth from "../../services/useAuth";
import Loading from "../shared/Loading";
import { SiFifa, SiNba } from "react-icons/si";
import CarouselSelect from "../shared/BetsCarousel";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  show: boolean;
  close: () => void;
  user?: User;
}


const ChallengeModal = (props: Props) => {
  const [result] = useGamesQuery();
  const { data } = result;

  //@ts-ignore
  const { user }: User = useAuth();
  const router = useRouter();
  const closeButtonRef = useRef(null);
  const [modeSelected, setModeSelected] = useState(
    props.user ? modes[1] : modes[0]
  );
  const [gameSelected, setGameSelected] = useState<any>();
  const [subModeSelected, setSubModeSelected] = useState<any>();
  const [betSelected, setBetSelected] = useState(bets[0]);
  const [platformSelected, setPlatformSelected] = useState(platforms[0]);
  const [comment] = useState("");
  //searchPlayer
  const [searchPlayer, setSearchPlayer] = useState<boolean>(false);
  const [awayPlayer, setAwayPlayer] = useState<User>(
    props.user ? props.user : null
  );
  //graphql
  const [, challenge] = useCreateChallengeMutation();

  //responses
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);



  useEffect(() => {
    if (data && data.games) {
      setGameSelected(data.games[0])
      if (gameSelected)
        setSubModeSelected(gameSelected.gameModes[0])
    }
  }, [data])

  useEffect(() => {
    if (gameSelected)
      setSubModeSelected(gameSelected.gameModes[0]);
  }, [gameSelected]);

  useEffect(() => {
    if (modeSelected == modes[0]) {
      setAwayPlayer(null);
    }
  }, [modeSelected]);

  const Challenge = async () => {
    setLoading(true);
    setErrorField(null);
    setErrorMessage(null);
    if (modeSelected == modes[1] && !awayPlayer) {
      setErrorField('A player was not selected');
      setErrorMessage('Please select a player or change the challenge mode to open.');
      setLoading(false);
      return;
    }
    const response = await challenge({
      game: gameSelected.id,
      gameMode: subModeSelected.id,
      platform: platformSelected.name,
      awayPlayerId: awayPlayer ? awayPlayer.id : null,
      bet: betSelected,
      comment: comment,
    });
    if (response.data?.Challenge.errors) {
      setErrorField(response.data.Challenge.errors[0].field);
      setErrorMessage(response.data.Challenge.errors[0].message);
    } else {
      setSucess(true);
      setTimeout(() => router.push("/player/feed"), 1000);
    }
    setLoading(false);
    props.close();
  };

  return (
    <>
      <FeedbackModal
        title={"Success"}
        feedback={
          modeSelected == modes[0] ?
            "Created a challenge successfully! waiting for a player to join" : `Created a challenge successfully! waiting for ${awayPlayer?.username} to respond`
        }
        type={"success"}
        cancelText={"Close"}
        show={success}
        close={() => setSucess(false)}
      />

      <FeedbackModal
        title={errorField}
        feedback={errorMessage}
        type={"error"}
        cancelText={"Close"}
        show={errorField ? true : false}
        close={() => setErrorField(null)}
      />

      <SearchPlayerModal
        show={searchPlayer}
        close={() => setSearchPlayer(false)}
        setAwayPlayer={setAwayPlayer}
      />
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 max-h-screen"
          initialFocus={closeButtonRef}
          onClose={() => props.close()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                  {!data ? <Loading /> : <div className="bg-dark font-primary px-4 sm:p-6 rounded-lg">
                    <div>
                      <form>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                          <div className="pt-2 lg:pt-0 px-4 bg-dark">
                            <div className="flex justify-evenly">
                              {user && (
                                <div className="flex flex-col items-center space-y-2">
                                  <div className="w-14 h-14 bg-dark rounded-md">
                                    {user.avatar != null ? (

                                      <Image
                                        src={user.avatar}
                                        width={100}
                                        height={100}
                                        objectFit={"cover"}
                                        className="rounded-md"
                                      />
                                    ) : (
                                      <Image
                                        src="/images/profile.png"
                                        width={100}
                                        height={100}
                                        className="rounded-md"
                                      />
                                    )}
                                  </div>

                                  <span className="font-semibold text-xs lg:text-base text-white">
                                    {user.username}
                                  </span>
                                </div>
                              )}
                              <h1 className="text-white uppercase text-base self-center font-semibold lg:text-lg">
                                vs
                              </h1>
                              {awayPlayer ? (
                                <div className="flex flex-col items-center space-y-2">
                                  <div className="w-14 h-14 bg-dark rounded-md">
                                    {awayPlayer.avatar != null ? (
                                      <Image
                                        src={awayPlayer.avatar}
                                        width={100}
                                        height={100}
                                        objectFit={"cover"}
                                        className="rounded-md"
                                      />
                                    ) : (
                                      <Image
                                        src="/images/profile.png"
                                        width={100}
                                        height={100}
                                        className="rounded-md"
                                      />
                                    )}
                                  </div>

                                  <span className="font-semibold text-xs lg:text-base text-white">
                                    {awayPlayer.username}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center space-y-2">
                                  <div className="w-14 h-14 bg-dark rounded-md">
                                    <Image
                                      src="/images/profile.png"
                                      width={100}
                                      height={100}
                                      className="rounded-md"
                                    />
                                  </div>

                                  <span className="font-semibold text-xs lg:text-base text-white">
                                    Waiting...
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          {modeSelected == modes[1] && awayPlayer == null && (
                            <div className="flex justify-center">
                              <Button
                                text={"Search"}
                                size={"small"}
                                textColor={"black"}
                                bgColor={"white"}
                                width={"min"}
                                onClick={() => setSearchPlayer(true)}
                              />
                            </div>
                          )}
                          <div className="space-y-2 mb-8">
                            
                            <Listbox
                              value={modeSelected}
                              onChange={setModeSelected}
                            >
                              {({ open }) => (
                                <>
                                  <Listbox.Label className="block text-sm lg:text-base font-medium text-white">
                                    Mode
                                  </Listbox.Label>
                                  <div className="mt-1 relative">
                                    <Listbox.Button className="relative uppercase w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-focus focus:border-primary-focus text-sm lg:text-base">
                                      <span className="flex items-center">
                                        <span className="text-lg lg:text-xl">
                                          {modeSelected.icon}
                                        </span>

                                        <span className="ml-3 block truncate">
                                          {modeSelected.name}
                                        </span>
                                      </span>
                                    </Listbox.Button>

                                    <Transition
                                      show={open}
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute uppercase z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm lg:text-base">
                                        {modes.map((mode) => (
                                          <Listbox.Option
                                            key={mode.id}
                                            className={({ active }) =>
                                              classNames(
                                                active
                                                  ? "text-white bg-primary-focus"
                                                  : "text-gray-900",
                                                "cursor-default select-none relative py-2 pl-3 pr-9 text-sm"
                                              )
                                            }
                                            value={mode}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <div className="flex items-center">
                                                  <span>{mode.icon}</span>
                                                  <span
                                                    className={classNames(
                                                      selected
                                                        ? "font-semibold"
                                                        : "font-normal",
                                                      "ml-3 block truncate"
                                                    )}
                                                  >
                                                    {mode.name}
                                                  </span>
                                                </div>

                                                {selected ? (
                                                  <span
                                                    className={classNames(
                                                      active
                                                        ? "text-white"
                                                        : "text-primary-focus",
                                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                                    )}
                                                  >
                                                    <CgPill />
                                                  </span>
                                                ) : null}
                                              </>
                                            )}
                                          </Listbox.Option>
                                        ))}
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                </>
                              )}
                            </Listbox>
                            <Listbox
                              value={betSelected}
                              onChange={setBetSelected}
                            >
                              {({ open }) => (
                                <>
                                  <Listbox.Label className="block text-sm lg:text-base font-medium text-white">
                                    Bet
                                  </Listbox.Label>
                                  <div className="mt-1 relative">
                                    <CarouselSelect bets={bets} setBet={(bet:number) => {setBetSelected(bet)}}/>
                                  </div>
                                </>
                              )}
                            </Listbox>
                            <Listbox
                              value={gameSelected}
                              onChange={setGameSelected}
                            >
                              {({ open }) => (
                                <>
                                  <Listbox.Label className="block text-sm lg:text-base font-medium text-white">
                                    Game
                                  </Listbox.Label>
                                  <div className="mt-1 relative">
                                    <Listbox.Button className="relative uppercase w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-focus focus:border-primary-focus sm:text-sm">
                                      <span className="flex items-center">
                                        <span className="text-lg lg:text-xl">
                                          {gameSelected.name.includes("FIFA") && <SiFifa />}
                                          {gameSelected.name.includes("NBA") && <SiNba />}
                                        </span>

                                        <span className="ml-3 block truncate text-sm lg:text-base">
                                          {gameSelected.name}
                                        </span>
                                      </span>
                                    </Listbox.Button>

                                    <Transition
                                      show={open}
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute uppercase z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm">
                                        {data.games.map((game) => (
                                          <Listbox.Option
                                            key={game.id}
                                            className={({ active }) =>
                                              classNames(
                                                active
                                                  ? "text-white bg-primary-focus"
                                                  : "text-gray-900",
                                                "cursor-default select-none relative py-2 pl-3 pr-9 text-sm lg:text-base"
                                              )
                                            }
                                            value={game}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <div className="flex items-center">
                                                  <span className="text-lg lg:text-xl">
                                                    {game.name.includes("FIFA") && <SiFifa />}
                                                    {game.name.includes("NBA") && <SiNba />}
                                                  </span>
                                                  <span
                                                    className={classNames(
                                                      selected
                                                        ? "font-semibold"
                                                        : "font-normal",
                                                      "ml-3 block truncate text-sm lg:text-base"
                                                    )}
                                                  >
                                                    {game.name}
                                                  </span>
                                                </div>

                                                {selected ? (
                                                  <span
                                                    className={classNames(
                                                      active
                                                        ? "text-white"
                                                        : "text-primary-focus",
                                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                                    )}
                                                  >
                                                    <span className="text-lg lg:text-xl">
                                                      <CgPill />
                                                    </span>
                                                  </span>
                                                ) : null}
                                              </>
                                            )}
                                          </Listbox.Option>
                                        ))}
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                </>
                              )}
                            </Listbox>
                            <Listbox
                              value={subModeSelected}
                              onChange={setSubModeSelected}
                            >
                              {({ open }) => (
                                <>
                                  <Listbox.Label className="block text-sm lg:text-base font-medium text-white">
                                    Game Mode
                                  </Listbox.Label>
                                  <div className="mt-1 relative">
                                    <Listbox.Button className="relative uppercase w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-focus focus:border-primary-focus text-sm">
                                      <span className="flex items-center">
                                        <span className="text-lg lg:text-xl">
                                          {gameSelected.name.includes("FIFA") && <SiFifa />}
                                          {gameSelected.name.includes("NBA") && <SiNba />}
                                    
                                        </span>

                                        <span className="ml-3 block truncate text-sm lg:text-base">
                                          {subModeSelected.name}
                                        </span>
                                      </span>
                                    </Listbox.Button>

                                    <Transition
                                      show={open}
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute uppercase z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {gameSelected.gameModes.map(
                                          (subMode: GameMode) => (
                                            <Listbox.Option
                                              key={subMode.id}
                                              className={({ active }) =>
                                                classNames(
                                                  active
                                                    ? "text-white bg-primary-focus"
                                                    : "text-gray-900",
                                                  "cursor-default select-none relative py-2 pl-3 pr-9 text-sm"
                                                )
                                              }
                                              value={subMode}
                                            >
                                              {({ selected, active }) => (
                                                <>
                                                  <div className="flex items-center">
                                                    <span className="text-lg lg:text-xl">
                                                      {gameSelected.name.includes("FIFA") && <SiFifa />}
                                                      {gameSelected.name.includes("NBA") && <SiNba />}
                                                    </span>
                                                    <span
                                                      className={classNames(
                                                        selected
                                                          ? "font-semibold"
                                                          : "font-normal",
                                                        "ml-3 block truncate text-sm"
                                                      )}
                                                    >
                                                      {subMode.name}
                                                    </span>
                                                  </div>

                                                  {selected ? (
                                                    <span
                                                      className={classNames(
                                                        active
                                                          ? "text-white"
                                                          : "text-primary-focus",
                                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                                      )}
                                                    >
                                                      <span className="text-lg lg:text-xl">
                                                        <CgPill />
                                                      </span>
                                                    </span>
                                                  ) : null}
                                                </>
                                              )}
                                            </Listbox.Option>
                                          )
                                        )}
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                </>
                              )}
                            </Listbox>
                            <Listbox
                              value={platformSelected}
                              onChange={setPlatformSelected}
                            >
                              {({ open }) => (
                                <>
                                  <Listbox.Label className="block text-sm lg:text-base font-medium text-white">
                                    Platform
                                  </Listbox.Label>
                                  <div className="mt-1 relative">
                                    <Listbox.Button className="relative uppercase w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-focus focus:border-primary-focus text-sm">
                                      <span className="flex items-center">
                                        <span className="text-lg lg:text-xl">
                                          {platformSelected.icon}
                                        </span>

                                        <span className="ml-3 block truncate text-sm lg:text-base">
                                          {platformSelected.name}
                                        </span>
                                      </span>
                                    </Listbox.Button>

                                    <Transition
                                      show={open}
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute z-10 uppercase mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {platforms.map((platform) => (
                                          <Listbox.Option
                                            key={platform.id}
                                            className={({ active }) =>
                                              classNames(
                                                active
                                                  ? "text-white bg-primary-focus"
                                                  : "text-gray-900",
                                                "cursor-default select-none relative py-2 pl-3 pr-9 text-sm lg:text-base"
                                              )
                                            }
                                            value={platform}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <div className="flex items-center">
                                                  <span className="text-lg lg:text-xl">
                                                    {platform.icon}
                                                  </span>
                                                  <span
                                                    className={classNames(
                                                      selected
                                                        ? "font-semibold"
                                                        : "font-normal",
                                                      "ml-3 block truncate"
                                                    )}
                                                  >
                                                    {platform.name}
                                                  </span>
                                                </div>

                                                {selected ? (
                                                  <span
                                                    className={classNames(
                                                      active
                                                        ? "text-white"
                                                        : "text-primary-focus",
                                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                                    )}
                                                  >
                                                    <span className="text-lg lg:text-xl">
                                                      <CgPill />
                                                    </span>
                                                  </span>
                                                ) : null}
                                              </>
                                            )}
                                          </Listbox.Option>
                                        ))}
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                </>
                              )}
                            </Listbox>
                            

                            {/* <div className="block text-sm lg:text-base font-medium text-white">
                              Comment
                            </div>
                            <div className="mt-1 relative text-sm lg:text-base">
                              <Input
                                type={"text"}
                                placeholder={"Comment..."}
                                onChange={(e) => setComment(e.target.value)}
                              />
                            </div> */}
                          </div>
                          <div className="px-2 py-3 text-right sm:px-6 space-y-2">
                            <Button
                              text={"Challenge"}
                              textColor={"white"}
                              width={"full"}
                              size={"medium"}
                              bgColor={"primary"}
                              onClick={() => {
                                Challenge();
                              }}
                              loading={loading}
                            />
                            <Button
                              text={"Cancel"}
                              textColor={"black"}
                              width={"full"}
                              size={"medium"}
                              bgColor={"white"}
                              onClick={props.close}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  }

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ChallengeModal;
