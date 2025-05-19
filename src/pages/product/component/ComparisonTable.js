import React from "react";

const ComparisonTable = () => {
  const rows = [
    {
      method: "Airway Clear™",
      time: "Under 20 seconds",
      risk: "No risk",
      riskNote: "",
    },
    {
      method: "Heimlich Maneuver",
      time: "30s – 2 minutes",
      risk: "High",
      riskNote: "broken ribs, internal injuries",
    },
    {
      method: "Back Blows",
      time: "1 – 3 minutes",
      risk: "Moderate",
      riskNote: "ineffective if done incorrectly",
    },
    {
      method: "Waiting for Emergency Help",
      time: "9 – 12 min (average response time)",
      risk: "Critical",
      riskNote: "risk of brain damage or death",
    },
  ];

  return (
    <section className="bg-[#e6f6fd] py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-[28px] sm:text-[32px] font-extrabold text-[#162950] mb-4">
          Airway Clear™ VS regular methods
        </h2>
        <p className="text-[#162950] text-base font-medium mb-6 max-w-2xl mx-auto">
          While traditional methods like the Heimlich maneuver or back blows
          require training and can fail in emergencies,{" "}
          <strong>Airway Clear™</strong> provides instant relief.
        </p>
        <h3 className="text-lg sm:text-xl font-bold text-[#162950] underline mb-10">
          SEE EXACTLY HOW:
        </h3>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Column Headers */}
          <div className="bg-white rounded-t-xl border border-[#162950] overflow-hidden">
            <div className="bg-[#162950] text-[#3EBDE4] underline font-bold text-center py-3 text-sm tracking-wide uppercase">
              METHOD
            </div>
            {rows.map((row, i) => (
              <div
                key={i}
                className={`px-4 py-4 text-[#162950] font-semibold text-center ${
                  i % 2 !== 0 ? "bg-[#f2f2f2]" : ""
                }`}
              >
                {row.method}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-t-xl border border-[#162950] overflow-hidden">
            <div className="bg-[#162950] text-[#3EBDE4] underline font-bold text-center py-3 text-sm uppercase tracking-wide">
              TIME TO CLEAR AIRWAY <br />
              <span className="text-xs font-normal">(AVERAGE)</span>
            </div>
            {rows.map((row, i) => (
              <div
                key={i}
                className={`px-4 py-4 text-[#162950] font-medium text-center ${
                  i % 2 !== 0 ? "bg-[#f2f2f2]" : ""
                }`}
              >
                {row.time}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-t-xl border border-[#162950] overflow-hidden">
            <div className="bg-[#162950] text-[#3EBDE4] underline font-bold text-center py-3 text-sm tracking-wide uppercase">
              RISK OF INJURY
            </div>
            {rows.map((row, i) => (
              <div
                key={i}
                className={`px-4 py-4 text-[#162950] text-center ${
                  i % 2 !== 0 ? "bg-[#f2f2f2]" : ""
                }`}
              >
                <span className="font-bold">{row.risk}</span>
                {row.riskNote && (
                  <span className="text-sm block mt-1 text-gray-700 italic">
                    ({row.riskNote})
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
