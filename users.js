const bcrypt = require("bcryptjs");

let users = [
  {
    // restaurrant one details start here
    id: 0,
    username: "test1",
    email: "test1@email",
    password: "test1",
    phone: ["+91 999 9999 999", "+91 999 9999 999", "+91 999 9999 999"],
    social: {
      fb: "https://www.facebook.com",
      insta: "https://www.instagram.com",
      twitter: "https://www.twitter.com",
    },
    upi: "1234@oksbi",
  },
];

// $2a$10$yHLGBzUzES5InsEnY8umHOUb4O2SvNfqfMWZrqEEK1t49.BRMcOBe

bcrypt.genSalt(10, (err, salt) => {
  if (err) throw err;
  bcrypt.hash(users[0].password, salt, (err, hash) => {
    if (err) throw err;
    users[0].password = hash;
    // console.log("hashed pswrd: ", users[0].password);
  });
});

let menu = [
  {
    id: 0,
    categories: [
      {
        id: 0,
        name: "breakfast",
        timeFrom: "7:00 am",
        timeTo: "11:30 pm",
        subCategories: [
          {
            id: 0,
            name: "drinks",
            dishes: [
              {
                id: 0,
                title: "milk shake",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: false,
                veg: true,
                jainAvailable: true,
              },
              {
                id: 1,
                title: "milk shake",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: false,
                veg: true,
                jainAvailable: true,
              },
              {
                id: 2,
                title: "milk shake",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: true,
                veg: true,
                jainAvailable: true,
              },
            ],
          },
          {
            id: 1,
            name: "omelets",
            dishes: [
              {
                id: 0,
                title: "the abigail adams",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: false,
                veg: true,
                jainAvailable: true,
              },
              {
                id: 1,
                title: "the abigail adams",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: false,
                veg: true,
                jainAvailable: true,
              },
              {
                id: 2,
                title: "the abigail adams",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: true,
                veg: true,
                jainAvailable: true,
              },
            ],
          },
        ],
      },
      {
        id: 1,
        name: "brunch",
        timeFrom: "11:30 am",
        timeTo: "1:30 pm",
        subCategories: [
          {
            id: 0,
            name: "pancakes",
            dishes: [
              {
                id: 0,
                title: "the betsy ross",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: false,
                veg: true,
                jainAvailable: true,
              },
              {
                id: 1,
                title: "the betsy ross",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: true,
                veg: true,
                jainAvailable: true,
              },
              {
                id: 2,
                title: "the betsy ross",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: false,
                veg: true,
                jainAvailable: true,
              },
            ],
          },
          {
            id: 1,
            name: "pancakes",
            dishes: [
              {
                id: 0,
                title: "the betsy ross",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: false,
                veg: true,
                jainAvailable: true,
              },
              {
                id: 1,
                title: "the betsy ross",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: true,
                veg: true,
                jainAvailable: true,
              },
              {
                id: 2,
                title: "the betsy ross",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: false,
                veg: true,
                jainAvailable: true,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "lunch",
        timeFrom: "1:30 pm",
        timeTo: "4:00 pm",
        subCategories: [
          {
            id: 0,
            name: "pancakes",
            dishes: [
              {
                id: 0,
                title: "the betsy ross",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: true,
                veg: true,
                jainAvailable: true,
              },
              {
                id: 1,
                title: "the betsy ross",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: false,
                veg: true,
                jainAvailable: true,
              },
              {
                id: 2,
                title: "the betsy ross",
                priceHalf: "₹",
                priceFull: "₹₹",
                desc: "with whipped creame and mocha",
                spicy: false,
                veg: true,
                jainAvailable: true,
              },
            ],
          },
        ],
      },
    ],
  },
];

let customerReviews = [
  // customer-reviews starts from here
  {
    id: 0,
    reviews: [
      {
        id: 0,
        date: "5 Nov 2020",
        time: "5:00 pm",
        name: "Raj",
        email: "raj@email",
        phone: "+91 999 9999 999",
        message:
          "Nice food, needs more choice for menu. Needs to have more waiters.",
      },
      {
        id: 1,
        date: "5 Nov 2020",
        time: "5:00 pm",
        name: "Arun",
        email: "arun@email",
        phone: "+91 999 9999 999",
        message:
          "Food served was nice and in very less time. Booking a reservation should be more easy.",
      },
      {
        id: 2,
        date: "5 Nov 2020",
        time: "5:00 pm",
        name: "Sumita",
        email: "sumita@email",
        phone: "+91 999 9999 999",
        message: "Good food",
      },
    ],
  },
];

module.exports = { users, menu, customerReviews };
