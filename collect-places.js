/* Edinburgh trip: collect place details from Google Maps.
   HOW TO USE
   1. Open https://www.google.com/maps in Chrome or Edge and accept any cookie prompt.
   2. Press F12, open the Console tab, paste this whole file and press Enter.
      (If the browser blocks pasting, type "allow pasting" first and press Enter.)
   3. Click "Run all" in the grey panel at the top left. Leave the tab open and in front.
      It searches each venue, reads the place panel and moves on, about 4 seconds each.
   4. When it finishes, click "Copy results" and paste them back to Claude.
   It reads only what Google shows on the page: name, category, address, phone, website,
   Google's one-line summary, closed status and up to 4 photo links. No reviews.
   Progress is saved in this browser, so if it stops you can paste the file again and resume. */
(() => {
  const VENUES = [ { "key": "flatbread turkish bakery house haymarket terrace edinburgh", "name": "Flatbread Turkish Bakery House", "city": "Edinburgh", "q": "Flatbread Turkish Bakery House Haymarket Terrace Edinburgh" },
     { "key": "laila cockburn street edinburgh", "name": "Laila Lunch and Brunch", "city": "Edinburgh", "q": "Laila Cockburn Street Edinburgh" },
     { "key": "dishoom edinburgh st andrew square", "name": "Dishoom", "city": "Edinburgh", "q": "Dishoom Edinburgh St Andrew Square" },
     { "key": "zaza's coffee house grassmarket edinburgh", "name": "Zaza's Coffee House", "city": "Edinburgh", "q": "Zaza's Coffee House Grassmarket Edinburgh" },
     { "key": "stack and still edinburgh st james quarter", "name": "Stack and Still", "city": "Edinburgh", "q": "Stack and Still Edinburgh St James Quarter" },
     { "key": "kebab mahal 7 nicolson square edinburgh", "name": "Kebab Mahal", "city": "Edinburgh", "q": "Kebab Mahal 7 Nicolson Square Edinburgh" },
     { "key": "deep sea fish and chips 2 antigua street edinburgh", "name": "Deep Sea Fish and Chips", "city": "Edinburgh", "q": "Deep Sea Fish and Chips 2 Antigua Street Edinburgh" },
     { "key": "nanyang malaysian restaurant lister square edinburgh", "name": "Nanyang Malaysian Restaurant", "city": "Edinburgh", "q": "Nanyang Malaysian Restaurant Lister Square Edinburgh" },
     { "key": "flatbread turkish bakery house 48 haymarket terrace edinburgh", "name": "Oh My Flatbread", "city": "Edinburgh", "q": "Flatbread Turkish Bakery House 48 Haymarket Terrace Edinburgh" },
     { "key": "rodi 121 morrison street edinburgh", "name": "Rodi", "city": "Edinburgh", "q": "Rodi 121 Morrison Street Edinburgh" },
     { "key": "bread meats bread edinburgh", "name": "Bread Meats Bread", "city": "Edinburgh", "q": "Bread Meats Bread Edinburgh" },
     { "key": "wingstop edinburgh", "name": "Wingstop", "city": "Edinburgh", "q": "Wingstop Edinburgh" },
     { "key": "edinburgh street food omni centre leith street edinburgh", "name": "Edinburgh Street Food", "city": "Edinburgh", "q": "Edinburgh Street Food Omni Centre Leith Street Edinburgh" },
     { "key": "mac love little king street edinburgh", "name": "Mac Love", "city": "Edinburgh", "q": "Mac Love Little King Street Edinburgh" },
     { "key": "tuk tuk indian street food 1 leven street edinburgh", "name": "Tuk Tuk Indian Street Food", "city": "Edinburgh", "q": "Tuk Tuk Indian Street Food 1 Leven Street Edinburgh" },
     { "key": "kezban mediterranean restaurant commercial street edinburgh", "name": "Kezban Mediterranean Restaurant", "city": "Edinburgh", "q": "Kezban Mediterranean Restaurant Commercial Street Edinburgh" },
     { "key": "ada restaurant 9a antigua street edinburgh", "name": "Ada Restaurant", "city": "Edinburgh", "q": "Ada Restaurant 9a Antigua Street Edinburgh" },
     { "key": "edinburgh prime steakhouse", "name": "Edinburgh Prime Steakhouse", "city": "Edinburgh", "q": "Edinburgh Prime Steakhouse" },
     { "key": "ronaq comley bank edinburgh", "name": "Ronaq", "city": "Edinburgh", "q": "Ronaq Comley Bank Edinburgh" },
     { "key": "bonoful portobello edinburgh", "name": "Bonoful", "city": "Edinburgh", "q": "Bonoful Portobello Edinburgh" },
     { "key": "knights kitchen 166 leith walk edinburgh", "name": "Knights Kitchen", "city": "Edinburgh", "q": "Knights Kitchen 166 Leith Walk Edinburgh" },
     { "key": "chaophraya edinburgh castle street", "name": "Chaophraya", "city": "Edinburgh", "q": "Chaophraya Edinburgh Castle Street" },
     { "key": "solti restaurant 10 drummond street edinburgh", "name": "Solti", "city": "Edinburgh", "q": "Solti Restaurant 10 Drummond Street Edinburgh" },
     { "key": "the dome 14 george street edinburgh", "name": "The Dome", "city": "Edinburgh", "q": "The Dome 14 George Street Edinburgh" },
     { "key": "alandas gelato 1 forrest road edinburgh", "name": "Alandas Gelato", "city": "Edinburgh", "q": "Alandas Gelato 1 Forrest Road Edinburgh" },
     { "key": "sweet paradice desserts morningside edinburgh", "name": "Sweet Paradice Desserts", "city": "Edinburgh", "q": "Sweet Paradice Desserts Morningside Edinburgh" },
     { "key": "scoopz 27 west nicolson street edinburgh", "name": "Scoopz", "city": "Edinburgh", "q": "Scoopz 27 West Nicolson Street Edinburgh" },
     { "key": "heavenly desserts 134 dundee street edinburgh", "name": "Heavenly Desserts", "city": "Edinburgh", "q": "Heavenly Desserts 134 Dundee Street Edinburgh" },
     { "key": "chulo's stuffed cookies 22 raeburn place edinburgh", "name": "Chulo's Stuffed Cookies", "city": "Edinburgh", "q": "Chulo's Stuffed Cookies 22 Raeburn Place Edinburgh" },
     { "key": "maqbool's supermarket edinburgh", "name": "Maqbool's international supermarket", "city": "Edinburgh", "q": "Maqbool's Supermarket Edinburgh" },
     { "key": "wisteria & co 213a new city road glasgow", "name": "Wisteria & Co", "city": "Glasgow", "q": "Wisteria & Co 213A New City Road Glasgow" },
     { "key": "brooklyn cafe minard road glasgow", "name": "Brooklyn Cafe", "city": "Glasgow", "q": "Brooklyn Cafe Minard Road Glasgow" },
     { "key": "best kabobs dundas street glasgow", "name": "Best Kabobs", "city": "Glasgow", "q": "Best Kabobs Dundas Street Glasgow" },
     { "key": "babs kebab glasgow city centre", "name": "Babs", "city": "Glasgow", "q": "Babs kebab Glasgow city centre" },
     { "key": "doner haus glasgow", "name": "Doner Haus", "city": "Glasgow", "q": "Doner Haus Glasgow" },
     { "key": "katsu glasgow city centre", "name": "Katsu", "city": "Glasgow", "q": "Katsu Glasgow city centre" },
     { "key": "chicken cottage 304 sauchiehall street glasgow", "name": "Chicken Cottage", "city": "Glasgow", "q": "Chicken Cottage 304 Sauchiehall Street Glasgow" },
     { "key": "namaste by delhi darbar glasgow", "name": "Namaste by Delhi Darbar", "city": "Glasgow", "q": "Namaste by Delhi Darbar Glasgow" },
     { "key": "roya glasgow middle eastern restaurant", "name": "Roya", "city": "Glasgow", "q": "Roya Glasgow Middle Eastern restaurant" },
     { "key": "chaakoo bombay cafe glasgow", "name": "Chaakoo Bombay Cafe", "city": "Glasgow", "q": "Chaakoo Bombay Cafe Glasgow" },
     { "key": "madras cafe glasgow", "name": "Madras Cafe", "city": "Glasgow", "q": "Madras Cafe Glasgow" },
     { "key": "icafe 250 woodlands road glasgow", "name": "iCafe", "city": "Glasgow", "q": "iCafe 250 Woodlands Road Glasgow" },
     { "key": "deesserts sauchiehall street glasgow", "name": "Deesserts", "city": "Glasgow", "q": "Deesserts Sauchiehall Street Glasgow" },
     { "key": "heavenly desserts glasgow fort", "name": "Heavenly Desserts", "city": "Glasgow", "q": "Heavenly Desserts Glasgow Fort" },
     { "key": "chulo's cookies glasgow", "name": "Chulo's Cookies", "city": "Glasgow", "q": "Chulo's Cookies Glasgow" } ];
  const KEY = "edinburgh-trip-places";
  let data = {};
  try { data = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch(e){}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch(e){} };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let running = false, stop = false;

  document.getElementById("trip-panel")?.remove();
  const panel = document.createElement("div");
  panel.id = "trip-panel";
  panel.style.cssText = "position:fixed;top:12px;left:12px;z-index:2147483647;background:#1b2230;color:#fff;font:14px system-ui,sans-serif;padding:12px;border-radius:10px;box-shadow:0 4px 18px #0006;width:270px";
  panel.innerHTML = `<b>Trip place collector</b><div id="tp-status" style="margin:8px 0;min-height:36px"></div>
    <button id="tp-run">Run all</button> <button id="tp-stop">Stop</button> <button id="tp-copy">Copy results</button>`;
  panel.querySelectorAll("button").forEach(b => b.style.cssText = "padding:6px 10px;margin:2px 2px 0 0;border-radius:6px;border:0;cursor:pointer");
  document.body.appendChild(panel);
  const status = t => { panel.querySelector("#tp-status").textContent = t; };
  const done = () => VENUES.filter(v => data[v.key]).length;

  function searchFor(q){
    const input = document.querySelector('input[name="q"]');
    const btn = document.querySelector('button[aria-label="Search"]');
    if (!input || !btn) throw new Error("Could not find the Maps search box. Open google.com/maps first.");
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    set.call(input, q);
    input.dispatchEvent(new Event("input", {bubbles:true}));
    btn.click();
  }

  const clean = s => (s || "").replace(/^[^:]*:\s*/, "").replace(/[​-]/g, "").trim();
  function read(){
    const h1 = document.querySelector("h1");
    if (!h1 || /^Sponsored/i.test(h1.textContent) || !location.pathname.startsWith("/maps/place/")) return null;
    const item = id => document.querySelector(`[data-item-id^="${id}"]`);
    const web = item("authority");
    const photos = [];
    const bigPhoto = u => u.replace(/=w\d+-h\d+[^&]*$/, "=w900-h600-k-no");
    document.querySelectorAll("button[aria-label^='Photo'] img, button.aoRNLd img, button[jsaction*='heroHeaderImage'] img").forEach(img => {
      const lab = img.closest("button")?.getAttribute("aria-label") || "";
      if (/review/i.test(lab) || !/googleusercontent/.test(img.src)) return;
      const w = +(img.src.match(/=w(\d+)-h/) || [])[1] || 0;
      if (w < 100) return;
      const u = bigPhoto(img.src);
      if (!photos.includes(u)) photos.push(u);
    });
    const panelText = document.querySelector('div[role="main"]')?.innerText || "";
    return {
      mapsName: h1.textContent.trim(),
      category: document.querySelector('button[jsaction*="category"]')?.textContent.trim() || "",
      address: clean(item("address")?.getAttribute("aria-label")),
      phone: clean(document.querySelector('[data-item-id^="phone"]')?.getAttribute("aria-label")),
      website: web ? web.href : "",
      summary: (document.querySelector("div.PYvSYb")?.innerText || "").trim(),
      closed: /Permanently closed/i.test(panelText) ? "permanently closed" : /Temporarily closed/i.test(panelText) ? "temporarily closed" : "",
      photos: photos.slice(0, 4),
      mapsUrl: location.href
    };
  }

  const words = t => (t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2);
  const GENERIC = ["edinburgh","glasgow","the","and","cafe","restaurant","kitchen","street","food","coffee","house","desserts","cookies"];
  const sameVenue = (want, got) => { const g = words(got); const w = words(want).filter(x => !GENERIC.includes(x)); return (w.length ? w : words(want)).some(x => g.includes(x)) && !/^MAC Cosmetics/i.test(got); };

  async function grab(v){
    const prevUrl = location.href, prevName = document.querySelector("h1")?.textContent.trim();
    searchFor(v.q);
    let r = null;
    for (let i = 0; i < 45; i++){                        // up to ~13 s
      await sleep(300);
      const list = document.querySelector("a.hfpxzc");   // got a result list instead of one place
      if (list && !location.pathname.startsWith("/maps/place/")) list.click();
      r = read();
      /* wait for the NEW place: a new URL, and a heading that is not the old venue or the list page */
      if (r && location.href !== prevUrl && r.mapsName !== "Results" && r.mapsName !== prevName) break;
    }
    for (let i = 0; i < 8 && r && !document.querySelector("button[aria-label^='Photo'] img, button.aoRNLd img"); i++) await sleep(400);
    await sleep(1200);
    r = read();
    if (r) r.matched = sameVenue(v.name, r.mapsName);
    return r;
  }

  async function runAll(){
    if (running) return; running = true; stop = false;
    try {
      for (const v of VENUES){
        if (stop) break;
        if (data[v.key]) continue;
        status(`${done()}/${VENUES.length} done. Searching: ${v.name} ${v.city}`);
        const r = await grab(v);
        data[v.key] = r ? Object.assign({name:v.name, city:v.city}, r) : {name:v.name, city:v.city, error:"no place found"};
        save();
        await sleep(1500 + Math.random() * 1500);
      }
      status(stop ? `Stopped at ${done()}/${VENUES.length}.` : `Finished: ${done()}/${VENUES.length}. Click Copy results.`);
    } catch(e){ status("Error: " + e.message); }
    running = false;
  }

  panel.querySelector("#tp-run").onclick = runAll;
  panel.querySelector("#tp-stop").onclick = () => { stop = true; };
  panel.querySelector("#tp-copy").onclick = async () => {
    const text = JSON.stringify(data, null, 1);
    try { await navigator.clipboard.writeText(text); status("Copied " + done() + " places. Paste them to Claude."); }
    catch(e){
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([text], {type:"application/json"}));
      a.download = "trip-places.json"; a.click();
      status("Clipboard blocked, so it downloaded trip-places.json instead.");
    }
  };
  status(`${done()}/${VENUES.length} already saved. Click Run all.`);
})();
