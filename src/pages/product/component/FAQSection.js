import React, { useState } from "react";

const faqs = [
  {
    question: "What is this Airway Clear™?",
    answer:
      "Airway Clear™ is an emergency choking device designed to instantly remove blockages from the airways of children and adults. It’s a simple, easy-to-use tool that could mean the difference between life and death in choking situations.",
  },
  {
    question: "Why does it exist?",
    answer:
      "Choking is one of the leading causes of preventable death among children. Airway Clear™ was created to give parents and caregivers a fast, effective way to clear airways when traditional methods, like the Heimlich maneuver, aren’t enough.",
  },
  {
    question: "Why would I need it?",
    answer:
      "Airway Clear™ gives you peace of mind by ensuring that you’re prepared to handle a choking emergency at any moment. Having this device means your home is safer for your child, offering protection against the unthinkable.",
  },
  {
    question: "Why should I choose Airway Clear™?",
    answer:
      "Unlike CPR or back blows, which require training and can be difficult to execute correctly in an emergency, Airway Clear™ works instantly, removing the obstruction with a single pull, saving precious seconds and preventing potential brain damage or worse.",
  },
  {
    question: "How soon can I get it?",
    answer:
      "<p>We offer&nbsp;fast and reliable shipping, so you can have Airway Clear™ in your home within&nbsp;<strong>3-5 business days.</strong> For even faster protection, choose our&nbsp;express shipping&nbsp;option to get it within&nbsp;<strong>1-2 days.</strong></p>",
  },
  {
    question: "Can it force air into the throat?",
    answer:
      "Absolutely not. AirwayClear™ has a one way valve system that releases air out of the handle when you press in and creates a suction through the mask when you pull.",
  },
  {
    question: "Can I return it?",
    answer:
      "If within 30 of receiving your package, you are not satisfied with your purchase, you may return it for a full refund.",
  },
  {
    question: "How is this better than traditional methods?",
    answer:
      "Traditional methods can work. However, they are only proven to work between 50-78% of the time. They have also caused serious injury and even death through broken ribs collapsing lungs.",
  },
];

const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#D9E9F0] py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0c1d3c] mb-10">
          FAQS
        </h2>

        <div className="space-y-3 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow-sm overflow-hidden transition"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-[#0c1d3c] focus:outline-none"
              >
                <span>{faq.question}</span>
                <span className="text-2xl font-bold">
                  {openIndex === index ? "–" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-4 text-sm text-[#0c1d3c] border-t border-gray-200 leading-relaxed">
                  {isHTML(faq.answer) ? (
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
