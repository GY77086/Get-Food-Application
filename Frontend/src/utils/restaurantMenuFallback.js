const itemCard = (id, name, description, price, imageId, isVeg = true, rating = "4.4") => ({
  card: {
    info: {
      id,
      name,
      description,
      defaultPrice: price * 100,
      imageId,
      isVeg: isVeg ? 1 : 0,
      inStock: 1,
      ratings: { aggregatedRating: { rating } },
      ribbon: Number(rating) >= 4.5 ? { text: "Bestseller" } : {},
    },
  },
});

const category = (title, items) => ({
  card: {
    card: {
      "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
      title,
      itemCards: items,
    },
  },
});

export const createRestaurantMenuFallback = (restaurant = {}, restaurantId) => {
  const id = String(restaurant.id || restaurantId || "restaurant");
  const name = restaurant.name || "Specialty Restaurant";
  const cuisines = restaurant.cuisines?.length ? restaurant.cuisines : ["Multi-Cuisine"];
  const primaryCuisine = cuisines[0] || "Specialty";
  const costForTwoMessage = restaurant.costForTwoMessage || restaurant.costForTwo || "₹350 for two";
  const imageId = restaurant.cloudinaryImageId || "";
  const areaName = restaurant.areaName || restaurant.locality || "Local Dining Hub";
  const avgRating = String(restaurant.avgRating || "4.3");
  const totalRatingsString = restaurant.totalRatingsString || "1K+ ratings";

  const lowerName = name.toLowerCase();
  const lowerCuisine = cuisines.join(" ").toLowerCase();

  let categories = [];

  if (lowerName.includes("biryani") || lowerCuisine.includes("biryani") || lowerCuisine.includes("mughlai")) {
    categories = [
      category("Signature Biryanis", [
        itemCard(`${id}-b1`, `${name} Special Dum Biryani`, "Slow-cooked aromatic basmati rice infused with secret spices and tender paneer/chicken.", 329, imageId, false, "4.7"),
        itemCard(`${id}-b2`, "Hyderabadi Paneer Dum Biryani", "Layered fragrant rice with marinated cottage cheese, saffron & caramelized onions.", 289, imageId, true, "4.5"),
        itemCard(`${id}-b3`, "Lucknowi Subz Biryani", "Mildly spiced royal vegetable biryani served with chilled burani raita.", 249, imageId, true, "4.3"),
      ]),
      category("Kebabs & Starters", [
        itemCard(`${id}-k1`, "Galouti Kebab Platter", "Melt-in-mouth spiced kebab patties served with mint chutney and laccha onion.", 299, imageId, false, "4.6"),
        itemCard(`${id}-k2`, "Paneer Tikka Angara", "Chargrilled cottage cheese cubes coated in fiery tandoori marinade.", 269, imageId, true, "4.4"),
      ]),
      category("Breads & Sides", [
        itemCard(`${id}-s1`, "Butter Garlic Naan", "Freshly baked tandoori naan brushed with rich garlic butter.", 69, imageId, true, "4.5"),
        itemCard(`${id}-s2`, "Mirchi Ka Salan & Raita", "Traditional peanut-sesame chili gravy served alongside spiced curd.", 89, imageId, true, "4.2"),
      ]),
      category("Desserts & Beverages", [
        itemCard(`${id}-d1`, "Royal Shahi Tukda", "Crisp fried bread soaked in saffron rabri and topped with nuts.", 119, imageId, true, "4.8"),
        itemCard(`${id}-d2`, "Chilled Gulab Jamun (2 Pcs)", "Soft khoya dumplings soaked in warm cardamom syrup.", 79, imageId, true, "4.6"),
      ]),
    ];
  } else if (lowerName.includes("wok") || lowerName.includes("chinese") || lowerCuisine.includes("chinese") || lowerCuisine.includes("asian")) {
    categories = [
      category("Wok Boxes & Bowls", [
        itemCard(`${id}-c1`, `${name} Schezwan Fried Rice Box`, "Wok-tossed long-grain rice with crunchy vegetables & house Schezwan sauce.", 239, imageId, true, "4.6"),
        itemCard(`${id}-c2`, "Chili Garlic Hakka Noodles", "Classic stir-fried noodles tossed with bell peppers, garlic & scallions.", 219, imageId, true, "4.5"),
        itemCard(`${id}-c3`, "Kung Pao Paneer Gravy", "Cottage cheese cubes tossed in sweet & spicy soy gravy with roasted peanuts.", 279, imageId, true, "4.4"),
      ]),
      category("Dim Sums & Momos", [
        itemCard(`${id}-m1`, "Steamed Veg Darjeeling Momos (6 Pcs)", "Thin wrapper dumplings stuffed with finely minced vegetables & herbs.", 159, imageId, true, "4.6"),
        itemCard(`${id}-m2`, "Pan-Fried Schezwan Momos (6 Pcs)", "Crispy momos tossed in spicy Schezwan garlic sauce.", 189, imageId, true, "4.7"),
      ]),
      category("Starters & Soups", [
        itemCard(`${id}-st1`, "Crispy Chili Potato", "Fried potato fingers glazed in honey-chili garlic sauce.", 179, imageId, true, "4.5"),
        itemCard(`${id}-st2`, "Hot & Sour Veg Soup", "Thick spicy soup loaded with black fungus, bamboo shoots & tofu.", 129, imageId, true, "4.3"),
      ]),
      category("Beverages", [
        itemCard(`${id}-bv1`, "Iced Peach Boba Tea", "Refreshing chilled tea with peach syrup and popping boba pearls.", 149, imageId, true, "4.7"),
      ]),
    ];
  } else if (lowerName.includes("bake") || lowerName.includes("cake") || lowerCuisine.includes("bakery") || lowerCuisine.includes("dessert")) {
    categories = [
      category("Celebration Cakes", [
        itemCard(`${id}-bk1`, `${name} Signature Chocolate Truffle Cake (500g)`, "Decadent Dutch chocolate sponge layered with rich dark chocolate ganache.", 549, imageId, true, "4.8"),
        itemCard(`${id}-bk2`, "Red Velvet Cream Cheese Cake (500g)", "Moist red velvet layers infused with vanilla and smooth cream cheese frosting.", 599, imageId, true, "4.7"),
      ]),
      category("Pastries & Jar Cakes", [
        itemCard(`${id}-p1`, "Belgian Chocolate Mousse Pastry", "Silky smooth Belgian chocolate mousse on a crunchy biscuit base.", 149, imageId, true, "4.6"),
        itemCard(`${id}-p2`, "Blueberry Cheesecake Jar", "Layered graham cracker crust, cream cheese & sweet blueberry compote.", 179, imageId, true, "4.8"),
      ]),
      category("Shakes & Beverages", [
        itemCard(`${id}-sk1`, "Nutella Hazelnut Thick Shake", "Rich blend of Nutella, vanilla ice cream and roasted hazelnuts.", 199, imageId, true, "4.7"),
      ]),
    ];
  } else {
    categories = [
      category("Chef's Recommended", [
        itemCard(`${id}-r1`, `${name} Signature Special Thali`, `House specialty crafted by head chef of ${name}. Includes Paneer Butter Masala, Dal Makhani, Jeera Rice & Naan.`, 299, imageId, true, "4.6"),
        itemCard(`${id}-r2`, "Paneer Butter Masala & Naan Combo", "Rich tomato cashewnut gravy with soft paneer cubes, served with 2 Butter Naans.", 259, imageId, true, "4.5"),
        itemCard(`${id}-r3`, `Special ${primaryCuisine} Platter`, `Assorted delicious platter featuring top choices from ${primaryCuisine}.`, 349, imageId, true, "4.4"),
      ]),
      category("Quick Bites & Starters", [
        itemCard(`${id}-qb1`, "Crispy Paneer Kurkure", "Panko-crusted cottage cheese fingers served with spicy mayo dip.", 199, imageId, true, "4.5"),
        itemCard(`${id}-qb2`, "Stuffed Dahi Ke Kebab", "Golden-fried hung curd patties flavored with cardamom and coriander.", 219, imageId, true, "4.6"),
      ]),
      category("Main Course & Breads", [
        itemCard(`${id}-mc1`, "Dal Makhani (Special)", "Slow-cooked black lentils simmered overnight with white butter & cream.", 229, imageId, true, "4.7"),
        itemCard(`${id}-mc2`, "Stuffed Amritsari Kulcha", "Crisp tandoori bread stuffed with spiced potatoes & paneer.", 79, imageId, true, "4.4"),
      ]),
      category("Beverages & Desserts", [
        itemCard(`${id}-dr1`, "Special Mango Lassi", "Thick churned yogurt drink flavoured with Alphonso mango pulp.", 99, imageId, true, "4.6"),
        itemCard(`${id}-dr2`, "Hot Gulab Jamun", "2 golden fried khoya balls served warm in sugar syrup.", 69, imageId, true, "4.5"),
      ]),
    ];
  }

  return {
    data: {
      cards: [
        {
          card: {
            card: {
              "@type": "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
              info: {
                id,
                name,
                cuisines,
                costForTwoMessage,
                avgRating,
                totalRatingsString,
                areaName,
                cloudinaryImageId: imageId,
              },
            },
          },
        },
        {
          groupedCard: {
            cardGroupMap: {
              REGULAR: {
                cards: categories,
              },
            },
          },
        },
      ],
    },
  };
};
