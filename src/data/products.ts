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
    name: "Inteligentný LED pásik WiFi s hlasovým ovládaním RGB 5m",
    category: "Smart Home",
    buyPrice: 12.50,
    sellPrice: 29.90,
    description: "Vytvorte si dokonalú atmosféru v každej miestnosti. Tento 5-metrový smart LED pásik podporuje 16 miliónov farieb, synchronizáciu s hudbou a ovládanie hlasom cez Alexa alebo Google Assistant. Ideálne pre obývačku, spálňu alebo herný kútik.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Smart+LED+Pásik", "https://placehold.co/600x600/f8f9fa/333333?text=LED+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "sh-002",
    name: "Smart Bezpečnostná WiFi Kamera 360° s Nočným Videním 1080p",
    category: "Smart Home",
    buyPrice: 22.00,
    sellPrice: 49.90,
    description: "Majte svoj domov pod kontrolou nech ste kdekoľvek. 360-stupňová rotácia, detekcia pohybu a obojsmerné audio zaručia maximálnu bezpečnosť. Skvelá voľba na monitorovanie domácich miláčikov alebo vchodu.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=WiFi+Kamera", "https://placehold.co/600x600/f8f9fa/333333?text=Kamera+Nočné+videnie"],
    supplier: "BigBuy"
  },
  {
    id: "sh-003",
    name: "Inteligentná WiFi Zásuvka s Meraním Spotreby Energie",
    category: "Smart Home",
    buyPrice: 8.90,
    sellPrice: 19.90,
    description: "Šetrite energiu a čas! Ovládajte svoje domáce spotrebiče na diaľku priamo zo smartfónu. Zásuvka zároveň monitoruje spotrebu elektriny, takže presne viete, koľko vás stojí prevádzka spotrebičov.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Smart+Zásuvka", "https://placehold.co/600x600/f8f9fa/333333?text=Zásuvka+App"],
    supplier: "BigBuy"
  },
  {
    id: "sh-004",
    name: "Smart Robotický Vysávač s Mopom a Laserovou Navigáciou",
    category: "Smart Home",
    buyPrice: 145.00,
    sellPrice: 299.00,
    description: "Zabudnite na upratovanie! Robotický vysávač 2v1 presne zmapuje váš byt pomocou laseru a inteligentne povysáva aj zmyje podlahy. Ovládanie cez appku s možnosťou nastavenia zakázaných zón.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Robotický+Vysávač", "https://placehold.co/600x600/f8f9fa/333333?text=Vysávač+Mop"],
    supplier: "BigBuy"
  },
  {
    id: "sh-005",
    name: "Inteligentný Zvlhčovač Vzduchu a Aróma Difuzér s WiFi",
    category: "Smart Home",
    buyPrice: 25.00,
    sellPrice: 59.90,
    description: "Zlepšite kvalitu vzduchu u vás doma. Smart aróma difuzér zvlhčí vzduch a prevonia ho vašimi obľúbenými esenciálnymi olejmi. Nastavte si plán fungovania priamo z mobilu.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Smart+Difuzér", "https://placehold.co/600x600/f8f9fa/333333?text=Difuzér+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "sh-006",
    name: "Smart WiFi Termostat pre Podlahové Kúrenie s Dotykovým Displejom",
    category: "Smart Home",
    buyPrice: 35.00,
    sellPrice: 89.90,
    description: "Moderný sklenený termostat pre dokonalú kontrolu teploty vo vašom dome. Vďaka aplikácii môžete kúrenie zapnúť ešte predtým, než dorazíte domov. Šetrí až 20% nákladov na vykurovanie.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Smart+Termostat", "https://placehold.co/600x600/f8f9fa/333333?text=Termostat+Displej"],
    supplier: "BigBuy"
  },
  {
    id: "sh-007",
    name: "Inteligentná LED Žiarovka E27 RGB CCT Dimmable",
    category: "Smart Home",
    buyPrice: 6.50,
    sellPrice: 14.90,
    description: "Nahraďte obyčajné žiarovky za tieto inteligentné! Meňte farbu, teplotu bielej a jas podľa nálady. Ideálne pre vytvorenie relaxačnej aj pracovnej atmosféry. Bez nutnosti špeciálneho hubu.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Smart+Žiarovka", "https://placehold.co/600x600/f8f9fa/333333?text=Žiarovka+Farby"],
    supplier: "BigBuy"
  },
  {
    id: "sh-008",
    name: "Bezdrôtový Smart Zvonček s Kamerou a Interkomom",
    category: "Smart Home",
    buyPrice: 45.00,
    sellPrice: 99.00,
    description: "Vždy viete, kto stojí za dverami. Smart zvonček vám pošle notifikáciu na mobil a umožní vám obojsmernú komunikáciu s kuriérom či návštevou v HD kvalite, aj keď nie ste doma.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Smart+Zvonček", "https://placehold.co/600x600/f8f9fa/333333?text=Zvonček+Kamera"],
    supplier: "BigBuy"
  },
  {
    id: "sh-009",
    name: "Smart Meteorologická Stanica WiFi s Vonkajším Senzorom",
    category: "Smart Home",
    buyPrice: 28.00,
    sellPrice: 69.90,
    description: "Sledujte presné údaje o počasí priamo z vášho dvora. Teplota, vlhkosť, predpoveď a dokonca aj fázy mesiaca prehľadne na veľkom farebnom displeji a vo vašom smartfóne.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Meteo+Stanica", "https://placehold.co/600x600/f8f9fa/333333?text=Stanica+Senzor"],
    supplier: "BigBuy"
  },
  {
    id: "sh-010",
    name: "Inteligentný Zámok na Dvere na Odtlačok Prsta a PIN",
    category: "Smart Home",
    buyPrice: 75.00,
    sellPrice: 159.00,
    description: "Koniec hľadania kľúčov. Otvorte dvere jednoducho odtlačkom prsta, zadaním kódu alebo cez mobilnú aplikáciu. Dokonalé pre rodiny a Airbnb hostiteľov.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Smart+Zámok", "https://placehold.co/600x600/f8f9fa/333333?text=Zámok+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "sh-011",
    name: "Inteligentný Ovládač Klimatizácie a IR Zariadení",
    category: "Smart Home",
    buyPrice: 15.00,
    sellPrice: 34.90,
    description: "Zmeňte svoj starý televízor a klimatizáciu na smart zariadenia! Tento IR hub nahrádza všetky diaľkové ovládače vo vašej obývačke. Ovládajte všetko z jedného miesta.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=IR+Ovládač", "https://placehold.co/600x600/f8f9fa/333333?text=Ovládač+Klima"],
    supplier: "BigBuy"
  },
  {
    id: "sh-012",
    name: "Smart Otvárač Garážových Brán s Notifikáciami",
    category: "Smart Home",
    buyPrice: 22.00,
    sellPrice: 55.00,
    description: "Nikdy sa už nevracajte s pochybnosťami, či ste zavreli garáž. Skontrolujte a ovládajte svoju bránu na diaľku. Kompatibilné s väčšinou motorov.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Smart+Garáž", "https://placehold.co/600x600/f8f9fa/333333?text=Garáž+Senzor"],
    supplier: "BigBuy"
  },
  {
    id: "sh-013",
    name: "Senzor Úniku Vody a Zaplavenia s WiFi Alarmom",
    category: "Smart Home",
    buyPrice: 12.00,
    sellPrice: 25.90,
    description: "Chráňte svoju domácnosť pred vytopením. Tento malý nenápadný senzor umiestnite pod práčku alebo umývadlo. V prípade úniku vody vás okamžite upozorní sirénou a notifikáciou v mobile.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Senzor+Vody", "https://placehold.co/600x600/f8f9fa/333333?text=Senzor+Alarm"],
    supplier: "BigBuy"
  },
  {
    id: "sh-014",
    name: "Inteligentný Senzor Dverí a Okien pre Zabezpečenie",
    category: "Smart Home",
    buyPrice: 9.50,
    sellPrice: 19.90,
    description: "Majte prehľad o tom, kedy sa otvoria dvere alebo okná vo vašom dome. Vytvárajte automatizácie - napríklad automatické zapnutie svetla pri otvorení dverí.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Senzor+Dverí", "https://placehold.co/600x600/f8f9fa/333333?text=Senzor+Okná"],
    supplier: "BigBuy"
  },
  {
    id: "sh-015",
    name: "Smart RGB Hexagonové Nástenné Panely (Sada 6ks)",
    category: "Smart Home",
    buyPrice: 38.00,
    sellPrice: 89.00,
    description: "Vytvorte si na stene vlastné umelecké dielo! Hexagonové panely svietia pestrými farbami, reagujú na zvuk a dajú sa poskladať do ľubovoľných tvarov. Moderný dizajnový prvok.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Hexagon+Panely", "https://placehold.co/600x600/f8f9fa/333333?text=Hexagon+Stena"],
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
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Stojaca+Lampa", "https://placehold.co/600x600/f8f9fa/333333?text=Lampa+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "lt-002",
    name: "Závesný Industriálny Luster do Kuchyne a Jedálne",
    category: "Osvetlenie",
    buyPrice: 32.00,
    sellPrice: 79.90,
    description: "Dodajte svojej jedálni industriálny nádych. Luster z čierneho matného kovu vyzerá skvele s vintage edison žiarovkami. Výborný nad jedálenský stôl alebo kuchynský ostrovček.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Závesný+Luster", "https://placehold.co/600x600/f8f9fa/333333?text=Luster+Nad+Stolom"],
    supplier: "BigBuy"
  },
  {
    id: "lt-003",
    name: "Moderné LED Stropné Svietidlo s Diaľkovým Ovládaním",
    category: "Osvetlenie",
    buyPrice: 55.00,
    sellPrice: 129.00,
    description: "Futuristické stropné svietidlo s možnosťou stmievania a zmeny teploty farby (od teplej žltej po studenú bielu). Čistý kruhový dizajn, ktorý sa hodí do moderných bytov.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=LED+Stropné", "https://placehold.co/600x600/f8f9fa/333333?text=LED+Diaľkové"],
    supplier: "BigBuy"
  },
  {
    id: "lt-004",
    name: "Stolná Lampa Moon s Bezdrôtovým Nabíjaním pre Smartfóny",
    category: "Osvetlenie",
    buyPrice: 28.00,
    sellPrice: 65.00,
    description: "Krásna a praktická! Stolná lampa do spálne alebo kancelárie. Nielenže poskytuje jemné, neoslňujúce svetlo, ale v základni skrýva rýchlu bezdrôtovú nabíjačku pre váš telefón.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Stolná+Lampa", "https://placehold.co/600x600/f8f9fa/333333?text=Lampa+Nabíjačka"],
    supplier: "BigBuy"
  },
  {
    id: "lt-005",
    name: "Solárne Vonkajšie LED Osvetlenie do Záhrady (4ks)",
    category: "Osvetlenie",
    buyPrice: 18.00,
    sellPrice: 42.90,
    description: "Rozžiarte svoje záhradné cestičky bez káblov! Sada štyroch elegantných solárnych lámp z nehrdzavejúcej ocele. Automatické zapnutie po zotmení a výdrž svietenia až 8 hodín.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Solárne+Svetlá", "https://placehold.co/600x600/f8f9fa/333333?text=Svetlá+Záhrada"],
    supplier: "BigBuy"
  },
  {
    id: "lt-006",
    name: "Minimalistické Nástenné LED Svietidlo 'Línea'",
    category: "Osvetlenie",
    buyPrice: 24.00,
    sellPrice: 59.00,
    description: "Dlhé lineárne nástenné svietidlo, ktoré oživí prázdne steny na chodbách alebo v obývačke. Vyžaruje príjemné, rozptýlené svetlo z oboch strán (Up&Down efekt).",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Nástenné+Svetlo", "https://placehold.co/600x600/f8f9fa/333333?text=Svetlo+Stena"],
    supplier: "BigBuy"
  },
  {
    id: "lt-007",
    name: "Dizajnová Lávová Lampa XXL - 60cm",
    category: "Osvetlenie",
    buyPrice: 29.00,
    sellPrice: 69.90,
    description: "Návrat do retro štýlu v modernom kabáte! Obrovská 60-centimetrová lávová lampa prinesie do vášho interiéru fascinujúcu a relaxačnú atmosféru vďaka pomaly sa pohybujúcemu vosku.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Lávová+Lampa", "https://placehold.co/600x600/f8f9fa/333333?text=Lampa+Vosk"],
    supplier: "BigBuy"
  },
  {
    id: "lt-008",
    name: "LED Neónový Nápis 'Good Vibes' do Interiéru",
    category: "Osvetlenie",
    buyPrice: 19.00,
    sellPrice: 45.00,
    description: "Oživte svoj herný kútik, bar alebo spálňu! Energeticky úsporný LED neónový nápis svieti jasným a sýtym svetlom. Skvelý fotogenický prvok pre instagramové interiéry.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Neónový+Nápis", "https://placehold.co/600x600/f8f9fa/333333?text=Nápis+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "lt-009",
    name: "Luxusný Krištáľový Luster Glamour Style",
    category: "Osvetlenie",
    buyPrice: 110.00,
    sellPrice: 249.00,
    description: "Kúsok skutočného luxusu. Luster zdobený vysoko kvalitnými brúsenými sklenenými kryštálmi, ktoré nádherne lámu svetlo. Stredobod pozornosti pre každú prestížnu obývačku.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Krištáľový+Luster", "https://placehold.co/600x600/f8f9fa/333333?text=Luster+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "lt-010",
    name: "Zrkadlo do Kúpeľne s Integrovaným LED Osvetlením a Odhmlievaním",
    category: "Osvetlenie",
    buyPrice: 85.00,
    sellPrice: 199.00,
    description: "Moderné okrúhle zrkadlo s dotykovým ovládaním osvetlenia a inovatívnou funkciou odhmlievania, takže po teplej sprche na seba ihneď uvidíte. Perfektný kúsok pre prémiovú kúpeľňu.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=LED+Zrkadlo", "https://placehold.co/600x600/f8f9fa/333333?text=Zrkadlo+Odhmlievanie"],
    supplier: "BigBuy"
  },
  {
    id: "lt-011",
    name: "Bambusová Závesná Lampa Boho Chic",
    category: "Osvetlenie",
    buyPrice: 38.00,
    sellPrice: 85.00,
    description: "Vneste do svojho domova teplo prírody. Ručne pletená bambusová lampa v boho štýle vytvára nádherné svetelné vzory na stenách. Ideálna pre spálňu, terasu alebo zimnú záhradu.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Bambusová+Lampa", "https://placehold.co/600x600/f8f9fa/333333?text=Lampa+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "lt-012",
    name: "Bodové Svetlo Zápustné - Matná Čierna (Balenie 6ks)",
    category: "Osvetlenie",
    buyPrice: 25.00,
    sellPrice: 59.90,
    description: "Nenápadné, no vysoko efektívne. Sada 6 kusov čiernych bodových svetiel na zapustenie do sadrokartónu. Výklopný mechanizmus umožňuje nasmerovať svetlo tam, kam potrebujete.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Bodové+Svetlo", "https://placehold.co/600x600/f8f9fa/333333?text=Bodovky+Strop"],
    supplier: "BigBuy"
  },
  {
    id: "lt-013",
    name: "Knižná LED Lampa - Rozkladacia Dekoratívna",
    category: "Osvetlenie",
    buyPrice: 22.00,
    sellPrice: 49.00,
    description: "Zatvorená vyzerá ako drevená kniha, po otvorení sa rozsvieti teplým a útulným svetlom! Unikátny a prekvapivý dizajnový kúsok, ktorý si môžete zobrať všade so sebou vďaka batérii.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Knižná+Lampa", "https://placehold.co/600x600/f8f9fa/333333?text=Kniha+Otvorená"],
    supplier: "BigBuy"
  },
  {
    id: "lt-014",
    name: "Vonkajší Nástenný LED Reflektor s Pohybovým Senzorom",
    category: "Osvetlenie",
    buyPrice: 16.50,
    sellPrice: 38.90,
    description: "Silné osvetlenie pre vašu príjazdovú cestu alebo záhradu. Spoľahlivý pohybový senzor šetrí energiu a zaisťuje bezpečnosť okolo vášho domu. Vodeodolnosť IP65.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Senzorový+Reflektor", "https://placehold.co/600x600/f8f9fa/333333?text=Reflektor+Vonku"],
    supplier: "BigBuy"
  },
  {
    id: "lt-015",
    name: "Projektor Hviezdnej Oblohy a Galaxie s Reproduktorom",
    category: "Osvetlenie",
    buyPrice: 30.00,
    sellPrice: 69.90,
    description: "Transformujte svoju izbu na vesmírnu galaxiu. Projektor premieta pohyblivú nočnú oblohu a hmloviny. Navyše obsahuje Bluetooth reproduktor na prehrávanie upokojujúcej hudby.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Projektor+Oblohy", "https://placehold.co/600x600/f8f9fa/333333?text=Galaxia+Stena"],
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
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Geometrický+Koberec", "https://placehold.co/600x600/f8f9fa/333333?text=Koberec+Vzor"],
    supplier: "BigBuy"
  },
  {
    id: "hd-002",
    name: "Sada 3ks Minimalistických Keramických Váz",
    category: "Bytové doplnky",
    buyPrice: 18.00,
    sellPrice: 45.00,
    description: "Krása v jednoduchosti. Tri keramické vázy s matným povrchom a rôznych výškach (čierna, biela, béžová). Dokonale vyniknú s pampovou trávou alebo sušenými kvetmi.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Keramické+Vázy", "https://placehold.co/600x600/f8f9fa/333333?text=Vázy+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "hd-003",
    name: "Veľké Okrúhle Nástenné Zrkadlo so Zlatým Rámom 80cm",
    category: "Bytové doplnky",
    buyPrice: 55.00,
    sellPrice: 139.00,
    description: "Opticky zväčšite a presvetlite svoj priestor. Elegantné okrúhle zrkadlo s tenkým matným zlatým rámom. Must-have kúsok nad komodu, do predsiene alebo do modernej kúpeľne.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Okrúhle+Zrkadlo", "https://placehold.co/600x600/f8f9fa/333333?text=Zrkadlo+Rám"],
    supplier: "BigBuy"
  },
  {
    id: "hd-004",
    name: "Mäkká Pletená Deka Chunky Knit 120x150cm (Sivá)",
    category: "Bytové doplnky",
    buyPrice: 35.00,
    sellPrice: 85.00,
    description: "Zababušte sa do neuveriteľného pohodlia. Hrubo pletená 'Chunky' deka z priadze je momentálne obrovským hitom. Slúži nielen na zahriatie, ale aj ako štýlový prehoz na posteľ či gauč.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Chunky+Deka", "https://placehold.co/600x600/f8f9fa/333333?text=Deka+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "hd-005",
    name: "Dizajnové Nástenné Hodiny 'Silent Black' 50cm",
    category: "Bytové doplnky",
    buyPrice: 24.00,
    sellPrice: 59.90,
    description: "Veľké kovové nástenné hodiny v industriálnom štýle. Vďaka tichému chodu strojčeka bez tikania sú vhodné aj do spálne. Dokonalá ozdoba prázdnej steny.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Nástenné+Hodiny", "https://placehold.co/600x600/f8f9fa/333333?text=Hodiny+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "hd-006",
    name: "Bavlnené Dekoračné Vankúše Boho s Brmbolcami (2ks)",
    category: "Bytové doplnky",
    buyPrice: 15.00,
    sellPrice: 38.00,
    description: "Drobný detail, veľká zmena. Sada dvoch bavlnených obliečok na vankúše v štýle Boho s textúrou a makramé prvkami. Pridajú vašej sedačke ten správny útulný šmrnc.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Boho+Vankúše", "https://placehold.co/600x600/f8f9fa/333333?text=Vankúše+Textúra"],
    supplier: "BigBuy"
  },
  {
    id: "hd-007",
    name: "Luxusný Zlatý Príborník - 24-dielna Sada z Nerezovej Ocele",
    category: "Bytové doplnky",
    buyPrice: 32.00,
    sellPrice: 79.90,
    description: "Pozdvihnite vaše stolovanie na novú úroveň! Táto 24-dielna sada príborov vo farbe brúseného zlata dodá každej večeri sviatočný nádych. Balené v elegantnej krabičke.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Zlatý+Príbor", "https://placehold.co/600x600/f8f9fa/333333?text=Príbor+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "hd-008",
    name: "Ultrazvukový Aróma Difuzér 'Imitácia Dreva' 400ml",
    category: "Bytové doplnky",
    buyPrice: 19.00,
    sellPrice: 45.00,
    description: "Krásny drevený dizajn a tichá prevádzka. Difuzér zvlhčí vzduch, prevonia miestnosť a jeho jemné LED podsvietenie (7 farieb) pôsobí veľmi relaxačne. Automatické vypnutie.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Drevený+Difuzér", "https://placehold.co/600x600/f8f9fa/333333?text=Difuzér+Svetlo"],
    supplier: "BigBuy"
  },
  {
    id: "hd-009",
    name: "Dizajnový Kovový Stojan na Víno (Geometrický tvar)",
    category: "Bytové doplnky",
    buyPrice: 14.00,
    sellPrice: 34.90,
    description: "Prezentujte svoju zbierku vín štýlovo. Minimalistický čierny kovový stojan v tvare včelích plástov pojme až 6 fliaš. Skvelý doplnok do jedálne alebo na kuchynskú linku.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Stojan+Na+Víno", "https://placehold.co/600x600/f8f9fa/333333?text=Stojan+Fľaše"],
    supplier: "BigBuy"
  },
  {
    id: "hd-010",
    name: "Makramé Závesná Dekorácia na Stenu",
    category: "Bytové doplnky",
    buyPrice: 18.00,
    sellPrice: 42.00,
    description: "Oživte prázdne steny kúskom prírody. Ručne pletené makramé z čistej bavlny na drevenej tyči vnáša do priestoru pocit harmónie a zjemňuje celkový vzhľad izby.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Makramé+Stena", "https://placehold.co/600x600/f8f9fa/333333?text=Makramé+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "hd-011",
    name: "Elegantný Podnos na Dekoratívne Predmety (Mramor/Zlato)",
    category: "Bytové doplnky",
    buyPrice: 22.00,
    sellPrice: 55.00,
    description: "Zorganizujte svoje parfumy, šperky alebo sviečky. Podnos s mramorovým vzorom a zlatými držadlami vyzerá extrémne luxusne na každom toaletnom alebo konferenčnom stolíku.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Mramorový+Podnos", "https://placehold.co/600x600/f8f9fa/333333?text=Podnos+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "hd-012",
    name: "Sada Luxusných Vonných Sviečok v Skle (Sójový vosk)",
    category: "Bytové doplnky",
    buyPrice: 16.00,
    sellPrice: 39.90,
    description: "Vytvorte si domáce SPA. 100% prírodný sójový vosk horí dlhšie a čistejšie. Nádherné vône santalového dreva a vanilky v elegantných sklenených dózach.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Vonné+Sviečky", "https://placehold.co/600x600/f8f9fa/333333?text=Sviečka+Sklo"],
    supplier: "BigBuy"
  },
  {
    id: "hd-013",
    name: "Skladací Úložný Kôš z Morskej Trávy s Uškami",
    category: "Bytové doplnky",
    buyPrice: 12.00,
    sellPrice: 28.00,
    description: "Praktický a krásny zároveň. Prírodný kôš z morskej trávy je ideálny ako štýlový obal na izbové rastliny, úložný priestor na deky alebo hračky.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Kôš+Morská+Tráva", "https://placehold.co/600x600/f8f9fa/333333?text=Kôš+Rastlina"],
    supplier: "BigBuy"
  },
  {
    id: "hd-014",
    name: "Levitujúci Globus s LED Podsvietením",
    category: "Bytové doplnky",
    buyPrice: 25.00,
    sellPrice: 65.00,
    description: "Fascinujúci doplnok na pracovný stôl! Vďaka magnetickému poľu glóbus skutočne levituje a neustále sa točí vo vzduchu. Skvelý high-tech darček.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Levitujúci+Globus", "https://placehold.co/600x600/f8f9fa/333333?text=Globus+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "hd-015",
    name: "Kovová Nástenná Mapa Sveta - Čierna (120x80cm)",
    category: "Bytové doplnky",
    buyPrice: 65.00,
    sellPrice: 149.00,
    description: "Pre vášnivých cestovateľov! Veľká, laserom vyrezávaná kovová mapa sveta vytvára nádherný 3D efekt. Dominantný prvok, ktorý upúta pozornosť každej návštevy.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Kovová+Mapa", "https://placehold.co/600x600/f8f9fa/333333?text=Mapa+Stena"],
    supplier: "BigBuy"
  },
  {
    id: "hd-016",
    name: "Drevený Podnos do Vane / na Postel (Rozťahovací)",
    category: "Bytové doplnky",
    buyPrice: 22.00,
    sellPrice: 55.00,
    description: "Užite si dokonalý relax! Vodoodolný bambusový podnos s držiakom na pohár vína, tablet či knihu. Ideálny na dlhé zimné večery vo vani alebo raňajky do postele.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Podnos+Do+Vane", "https://placehold.co/600x600/f8f9fa/333333?text=Podnos+Kniha"],
    supplier: "BigBuy"
  },
  {
    id: "hd-017",
    name: "Stojan na Kvety v Štýle Loft (Čierny Kov a Drevo)",
    category: "Bytové doplnky",
    buyPrice: 28.00,
    sellPrice: 69.00,
    description: "Doprajte svojim rastlinám priestor, kde vyniknú. Viacúrovňový stojan v populárnom industriálnom dizajne poskytuje miesto pre 4 až 6 kvetináčov a oživí každý kút.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Stojan+Na+Kvety", "https://placehold.co/600x600/f8f9fa/333333?text=Stojan+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "hd-018",
    name: "Dizajnový Odkladací Stolík s Mramorovou Doskou",
    category: "Bytové doplnky",
    buyPrice: 42.00,
    sellPrice: 99.00,
    description: "Malý, ale výrazný. Príručný stolík k sedačke so zlatou kovovou konštrukciou a pravou mramorovou doskou. Perfektný na odloženie kávy či obľúbenej knihy.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Mramorový+Stolík", "https://placehold.co/600x600/f8f9fa/333333?text=Stolík+Detail"],
    supplier: "BigBuy"
  },
  {
    id: "hd-019",
    name: "Anatomický Vankúš z Pamäťovej Peny pre Kvalitný Spánok",
    category: "Bytové doplnky",
    buyPrice: 25.00,
    sellPrice: 59.90,
    description: "Prebuďte sa svieži a bez bolesti krku. Tento vankúš z kvalitnej pamäťovej peny sa prispôsobí krivkám vašej chrbtice a poskytuje optimálnu podporu hlavy a krku.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Anatomický+Vankúš", "https://placehold.co/600x600/f8f9fa/333333?text=Vankúš+Pena"],
    supplier: "BigBuy"
  },
  {
    id: "hd-020",
    name: "Nástenný Držiak na Kľúče s Organizérom na Poštu (Drevo)",
    category: "Bytové doplnky",
    buyPrice: 15.00,
    sellPrice: 35.00,
    description: "Skoncujte s večným hľadaním kľúčov. Rustikálny drevený organizér s háčikmi na kľúče a priehradkou na došlú poštu či okuliare udrží vo vašej predsieni dokonalý poriadok.",
    images: ["https://placehold.co/600x600/f8f9fa/333333?text=Držiak+Na+Kľúče", "https://placehold.co/600x600/f8f9fa/333333?text=Držiak+Detail"],
    supplier: "BigBuy"
  }
];
