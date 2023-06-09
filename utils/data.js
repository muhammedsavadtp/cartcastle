import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "savad",
      email: "savad@gmail.com",
      password:bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "shanu",
      email: "shanu@gmail.com",
      password:bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      id: 1,
      name: "t-Shirt",
      slug: "fit—shirt",
      category: "Shirts",
      image:
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/520899/01/mod01/fnd/IND/fmt/png/PUMA-Short-Sleeves-Men's-Training-T-Shirt",
      price: 1199,
      brand: "puma",
      rating: 5,
      numReviews: 20,
      countInStock: 5,
      description: "A popular shirt • ",
    },
    {
      id: 2,
      name: " Short-Sleeve Top",
      slug: "free—shirt",
      category: "Shirts",
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6905ffea-adf0-4696-b17d-8309085fe80d/sportswear-circa-french-terry-short-sleeve-top-Qzs4b9.png",
      price: 1399,
      brand: "Nike",
      rating: 3.5,
      numReviews: 7,
      countInStock: 25,
      description: "A popular shirt • ",
    },
    {
      id: 3,
      name: "Free Shirt",
      slug: "slim—shirt",
      category: "Shirts",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/22f3609fae8a4232bb2dafb600b34e1e_9366/Club_Tennis_Tee_Orange_HY4031_25_model.jpg",
      price: 1299,
      brand: "adidas",
      rating: 4.7,
      numReviews: 9,
      countInStock: 10,
      description: "A popular shirt • ",
    },
    {
      id: 4,
      name: "nike pants",
      slug: "golf—pant",
      category: "pants",
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d164da21-1d3a-4fc1-875e-06288e806b15/jordan-flight-chicago-trousers-TJ3k7Q.png",
      price: 2999,
      brand: "nike",
      rating: 4.7,
      numReviews: 9,
      countInStock: 10,
      description: "A popular shirt • ",
    },
    {
      id: 5,
      name: "adidas ",
      slug: "slim—fit",
      category: "pants",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ed155d38c10940f79cc3add0011f3291_9366/Sportswear_Fleece_Pants_Brown_HP1894_21_model.jpg",
      price: 2799,
      brand: "adidas",
      rating: 4.7,
      numReviews: 9,
      countInStock: 10,
      description: "A popular shirt • ",
    },
  ],
};

export default data;