// src/data/offersData.js

const offers = [
    {
        id: "offer1",
        image: "https://cdn.shopify.com/s/files/1/0638/0378/5380/files/Kaching-Bundles-Adult_Mask_3_300x300.svg?v=1737985220",
        sectionTitle: "LifeVac™ - Anti-Choking Device",
        title: "Buy Home Kit",
        kits: "1x Home Kit",
        price: 59.99,
        originalPrice: 79.99,
        oneItemPrice: 59.99,
        oneItemOriginalPrice: 79.99,
        savings: 20.00,
        guideIncluded: false,
        tag: true,
        tagText: "BEST VALUE",
        bestSeller: false, // Mark which one is the default for "Take Action"
    },
    {
        id: "offer2",
        image: "https://cdn.shopify.com/s/files/1/0638/0378/5380/files/Kaching-Bundles-Adult_Mask_2_300x300.svg?v=1737985180",
        sectionTitle: "LifeVac™ - Anti-Choking Device",
        title: "Buy Home + Travel Kit",
        kits: "1x Home + Travel Kit",
        price: 119.99,
        originalPrice: 159.99,
        oneItemPrice: 119.99,
        oneItemOriginalPrice: 159.99,
        savings: 40,
        guideIncluded: false,
        tag: true,
        tagText: "MOST POPULAR",
        bestSeller: true, // This will be added to the cart by the "Take Action" button
    },
    {
        id: "offer3",
        image: "https://cdn.shopify.com/s/files/1/0638/0378/5380/files/Kaching-Bundles-Adult_Mask_4_300x300.svg?v=1737985322",
        sectionTitle: "LifeVac™ - Anti-Choking Device",
        title: "Buy Travel Kit",
        kits: "1x Travel Kit",
        price: 63.99,
        originalPrice: 79.99,
        oneItemPrice: 63.99,
        oneItemOriginalPrice: 79.99,
        savings: 16.00,
        guideIncluded: false,
        tag: true,
        tagText: "BEST VALUE",
        bestSeller: false,
    },
];

export default offers;