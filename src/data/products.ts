export interface Product {
  id: string;
  name: string;
  category: string;
  buyPrice: number;
  sellPrice: number;
  description: string;
  images: string[];
  supplier: string;
}

export const products: Product[] = [
  // --- SMART HOME (15 produktov) ---
  {
    id: "sh-001",
    name: "Inteligentný LED pásik WiFi RGB 5m",
    category: "Smart Home",
    buyPrice: 12.50,
    sellPrice: 29.90,
    description: "Vytvorte si dokonalú atmosféru v každej miestnosti. Tento 5-metrový smart LED pásik podporuje 16 miliónov farieb, synchronizáciu s hudbou a ovládanie hlasom cez Alexa alebo Google Assistant. Ideálne pre obývačku, spálňu alebo herný kútik.",
    images: [
      "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-002",
    name: "Smart Bezpečnostná WiFi Kamera 360° s Nočným Videním 1080p",
    category: "Smart Home",
    buyPrice: 22.00,
    sellPrice: 49.90,
    description: "Majte svoj domov pod kontrolou nech ste kdekoľvek. 360-stupňová rotácia, detekcia pohybu a obojsmerné audio zaručia maximálnu bezpečnosť. Skvelá voľba na monitorovanie domácich miláčikov alebo vchodu.",
    images: [
      "https://images.unsplash.com/photo-1557862921-37829c790f19?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-003",
    name: "Inteligentná WiFi Zásuvka s Meraním Spotreby Energie",
    category: "Smart Home",
    buyPrice: 8.90,
    sellPrice: 19.90,
    description: "Šetrite energiu a čas! Ovládajte svoje domáce spotrebiče na diaľku priamo zo smartfónu. Zásuvka zároveň monitoruje spotrebu elektriny, takže presne viete, koľko vás stojí prevádzka spotrebičov.",
    images: [
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595754592036-7e1451f1540a?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-004",
    name: "Smart Robotický Vysávač s Mopom a Laserovou Navigáciou",
    category: "Smart Home",
    buyPrice: 145.00,
    sellPrice: 299.00,
    description: "Zabudnite na upratovanie! Robotický vysávač 2v1 presne zmapuje váš byt pomocou laseru a inteligentne povysáva aj zmyje podlahy. Ovládanie cez appku s možnosťou nastavenia zakázaných zón.",
    images: [
      "https://images.unsplash.com/photo-1518314919323-82de293f9102?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-005",
    name: "Inteligentný Zvlhčovač Vzduchu a Aróma Difuzér s WiFi",
    category: "Smart Home",
    buyPrice: 25.00,
    sellPrice: 59.90,
    description: "Zlepšite kvalitu vzduchu u vás doma. Smart aróma difuzér zvlhčí vzduch a prevonia ho vašimi obľúbenými esenciálnymi olejmi. Nastavte si plán fungovania priamo z mobilu.",
    images: [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-006",
    name: "Smart WiFi Termostat pre Podlahové Kúrenie s Dotykovým Displejom",
    category: "Smart Home",
    buyPrice: 35.00,
    sellPrice: 89.90,
    description: "Moderný sklenený termostat pre dokonalú kontrolu teploty vo vašom dome. Vďaka aplikácii môžete kúrenie zapnúť ešte predtým, než dorazíte domov. Šetrí až 20% nákladov na vykurovanie.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1622838320000-d830dd580e0c?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-007",
    name: "Inteligentná LED Žiarovka E27 RGB CCT Dimmable",
    category: "Smart Home",
    buyPrice: 6.50,
    sellPrice: 14.90,
    description: "Nahraďte obyčajné žiarovky za tieto inteligentné! Meňte farbu, teplotu bielej a jas podľa nálady. Ideálne pre vytvorenie relaxačnej aj pracovnej atmosféry. Bez nutnosti špeciálneho hubu.",
    images: [
      "https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517420784867-10d7a524dbf6?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-008",
    name: "Bezdrôtový Smart Zvonček s Kamerou a Interkomom",
    category: "Smart Home",
    buyPrice: 45.00,
    sellPrice: 99.00,
    description: "Vždy viete, kto stojí za dverami. Smart zvonček vám pošle notifikáciu na mobil a umožní vám obojsmernú komunikáciu s kuriérom či návštevou v HD kvalite, aj keď nie ste doma.",
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-009",
    name: "Smart Meteorologická Stanica WiFi s Vonkajším Senzorom",
    category: "Smart Home",
    buyPrice: 28.00,
    sellPrice: 69.90,
    description: "Sledujte presné údaje o počasí priamo z vášho dvora. Teplota, vlhkosť, predpoveď a dokonca aj fázy mesiaca prehľadne na veľkom farebnom displeji a vo vašom smartfóne.",
    images: [
      "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504253163759-c23fccaedd24?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-010",
    name: "Inteligentný Zámok na Dvere na Odtlačok Prsta a PIN",
    category: "Smart Home",
    buyPrice: 75.00,
    sellPrice: 159.00,
    description: "Koniec hľadania kľúčov. Otvorte dvere jednoducho odtlačkom prsta, zadaním kódu alebo cez mobilnú aplikáciu. Dokonalé pre rodiny a Airbnb hostiteľov.",
    images: [
      "https://images.unsplash.com/photo-1507208773393-40090c1b318a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-011",
    name: "Inteligentný Ovládač Klimatizácie a IR Zariadení",
    category: "Smart Home",
    buyPrice: 15.00,
    sellPrice: 34.90,
    description: "Zmeňte svoj starý televízor a klimatizáciu na smart zariadenia! Tento IR hub nahrádza všetky diaľkové ovládače vo vašej obývačke. Ovládajte všetko z jedného miesta.",
    images: [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-012",
    name: "Smart Otvárač Garážových Brán s Notifikáciami",
    category: "Smart Home",
    buyPrice: 22.00,
    sellPrice: 55.00,
    description: "Nikdy sa už nevracajte s pochybnosťami, či ste zavreli garáž. Skontrolujte a ovládajte svoju bránu na diaľku. Kompatibilné s väčšinou motorov.",
    images: [
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-013",
    name: "Senzor Úniku Vody a Zaplavenia s WiFi Alarmom",
    category: "Smart Home",
    buyPrice: 12.00,
    sellPrice: 25.90,
    description: "Chráňte svoju domácnosť pred vytopením. Tento malý nenápadný senzor umiestnite pod práčku alebo umývadlo. V prípade úniku vody vás okamžite upozorní sirénou a notifikáciou v mobile.",
    images: [
      "https://images.unsplash.com/photo-1542013936693-8848e574047a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-014",
    name: "Inteligentný Senzor Dverí a Okien pre Zabezpečenie",
    category: "Smart Home",
    buyPrice: 9.50,
    sellPrice: 19.90,
    description: "Majte prehľad o tom, kedy sa otvoria dvere alebo okná vo vašom dome. Vytvárajte automatizácie - napríklad automatické zapnutie svetla pri otvorení dverí.",
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "sh-015",
    name: "Smart RGB Hexagonové Nástenné Panely (Sada 6ks)",
    category: "Smart Home",
    buyPrice: 38.00,
    sellPrice: 89.00,
    description: "Vytvorte si na stene vlastné umelecké dielo! Hexagonové panely svietia pestrými farbami, reagujú na zvuk a dajú sa poskladať do ľubovoľných tvarov. Moderný dizajnový prvok.",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },

  // --- OSVETLENIE (15 produktov) ---
  {
    id: "lt-001",
    name: "Dizajnová Stojaca Lampa v Škandinávskom Štýle (Čierna/Drevo)",
    category: "Osvetlenie",
    buyPrice: 45.00,
    sellPrice: 119.00,
    description: "Minimalistická elegancia pre vašu obývačku. Táto stojaca lampa kombinuje kvalitný kov a prírodné drevo. Poskytuje príjemné čítacie svetlo a zároveň funguje ako nádherný doplnok.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-002",
    name: "Závesný Industriálny Luster do Kuchyne a Jedálne",
    category: "Osvetlenie",
    buyPrice: 32.00,
    sellPrice: 79.90,
    description: "Dodajte svojej jedálni industriálny nádych. Luster z čierneho matného kovu vyzerá skvele s vintage edison žiarovkami. Výborný nad jedálenský stôl alebo kuchynský ostrovček.",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543248939-ff40856f65d4?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-003",
    name: "Moderné LED Stropné Svietidlo s Diaľkovým Ovládaním",
    category: "Osvetlenie",
    buyPrice: 55.00,
    sellPrice: 129.00,
    description: "Futuristické stropné svietidlo s možnosťou stmievania a zmeny teploty farby (od teplej žltej po studenú bielu). Čistý kruhový dizajn, ktorý sa hodí do moderných bytov.",
    images: [
      "https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-004",
    name: "Stolná Lampa Moon s Bezdrôtovým Nabíjaním pre Smartfóny",
    category: "Osvetlenie",
    buyPrice: 28.00,
    sellPrice: 65.00,
    description: "Krásna a praktická! Stolná lampa do spálne alebo kancelárie. Nielenže poskytuje jemné, neoslňujúce svetlo, ale v základni skrýva rýchlu bezdrôtovú nabíjačku pre váš telefón.",
    images: [
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-005",
    name: "Solárne Vonkajšie LED Osvetlenie do Záhrady (4ks)",
    category: "Osvetlenie",
    buyPrice: 18.00,
    sellPrice: 42.90,
    description: "Rozžiarte svoje záhradné cestičky bez káblov! Sada štyroch elegantných solárnych lámp z nehrdzavejúcej ocele. Automatické zapnutie po zotmení a výdrž svietenia až 8 hodín.",
    images: [
      "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-006",
    name: "Minimalistické Nástenné LED Svietidlo 'Línea'",
    category: "Osvetlenie",
    buyPrice: 24.00,
    sellPrice: 59.00,
    description: "Dlhé lineárne nástenné svietidlo, ktoré oživí prázdne steny na chodbách alebo v obývačke. Vyžaruje príjemné, rozptýlené svetlo z oboch strán (Up&Down efekt).",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-007",
    name: "Dizajnová Lávová Lampa XXL - 60cm",
    category: "Osvetlenie",
    buyPrice: 29.00,
    sellPrice: 69.90,
    description: "Návrat do retro štýlu v modernom kabáte! Obrovská 60-centimetrová lávová lampa prinesie do vášho interiéru fascinujúcu a relaxačnú atmosféru vďaka pomaly sa pohybujúcemu vosku.",
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-008",
    name: "LED Neónový Nápis 'Good Vibes' do Interiéru",
    category: "Osvetlenie",
    buyPrice: 19.00,
    sellPrice: 45.00,
    description: "Oživte svoj herný kútik, bar alebo spálňu! Energeticky úsporný LED neónový nápis svieti jasným a sýtym svetlom. Skvelý fotogenický prvok pre instagramové interiéry.",
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-009",
    name: "Luxusný Krištáľový Luster Glamour Style",
    category: "Osvetlenie",
    buyPrice: 110.00,
    sellPrice: 249.00,
    description: "Kúsok skutočného luxusu. Luster zdobený vysoko kvalitnými brúsenými sklenenými kryštálmi, ktoré nádherne lámu svetlo. Stredobod pozornosti pre každú prestížnu obývačku.",
    images: [
      "https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-010",
    name: "Zrkadlo do Kúpeľne s Integrovaným LED Osvetlením",
    category: "Osvetlenie",
    buyPrice: 85.00,
    sellPrice: 199.00,
    description: "Moderné okrúhle zrkadlo s dotykovým ovládaním osvetlenia a inovatívnou funkciou odhmlievania, takže po teplej sprche na seba ihneď uvidíte. Perfektný kúsok pre prémiovú kúpeľňu.",
    images: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-011",
    name: "Bambusová Závesná Lampa Boho Chic",
    category: "Osvetlenie",
    buyPrice: 38.00,
    sellPrice: 85.00,
    description: "Vneste do svojho domova teplo prírody. Ručne pletená bambusová lampa v boho štýle vytvára nádherné svetelné vzory na stenách. Ideálna pre spálňu, terasu alebo zimnú záhradu.",
    images: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-012",
    name: "Bodové Svetlo Zápustné - Matná Čierna (Balenie 6ks)",
    category: "Osvetlenie",
    buyPrice: 25.00,
    sellPrice: 59.90,
    description: "Nenápadné, no vysoko efektívne. Sada 6 kusov čiernych bodových svetiel na zapustenie do sadrokartónu. Výklopný mechanizmus umožňuje nasmerovať svetlo tam, kam potrebujete.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-013",
    name: "Knižná LED Lampa - Rozkladacia Dekoratívna",
    category: "Osvetlenie",
    buyPrice: 22.00,
    sellPrice: 49.00,
    description: "Zatvorená vyzerá ako drevená kniha, po otvorení sa rozsvieti teplým a útulným svetlom! Unikátny a prekvapivý dizajnový kúsok, ktorý si môžete zobrať všade so sebou vďaka batérii.",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-014",
    name: "Vonkajší Nástenný LED Reflektor s Pohybovým Senzorom",
    category: "Osvetlenie",
    buyPrice: 16.50,
    sellPrice: 38.90,
    description: "Silné osvetlenie pre vašu príjazdovú cestu alebo záhradu. Spoľahlivý pohybový senzor šetrí energiu a zaisťuje bezpečnosť okolo vášho domu. Vodeodolnosť IP65.",
    images: [
      "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "lt-015",
    name: "Projektor Hviezdnej Oblohy a Galaxie s Reproduktorom",
    category: "Osvetlenie",
    buyPrice: 30.00,
    sellPrice: 69.90,
    description: "Transformujte svoju izbu na vesmírnu galaxiu. Projektor premieta pohyblivú nočnú oblohu a hmloviny. Navyše obsahuje Bluetooth reproduktor na prehrávanie upokojujúcej hudby.",
    images: [
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },

  // --- BYTOVÉ DOPLNKY (20 produktov) ---
  {
    id: "hd-001",
    name: "Moderný Geometrický Koberec s Nízkym Vlasom 160x230cm",
    category: "Bytové doplnky",
    buyPrice: 45.00,
    sellPrice: 119.00,
    description: "Vneste do obývačky teplo a štýl! Tento veľký abstraktný koberec s geometrickými vzormi je mimoriadne mäkký, ľahko sa čistí a vďaka spodnej protišmykovej vrstve zostáva pevne na mieste.",
    images: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-002",
    name: "Sada 3ks Minimalistických Keramických Váz",
    category: "Bytové doplnky",
    buyPrice: 18.00,
    sellPrice: 45.00,
    description: "Krása v jednoduchosti. Tri keramické vázy s matným povrchom a rôznych výškach (čierna, biela, béžová). Dokonale vyniknú s pampovou trávou alebo sušenými kvetmi.",
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-003",
    name: "Veľké Okrúhle Nástenné Zrkadlo so Zlatým Rámom 80cm",
    category: "Bytové doplnky",
    buyPrice: 55.00,
    sellPrice: 139.00,
    description: "Opticky zväčšite a presvetlite svoj priestor. Elegantné okrúhle zrkadlo s tenkým matným zlatým rámom. Must-have kúsok nad komodu, do predsiene alebo do modernej kúpeľne.",
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-004",
    name: "Mäkká Pletená Deka Chunky Knit 120x150cm (Sivá)",
    category: "Bytové doplnky",
    buyPrice: 35.00,
    sellPrice: 85.00,
    description: "Zababušte sa do neuveriteľného pohodlia. Hrubo pletená 'Chunky' deka z priadze je momentálne obrovským hitom. Slúži nielen na zahriatie, ale aj ako štýlový prehoz na posteľ či gauč.",
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-005",
    name: "Dizajnové Nástenné Hodiny 'Silent Black' 50cm",
    category: "Bytové doplnky",
    buyPrice: 24.00,
    sellPrice: 59.90,
    description: "Veľké kovové nástenné hodiny v industriálnom štýle. Vďaka tichému chodu strojčeka bez tikania sú vhodné aj do spálne. Dokonalá ozdoba prázdnej steny.",
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdab1e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-006",
    name: "Bavlnené Dekoračné Vankúše Boho s Brmbolcami (2ks)",
    category: "Bytové doplnky",
    buyPrice: 15.00,
    sellPrice: 38.00,
    description: "Drobný detail, veľká zmena. Sada dvoch bavlnených obliečok na vankúše v štýle Boho s textúrou a makramé prvkami. Pridajú vašej sedačke ten správny útulný šmrnc.",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-007",
    name: "Luxusný Zlatý Príborník - 24-dielna Sada z Nerezovej Ocele",
    category: "Bytové doplnky",
    buyPrice: 32.00,
    sellPrice: 79.90,
    description: "Pozdvihnite vaše stolovanie na novú úroveň! Táto 24-dielna sada príborov vo farbe brúseného zlata dodá každej večeri sviatočný nádych. Balené v elegantnej krabičke.",
    images: [
      "/luxury-gold-cutlery.png",
      "https://images.unsplash.com/photo-1594756297462-809aa2483677?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-008",
    name: "Ultrazvukový Aróma Difuzér 'Imitácia Dreva' 400ml",
    category: "Bytové doplnky",
    buyPrice: 19.00,
    sellPrice: 45.00,
    description: "Krásny drevený dizajn a tichá prevádzka. Difuzér zvlhčí vzduch, prevonia miestnosť a jeho jemné LED podsvietenie (7 farieb) pôsobí veľmi relaxačne. Automatické vypnutie.",
    images: [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-009",
    name: "Dizajnový Kovový Stojan na Víno (Geometrický tvar)",
    category: "Bytové doplnky",
    buyPrice: 14.00,
    sellPrice: 34.90,
    description: "Prezentujte svoju zbierku vín štýlovo. Minimalistický čierny kovový stojan v tvare včelích plástov pojme až 6 fliaš. Skvelý doplnok do jedálne alebo na kuchynskú linku.",
    images: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-010",
    name: "Makramé Závesná Dekorácia na Stenu",
    category: "Bytové doplnky",
    buyPrice: 18.00,
    sellPrice: 42.00,
    description: "Oživte prázdne steny kúskom prírody. Ručne pletené makramé z čistej bavlny na drevenej tyči vnáša do priestoru pocit harmónie a zjemňuje celkový vzhľad izby.",
    images: [
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-011",
    name: "Elegantný Podnos na Dekoratívne Predmety (Mramor/Zlato)",
    category: "Bytové doplnky",
    buyPrice: 22.00,
    sellPrice: 55.00,
    description: "Zorganizujte svoje parfumy, šperky alebo sviečky. Podnos s mramorovým vzorom a zlatými držadlami vyzerá extrémne luxusne na každom toaletnom alebo konferenčnom stolíku.",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-012",
    name: "Sada Luxusných Vonných Sviečok v Skle (Sójový vosk)",
    category: "Bytové doplnky",
    buyPrice: 16.00,
    sellPrice: 39.90,
    description: "Vytvorte si domáce SPA. 100% prírodný sójový vosk horí dlhšie a čistejšie. Nádherné vône santalového dreva a vanilky v elegantných sklenených dózach.",
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-013",
    name: "Skladací Úložný Kôš z Morskej Trávy s Uškami",
    category: "Bytové doplnky",
    buyPrice: 12.00,
    sellPrice: 28.00,
    description: "Praktický a krásny zároveň. Prírodný kôš z morskej trávy je ideálny ako štýlový obal na izbové rastliny, úložný priestor na deky alebo hračky.",
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-014",
    name: "Levitujúci Globus s LED Podsvietením",
    category: "Bytové doplnky",
    buyPrice: 25.00,
    sellPrice: 65.00,
    description: "Fascinujúci doplnok na pracovný stôl! Vďaka magnetickému poľu glóbus skutočne levituje a neustále sa točí vo vzduchu. Skvelý high-tech darček.",
    images: [
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-015",
    name: "Kovová Nástenná Mapa Sveta - Čierna (120x80cm)",
    category: "Bytové doplnky",
    buyPrice: 65.00,
    sellPrice: 149.00,
    description: "Pre vášnivých cestovateľov! Veľká, laserom vyrezávaná kovová mapa sveta vytvára nádherný 3D efekt. Dominantný prvok, ktorý upúta pozornosť každej návštevy.",
    images: [
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-016",
    name: "Drevený Podnos do Vane / na Postel (Rozťahovací)",
    category: "Bytové doplnky",
    buyPrice: 22.00,
    sellPrice: 55.00,
    description: "Užite si dokonalý relax! Vodoodolný bambusový podnos s držiakom na pohár vína, tablet či knihu. Ideálny na dlhé zimné večery vo vani alebo raňajky do postele.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-017",
    name: "Stojan na Kvety v Štýle Loft (Čierny Kov a Drevo)",
    category: "Bytové doplnky",
    buyPrice: 28.00,
    sellPrice: 69.00,
    description: "Doprajte svojim rastlinám priestor, kde vyniknú. Viacúrovňový stojan v populárnom industriálnom dizajne poskytuje miesto pre 4 až 6 kvetináčov a oživí každý kút.",
    images: [
      "https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-018",
    name: "Dizajnový Odkladací Stolík s Mramorovou Doskou",
    category: "Bytové doplnky",
    buyPrice: 42.00,
    sellPrice: 99.00,
    description: "Malý, ale výrazný. Príručný stolík k sedačke so zlatou kovovou konštrukciou a pravou mramorovou doskou. Perfektný na odloženie kávy či obľúbenej knihy.",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-019",
    name: "Anatomický Vankúš z Pamäťovej Peny pre Kvalitný Spánok",
    category: "Bytové doplnky",
    buyPrice: 25.00,
    sellPrice: 59.90,
    description: "Prebuďte sa svieži a bez bolesti krku. Tento vankúš z kvalitnej pamäťovej peny sa prispôsobí krivkám vašej chrbtice a poskytuje optimálnu podporu hlavy a krku.",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1632128799344-3a44817a26ee?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  },
  {
    id: "hd-020",
    name: "Nástenný Držiak na Kľúče s Organizérom na Poštu (Drevo)",
    category: "Bytové doplnky",
    buyPrice: 15.00,
    sellPrice: 35.00,
    description: "Skoncujte s večným hľadaním kľúčov. Rustikálny drevený organizér s háčikmi na kľúče a priehradkou na došlú poštu či okuliare udrží vo vašej predsieni dokonalý poriadok.",
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80"
    ],
    supplier: "BigBuy"
  }
];
