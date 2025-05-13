import Marquee from 'react-fast-marquee';

const MarqueeBar = () => {
    const messages = [
        "Sale Ends At Midnight",
        "Easy Returns",
        "Based In The U.S.",
        "Loved By 100,000+ Customers",
    ];

    // Duplicate content to simulate infinite scrolling
    const repeatedMessages = Array(10).fill(messages).flat();

    return (
        <div className="bg-[#162950] text-[#fdfbf7] py-4">
            <Marquee gradient={false} speed={50} pauseOnHover={true}>
                <ul className="flex gap-10 text-base font-semibold">
                    {repeatedMessages.map((msg, index) => (
                        <li key={index} className="whitespace-nowrap px-6">{msg}</li>
                    ))}
                </ul>
            </Marquee>
        </div>
    );
};

export default MarqueeBar;
