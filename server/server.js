import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import fetch from 'node-fetch';

const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
  .use(logger())
  .use('/', sirv(process.env.NODE_ENV === 'development' ? 'client' : 'dist'));


// Home route
// base weapons
app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/base_weapons.json');
    const steamData = await response.json();
    const disabledWeapons = ['C4 Explosive', 'Default CT Gloves', 'Default T Gloves', 'Medi-Shot', 'High Explosive Grenade', 'Flashbang', 'Decoy Grenade', 'Incendiary Grenade', 'Molotov', 'Smoke Grenade'];
    const items = Object.values(steamData).filter(item => !disabledWeapons.includes(item.name)).slice(0, 100); // neem eerste 20

    // console.log(items);

    const html = await renderTemplate('server/views/index.liquid', {
      title: 'Counter Strike Weapons',
      items
    });

    return res.send(html);
  } catch (err) {
    console.error('Fout bij ophalen van base weapons:', err);
    return res.status(500).send('Er is iets misgegaan.');
  }
});


// weapon category
app.get('/weapon/:weaponName', async (req, res) => {
  const weaponName = decodeURIComponent(req.params.weaponName);

  try {
    const response = await fetch('https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json');
    const allSkins = await response.json();

    console.log(weaponName);


    // Filter skins die beginnen met bv. "AK-47 |"
    const matchingSkins = Object.values(allSkins).filter(skin =>
      skin.name.includes(`${weaponName} |`)
    ).slice(0, 20); // neem max 10

    const html = await renderTemplate('server/views/weapon.liquid', {
      title: weaponName,
      weapon: weaponName,
      skins: matchingSkins
    });

    return res.send(html);
  } catch (err) {
    console.error('Fout bij ophalen van skins:', err);
    return res.status(500).send('Er is iets misgegaan.');
  }
});

// skin showcase
app.get('/skin/:skinName', async (req, res) => {
  const skinName = decodeURIComponent(req.params.skinName);

  try {
    const response = await fetch('https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json');
    const allSkins = await response.json();

    const skin = Object.values(allSkins).find(s =>
      s.name.toLowerCase() === skinName.toLowerCase()
    );

    if (!skin) {
      return res.status(404).send('Skin niet gevonden');
    }

    const html = await renderTemplate('server/views/skin.liquid', {
      title: skin.name,
      skin
    });

    return res.send(html);
  } catch (err) {
    console.error('Fout bij ophalen van skin:', err);
    return res.status(500).send('Er is iets misgegaan.');
  }
});


// Render functie
const renderTemplate = async (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return await engine.renderFile(template, templateData);
};

// Start server
app.listen(3000, () => console.log('Server available on http://localhost:3000'));
