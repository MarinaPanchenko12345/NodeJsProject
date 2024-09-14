export const initialData = {
  users: [
    {
      name: {
        first: "regular",
        middle: "",
        last: "user",
      },
      isBusiness: false,
      phone: "050-0000000",
      email: "regular@gmail.com",
      password: "Aa123456!",
      address: {
        state: "",
        country: "Israel",
        city: "tel-aviv",
        street: "magnive",
        houseNumber: "5",
      },
      image: {
        url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
        alt: "user image",
      },
    },
    {
      name: {
        first: "business",
        middle: "",
        last: "user",
      },
      isBusiness: true,
      phone: "050-0000000",
      email: "business061@gmail.com",
      password: "Ab123456!",
      address: {
        state: "",
        country: "Israel",
        city: "tel-aviv",
        street: "magnive",
        houseNumber: "5",
      },
      image: {
        url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
        alt: "user image",
      },
    },
    {
      name: {
        first: "admin",
        middle: "",
        last: "user",
      },
      isBusiness: true,
      isAdmin: true,
      phone: "050-0000000",
      email: "admin061@gmail.com",
      password: "Abc!123Abc",
      address: {
        state: "",
        country: "Israel",
        city: "tel-aviv",
        street: "magnive",
        houseNumber: "5",
      },
      image: {
        url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
        alt: "user image",
      },
    },
  ],
  cards: [
    {
      title: "first card",
      subtitle: "this is the first card",
      description: "this is the first card in the database",
      phone: "050-0000000",
      email: "firstCard@gmail.com",
      web: "https://www.test.co.il",
      image: {
        url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
        alt: "card image",
      },
      address: {
        state: "",
        country: "test",
        city: "test",
        street: "test",
        houseNumber: 3,
        zip: "0",
      },
      bizNumber: Math.floor(1000000 + Math.random() * 9000000),
    },
    {
      title: "second card",
      subtitle: "this is the second card",
      description: "this is the second card in the database",
      phone: "050-0000000",
      email: "secondCard@gmail.com",
      web: "https://www.test.co.il",
      image: {
        url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
        alt: "card image",
      },
      address: {
        state: "",
        country: "test",
        city: "test",
        street: "test",
        houseNumber: 3,
        zip: "0",
      },
      bizNumber: Math.floor(1000000 + Math.random() * 9000000),
    },
    {
      title: "third card",
      subtitle: "this is the third card",
      description: "this is the third card in the database",
      phone: "050-0000000",
      email: "thirdCard@gmail.com",
      web: "https://www.test.co.il",
      image: {
        url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
        alt: "card image",
      },
      address: {
        state: "",
        country: "test",
        city: "test",
        street: "test",
        houseNumber: 3,
        zip: "0",
      },
      bizNumber: Math.floor(1000000 + Math.random() * 9000000),
    },
  ],
};
