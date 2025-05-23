import "dotenv/config";
import { App } from "@tinyhttp/app";
import { logger } from "@tinyhttp/logger";
import { Liquid } from "liquidjs";
import sirv from "sirv";
import fetch from "node-fetch";
import { LocalStorage } from "node-localstorage";
import { urlencoded } from "milliparsec";

const localStorage = new LocalStorage("./wishlist-data"); // map waar data wordt opgeslagen

const engine = new Liquid({
  extname: ".liquid",
});

const app = new App();
// nodig voor wishlist
app.use(urlencoded());

app
  .use(logger())
  .use("/", sirv(process.env.NODE_ENV === "development" ? "client" : "dist"));

// wishlist POST route

app.post("/wishlist", (req, res) => {
  const { name, image } = req.body;
  const wishlist = JSON.parse(localStorage.getItem("skinWishlist") || "[]");

  const exists = wishlist.find((item) => item.name === name);
  if (!exists) {
    wishlist.push({ name, image });
    localStorage.setItem("skinWishlist", JSON.stringify(wishlist));
  }

  res.redirect("/wishlist");
});

//wishlist clear route
app.post("/wishlist/clear", (req, res) => {
  localStorage.setItem("skinWishlist", "[]");
  res.redirect("/wishlist");
});

// wishlist remove item route
app.post("/wishlist/remove", (req, res) => {
  const { name } = req.body;
  let wishlist = JSON.parse(localStorage.getItem("skinWishlist") || "[]");

  wishlist = wishlist.filter((item) => item.name !== name); // verwijder item met die naam

  localStorage.setItem("skinWishlist", JSON.stringify(wishlist));

  res.redirect("/wishlist");
});

// Home route
// base weapons
app.get("/", async (req, res) => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/base_weapons.json"
    );
    const steamData = await response.json();

    // wapens die niet gedisplayed horen te worden
    const disabledWeapons = [
      "C4 Explosive",
      "Default CT Gloves",
      "Default T Gloves",
      "Medi-Shot",
      "High Explosive Grenade",
      "Flashbang",
      "Decoy Grenade",
      "Incendiary Grenade",
      "Molotov",
      "Smoke Grenade",
      "Knife",
    ];

    //categories voor filteren van base wapens
    const riflesCategory = [
      "FAMAS",
      "Galil AR",
      "M4A4",
      "M4A1-S",
      "AK-47",
      "SG 553",
      "SSG 08",
      "AUG",
      "AWP",
      "SCAR-20",
      "G3SG1",
    ];

    const pistolsCategory = [
      "USP-S",
      "P2000",
      "Glock-18",
      "Dual Berettas",
      "P250",
      "Five-SeveN",
      "Tec-9",
      "CZ75-Auto",
      "Desert Eagle",
      "R8 Revolver",
    ];

    const heavyCategory = [
      "Nova",
      "XM1014",
      "Sawed-Off",
      "MAG-7",
      "M249",
      "Negev",
    ];

    const submachineCategory = [
      "MP9",
      "MAC-10",
      "MP7",
      "UMP-45",
      "P90",
      "PP-Bizon",
      "MP5-SD",
    ];

    const knivesCategory = [
      "Bayonet",
      "Butterfly Knife",
      "Survival Knife",
      "Paracord Knife",
      "Classic Knife",
      "Falchion Knife",
      "Flip Knife",
      "Gut Knife",
      "Navaja Knife",
      "Karambit",
      "Kukri Knife",
      "M9 Bayonet",
      "Nomad Knife",
      "Shadow Daggers",
      "Skeleton Knife",
      "Stiletto Knife",
      "Bowie Knife",
      "Huntsman Knife",
      "Urus Knife",
      "Talon Knife",
    ];

    const categoryMap = {
      rifles: riflesCategory,
      pistols: pistolsCategory,
      heavy: heavyCategory,
      submachine: submachineCategory,
      knives: knivesCategory,
    };

    // Zet geselecteerde categorieën om naar array
    let selectedCategories = req.query.category || [];

    if (!Array.isArray(selectedCategories)) {
      selectedCategories = [selectedCategories];
    }

    // Alles laden + niet-toonbare wapens verwijderen
    let allWeapons = Object.values(steamData).filter(
      (item) => !disabledWeapons.includes(item.name)
    );

    if (selectedCategories.length > 0) {
      const allowedWeapons = selectedCategories.flatMap(
        (cat) => categoryMap[cat] || []
      );
      allWeapons = allWeapons.filter((item) =>
        allowedWeapons.includes(item.name)
      );
    }

    // items = items.slice(0, 100);

    const html = await renderTemplate("server/views/index.liquid", {
      title: "Search and find your skins! FindMySkins",
      items: allWeapons.slice(0, 100),
      categoriesSelected: selectedCategories,
    });

    return res.send(html);
  } catch (err) {
    console.error("Fout bij ophalen van base weapons:", err);
    return res.status(500).send("Er is iets misgegaan.");
  }
});

// weapon category
app.get("/weapon/:weaponName", async (req, res) => {
  const weaponName = decodeURIComponent(req.params.weaponName);

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json"
    );
    const allSkins = await response.json();

    console.log(weaponName);

    // Filter skins die beginnen met bv. "AK-47 |"
    const matchingSkins = Object.values(allSkins)
      .filter((skin) => skin.name.includes(`${weaponName} |`))
      .slice(0, 20); // neem max 10

    const html = await renderTemplate("server/views/weapon.liquid", {
      title: weaponName,
      weapon: weaponName,
      skins: matchingSkins,
    });

    return res.send(html);
  } catch (err) {
    console.error("Fout bij ophalen van skins:", err);
    return res.status(500).send("Er is iets misgegaan.");
  }
});

// skin showcase
app.get("/skin/:skinName", async (req, res) => {
  const skinName = decodeURIComponent(req.params.skinName);

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json"
    );
    const allSkins = await response.json();

    const skin = Object.values(allSkins).find(
      (s) => s.name.toLowerCase() === skinName.toLowerCase()
    );

    if (!skin) {
      return res.status(404).send("Skin niet gevonden");
    }

    const html = await renderTemplate("server/views/skin.liquid", {
      title: skin.name,
      skin,
    });

    return res.send(html);
  } catch (err) {
    console.error("Fout bij ophalen van skin:", err);
    return res.status(500).send("Er is iets misgegaan.");
  }
});

// wishlist route
app.get("/wishlist", async (req, res) => {
  const wishlist = JSON.parse(localStorage.getItem("skinWishlist") || "[]");

  const html = await renderTemplate("server/views/wishlist.liquid", {
    title: "Mijn Wishlist",
    wishlist,
  });

  return res.send(html);
});

// Render functie
const renderTemplate = async (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || "production",
    ...data,
  };

  return await engine.renderFile(template, templateData);
};

// Start server
app.listen(3000, () =>
  console.log("Server available on http://localhost:3000")
);
