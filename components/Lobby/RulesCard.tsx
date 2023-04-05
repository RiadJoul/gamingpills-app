import React from "react";

const FifaRules = [
    { id: 1, title: "Game Mode", rule: "5 minutes" },
    { id: 2, title: "Game Speed", rule: "Normal" },
    { id: 3, title: "Legacy Defending", rule: "Legacy Defending is not allowed to be used in this match. In case of a dispute, you MUST HAVE VIDEO EVIDENCE for it to be considered and the decision is at the discretion of Gamingpills." },
    { id: 4, title: "Lag/Settings/Teams", rule: "After 1 minute of gameplay any complaints on lag, pre-game settings, or banned teams will not be taken into consideration. No exceptions. (Note: connection is much better if you use a LAN cable instead of WiFi.)" },
    {
        id: 5,
        title: "Drawing/Tying a Match (FUT)",
        rule: "If the match ends in a draw after full time, carry on with extra time and penalties. *** If one of the users refuses to carry on with extra time or penalties, the user will automatically forfeit the match ***",
    },
    {
        id: 6,
        title: "Drawing/Tying an Online Seasons Match",
        rule: "If the match ends in a draw after full time, you do not have to upload scores just invite each other for another game",
    },
    {
        id: 7,
        title: "Squad type",
        rule: "Online Squads ONLY (if a player uses custom or 90 overall, the game will not count)",
    },
    {
        id: 8,
        title: "No Custom Formations",
        rule: "Custom Formations are not allowed to be used, unless agreed upon by the players involved. In case of a dispute, you MUST HAVE VIDEO EVIDENCE for it to be considered and the decision is at the discretion of Gamingpills.",
    },
    {
        id: 9,
        title: "Time",
        rule: "If you did not enter your score within 30 minutes after the game has ended, the challenge will count as a forfeit and you will lose",
    },
    {
        id: 10,
        title: "Cancellation",
        rule: "If both players did not enter the score in 2 hours after the challenge has begun the match will be cancelled",
    },
    {
        id: 11,
        title: "At the end of the match",
        rule: "take a photo of the end-of-game screen with the score and name of each player displayed. (to protect you in the event of a dispute)",
    },
];

const NbaRules = [
    { id: 1, title: "Quarter Length", rule: "5 minutes" },
    { id: 2, title: "Lag/Settings/Teams", rule: "After 1 minute of gameplay any complaints on lag, pre-game settings, or banned teams will not be taken into consideration. No exceptions. (Note: connection is much better if you use a LAN cable instead of WiFi.)" },
    { id: 4, title: "Pause Timer", rule: "If your pause timer runs out and your opponent quits the game when you are losing, you automatically lose. If your pause timer runs out and your opponent quits the game when you are winning or the match is tied, the match will be cancelled. If your timer runs out prior to the end of the first quarter of game play and the score is tied, we will consider it a non issue and the game should be replayed." },
    {
        id: 3,
        title: "Disconnections",
        rule: "In the event of a disconnection, you and your opponent must finish the remaining time of the match, keeping the score the same as it was in the game that got disconnected. i.e. If the disconnection occurred in at the end of the 1st quarter, the new game should be played until the end of the 3rd quarter. We highly recommend recording video of all game footage in case of a dispute.",
    },
    {
        id: 5,
        rule: "If you can't continue the match within 15 minutes of disconnecting, Gamingpills may rule on the match using our discretion. If you were losing, you will be given the loss. If you were winning, the match may be canceled or you may be given the loss depending on the circumstances. It is up to the player who was losing to reach out and attempt to play the match again. If you were losing and no attempt is made to play again within 15 minutes, you will lose the match.",
    },
    {
        id: 6,
        title: "Time",
        rule: "If you did not enter your score within 30 minutes after the game has ended, the challenge will count as a forfeit and you will lose",
    },
    {
        id: 7,
        title: "Cancellation",
        rule: "If both players did not enter the score in 2 hours after the challenge has begun the match will be cancelled",
    },
];

interface Props {
    gameName: string;
}

const FifaRulesCard = ({gameName}:Props) => {

    return (
        <>
            <h1 className="text-base mb-2 md:text-lg text-white font-semibold">
                {gameName} rules
            </h1>
            <div className="p-4 w-full text-left rounded-md border shadow-md bg-dark border-dark">
                <div className="text-sm lg:text-base">
                    <div>
                        <ul
                            role="list"
                            className="space-y-3"
                        >
                            {
                                gameName.includes("FIFA") && FifaRules.map((rule) => (
                                    <li
                                        key={rule.id}
                                        className="text-white-400"
                                    >
                                        <span className="text-primary uppercase font-semibold">
                                            {rule.title}
                                        </span>
                                        <span className="text-white">
                                        {rule.title && ":"} {rule.rule}
                                        </span>
                                    </li>
                                ))
                            }
                            {
                                gameName.includes("NBA") && NbaRules.map((rule) => (
                                    <li
                                        key={rule.id}
                                        className="text-white-400"
                                    >
                                        <span className="text-primary uppercase font-semibold">
                                            {rule.title}
                                        </span>
                                        <span className="text-white">
                                        {rule.title && ":"} {rule.rule}
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                        <h1 className="mt-7 lg:text-base text-center uppercase text-sm text-red-600">
                            In case your opponent violate any of these rules
                            make sure to take pictures as evidence to report
                            him
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FifaRulesCard;
