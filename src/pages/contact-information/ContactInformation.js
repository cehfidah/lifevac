import SEO from "../../utils/SEO";

const ContactInformation = () => {
  return (
    <>
      <SEO
        title="Contact Information - AirwayClear"
        description="Official AirwayClear contact details including email addresses, phone numbers, and office location."
        keywords="AirwayClear support, contact details, customer service"
        ogTitle="AirwayClear Contact Details"
        ogDescription="Reach AirwayClear via phone, email, or in person."
        twitterTitle="Contact Info - AirwayClear"
        twitterDescription="Official AirwayClear communication channels."
      />

      <div className="max-w-xl mx-auto px-4 py-10 text-lg text-[#162950] leading-relaxed">
        <h1 className="text-4xl font-bold text-center mb-8">
          Contact information
        </h1>
        <p className="mb-1">Trade name: airwayclear.us</p>
        <p className="mb-6">Email: info@airwayclear.us</p>
      </div>
    </>
  );
};

export default ContactInformation;
