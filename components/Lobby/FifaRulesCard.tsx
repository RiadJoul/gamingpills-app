import React from "react";
//TODO: for now this is static but if we add another game other than fifa we need to
//TODO: update this
// get this from server based on the game
const rules = [
    { id: 1, title: "Game Mode", rule: "5 minutes" },
    { id: 2, title: "Game Speed", rule: "Normal" },
    { id: 4, title: "Defending", rule: "Legacy and/or Tactical are allowed" },
    {
        id: 3,
        title: "Drawing/Tying a Match (FUT)",
        rule: "If the match ends in a draw after full time, carry on with extra time and penalties. *** If one of the users refuses to carry on with extra time or penalties, the user will automatically forfeit the match ***",
    },
    {
        id: 5,
        title: "Squad type",
        rule: "Online Squads ONLY (if a player uses custom or 90 overall, the game will not count)",
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
    {
        id: 8,
        title: "At the end of the match",
        rule: "take a photo of the end-of-game screen with the score and name of each player displayed. (to protect you in the event of a dispute)",
    },
    {
        id: 9,
        //TODO
        title: "In case of lagging or poor connection",
        rule: "",
    },
];

const FifaRulesCard = () => {
    return (
        <>
            <h1 className="text-base mb-2 md:text-lg text-white font-semibold">
                Game rules
            </h1>
            <div className="p-4 w-full text-left rounded-md border shadow-md bg-dark border-dark">
                <div className="text-sm lg:text-base">
                    <div>
                        <ul
                            role="list"
                            className="space-y-2"
                        >
                            {rules.map((rule) => (
                                <li
                                    key={rule.id}
                                    className="text-white-400"
                                >
                                    <span className="text-primary uppercase font-semibold">
                                        {rule.title}
                                    </span>
                                    <span className="text-white">
                                        : {rule.rule}
                                    </span>
                                </li>
                            ))}
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
