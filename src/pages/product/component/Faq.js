import React, { useState, useRef } from "react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const sliderRef = useRef(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const goToNext = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };
  const faqs = [
    {
      title: "What is this LifeVac™?",
      content: (
        <>
          <div className="text-start space-y-2">
            <p>
              <strong>
                LifeVac™ is your first defense in choking emergencies.
              </strong>{" "}
              It’s a powerful, easy-to-use device designed to clear airways in
              seconds.
            </p>
            <p>
              <strong>Life-Saving Help for All Ages:</strong> Whether it’s for
              adults or children, LifeVac™ provides critical, life-saving
              help when you need it most.
            </p>
            <p>
              <strong>No Training Needed:</strong> With no special training
              required, anyone can use it to prevent brain damage or death from
              choking.
            </p>
            <p>
              <strong>Compact and Effective:</strong> Designed to fit perfectly
              in your emergency kit at home, it’s always ready to save a life.
            </p>
            <div className="mt-4 space-y-2">
              <div className="border border-dashed p-2 rounded text-sm bg-white shadow-sm">
                🔵 <strong>Removes Blockages Fast:</strong> Clears airways in
                under 20 seconds
              </div>
              <div className="border border-dashed p-2 rounded text-sm bg-white shadow-sm">
                🔵 <strong>Universal Fit:</strong> Works for both adults and
                children
              </div>
              <div className="border border-dashed p-2 rounded text-sm bg-white shadow-sm">
                🔵 <strong>Self-Use Capability:</strong> Use it on yourself
                during a choking crisis
              </div>
              <div className="border border-dashed p-2 rounded text-sm bg-white shadow-sm">
                🔵 <strong>Free Replacement:</strong> If used in an emergency,
                we send you a free device
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Why does it exist & why is it the best ?",
      content: (
        <>
          <p className="text-start font-semibold">
            Choking is one of the leading causes of preventable death among
            children.
          </p>
          <p className="text-start">
            While traditional methods like the Heimlich maneuver or back blows
            require training and can fail in emergencies, LifeVac™ provides
            instant relief without risk.
          </p>
          <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-inner text-sm space-y-2">
            <p className="font-semibold text-center mb-3 text-blue-800">
              How LifeVac™ Saves Lives Faster
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 text-center text-xs font-medium gap-3">
              <div className="bg-white p-3 rounded border shadow-sm">
                <div className="text-blue-600 font-bold mb-2">METHOD</div>
                <div className="space-y-1">
                  <div>LifeVac™</div>
                  <div>Heimlich</div>
                  <div>Back Blows</div>
                  <div>Emergency Wait</div>
                </div>
              </div>
              <div className="bg-white p-3 rounded border shadow-sm">
                <div className="text-blue-600 font-bold mb-2">CLEAR TIME</div>
                <div className="space-y-1">
                  <div>&lt; 20 sec</div>
                  <div>30s – 2m</div>
                  <div>1 – 3m</div>
                  <div>9 – 12m</div>
                </div>
              </div>
              <div className="bg-white p-3 rounded border shadow-sm">
                <div className="text-blue-600 font-bold mb-2">INJURY RISK</div>
                <div className="space-y-1">
                  <div>None</div>
                  <div>High</div>
                  <div>Moderate</div>
                  <div>Critical</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Isn’t CPR better?",
      content: (
        <p className="text-start space-y-2">
          Unlike CPR or back blows, which require training and can be difficult
          to execute correctly in an emergency, <strong>LifeVac™</strong>{" "}
          works instantly, removing the obstruction with a single pull, saving
          precious seconds and preventing potential brain damage or worse.
        </p>
      ),
    },
    {
      title: "What’s Included?",
      content: (
        <div className="text-start space-y-2">
          <p>
            ✔️ <strong>1 x LifeVac™</strong> Device with a patented one-way
            valve
          </p>
          <p>
            ✔️ <strong>2 x Interchangeable masks</strong> (one for children, one
            for adults)
          </p>
          <p>
            ✔️ Easy-to-follow <strong>instruction manual</strong>
          </p>
          <p>
            ✔️ <strong>100% Money Back</strong> Guarantee Certificate
          </p>
          <p>
            ✔️ <strong>Free Replacement</strong> Policy for life
          </p>
        </div>
      ),
    },
    {
      title: "Shipping & Guarantee",
      content: (
        <div className="text-start space-y-4">
          {/* Shipping Info Box */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 border rounded-lg shadow-sm">
            <div className="text-blue-700 text-xl">🚚</div>
            <div>
              <p className="font-semibold text-base mb-1">
                Free shipping on all orders.
              </p>
              <ul className="text-sm list-disc list-inside ml-2 space-y-1">
                <li>
                  <strong>Standard:</strong> 5–7 business days
                </li>
                <li>
                  <strong>Express:</strong> 3–5 business days
                </li>
                <li>
                  <strong>International Shipping:</strong> Available with
                  delivery times based on location
                </li>
              </ul>
            </div>
          </div>

          {/* Guarantee Box */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 border rounded-lg shadow-sm">
            <div className="text-blue-700 text-xl">🛡️</div>
            <div>
              <p className="font-semibold text-base mb-1">
                30-Day-Satisfaction Guarantee
              </p>
              <p className="text-sm">
                We guarantee 100% of your satisfaction with our exclusive 30 Day
                free warranty on every order.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="mt-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded mb-3 shadow-sm">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left text-base md:text-xl font-bold text-[#162950] bg-gray-100 hover:bg-gray-200 tracking-wider leading-relaxed"
            >
              {faq.title}
              <span className="text-base md:text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 bg-white text-sm md:text-base text-[#162950] leading-relaxed tracking-wider">
                {faq.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
