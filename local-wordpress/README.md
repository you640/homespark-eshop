# Homespark Local WordPress

Táto zložka obsahuje konfiguračné súbory pre lokálne bežiaci WordPress, ktorý slúži ako Headless CMS (zdroj pre Novinky & Tipy) na stránke `/spravy` v e-shope Homespark.

## URL Adresy

* **WordPress (Frontend):** [http://localhost:18095](http://localhost:18095)
* **REST API:** [http://localhost:18095/wp-json/wp/v2/posts/](http://localhost:18095/wp-json/wp/v2/posts/)
* **WordPress Admin:** [http://localhost:18095/wp-admin](http://localhost:18095/wp-admin)

---

## 🔑 Prihlasovacie Údaje

* **Používateľské meno (Username):** `admin`
* **Heslo (Password):** `admin123`
* **Email:** `admin@homespark.local`

---

## 🛠️ Správa prostredia (Príkazy)

### 1. Spustenie prostredia
Naštartuje databázu MariaDB a WordPress webový server v pozadí:
```bash
docker compose -f local-wordpress/docker-compose.yml up -d db wordpress
```

### 2. Prvá automatická inštalácia a nastavenie
Inicializuje WordPress, prepojí ho s DB, nastaví administrátora a zapne pekné trvalé odkazy:
```bash
docker compose -f local-wordpress/docker-compose.yml --profile tools run --rm wpcli sh -lc 'until wp core is-installed --allow-root || wp db check --allow-root; do sleep 2; done; wp core install --allow-root --url=http://localhost:18095 --title="Homespark Blog" --admin_user=admin --admin_password=admin123 --admin_email=admin@homespark.local --skip-email || wp core update-db --allow-root; wp rewrite structure "/%postname%/" --allow-root'
```

### 3. Zastavenie prostredia
Vypne bežiace kontajnery:
```bash
docker compose -f local-wordpress/docker-compose.yml down
```

### 4. Reset prostredia (Vymazanie dát a databázy)
Vymaže kontajnery a odstráni aj všetky nahrané dáta a databázové zväzky (volumes):
```bash
docker compose -f local-wordpress/docker-compose.yml down -v
```

---

## 📁 Git a Verziovanie (.gitignore)

Konštrukcia tohto prostredia využíva pomenované Docker zväzky (`volumes`) na ukladanie súborov databázy a nahraných súborov WordPress. To znamená, že žiadne dočasné súbory databázy sa nevytvárajú priamo v priečinku projektu, takže váš projekt zostáva čistý a nezahltený.

Ak by ste sa v budúcnosti rozhodli prepojiť súbory priamo do lokálneho disku (bind mounts), uistite sa, že máte v `.gitignore` pridané riadky na ignorovanie lokálnych dát (už implementované v koreňovom `.gitignore`).
