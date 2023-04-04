const rules = [
  { id: 1, rule: "If you receive an invitation on your console that does not match the rules laid out on this match page, DO NOT play the match. If you play the match, lose and submit a dispute, Gamingpills admins will not approve your dispute. Here at Gamingpills we lean towards fair play, before making any decision we will review and lean towards a fair decision strictly up to us." },
  {
    id: 2,
    rule: "We highly recommend recording all match results, disconnections, broken rules, etc.",
  },
  {
    id: 3,
    rule: "If a player breaks a rule when they are losing the match or the match is tied and their opponent quits the match immediately, the player who broke the rule will lose the match.",
  },
  {
    id: 4,
    rule: "If a player breaks a rule when they are in the lead and their opponent quits the match immediately, the match will be canceled and both players will be refunded their entry fees.",
  },
  {
    id: 5,
    title: "Proof",
    rule: "Video proof is the best evidence you can submit to us. It’s very easy to record on your console.",
  },
  {
    id: 6,
    title: "Score Auto Confirms After 20 Min",
    rule: "Once a score is reported, the other player has 20 minutes to confirm or counter before the first score reported is automatically confirmed.",
  },
  {
    id: 7,
    title: "Warning",
    rule: "Submitting fake or false results will result in immediate financial penalties. 1st Strike = $5 | 2nd Strike = $25 | 3rd Strike = 100% Balance Removal + Ban",
  },
  {
    id:8,
    rule:"Gamingpills is not endorsed by, directly affiliated with, maintained or sponsored by Electronic Arts, Microsoft, Xbox, Sony or Playstation. All content, games titles, trade names and/or trade dress, trademarks, artwork and associated imagery are trademarks and/or copyright material of their respective owners."
  }
];

export const GamingpillsRules = () => {
  return (
    <>
      <h1 className="text-base mb-2 md:text-lg text-white font-semibold">
        Gamingpills rules
      </h1>
      <div className="p-4 w-full text-left rounded-md border shadow-md bg-dark border-dark">
        <div className="text-sm lg:text-base">
          <div>
            <ul role="list" className="space-y-3">
              {rules.map((rule) => (
                <li key={rule.id} className="text-white-400">
                  <span className="text-primary uppercase font-semibold">
                    {rule.title}
                  </span>
                  <span className="text-white">{rule.title && ":"} {rule.rule}</span>
                </li>
              ))}
            </ul>
            <h1 className="mt-7 lg:text-base text-center uppercase text-sm text-red-600">
              In case your opponent violate any of these rules make sure to take
              pictures as evidence to report him
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
