// VIRASAT Regional Cultural Content Page - Multi-Region Engine (Maharashtra & Odisha)

// ==================== MASTER REGIONAL DATASETS ==================== //
const REGIONAL_DATA = {
    maharashtra: {
        id: "maharashtra",
        name: "Maharashtra",
        tagline: "Land of the Marathas — where ancient caves, hill forts, and living traditions meet",
        heroImage: "assets/maharashtra/hero_maharashtra.jpg",
        heroImageAlt: "Panoramic view of Ajanta Caves and Sahyadri landscape",
        categoryChips: ["History", "Festivals", "Art", "Cuisine", "Clothing", "5 UNESCO Sites", "36 Districts"],
        navTitle: "Explore Maharashtra",
        exploreHeading: "Explore Maharashtra's Heritage",
        intro: "Maharashtra, India's third-largest state, is a land of extraordinary diversity — from the lush Sahyadri mountains and the 720-km Konkan coastline to the expansive Deccan plateau. Formed on May 1, 1960, it carries the legacy of the great Maratha warrior Chhatrapati Shivaji Maharaj, a rich tradition of saint-poets like Dnyaneshwar and Tukaram, and five UNESCO World Heritage Sites. Its culture is a dynamic synthesis of ancient cave art, vibrant festivals like Ganesh Chaturthi, martial traditions, and the Bhakti movement's egalitarian philosophy.",
        
        avatar: {
            image: "assets/maharashtra/avatar_maharashtra.jpg",
            title: "Maharashtra",
            subtitle: "Your Cultural Guide"
        },
        
        exploreCards: [
            {
                title: "Ajanta & Ellora Caves",
                tag: "UNESCO Heritage",
                icon: "fa-mountain",
                image: "assets/maharashtra/explore_ajanta_ellora.jpg",
                imageAlt: "Ellora Caves Cave 16 Kailasa Temple",
                desc: "Two UNESCO World Heritage Sites spanning 2nd century BCE to 10th century CE. Ajanta's Buddhist frescoes and Ellora's Kailasa temple — the largest monolithic rock excavation on Earth."
            },
            {
                title: "Maratha Hill Forts",
                tag: "Martial Heritage",
                icon: "fa-chess-rook",
                image: "assets/maharashtra/explore_maratha_forts.jpg",
                imageAlt: "Raigad Fort in the Sahyadri mountains",
                desc: "Over 300 forts across the Sahyadris built by Shivaji Maharaj using guerrilla warfare strategy. Three types: Girikot (hill), Bhuikot (land), and Jalkot (sea) — each engineered for the terrain."
            },
            {
                title: "Warli Art & Tribal Heritage",
                tag: "Living Tradition",
                icon: "fa-paint-brush",
                image: "assets/maharashtra/explore_warli_art.jpg",
                imageAlt: "Warli tribal geometric painting with Tarpa dance",
                desc: "GI-tagged geometric art by the Warli tribe of Palghar — rice paste on mud walls depicting circles, triangles, and the sacred Tarpa dance. Globalized by artist Jivya Soma Mashe."
            },
            {
                title: "Wari Pilgrimage",
                tag: "Spiritual Heritage",
                icon: "fa-walking",
                image: "assets/maharashtra/explore_wari_pilgrimage.jpg",
                imageAlt: "Varkari pilgrims on the Pandharpur Wari procession",
                desc: "Over a million Varkaris walk 250 km from Alandi and Dehu to Pandharpur over 21 days, chanting Abhangs. One of the world's largest peaceful pedestrian pilgrimages, erasing caste and class."
            },
            {
                title: "Paithani Saree",
                tag: "Textile Heritage",
                icon: "fa-scroll",
                image: "assets/maharashtra/explore_paithani.jpg",
                imageAlt: "Intricate golden zari border on Paithani silk saree",
                desc: "A 2,000-year-old silk weaving tradition from Paithan using the Kadiyal tapestry technique. Iconic peacock and lotus motifs in gold zari thread. GI Tagged — the 'Maha-Vastra' of Maharashtra."
            },
            {
                title: "Ganesh Chaturthi",
                tag: "Festival",
                icon: "fa-om",
                image: "assets/maharashtra/explore_ganesh_chaturthi.jpg",
                imageAlt: "Ganesh Chaturthi celebrations and Dhol Tasha troupe",
                desc: "Transformed from a domestic festival into a massive public celebration by Lokmanya Tilak in 1893 to unite the masses. A 10-day spectacle of Dhol-Tasha pathaks, Modak feasts, and community Visarjan."
            },
            {
                title: "Kolhapuri Heritage",
                tag: "Craft & Cuisine",
                icon: "fa-shoe-prints",
                image: "assets/maharashtra/explore_kolhapur.jpg",
                imageAlt: "Handcrafted Kolhapuri leather chappals",
                desc: "A living heritage cluster — GI-tagged Kolhapuri Chappals (hand-stitched, vegetable-dyed leather), fiery Tambda-Pandhra Rassa cuisine, Kushti wrestling akhadas, and the Mahalaxmi Temple."
            },
            {
                title: "Lavani & Tamasha",
                tag: "Performance Art",
                icon: "fa-theater-masks",
                image: "assets/maharashtra/explore_lavani_tamasha.jpg",
                imageAlt: "Lavani folk dancer performing in traditional attire",
                desc: "Lavani's two forms — Nirguni (philosophical) and Shringari (erotic) — set to the 14-beat Dhadya taal. Tamasha is travelling folk theatre featuring Gan, Gondhal, comedy, and drama."
            }
        ],

        history: {
            paragraphs: [
                "Maharashtra's history spans over two millennia. The <strong>Satavahana dynasty</strong> (230 BCE–225 CE) established Paithan as their capital and patronized Buddhism, creating rock-cut caves at Karla and Bhaja. The <strong>Vakatakas</strong> followed, commissioning the later caves at Ajanta. The <strong>Rashtrakutas</strong> and <strong>Chalukyas</strong> carved Ellora's masterpieces, while the <strong>Yadavas of Devagiri</strong> oversaw the golden age of Marathi language.",
                "The 17th century witnessed the rise of the <strong>Maratha Empire</strong> under Chhatrapati Shivaji Maharaj, who established Hindavi Swarajya using guerrilla warfare from the Sahyadri forts. The Peshwas later expanded Maratha influence \"from Attock to Cuttack.\" After British annexation in 1818, Maharashtra became the epicenter of social reform — led by Mahatma Phule, Savitribai Phule, and Dr. B.R. Ambedkar — and the freedom struggle."
            ],
            image: "assets/maharashtra/history_shivaji.jpg",
            imageAlt: "Chhatrapati Shivaji Maharaj memorial at Raigad Fort",
            factCards: [
                { title: "Historical Eras", desc: "Satavahana → Vakataka → Chalukya → Rashtrakuta → Yadava → Bahmani Sultanate → Maratha Empire → Peshwa → British → Modern State (1960)" },
                { title: "Key Figures", desc: "Chhatrapati Shivaji Maharaj, Peshwa Bajirao I, Lokmanya Tilak, Mahatma Phule, Savitribai Phule, Dr. B.R. Ambedkar, Sant Dnyaneshwar, Sant Tukaram" },
                { title: "Legacy", desc: "Over 300 hill forts, the Bhakti movement's egalitarian philosophy, India's social reform epicenter, five UNESCO World Heritage Sites, and the Samyukta Maharashtra movement (1960)" }
            ]
        },

        festivals: [
            {
                name: "Ganesh Chaturthi",
                time: "August – September",
                image: "assets/maharashtra/fest_ganesh.jpg",
                imageAlt: "Ganesh festival celebration with Dhol Tasha",
                desc: "Originally domestic, transformed into a massive public event by Lokmanya Tilak in 1893 to unite people during the freedom struggle. Features Dhol-Tasha pathaks, Lezim dance, Modak feasts, and the spectacular Visarjan (immersion) procession after 1.5 to 10 days."
            },
            {
                name: "Ashadhi Ekadashi & Wari",
                time: "June – July (Ashadha)",
                image: "assets/maharashtra/fest_wari.jpg",
                imageAlt: "Varkaris on the Pandharpur Wari pilgrimage",
                desc: "Culmination of the Pandharpur Wari — over a million Varkaris walk 250 km carrying the Padukas (sandals) of saints Dnyaneshwar and Tukaram. The procession features Dindi groups, Abhang chanting, and the rhythmic Mridanga-Chipri-Talya ensemble."
            },
            {
                name: "Gudi Padwa",
                time: "March – April (Chaitra)",
                image: "assets/maharashtra/fest_gudi_padwa.jpg",
                imageAlt: "Gudi Padwa traditional New Year celebration",
                desc: "The Maharashtrian New Year. Families hoist the \"Gudi\" — a bamboo stick adorned with silk cloth, neem leaves, a garland, and an inverted copper or silver pot — outside their homes. Celebrated with Shrikhand, Puran Poli, and a symbolic bitter-sweet mixture of neem and jaggery."
            },
            {
                name: "Dahi Handi",
                time: "August – September",
                image: "assets/maharashtra/fest_dahi_handi.jpg",
                imageAlt: "Govinda pathak forming human pyramid for Dahi Handi",
                desc: "Celebrating Krishna Janmashtami — Govinda pathaks (youth groups) form towering human pyramids to break an earthen pot of curd and butter strung high above the streets. Highly competitive, with large prizes. Prominent in Mumbai and Thane."
            },
            {
                name: "Makar Sankranti",
                time: "January 14–15",
                image: "assets/maharashtra/fest_sankranti.jpg",
                imageAlt: "Makar Sankranti celebration and kites",
                desc: "Marking the sun's transition into Capricorn. Maharashtrians exchange Tilgul (sesame-jaggery sweets) saying \"Tilgul ghya, goad goad bola\" — take this tilgul and speak sweet words. Haldi-Kunku ceremonies for married women. Black clothes traditionally worn."
            },
            {
                name: "Pola (Bail Pola)",
                time: "Shravan (August)",
                image: "assets/maharashtra/fest_pola.jpg",
                imageAlt: "Decorated bulls during Bail Pola festival",
                desc: "A thanksgiving festival for bulls and oxen, celebrated across Vidarbha, Marathwada, and Khandesh. Farmers bathe and decorate their bulls, paint their horns, and offer them special food. No agricultural work is performed on this day."
            }
        ],

        dance: {
            text: "Maharashtra's dance traditions range from the sophisticated <strong>Lavani</strong> to devotional ritual performances. Lavani has two forms: <em>Nirguni</em> (philosophical, rooted in spiritual discourse) and <em>Shringari</em> (expressive, celebratory). It is performed in two formats — <em>Dholki Farad</em> (fast-paced, public) and <em>Baithakichi</em> (seated, intimate, expression-focused). <strong>Tamasha</strong>, the travelling folk theatre, combines the Gan (invocation), Gondhal, Batavya (comedy), and Vag (main play) — traditionally performed by Mahar, Mang, and Kolhati communities.",
            image: "assets/maharashtra/dance_lavani.jpg",
            imageAlt: "Lavani folk dance performance in traditional Nauvari attire",
            items: [
                "<strong>Lavani & Tamasha</strong> — Maharashtra's signature performance art (performers: Mangala Bansode, Yamunabai Waikar)",
                "<strong>Koli Dance</strong> — Fisherfolk dance from Konkan; movements mimic rowing and fishing",
                "<strong>Dhangari Gaja</strong> — Shepherd dance honoring deity Biruba, featuring heavy drumming",
                "<strong>Lezim</strong> — Group exercise-dance with a jingling wooden instrument; core to Ganesh festival processions",
                "<strong>Gondhal</strong> — Ritual performance dedicated to Goddesses Tulja Bhavani and Renuka",
                "<strong>Tarpa Dance</strong> — Warli tribal dance; men and women spiral around the Tarpa player"
            ]
        },

        music: {
            text: "Maharashtra's musical heritage spans from ancient devotional poetry to Hindustani classical traditions. <strong>Abhang</strong> — devotional verses by Varkari saints like Tukaram and Dnyaneshwar — remain central to the cultural identity. <strong>Powada</strong> are warrior ballads celebrating Maratha heroism, composed by Shahirs (bards). <strong>Natya Sangeet</strong>, unique to Marathi theatre, integrates classical and semi-classical music into plays. The state has been a stronghold for the <strong>Kirana Gharana</strong> (Bhimsen Joshi) and <strong>Jaipur-Atrauli Gharana</strong> (Kishori Amonkar).",
            quote: "Instruments of Maharashtra: Dholki, Sambal, Halgi, Tasha, Tutari, Ektara, Taal, Mridanga, Tarpa, Chipri, and Talya (cymbals) — each tied to a specific tradition, from the battlefield Powada to the pilgrim's Abhang.",
            image: "assets/maharashtra/music_dhol_tasha.jpg",
            imageAlt: "Dhol Tasha troupe performance in Pune"
        },

        painting: [
            {
                image: "assets/maharashtra/paint_warli.jpg",
                imageAlt: "Warli tribal wall painting from Palghar",
                caption: "<strong>Warli Painting</strong> — GI-tagged geometric art by the Warli tribe of Palghar. Rice paste on mud walls; motifs include circles (sun/moon), triangles (mountains), squares (chauk — sacred enclosure), and the Tarpa dance. Originally ritualistic, globalized by Jivya Soma Mashe."
            },
            {
                image: "assets/maharashtra/paint_ajanta_fresco.jpg",
                imageAlt: "Ajanta Cave 1 Padmapani Bodhisattva mural",
                caption: "<strong>Ajanta Frescoes</strong> — Buddhist mural masterpieces (2nd century BCE – 6th century CE) depicting Jataka tales and the iconic Padmapani and Vajrapani figures. UNESCO World Heritage Site."
            },
            {
                image: "assets/maharashtra/paint_gond.jpg",
                imageAlt: "Gond tribal art painting",
                caption: "<strong>Gond Art</strong> — Vibrant paintings by the Gond tribe of Vidarbha, characterized by intricate dots, dashes, and bold colors depicting flora, fauna, and folklore. Distinct from Warli in both style and cultural origin."
            }
        ],

        crafts: [
            {
                title: "Paithani Weaving",
                image: "assets/maharashtra/craft_paithani.jpg",
                imageAlt: "Traditional Paithani silk handloom weaving",
                desc: "Silk + zari tapestry weaving (Kadiyal technique) from Paithan and Yeola. Peacock (Bangadi-mor), lotus (Kamal), and parrot (Tota-maina) motifs. GI Tagged. Satavahana-era origins."
            },
            {
                title: "Kolhapuri Chappals",
                image: "assets/maharashtra/craft_kolhapuri.jpg",
                imageAlt: "Handcrafted Kolhapuri leather chappals",
                desc: "Hand-crafted leather footwear dyed with vegetable dyes and stitched with leather cords — no nails used. GI Tagged, shared between Maharashtra and Karnataka."
            },
            {
                title: "Sawantwadi Crafts",
                image: "assets/maharashtra/craft_sawantwadi.jpg",
                imageAlt: "Traditional Sawantwadi lacquered wooden craft",
                desc: "Wooden toys, Ganjifa (circular hand-painted playing cards), and lacquerware from Sindhudurg. Once royally patronized, Ganjifa cards are now near extinction."
            },
            {
                title: "Himroo Weaving",
                image: "assets/maharashtra/craft_himroo.jpg",
                imageAlt: "Intricate Himroo weaving from Aurangabad",
                desc: "Cotton-silk blend with intricate floral designs from Aurangabad, linked to the Tughlaq era. A luxury textile tradition that once competed with Persian brocades."
            },
            {
                title: "Pinguli Chitrakatha",
                image: "assets/maharashtra/craft_chitrakatha.jpg",
                imageAlt: "Pinguli Chitrakatha traditional storytelling art",
                desc: "Endangered storytelling art using handmade paintings and puppetry depicting Ramayana/Mahabharata. Practiced by the Thakar community in Pinguli village, Sindhudurg — now only a few families remain."
            }
        ],

        cuisine: {
            intro: "Maharashtra's cuisine is shaped by its five distinct regions — the coconut-and-seafood-rich Konkan coast, the peanut-and-jaggery flavors of the western Desh plateau, the fiery spice of Kolhapur and Vidarbha, the millet-based Marathwada diet, and the Khandeshi love of dry coconut and peanuts. Street food culture thrives in Mumbai, while festival foods carry deep ritual significance.",
            foods: [
                {
                    name: "Vada Pav",
                    tags: ["Street Food", "Mumbai"],
                    image: "assets/maharashtra/food_vada_pav.jpg",
                    imageAlt: "Mumbai Vada Pav with spicy chutneys",
                    desc: "Mumbai's iconic street food — originated in the 1960s–70s as a quick, affordable meal for mill workers. A spiced potato fritter in a pav bun with chutneys."
                },
                {
                    name: "Misal Pav",
                    tags: ["Spicy", "Desh Region"],
                    image: "assets/maharashtra/food_misal_pav.jpg",
                    imageAlt: "Traditional Misal Pav served with farsan and lemon",
                    desc: "Spicy sprouted lentil curry served with pav. Three regional styles: Puneri (milder, sweeter), Kolhapuri (very spicy), and Nashik. Both Pune and Kolhapur claim the authentic origin."
                },
                {
                    name: "Ukdiche Modak",
                    tags: ["Festival Food", "Sweet"],
                    image: "assets/maharashtra/food_modak.jpg",
                    imageAlt: "Steamed Ukdiche Modak with coconut-jaggery filling",
                    desc: "Steamed sweet dumplings — rice flour shell with a filling of fresh coconut and jaggery, flavored with cardamom. Central to the Ganesh Chaturthi festival."
                },
                {
                    name: "Puran Poli",
                    tags: ["Festival Food", "Statewide"],
                    image: "assets/maharashtra/food_puran_poli.jpg",
                    imageAlt: "Puran Poli sweet flatbread served with ghee",
                    desc: "Sweet flatbread stuffed with chana dal and jaggery filling, flavored with cardamom. Essential festival food for Holi and Gudi Padwa celebrations."
                },
                {
                    name: "Tambda & Pandhra Rassa",
                    tags: ["Non-Veg", "Kolhapur"],
                    image: "assets/maharashtra/food_kolhapuri_rassa.jpg",
                    imageAlt: "Kolhapuri Tambda and Pandhra Rassa",
                    desc: "Kolhapur's signature duo — Tambda Rassa is a fiery red spicy mutton broth, while Pandhra Rassa is a milder white broth. Served together, they define Kolhapuri cuisine."
                },
                {
                    name: "Sol Kadhi & Malvani Cuisine",
                    tags: ["Coastal", "Konkan"],
                    image: "assets/maharashtra/food_sol_kadhi.jpg",
                    imageAlt: "Sol Kadhi kokum and coconut milk beverage",
                    desc: "Konkan's refreshing coconut milk and kokum drink, served alongside fiery Malvani fish curries, Bombil (Bombay duck) fry, and Kombdi Wade (chicken curry with multi-flour puris)."
                }
            ]
        },

        clothing: [
            {
                title: "Paithani Saree",
                image: "assets/maharashtra/attire_paithani.jpg",
                imageAlt: "Paithani silk saree with golden zari pallu",
                desc: "A 2,000-year-old handloom treasure from the Satavahana dynasty, woven in Paithan and Yeola using the Kadiyal tapestry technique. Pure silk with gold and silver zari thread, featuring iconic motifs — Bangadi-mor (peacock in bangle), Tota-maina (parrot-mynah), Asawali (vine), and Kamal (lotus).",
                details: [
                    { label: "Fabric", val: "Pure silk with gold/silver zari (tapestry weave)" },
                    { label: "Occasion", val: "Weddings, festivals — essential bridal trousseau" },
                    { label: "Significance", val: "GI Tagged; called the 'Maha-Vastra' of Maharashtra — massive commercial revival in recent years" }
                ]
            },
            {
                title: "Nauvari Saree (Kashta)",
                image: "assets/maharashtra/attire_nauvari.jpg",
                imageAlt: "Maharashtrian Nauvari 9-yard kashta saree",
                desc: "The iconic 9-yard saree draped in a trouser-like style (kashta). Historically worn by Maratha women to allow freedom of movement — enabling them to ride horses and participate in battles. Today worn during festivals, weddings, and cultural events as a symbol of Maharashtrian pride.",
                details: [
                    { label: "Fabric", val: "Cotton or silk, 9 yards (longer than standard 6-yard sarees)" },
                    { label: "Occasion", val: "Festivals, weddings, Lavani performances" },
                    { label: "Significance", val: "Embodies the martial spirit and practical ingenuity of Maratha women" }
                ]
            },
            {
                title: "Pheta, Dhotar & Jewelry",
                image: "assets/maharashtra/attire_pheta.jpg",
                imageAlt: "Traditional Puneri Pheta turban",
                desc: "The <strong>Pheta</strong> (turban) comes in several styles — the Puneri Pheta (symbol of dignity, worn by dignitaries), Kolhapuri Pheta, and Mawali Pheta. Men traditionally wear the <strong>Dhotar</strong>, an unstitched lower garment. The <strong>Gandhi Topi</strong> (white khadi cap) is a freedom-struggle icon. Traditional women's jewelry includes the <strong>Thushi</strong> (choker necklace), <strong>Kolhapuri Saaj</strong> (necklace with 21 pendant leaves), and the <strong>Nath</strong> (pearl nose ring).",
                details: [
                    { label: "Fabric", val: "Pheta — silk or cotton cloth; Dhotar — unstitched cotton" },
                    { label: "Occasion", val: "Ceremonies, festivals, formal occasions" },
                    { label: "Significance", val: "The Puneri Pheta is a mark of cultural pride; the Nath and Thushi are essential bridal jewelry" }
                ]
            }
        ],

        languages: [
            {
                title: "Marathi (मराठी)",
                desc: "Official state language with ~83 million speakers. An Indo-Aryan language written in Devanagari script (formerly Modi script), with a literary tradition dating to the 11th century. Features the distinctive retroflex 'ळ' sound.",
                sample: "\"Namaskar\" (नमस्कार) — the standard greeting"
            },
            {
                title: "Varhadi & Zadi Boli",
                desc: "Spoken in Vidarbha (Amravati, Akola, Wardha). Lacks the retroflex 'ळ', replacing it with 'य' or 'ल'. Retains archaic words from early Mahanubhav literature. Zadi boli powers the unique Zadipatti folk theatre tradition.",
                sample: "Region: Vidarbha — Eastern Maharashtra"
            },
            {
                title: "Malvani / Konkani",
                desc: "Spoken along the south Konkan coast (Sindhudurg, Ratnagiri). Melodic intonation with Portuguese and Kannada loanwords. The soul of Malvani theatre and the Dashavatar folk drama tradition.",
                sample: "Region: Konkan Coast"
            },
            {
                title: "Khandeshi / Ahirani",
                desc: "Spoken in Jalgaon, Dhule, and Nandurbar — a bridge between Marathi and Gujarati/Bhili. Rich oral tradition of Ovi songs praising agriculture and family, prominently by poet Bahinabai Chaudhari.",
                sample: "Region: North Maharashtra (Khandesh)"
            },
            {
                title: "Gondi",
                desc: "A Dravidian language spoken by the Gond people in Gadchiroli and Chandrapur — completely distinct from Marathi. Contains epic oral histories like the Gond Ramayani. Status: Vulnerable, with its own script undergoing revival.",
                sample: "Family: Dravidian (not Indo-Aryan)"
            },
            {
                title: "Other Languages",
                desc: "<strong>Bhili & Warli</strong> (Nandurbar/Palghar) — Indo-Aryan but distinct; Warli is unwritten, passed orally. <strong>Katkari</strong> (Raigad) — highly endangered. <strong>Kolami</strong> (Yavatmal) — endangered Central Dravidian. <strong>Dakhni Urdu</strong> (Marathwada) — incorporates Marathi syntax.",
                sample: "Source: People's Linguistic Survey of India"
            }
        ],

        monuments: [
            {
                title: "Ellora Caves",
                era: "600 – 1000 CE",
                image: "assets/maharashtra/monument_ellora.jpg",
                imageAlt: "Cave 16 Kailasa Temple monolithic rock excavation at Ellora",
                desc: "34 caves representing Buddhist (Caves 1–12), Hindu (Caves 13–29), and Jain (Caves 30–34) traditions. Cave 16 — the Kailasanatha Temple — is the largest monolithic rock excavation in the world, carved top-down from a single basalt cliff.",
                badges: ["UNESCO Heritage (1983)", "Rock-Cut Architecture", "Three Religions"]
            },
            {
                title: "Ajanta Caves",
                era: "2nd Century BCE – 6th Century CE",
                image: "assets/maharashtra/monument_ajanta.jpg",
                imageAlt: "Ajanta Caves horseshoe cliff panoramic view",
                desc: "30 Buddhist caves featuring world-renowned mural paintings (frescoes) depicting Jataka tales, with the iconic Padmapani and Vajrapani figures. Created under Satavahana and Vakataka patronage. Ongoing threats from water seepage and micro-climatic tourist impact.",
                badges: ["UNESCO Heritage (1983)", "Buddhist Frescoes"]
            },
            {
                title: "Elephanta Caves",
                era: "5th – 8th Century CE",
                image: "assets/maharashtra/monument_elephanta.jpg",
                imageAlt: "Elephanta Caves three-headed Maheshmurti Trimurti",
                desc: "Located on Gharapuri Island off Mumbai harbor, famous for the monumental Trimurti Shiva sculpture (Maheshmurti). Accessible via ferry from Gateway of India. Faces ongoing salinity, sea-breeze erosion, and tourism pressure.",
                badges: ["UNESCO Heritage (1987)", "Hindu (Shaivism)"]
            },
            {
                title: "Raigad Fort",
                era: "Maratha Empire — 17th Century",
                image: "assets/maharashtra/monument_raigad.jpg",
                imageAlt: "Historic Raigad Fort ramparts in the Sahyadri mountains",
                desc: "Capital of Chhatrapati Shivaji Maharaj's Swarajya, perched at 820 meters in the Sahyadris. A Girikot (hill fort) featuring layered fortification, the Maha Darwaja, rainwater cisterns, and the coronation durbar. ASI Protected, with state government restoration in progress.",
                badges: ["ASI Protected", "Girikot (Hill Fort)", "Maratha Capital"]
            },
            {
                title: "CSMT & Mumbai's Architectural Ensemble",
                era: "19th – 20th Century",
                image: "assets/maharashtra/monument_csmt.jpg",
                imageAlt: "Chhatrapati Shivaji Maharaj Terminus Victorian Gothic architecture",
                desc: "Chhatrapati Shivaji Maharaj Terminus (formerly Victoria Terminus) is a Victorian Gothic Revival masterpiece blended with Indian themes. Alongside it, Mumbai's Victorian and Art Deco Ensemble along Oval Maidan and Marine Drive forms a unique architectural heritage — both are UNESCO World Heritage Sites.",
                badges: ["UNESCO Heritage (2004 & 2018)", "Victorian Gothic", "Art Deco"]
            }
        ],

        tribal: {
            text: "Maharashtra is home to numerous distinct indigenous communities — Warli, Gond, Bhil, Katkari, Thakar, Mahadev Koli, Kolam, Pardhi, Dhangars, and Andh — each with unique linguistic, cultural, and historical identities. These communities preserve rich oral traditions, animistic belief systems (worshipping nature spirits, Waghoba the tiger deity, ancestral spirits), distinct art forms (Warli and Gond painting), indigenous agricultural knowledge, and traditional occupations. The Katkari and Kolam communities are classified as Particularly Vulnerable Tribal Groups (PVTGs).",
            image: "assets/maharashtra/tribal_warli_heritage.jpg",
            imageAlt: "Warli indigenous tribal cultural tradition and dance",
            practices: [
                { title: "Warli Tribe — Palghar", desc: "Famous for geometric Warli painting (rice paste on mud walls). The Tarpa instrument drives spiral dances. Worship Waghoba (tiger deity) and celebrate the Hirwa (green) harvest festival and Bohada mask festival." },
                { title: "Gond Tribe — Vidarbha", desc: "Speak Gondi (Dravidian language). Practice vibrant Gond art. The Ghotul institution among Madia Gonds of Gadchiroli is a traditional youth dormitory where community values, music, and the Rela dance are taught." },
                { title: "Sacred Groves (Devrai)", desc: "Tracts of virgin forest preserved by local communities, dedicated to deities. Hunting and logging are strictly prohibited — an indigenous conservation system predating modern environmentalism." },
                { title: "Phad Irrigation System", desc: "A community-managed irrigation system in the Tapi river basin using check dams (bandharas) to divert river water into canals. An example of traditional water management knowledge still in use." },
                { title: "Traditional Games", desc: "Maharashtra codified the modern rules of Kabaddi (1920s, Pune) and Kho-Kho. Mallakhamb (pole gymnastics) originated as wrestler training under the Peshwas. Kushti (wrestling) thrives in Kolhapur's royal-patronized akhadas." },
                { title: "Bhil & Katkari Communities", desc: "Bhils (Dhule, Nandurbar) are known for archery tradition and the Bhagoria spring festival. The Katkari (Raigad, Thane) — a PVTG — are traditional forest dwellers known for catechu extraction and bamboo work." }
            ]
        },

        chatbot: {
            greeting: "Namaskar! I'm Shrishti, your cultural companion. Ask me anything about Maharashtra's heritage, traditions, and culture.",
            suggestions: [
                "What makes the Wari pilgrimage unique?",
                "Tell me about Warli painting",
                "What food should I try in Maharashtra?",
                "Why is Ganesh Chaturthi so important here?",
                "What are the famous forts and caves?"
            ],
            knowledge: {
                'wari': "The Wari is an annual 21-day pilgrimage where over a million Varkaris walk 250 km from Alandi and Dehu to Pandharpur carrying the Padukas of Sant Dnyaneshwar and Sant Tukaram. It is a powerful egalitarian movement that erases caste and class distinctions, accompanied by the chanting of Abhang devotional poetry.",
                'festival': "Maharashtra celebrates vibrant festivals throughout the year. Ganesh Chaturthi was transformed in 1893 by Lokmanya Tilak into a massive public festival for community unity. Other major festivals include Gudi Padwa (Marathi New Year), Ashadhi Ekadashi (Wari culmination), Dahi Handi, Bail Pola (bull thanksgiving in Vidarbha), and Makar Sankranti.",
                'food': "Maharashtra's cuisine spans five distinct regions: coastal Konkan seafood & Sol Kadhi, spicy Tambda-Pandhra Rassa in Kolhapur, fiery Saoji cuisine in Vidarbha, Khandeshi Shev Bhaji, and Mumbai's iconic Vada Pav and Misal Pav. For sweet festival treats, Ukdiche Modak and Puran Poli are essential!",
                'art': "Maharashtra's art heritage includes GI-tagged Warli painting from Palghar (rice paste on mud walls), the 2,000-year-old Paithani silk weaving with peacock and lotus motifs, Kolhapuri handcrafted leather chappals, and endangered Pinguli Chitrakatha storytelling puppetry from Sindhudurg.",
                'dance': "Dance forms include Lavani (performed in Nirguni and Shringari styles to the 14-beat Dhadya taal), Tamasha folk theatre, the coastal Koli fisherfolk dance, Dhangari Gaja shepherd drumming, and Lezim during Ganesh processions.",
                'history': "Maharashtra's history spans the ancient Satavahanas (Paithan capital), Vakatakas (Ajanta frescoes), Rashtrakutas (Ellora Kailasa temple), Yadavas of Devagiri, and the 17th-century Maratha Empire founded by Chhatrapati Shivaji Maharaj based on Hindavi Swarajya and hill-fort warfare.",
                'fort': "Chhatrapati Shivaji Maharaj developed over 300 forts in the Sahyadris categorized into three types: Girikot (hill forts like Raigad and Sinhagad), Bhuikot (land forts like Naldurg), and Jalkot (sea forts like Sindhudurg and Janjira).",
                'cave': "Maharashtra is home to ancient rock-cut marvels: Ajanta Caves (2nd c. BCE–6th c. CE Buddhist frescoes), Ellora Caves (Cave 16 Kailasa temple is the world's largest monolithic excavation), Elephanta Caves (Trimurti Shiva), and Karla-Bhaja caves.",
                'default': "Namaskar! I'm Shrishti, your cultural guide for Maharashtra. Ask me about the Sahyadri hill forts, the 21-day Pandharpur Wari, Warli geometric art, Paithani weaving, or regional delicacies like Misal Pav and Modak!"
            }
        }
    },

    odisha: {
        id: "odisha",
        name: "Odisha (Puri)",
        tagline: "Sacred Land of Jagannath & Utkala — Ancient temples, Rath Yatra, classical Odissi, and living heritage crafts",
        heroImage: "assets/odisha/hero_odisha.jpg",
        heroImageAlt: "Panoramic view of Shree Jagannath Temple and Puri coastline",
        categoryChips: ["History", "Festivals", "Art", "Cuisine", "Clothing", "Kalinga Architecture", "Puri District Focus"],
        navTitle: "Explore Odisha (Puri)",
        exploreHeading: "Explore Odisha's Heritage",
        intro: "Puri, the sacred coastal headquarters of Puri district in eastern Odisha, is one of Hinduism's cardinal Char Dham pilgrimage centers and the spiritual vortex of the realm historically known as Purushottama Kshetra. Centered upon the monumental 12th-century Shree Jagannath Temple, the region is internationally celebrated for the annual Rath Yatra (Chariot Festival), the world's largest traditional temple kitchen (Roshaghara), classical Odissi dance, and master artisan settlements like the heritage village of Raghurajpur. Its culture represents an ancient, living continuum where Vedic, Shakta, and indigenous Sabara tribal traditions merge under the sovereign canopy of Lord Jagannath. (Note: Research grounded in available Puri district corpus).",
        
        avatar: {
            image: "assets/odisha/avatar_odisha.jpg",
            title: "Odisha (Puri)",
            subtitle: "Your Cultural Guide"
        },
        
        exploreCards: [
            {
                title: "Shree Jagannath Temple",
                tag: "Char Dham Heritage",
                icon: "fa-gopuram",
                image: "assets/odisha/explore_jagannath_temple.jpg",
                imageAlt: "Shree Jagannath Temple 65-meter Kalinga Deula",
                desc: "12th-century architectural marvel of the Kalinga style rising 65 meters (214 ft). Built by the Eastern Gangas, featuring the sanctum (Vimana), assembly hall, dancing hall, and 120+ inner shrines enclosed by Meghnad Pacheri."
            },
            {
                title: "Rath Yatra & Chariots",
                tag: "Chariot Festival",
                icon: "fa-dharmachakra",
                image: "assets/odisha/explore_rath_yatra.jpg",
                imageAlt: "Puri Rath Yatra Chariots on Grand Road",
                desc: "The world's largest chariot festival along Bada Danda. Three colossal wooden chariots — Nandighosh, Taladhwaja, and Darpadalana — constructed anew each year without blueprints or nails using 862 timber pieces."
            },
            {
                title: "Odisha Pattachitra",
                tag: "GI Registered",
                icon: "fa-paint-brush",
                image: "assets/odisha/explore_pattachitra.jpg",
                imageAlt: "Intricate Odisha Pattachitra scroll painting",
                desc: "GI-tagged classical scroll painting on cloth canvas (patta) using 100% natural mineral pigments (Hingula, Haritala, Conch white, Lamp black) and tree gums. Preserved by master chitrakaras since the 12th century."
            },
            {
                title: "Raghurajpur Craft Village",
                tag: "Heritage Village",
                icon: "fa-hands",
                image: "assets/odisha/explore_raghurajpur.jpg",
                imageAlt: "Raghurajpur Heritage Artisan Village street",
                desc: "Internationally celebrated heritage village 14 km from Puri where ~140 artisan households practice Pattachitra, Tala Pattachitra (palm-leaf etching), wood carving, and Gotipua dance gurukuls."
            },
            {
                title: "Classical Odissi & Gotipua",
                tag: "Classical Dance",
                icon: "fa-theater-masks",
                image: "assets/odisha/explore_odissi_dance.jpg",
                imageAlt: "Classical Odissi dancer performing Tribhangi posture",
                desc: "One of India's eight classical dance forms, characterized by Tribhangi (three-bend posture) and Chauka. Rooted in the ancient temple Maharis and young Gotipua acrobatic gurukuls, revived globally from Puri."
            },
            {
                title: "Mahaprasad & Roshaghara",
                tag: "Sacred Gastronomy",
                icon: "fa-utensils",
                image: "assets/odisha/explore_mahaprasad.jpg",
                imageAlt: "Mahaprasad cooked in sacred earthen pots",
                desc: "Cooked in the world's largest traditional kitchen with 752 woodfire hearths. 56 daily preparations cooked in unglazed earthen pots (kudua) stacked atop each other, consecrated at high noon and blessed by Goddess Vimala."
            },
            {
                title: "Sacred Khandua Pata",
                tag: "Textile Heritage",
                icon: "fa-scroll",
                image: "assets/odisha/explore_khandua_pata.jpg",
                imageAlt: "Khandua Pata silk with Gitagovinda calligraphy",
                desc: "Sacred mulberry and tussar silk Bandha (Ikat) textile woven in Nuapatna. Calligraphic Sanskrit verses from Jayadeva's 12th-century Gita Govinda are woven directly into the fabric draped on Jagannath nightly."
            },
            {
                title: "Pipili Appliqué Work",
                tag: "GI Registered",
                icon: "fa-palette",
                image: "assets/odisha/explore_pipili_applique.jpg",
                imageAlt: "Pipili colorful appliqué work with mirror motifs",
                desc: "GI-tagged traditional needlework and colored cloth patchwork (Chandua) with mirrors and floral motifs, crafted by the artisan guilds of Pipili for chariot canopies, temple umbrellas, and festive banners."
            }
        ],

        history: {
            paragraphs: [
                "Puri's historical origins are deeply intertwined with the ancient geo-political realms of <strong>Kalinga, Odra, and Utkala</strong>. Early epigraphic records from the 7th–8th century under the Shailodbhava and Bhauma-Kara dynasties document an ancient wooden shrine. Under the <strong>Eastern Ganga dynasty</strong> (1078–1434 CE), Emperor Anantavarman Chodaganga Deva commissioned the monumental 65-meter Jagannath Deula, completed by Anangabhima Deva III, who consecrated the entire empire to Jagannath (<em>Purushottama-Samrajya</em>).",
                "The <strong>Suryavamsi Gajapatis</strong> (1434–1541 CE) solidified the ruler's role as <em>Adya Sevaka</em> (First Servant), institutionalizing the <em>Chhera Pahara</em> gold-broom sweeping ceremony. During 16th–18th century invasions, servitors covertly sheltered the deities in remote Chilika islands and Marada ('Chhada Deula'). The Marathas (1751–1803) established endowments and regularized the Jagannath Sadak pilgrim route, leading to British administration and the statutory <strong>Shri Jagannath Temple Act of 1955</strong>."
            ],
            image: "assets/odisha/history_gajapati.jpg",
            imageAlt: "Gajapati royal tradition and historical Jagannath heritage",
            factCards: [
                { title: "Historical Eras", desc: "Somavamsi / Early Kalinga → Eastern Ganga Dynasty (1078–1434) → Suryavamsi Gajapati (1434–1541) → Sultanate Invasions → Maratha Era (1751–1803) → British Period → Modern State" },
                { title: "Key Figures", desc: "Anantavarman Chodaganga Deva, Anangabhima Deva III, Kapilendra Deva, Gajapati Prataparudra Deva, Shri Chaitanya Mahaprabhu, Kavi Jayadeva, Atibadi Jagannatha Das" },
                { title: "Legacy", desc: "The Kalinga architectural canon, Gajapati Adya Sevaka statecraft, Madala Panji palm-leaf chronicles, Odia 6th Classical Language status (2014), and unbroken Chhatisa Nijoga hereditary guilds" }
            ]
        },

        festivals: [
            {
                name: "Rath Yatra (ରଥଯାତ୍ରା)",
                time: "Ashadha Shukla Dwitiya (June–July)",
                image: "assets/odisha/fest_rath_yatra.jpg",
                imageAlt: "Pahandi Bije and pulling of the three massive chariots",
                desc: "The monumental 9-day chariot journey of Lord Jagannath, Balabhadra, and Subhadra to Gundicha Temple along the 2.5 km Grand Road. Over a million devotees gather for the rhythmic Pahandi procession and chariot pulling."
            },
            {
                name: "Chandan Yatra (ଚନ୍ଦନ ଯାତ୍ରା)",
                time: "Akshaya Tritiya (Vaisakha) - 42 Days",
                image: "assets/odisha/fest_chandan_yatra.jpg",
                imageAlt: "Chandan Yatra sacred swan boat cruise on Narendra Tank",
                desc: "The longest festival of Puri spanning 42 days. Representative deities (Madanmohana, Rama, Krishna) cruise on swan-shaped ornamental boats (Chapa) in Narendra Pokhari, while master Maharanas commence chariot timber carving."
            },
            {
                name: "Snana Yatra & Anavasara",
                time: "Jyeshtha Purnima (May–June)",
                image: "assets/odisha/fest_snana_yatra.jpg",
                imageAlt: "Snana Yatra 108 pots herbal bathing on Snana Mandapa",
                desc: "The sacred bathing ceremony where deities are poured with 108 pots of herbal water from Suna Kua, followed by Gajanana Besha (elephant attire) and a 15-day total seclusion (Anavasara) for medicinal healing by Daitapatis."
            },
            {
                name: "Suna Besha (ସୁନା ବେଶ)",
                time: "Ashadha Shukla Ekadashi",
                image: "assets/odisha/fest_suna_besha.jpg",
                imageAlt: "Suna Besha golden embellishment of deities on chariots",
                desc: "The grand golden attire ceremony where the three deities rest on their chariots in front of Singhadwara, adorned with over 208 kg of solid gold jewelry, crowns, and golden hands and feet for millions of viewing pilgrims."
            },
            {
                name: "Niladri Bije & Rasagola Offering",
                time: "Ashadha Trayodashi",
                image: "assets/odisha/fest_niladri_bije.jpg",
                imageAlt: "Niladri Bije sweet Rasagola offering to Goddess Lakshmi",
                desc: "The return of the deities to the Ratnavedi inside the sanctum. Goddess Lakshmi closes the temple doors in indignation; Lord Jagannath presents her with sweet Odisha Rasagolas to appease her before entering."
            },
            {
                name: "Jhulan Yatra (ଝୁଲଣ ଯାତ୍ରା)",
                time: "Shravana Shukla Dashami to Purnima",
                image: "assets/odisha/fest_jhulan_yatra.jpg",
                imageAlt: "Jhulan Yatra swing festival in Puri mathas",
                desc: "A vibrant 7-day monsoon swing festival celebrated across the Jagannath Temple and Puri's historic mathas (Emara, Jagannath Ballava), with deities placed on exquisitely decorated floral swings accompanied by Odissi music."
            }
        ],

        dance: {
            text: "Puri is the cradle of classical <strong>Odissi dance</strong> and traditional performing arts. Odissi traces its origins to the 2nd century BCE cave reliefs of Udayagiri and the hereditary temple dancing girls (<strong>Maharis</strong>) of the Jagannath Temple. It was preserved and dynamicized by <strong>Gotipua</strong> gurukuls — young boys trained in acrobatic <em>Bandha Nritya</em>. Revived in the 1950s by legends like Guru Kelucharan Mohapatra, Odissi is defined by its sculptural <em>Tribhangi</em> (three-bend) and <em>Chauka</em> postures.",
            image: "assets/odisha/dance_odissi.jpg",
            imageAlt: "Classical Odissi dance performance showcasing Tribhangi posture",
            items: [
                "<strong>Classical Odissi</strong> — India's classical dance of lyrical grace, sculpture-like postures, and abhinaya on Gita Govinda",
                "<strong>Gotipua Dance</strong> — Acrobatics, Bandha Nritya, and devotional dance preserved in gurukuls like Raghurajpur",
                "<strong>Mahari Tradition</strong> — Historical consecrated female temple servitor dance performed in the Natamandapa",
                "<strong>Pala (ପାଲା)</strong> — Sophisticated Sanskrit-Odia musical debate led by a Gayaka with a flywhisk and cymbals",
                "<strong>Daskathia (ଦାସକାଠିଆ)</strong> — Dynamic two-person ballad performance clicking polished wooden castanets (kathi)",
                "<strong>Sahi Jata</strong> — Traditional street theatre during Rama Navami organized by Puri's ancient martial Akhadas (Jaga Gharas)"
            ]
        },

        music: {
            text: "<strong>Odissi Sangita</strong> is an independent classical music system distinct from both North Indian Hindustani and South Indian Carnatic systems, documented in classical treatises such as the <em>Sangita Narayana</em> and <em>Gita Prakasa</em>. It features distinct ragas (Kalyana Ahari, Mohana, Asavari), talas (Jhampa, Triputa), and lyrical compositions from Jayadeva's 12th-century <em>Gita Govinda</em> sung nightly at the Badasinghara ritual before the temple doors are locked.",
            quote: "Sacred Instruments of Puri: The two-headed classical Mardala drum, and the Panchamahabadya ensemble — Ghanta (cymbals), Kahali (brass horns), Dhol, Bheri, and Mahuri — accompany every divine procession from Pahandi to the nightly lullaby.",
            image: "assets/odisha/music_mardala.jpg",
            imageAlt: "Odissi Mardala classical percussive drum and temple instruments"
        },

        painting: [
            {
                image: "assets/odisha/paint_pattachitra.jpg",
                imageAlt: "Master Odisha Pattachitra scroll painting with natural pigments",
                caption: "<strong>Odisha Pattachitra</strong> — GI-tagged classical scroll painting on cloth canvas (patta) treated with tamarind seed paste and chalk powder. Uses 100% natural mineral pigments (Hingula, Haritala, Conch white, Lamp black, Geru) and lacquer varnish."
            },
            {
                image: "assets/odisha/paint_tala_patta.jpg",
                imageAlt: "Tala Pattachitra palm-leaf engraving with iron stylus",
                caption: "<strong>Tala Pattachitra (Palm-Leaf Engraving)</strong> — Dried palm leaves (Corypha umbraculifera) etched with a fine iron stylus (Lekhani) and rubbed with lamp black to reveal microscopic, hair-thin illustrations of epics and flora."
            },
            {
                image: "assets/odisha/paint_anasara_patti.jpg",
                imageAlt: "Anasara Patti temporary temple deity paintings",
                caption: "<strong>Anasara Patti</strong> — Sacred cloth paintings of Ananta Narayana, Ananta Vasudeva, and Bhubaneswari painted by Chitrakaras to substitute for the secluded deities during the 15-day Anavasara fever period."
            }
        ],

        crafts: [
            {
                title: "Pipili Applique (Chandua)",
                image: "assets/odisha/craft_pipili.jpg",
                imageAlt: "Pipili applique craft with vibrant cloth stitching and mirrors",
                desc: "GI-tagged textile craft from Pipili featuring colorful cut-cloth motifs stitched with mirrors and embroidery onto canvas bases. Used for Rath Yatra canopies (chhatris), tarasas, and temple banners."
            },
            {
                title: "Stone Carving (ଶିଳ୍ପକଳା)",
                image: "assets/odisha/craft_stone_carving.jpg",
                imageAlt: "Kalinga stone carving in sandstone and chlorite",
                desc: "Millennia-old sculpting tradition practiced by the Pathuria community in Puri, Konark, and Raghurajpur using sandstone, khondalite, and black chlorite (Kochila pathara) for temple restoration and sculptures."
            },
            {
                title: "Traditional Wood Carving",
                image: "assets/odisha/craft_wood_carving.jpg",
                imageAlt: "Raghurajpur traditional wooden mask and deity carving",
                desc: "Crafted by hereditary Maharanas using neem, maharukha, and gambhari wood for chariot components, traditional theatre masks, miniature Jagannath icons, and painted wooden toys."
            },
            {
                title: "Puri Sea Shell Craft",
                image: "assets/odisha/craft_seashell.jpg",
                imageAlt: "Conch shell carving and mother-of-pearl artifacts",
                desc: "Artisans along Swargadwar and coastal Puri carve natural marine conch shells (Turbinella pyrum), cowrie shells, and mother-of-pearl into ritual blowing conches (Shankha), bangles, and tableaus."
            },
            {
                title: "Puri Sand Art (ବାଲୁକା କଳା)",
                image: "assets/odisha/craft_sand_art.jpg",
                imageAlt: "Sand art sculpture on Puri Golden Beach",
                desc: "Globally acclaimed contemporary art form born on Puri's Golden Beach, pioneered by master sculptors like Padma Shri Sudarsan Pattnaik to craft monumental, detailed thematic sculptures."
            }
        ],

        cuisine: {
            intro: "Puri's gastronomy is an ancient, refined balance between sacred temple vegetarianism and littoral coastal cuisine. Odia culinary philosophy strictly avoids pungent aromatics (onion and garlic are forbidden in temple codes) while utilizing delicate tempering with Pancha Phutana (mustard, cumin, fenugreek, aniseed, kalonji), pure cow ghee, coconut, and raw tropical produce (plantains, elephant apple / Ouu, colocasia, green papaya).",
            foods: [
                {
                    name: "Mahaprasad (Abadha)",
                    tags: ["Sacred Temple", "56 Bhog"],
                    image: "assets/odisha/food_mahaprasad_thali.jpg",
                    imageAlt: "Sacred Mahaprasad meal served in earthen pots",
                    desc: "Consecrated food cooked in unglazed clay pots (kudua) in the Roshaghara, offered to Jagannath and blessed by Goddess Vimala. Includes Kanika sweet rice, Dalma, and Besara."
                },
                {
                    name: "Dalma (ଡାଲମା)",
                    tags: ["Vegetarian", "Odia Classic"],
                    image: "assets/odisha/food_dalma.jpg",
                    imageAlt: "Traditional Odia Dalma cooked with lentils and raw vegetables",
                    desc: "The quintessential Odia dish — split yellow lentils slow-cooked with pumpkin, raw papaya, colocasia, and plantain, tempered with Pancha Phutana and roasted cumin-chili powder."
                },
                {
                    name: "Pakhala Bhata (ପଖାଳ)",
                    tags: ["Summer Staple", "Probiotic"],
                    image: "assets/odisha/food_pakhala.jpg",
                    imageAlt: "Fermented Pakhala Bhata water-rice with Badi Chura",
                    desc: "Fermented water-rice staple of Odisha, rich in beneficial cooling probiotics. Served traditionally with crispy Badi Chura, roasted vegetables, and fried seasonal greens during hot summers."
                },
                {
                    name: "Puri Khaja (ଖଜା)",
                    tags: ["Dry Mahaprasad", "Crispy Sweet"],
                    image: "assets/odisha/food_khaja.jpg",
                    imageAlt: "Crispy golden layered Puri Khaja",
                    desc: "Signature dry sweet of Puri — multiple delicate layers of refined flour dough fried in ghee and dipped in fragrant sugar syrup, prepared daily by temple Bhoga makers."
                },
                {
                    name: "Odisha Rasagola (ରସଗୋଲା)",
                    tags: ["GI Tag 612", "Temple Sweet"],
                    image: "assets/odisha/food_rasagola.jpg",
                    imageAlt: "Traditional soft brown Odisha Rasagola",
                    desc: "GI-tagged cottage cheese (chhana) sweet offered to Goddess Lakshmi during Niladri Bije since medieval times (documented in the 15th-century Dandi Ramayana by Balarama Das)."
                },
                {
                    name: "Poda Pitha (ପୋଡ଼ ପିଠା)",
                    tags: ["Baked Cake", "Festival Food"],
                    image: "assets/odisha/food_poda_pitha.jpg",
                    imageAlt: "Slow-baked Poda Pitha with coconut and jaggery",
                    desc: "Traditional slow-baked sweet cake of rice flour, grated coconut, jaggery, cardamom, and black pepper, traditionally offered to Jagannath at Mausi Maa temple during Bahuda Yatra."
                }
            ]
        },

        clothing: [
            {
                title: "Khandua Pata (ଗୀତଗୋବିନ୍ଦ ପାଟ)",
                image: "assets/odisha/attire_khandua_pata.jpg",
                imageAlt: "Khandua Pata silk with Gitagovinda calligraphy",
                desc: "Sacred mulberry and tussar silk Bandha (Ikat) textile woven traditionally by the weavers of Nuapatna. Calligraphic Sanskrit verses from Jayadeva's 12th-century <em>Gita Govinda</em> are woven directly into the red and yellow silk fabric, draped on Lord Jagannath nightly during Badasinghara Besha.",
                details: [
                    { label: "Fabric", val: "Pure Mulberry & Tussar Silk with Bandha (Ikat) tie-dye" },
                    { label: "Occasion", val: "Nightly Badasinghara Besha & high temple rituals" },
                    { label: "Significance", val: "Sacred calligraphic textile preserving 12th-century Gita Govinda verses" }
                ]
            },
            {
                title: "Classical Odissi Costume & Tarakasi",
                image: "assets/odisha/attire_odissi_costume.jpg",
                imageAlt: "Traditional Odissi dancer costume and silver filigree jewelry",
                desc: "Odissi dancers wear handloom silk sarees (Sambalpuri or Bomkai) tailored with front fan pleats for swift movements. Adorned with intricate Cuttack Tarakasi (silver filigree) jewelry — necklaces, ear-covers (Kapa), waist-belt (Bengapatia), and the white reed crown (Tahia).",
                details: [
                    { label: "Fabric", val: "Odisha Handloom Silk (Sambalpuri / Bomkai / Ikat)" },
                    { label: "Occasion", val: "Classical Odissi dance recitals and temple performances" },
                    { label: "Significance", val: "Features silver filigree ornaments representing temple architectural motifs" }
                ]
            },
            {
                title: "Sevayat Dhoti & Gamucha",
                image: "assets/odisha/attire_sevayat_dhoti.jpg",
                imageAlt: "Traditional white cotton Sevayat Dhoti with red border and Gamucha",
                desc: "Temple servitors (sevayats) wear unbleached pure cotton dhotis with sacred red or yellow borders (Pata / Sadha) along with the traditional checked handloom <strong>Gamucha</strong>. Pilgrims and local men wear unstitched cotton garments during sanctum rituals and temple festivals.",
                details: [
                    { label: "Fabric", val: "Pure handloom cotton with dyed temple borders" },
                    { label: "Occasion", val: "Daily temple service, ritual ceremonies, and pilgrimages" },
                    { label: "Significance", val: "Traditional ritual purity dress codified in the Record of Rights (RoR)" }
                ]
            }
        ],

        languages: [
            {
                title: "Classical Odia (ଓଡ଼ିଆ)",
                desc: "Official state language and India's 6th Classical Language (accorded in 2014). An Indo-Aryan language with over 2,000 years of unbroken literary antiquity, written in the distinctive rounded Odia script (formerly inscribed on palm leaves).",
                sample: "\"Jai Jagannath\" (ଜୟ ଜଗନ୍ନାଥ) — the universal cultural greeting"
            },
            {
                title: "Kavi Jayadeva & Gita Govinda",
                desc: "12th-century Sanskrit lyric masterpiece composed near Puri by Kavi Jayadeva. Celebrating the divine love of Radha and Krishna, its 24 Ashtapadis are woven into temple textiles and sung nightly before the deities.",
                sample: "Text: Gita Govinda (ଗୀତଗୋବିନ୍ଦ)"
            },
            {
                title: "Sarala Das's Mahabharata",
                desc: "Composed in the 15th century by Sarala Das, this work is the foundational vernacular epic of Odisha. It localized classical puranic episodes into Odia cultural geography and established Odia as a literary powerhouse.",
                sample: "Text: Odia Mahabharata (୧୫ଶ ଶତାବ୍ଦୀ)"
            },
            {
                title: "Panchasakha Literature",
                desc: "16th-century mystic literary movement led by Balarama Das (Dandi Ramayana), Atibadi Jagannatha Das (Odia Bhagavata), Achyutananda, Jasovanta, and Ananta Das, establishing egalitarian vernacular Bhakti.",
                sample: "Text: Odia Bhagavata & Dandi Ramayana"
            },
            {
                title: "Essential Visitor Vocabulary",
                desc: "Everyday Odia phrases for visitors: \"Dhanyabad\" (Thank you), \"Mandira keunthi?\" (Where is the temple?), \"Mote Mahaprasad diyantu\" (Please give me Mahaprasad), \"Bahut sundar\" (Very beautiful).",
                sample: "\"Dhanyabad\" (ଧନ୍ୟବାଦ) — Thank you"
            },
            {
                title: "Linguistic Research Note",
                desc: "Content is grounded in coastal Puri's classical Odia literary and temple lexicon. Broader regional dialects of western (Sambalpuri/Kosli) and northern Odisha are distinct and documented in regional gazetteers.",
                sample: "Source: Ministry of Culture Classical Language Dossier"
            }
        ],

        monuments: [
            {
                title: "Shree Jagannath Temple Complex",
                era: "Eastern Ganga Dynasty — 12th Century CE",
                image: "assets/odisha/monument_jagannath.jpg",
                imageAlt: "Shree Jagannath Temple main sanctum (Rekha Deula)",
                desc: "Centrally Protected by ASI. Monumental 65-meter (214 ft) Kalinga Rekha Deula housing the Chaturdha Murti. Enclosed by two concentric stone walls (Meghnad Pacheri and Kurma Bedha) with 120+ inner shrines, the Nilachakra, and Aruna Stambha.",
                badges: ["ASI Centrally Protected", "Char Dham", "Kalinga Architecture"]
            },
            {
                title: "Lokanath Temple",
                era: "Somavamsi / Early Ganga Period",
                image: "assets/odisha/monument_lokanath.jpg",
                imageAlt: "Lokanath Temple in western Puri",
                desc: "Ancient Shaivite shrine in western Puri where the Shivalinga remains perpetually submerged in a natural underground natural spring basin. The waters are drained only once a year on Pankoddhar Ekadashi before Shivaratri.",
                badges: ["State Protected", "Submerged Shivalinga", "Shaivite Heritage"]
            },
            {
                title: "Markandeshwar Temple & Tank",
                era: "Bhauma-Kara / Somavamsi (10th–11th Century)",
                image: "assets/odisha/monument_markandeshwar.jpg",
                imageAlt: "Markandeshwar Temple and stepped sacred water tank",
                desc: "State-protected temple situated next to the holy Markandeya Pokhari. Features ten-armed Nataraja carvings, Kirtimukha friezes, and stepped laterite bathing ghats used for ancient purificatory ablutions.",
                badges: ["State Protected", "Sacred Ghat", "10th-11th Century"]
            },
            {
                title: "Gundicha Temple (Yajna Vedi)",
                era: "Ganga / Gajapati Reconstructions",
                image: "assets/odisha/monument_gundicha.jpg",
                imageAlt: "Gundicha Temple walled garden orchard and deula",
                desc: "Garden temple situated 2.5 km north along Bada Danda. Known as the 'Janma Janaki' or birthplace of the deities, it serves as the summer residence of the Triad for 7 days during the annual Rath Yatra.",
                badges: ["Rath Yatra Residence", "Kalinga Style", "Bada Danda Terminus"]
            },
            {
                title: "Sun Temple, Konark (Circuit Link)",
                era: "Eastern Ganga (Narasimhadeva I, 13th Century)",
                image: "assets/odisha/monument_konark.jpg",
                imageAlt: "Konark Sun Temple stone chariot wheel",
                desc: "UNESCO World Heritage Site located 35 km from Puri along the coastal Marine Drive. Conceived as a colossal stone chariot of Surya with 24 carved wheels and 7 horses — a pinnacle of Kalinga architectural engineering.",
                badges: ["UNESCO World Heritage (1984)", "Kalinga Pinnacle", "Puri Circuit Link"]
            }
        ],

        tribal: {
            text: "While Odisha is home to 62 distinct Scheduled Tribe communities across its interior highlands, Puri is culturally unique in preserving an archaic <strong>tribal-Brahmanic synthesis</strong>. Anthropologists (Dr. Benimadhab Padhi, Prof. Anncharlott Eschmann) document that Lord Jagannath originated as <em>Kitung</em> / <em>Daru Brahma</em> (a wooden pillar deity) worshipped by the Austroasiatic <strong>Sabara (Saora) tribe</strong> under chieftain Viswavasu. The non-Brahmin <strong>Daitapati servitors</strong> of the temple, claiming Sabara descent, hold exclusive authority during the sacred <em>Anavasara</em> convalescence and the periodic <em>Nabakalebara</em> ritual renewal.",
            image: "assets/odisha/tribal_sabara_heritage.jpg",
            imageAlt: "Saora tribal heritage and Sabara cultural traditions of Odisha",
            practices: [
                { title: "Daitapati Servitor Lineage", desc: "Hereditary temple servitors tracing descent to the Sabara chieftain Viswavasu, who hold supreme custody of the deities during intimate, non-Vedic healing and renewal ceremonies." },
                { title: "Daru Brahma (Wooden Deity)", desc: "Unlike traditional Hindu stone/metal murtis, Jagannath is carved from sacred Neem timber (Daru), reflecting indigenous tree-worship traditions renewed during Nabakalebara." },
                { title: "Kudua & Woodfire Cooking", desc: "The preparation of Mahaprasad in unglazed clay pots (kudua) stacked over woodfire in the Roshaghara preserves pre-Vedic communal cooking methods." },
                { title: "Asoucha (Bereavement Mourning)", desc: "When the old wooden deities are given Maha Samadhi (sacred burial) in Koili Baikuntha during Nabakalebara, Daitapatis observe formal 10-day family bereavement rites." },
                { title: "Phuluri Tela Convalescence", desc: "During the 15-day post-bathing Anavasara fever, the deities receive exclusive medicinal herbal oil treatments (Phuluri Tela) and raw fruit diets from Daitapatis." },
                { title: "Geographic Research Scope", desc: "Research reflects the specific Sabara-Daitapati heritage of coastal Puri. Broader tribal traditions of inland Odisha (Dongria Kondh, Santhal, Bonda) are distinct cultural entities." }
            ]
        },

        chatbot: {
            greeting: "Jai Jagannath! I'm Shrishti, your cultural guide for Odisha (Puri). Ask me about the 12th-century Jagannath Temple, Rath Yatra chariots, Pattachitra paintings, sacred Mahaprasad, or classical Odissi!",
            suggestions: [
                "How are the Rath Yatra chariots built?",
                "What is unique about Odisha Pattachitra?",
                "Tell me about the 56 Bhog Mahaprasad",
                "What are the tribal roots of Lord Jagannath?",
                "What makes Odissi dance unique?"
            ],
            knowledge: {
                'rath': "The Rath Yatra is the world's largest chariot festival where three massive wooden chariots — Nandighosh (Jagannath, 45 ft, 16 wheels), Taladhwaja (Balabhadra, 44 ft, 14 wheels), and Darpadalana (Subhadra, 43 ft, 12 wheels) — are built anew every year without blueprints or nails using 862 timber logs, pulled along the 2.5 km Grand Road by over a million pilgrims.",
                'chariot': "The three chariots are built annually by hereditary master craftsmen (Maharanas, Kamaras) starting on Akshaya Tritiya. Nandighosh has 16 wheels with red and yellow fabric; Taladhwaja has 14 wheels with red and green fabric; Darpadalana has 12 wheels with red and black fabric.",
                'temple': "The Shree Jagannath Temple in Puri is a 12th-century Kalinga architectural masterpiece rising 65 meters (214 ft). Built by Eastern Ganga King Chodaganga Deva and Anangabhima Deva III, it features the Vimana, Jagamohana, Natamandapa, Bhoga Mandapa, and 120+ inner shrines enclosed by the Meghnad Pacheri wall.",
                'food': "Puri's food is centered around sacred Mahaprasad cooked in the world's largest traditional kitchen (Roshaghara) with 752 hearths. Signature dishes include Dalma (lentils with raw vegetables), Kanika sweet rice, Pakhala Bhata (probiotic fermented rice), crisp Puri Khaja, and GI-tagged Odisha Rasagola offered during Niladri Bije.",
                'mahaprasad': "Mahaprasad is cooked in unglazed clay pots (kudua) stacked atop woodfire ovens in the temple Roshaghara. Once offered to Lord Jagannath and blessed by Goddess Vimala in her 9th-century shrine, it becomes Mahaprasad and is shared without caste or class discrimination in Anand Bazaar.",
                'pattachitra': "Odisha Pattachitra is a GI-tagged classical scroll painting tradition from Raghurajpur and Puri. Painted on cloth treated with tamarind seed paste and chalk powder, using 100% natural mineral pigments (Hingula, Haritala, Conch white, Lamp black) and fine mongoose/squirrel hair brushes, finished with glowing lac varnish.",
                'raghurajpur': "Raghurajpur is India's premier heritage craft village, 14 km from Puri, where ~140 households actively practice Pattachitra painting, Tala Pattachitra (palm-leaf engraving with iron styluses), wood carving, and Gotipua dance gurukuls.",
                'dance': "Odissi is one of India's eight classical dances, characterized by Tribhangi (three-bend posture) and Chauka. It evolved from ancient temple Maharis and Gotipua boys' acrobatics, revived globally in the 1950s by legends like Guru Kelucharan Mohapatra.",
                'tribal': "Lord Jagannath originated as 'Daru Brahma' (wooden pillar deity) worshipped by the Austroasiatic Sabara tribe under chieftain Viswavasu. The non-Brahmin Daitapati priests trace descent from Viswavasu and maintain exclusive ritual authority during Anavasara and Nabakalebara.",
                'rasagola': "Odisha Rasagola received GI Tag No. 612 in 2019, supported by historical evidence that the soft cottage cheese sweet has been offered to Goddess Lakshmi during Niladri Bije since at least the 12th–15th century, described in Balarama Das's 15th-century Odia Dandi Ramayana.",
                'nabakalebara': "Nabakalebara is the periodic renewal of the wooden deities occurring every 8 to 19 years when an extra month (Adhimasa) of Ashadha occurs. It involves a sacred search for neem trees (Banajaga Yatra), secret carving, and the midnight transfer of the mysterious life-force (Brahma Padartha).",
                'default': "Jai Jagannath! I'm Shrishti, your cultural guide for Odisha (Puri). Ask me about the 12th-century Jagannath Temple, Rath Yatra chariots, Pattachitra paintings, sacred Mahaprasad, or classical Odissi!"
            }
        }
    }
};

// ==================== STATE MANAGEMENT ==================== //
let currentRegionKey = 'maharashtra';

document.addEventListener('DOMContentLoaded', function() {
    // 1. Check URL parameters for region/state
    const urlParams = new URLSearchParams(window.location.search);
    const regionParam = (urlParams.get('region') || urlParams.get('state') || '').toLowerCase();
    
    if (regionParam === 'odisha' || regionParam === 'puri') {
        currentRegionKey = 'odisha';
    } else {
        currentRegionKey = 'maharashtra';
    }
    
    // 2. Initialize UI Components
    initializeRegionSwitcher();
    loadRegionalContent(currentRegionKey);
    initializeNavigation();
    initializeChatbot();
    initializeSuggestions();
    initializeScrollSpy();
    initializeMobileMenu();
    initializeCardHoverEffects();
});

// ==================== REGION SWITCHER ==================== //
function initializeRegionSwitcher() {
    const pillButtons = document.querySelectorAll('.region-pill-btn');
    
    pillButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetRegion = this.getAttribute('data-region');
            
            if (targetRegion && REGIONAL_DATA[targetRegion]) {
                currentRegionKey = targetRegion;
                
                // Update URL parameter without full reload
                const newUrl = new URL(window.location);
                newUrl.searchParams.set('region', targetRegion);
                window.history.pushState({}, '', newUrl);
                
                // Update active pill button
                pillButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Load Content for selected region
                loadRegionalContent(targetRegion);
                
                // Scroll smoothly to top of main content
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Handle browser back/forward navigation
    window.addEventListener('popstate', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const regionParam = (urlParams.get('region') || urlParams.get('state') || '').toLowerCase();
        const targetRegion = (regionParam === 'odisha' || regionParam === 'puri') ? 'odisha' : 'maharashtra';
        if (targetRegion !== currentRegionKey && REGIONAL_DATA[targetRegion]) {
            currentRegionKey = targetRegion;
            loadRegionalContent(targetRegion);
        }
    });
}

// ==================== REGIONAL DATA RENDERER ==================== //
function loadRegionalContent(regionKey) {
    const data = REGIONAL_DATA[regionKey];
    if (!data) return;
    
    console.log(`[VIRASAT] Loading regional content for: ${data.name}`);
    
    // 1. Page Title & Meta
    document.title = `VIRASAT — ${data.name} Heritage | The Heritage of India`;
    
    // 2. Navigation Title & Active Pill Sync
    const navTitle = document.querySelector('.nav-title');
    if (navTitle) navTitle.textContent = data.navTitle;
    
    const pillButtons = document.querySelectorAll('.region-pill-btn');
    pillButtons.forEach(btn => {
        if (btn.getAttribute('data-region') === regionKey) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 3. Regional Header
    const regionNameEl = document.querySelector('.region-name');
    if (regionNameEl) regionNameEl.textContent = data.name;
    
    const regionTaglineEl = document.querySelector('.region-tagline');
    if (regionTaglineEl) regionTaglineEl.textContent = data.tagline;
    
    const headerImgEl = document.querySelector('.header-image img');
    if (headerImgEl) {
        headerImgEl.src = data.heroImage;
        headerImgEl.alt = data.heroImageAlt;
    }
    
    const chipsContainer = document.querySelector('.category-chips');
    if (chipsContainer) {
        chipsContainer.innerHTML = data.categoryChips.map(chip => `<span class="chip">${chip}</span>`).join('');
    }
    
    // 4. Cultural Introduction
    const introTextEl = document.querySelector('.intro-text');
    if (introTextEl) introTextEl.textContent = data.intro;
    
    // 5. Explore Heritage Cards
    const exploreSectionTitle = document.querySelector('.explore-heritage-section .section-title');
    if (exploreSectionTitle) {
        exploreSectionTitle.innerHTML = `<i class="fas fa-compass"></i> ${data.exploreHeading || "Explore " + data.name + "'s Heritage"}`;
    }

    const exploreGrid = document.querySelector('.explore-grid');
    if (exploreGrid && data.exploreCards) {
        exploreGrid.innerHTML = data.exploreCards.map(card => `
            <div class="explore-card">
                <div class="explore-image-wrapper">
                    <img src="${card.image}" alt="${card.imageAlt}" class="explore-img">
                    <span class="explore-tag">${card.tag}</span>
                </div>
                <div class="explore-card-body">
                    <div class="explore-card-header">
                        <div class="explore-icon"><i class="fas ${card.icon}"></i></div>
                        <h3>${card.title}</h3>
                    </div>
                    <p>${card.desc}</p>
                </div>
            </div>
        `).join('');
    }
    
    // 6. History Section
    const historyEditorial = document.querySelector('#history .editorial-block');
    if (historyEditorial && data.history) {
        historyEditorial.innerHTML = data.history.paragraphs.map((p, idx) => 
            `<p ${idx > 0 ? 'style="margin-top:1rem;"' : ''}>${p}</p>`
        ).join('');
    }
    
    const historyImg = document.querySelector('#history .image-block img');
    if (historyImg && data.history) {
        historyImg.src = data.history.image;
        historyImg.alt = data.history.imageAlt;
    }
    
    const historyFactCards = document.querySelector('#history .fact-cards');
    if (historyFactCards && data.history.factCards) {
        historyFactCards.innerHTML = data.history.factCards.map(fc => `
            <div class="fact-card">
                <h4>${fc.title}</h4>
                <p>${fc.desc}</p>
            </div>
        `).join('');
    }
    
    // 7. Festivals Section
    const festivalGrid = document.querySelector('.festival-grid');
    if (festivalGrid && data.festivals) {
        festivalGrid.innerHTML = data.festivals.map(fest => `
            <div class="festival-card">
                <div class="festival-image">
                    <img src="${fest.image}" alt="${fest.imageAlt}">
                </div>
                <div class="festival-info">
                    <h3>${fest.name}</h3>
                    <p>${fest.desc}</p>
                    <span class="festival-time">${fest.time}</span>
                </div>
            </div>
        `).join('');
    }
    
    // 8. Art Forms
    // 8a. Dance
    const danceImg = document.querySelector('#dance .showcase-image img');
    if (danceImg && data.dance) {
        danceImg.src = data.dance.image;
        danceImg.alt = data.dance.imageAlt;
    }
    const danceContent = document.querySelector('#dance .showcase-content');
    if (danceContent && data.dance) {
        danceContent.innerHTML = `
            <p>${data.dance.text}</p>
            <div class="highlight-box">
                <strong>Key Dance & Theatrical Forms:</strong>
                <ul>
                    ${data.dance.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // 8b. Music
    const musicContent = document.querySelector('#music .showcase-content');
    if (musicContent && data.music) {
        musicContent.innerHTML = `
            <p>${data.music.text}</p>
            <div class="cultural-quote">
                <i class="fas fa-quote-left"></i>
                <p>${data.music.quote}</p>
            </div>
        `;
    }
    const musicImg = document.querySelector('#music .showcase-image img');
    if (musicImg && data.music) {
        musicImg.src = data.music.image;
        musicImg.alt = data.music.imageAlt;
    }
    
    // 8c. Painting
    const paintingGallery = document.querySelector('.art-gallery');
    if (paintingGallery && data.painting) {
        paintingGallery.innerHTML = data.painting.map(p => `
            <div class="gallery-item">
                <img src="${p.image}" alt="${p.imageAlt}">
                <p class="gallery-caption">${p.caption}</p>
            </div>
        `).join('');
    }
    
    // 8d. Crafts
    const craftGrid = document.querySelector('.craft-grid');
    if (craftGrid && data.crafts) {
        craftGrid.innerHTML = data.crafts.map(c => `
            <div class="craft-card">
                <img src="${c.image}" alt="${c.imageAlt}">
                <h4>${c.title}</h4>
                <p>${c.desc}</p>
            </div>
        `).join('');
    }
    
    // 9. Cuisine Section
    const cuisineIntroP = document.querySelector('.cuisine-intro p');
    if (cuisineIntroP && data.cuisine) cuisineIntroP.textContent = data.cuisine.intro;
    
    const foodGrid = document.querySelector('.food-grid');
    if (foodGrid && data.cuisine.foods) {
        foodGrid.innerHTML = data.cuisine.foods.map(f => `
            <div class="food-card">
                <div class="food-image">
                    <img src="${f.image}" alt="${f.imageAlt}">
                </div>
                <div class="food-details">
                    <h4>${f.name}</h4>
                    <p>${f.desc}</p>
                    <div class="food-tags">
                        ${f.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // 10. Traditional Clothing Section
    const clothingShowcase = document.querySelector('.clothing-showcase');
    if (clothingShowcase && data.clothing) {
        clothingShowcase.innerHTML = data.clothing.map(c => `
            <div class="clothing-card">
                <div class="clothing-visual">
                    <img src="${c.image}" alt="${c.imageAlt}">
                </div>
                <div class="clothing-info">
                    <h3>${c.title}</h3>
                    <p>${c.desc}</p>
                    <div class="detail-list">
                        ${c.details.map(d => `
                            <div class="detail-item">
                                <strong>${d.label}:</strong> ${d.val}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // 11. Languages Section
    const languageCards = document.querySelector('.language-cards');
    if (languageCards && data.languages) {
        languageCards.innerHTML = data.languages.map(l => `
            <div class="language-card">
                <h4>${l.title}</h4>
                <p>${l.desc}</p>
                <div class="language-sample">
                    <em>${l.sample}</em>
                </div>
            </div>
        `).join('');
    }
    
    // 12. Historical Places & Monuments
    const monumentTimeline = document.querySelector('.monument-timeline');
    if (monumentTimeline && data.monuments) {
        monumentTimeline.innerHTML = data.monuments.map(m => `
            <div class="monument-card">
                <div class="monument-image">
                    <img src="${m.image}" alt="${m.imageAlt}">
                </div>
                <div class="monument-details">
                    <h3>${m.title}</h3>
                    <span class="monument-era">${m.era}</span>
                    <p>${m.desc}</p>
                    <div class="monument-facts">
                        ${m.badges.map(b => `<span class="fact-badge">${b}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // 13. Indigenous / Tribal Practices
    const tribalTextP = document.querySelector('.tribal-text p');
    if (tribalTextP && data.tribal) tribalTextP.innerHTML = data.tribal.text;
    
    const tribalImg = document.querySelector('.tribal-block img');
    if (tribalImg && data.tribal) {
        tribalImg.src = data.tribal.image;
        tribalImg.alt = data.tribal.imageAlt;
    }
    
    const practiceCards = document.querySelector('.practice-cards');
    if (practiceCards && data.tribal.practices) {
        practiceCards.innerHTML = data.tribal.practices.map(p => `
            <div class="practice-card">
                <h4>${p.title}</h4>
                <p>${p.desc}</p>
            </div>
        `).join('');
    }
    
    // 14. Right Panel Avatar & AI Guide
    const avatarImg = document.querySelector('.regional-avatar');
    if (avatarImg && data.avatar) {
        avatarImg.src = data.avatar.image;
        avatarImg.alt = `${data.name} Cultural Guide`;
    }
    
    const avatarRegionEl = document.querySelector('.avatar-region');
    if (avatarRegionEl) avatarRegionEl.textContent = data.avatar.title;
    
    const avatarSubtitleEl = document.querySelector('.avatar-subtitle');
    if (avatarSubtitleEl) avatarSubtitleEl.textContent = data.avatar.subtitle;
    
    const chatIntroP = document.querySelector('.chat-intro p');
    if (chatIntroP && data.chatbot) {
        chatIntroP.textContent = data.chatbot.greeting;
    }
    
    // Update Chatbot suggestions
    const suggestionsContainer = document.querySelector('.suggested-questions');
    if (suggestionsContainer && data.chatbot.suggestions) {
        suggestionsContainer.innerHTML = `
            <p class="suggestions-label">Try asking:</p>
            ${data.chatbot.suggestions.map(s => `
                <button class="suggestion-btn">
                    <i class="fas fa-comment-dots"></i>
                    ${s}
                </button>
            `).join('')}
        `;
        // Re-bind suggestion buttons click handlers
        initializeSuggestions();
    }
    
    // Update Chatbot input placeholder & clear input
    const chatInput = document.querySelector('.chat-input');
    if (chatInput) {
        chatInput.placeholder = `Ask Shrishti about ${data.name}...`;
        chatInput.value = '';
    }

    // Clear previous chat messages when switching region
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        chatMessages.innerHTML = '';
    }
    
    // Re-initialize hover effects on newly rendered cards
    initializeCardHoverEffects();
}

// ==================== NAVIGATION FUNCTIONALITY ==================== //
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-sublist a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    updateActiveNavItem(this);
                }
            }
        });
    });
}

function updateActiveNavItem(clickedLink) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const parentNavItem = clickedLink.closest('.nav-item');
    if (parentNavItem) {
        parentNavItem.classList.add('active');
    }
}

// ==================== SCROLL SPY ==================== //
function initializeScrollSpy() {
    const sections = document.querySelectorAll('.content-section');
    const navItems = document.querySelectorAll('.nav-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                navItems.forEach(item => {
                    item.classList.remove('active');
                    const link = item.querySelector(`a[href="#${sectionId}"]`);
                    if (link) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ==================== CHATBOT FUNCTIONALITY ==================== //
let virasatSessionId = null;

function initializeChatbot() {
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (sendBtn && chatInput && chatMessages) {
        sendBtn.onclick = function() {
            sendMessage(chatInput, chatMessages);
        };
        
        chatInput.onkeypress = function(e) {
            if (e.key === 'Enter') {
                sendMessage(chatInput, chatMessages);
            }
        };
    }
}

function sendMessage(chatInput, chatMessages) {
    const message = chatInput.value.trim();
    
    if (message !== '') {
        // Add user message
        addMessage(chatMessages, message, 'user');
        chatInput.value = '';
        
        const chatApi = window.__virasatChat?.send;
        if (chatApi) {
            chatApi({ session_id: virasatSessionId, region_id: currentRegionKey, message })
                .then(response => {
                    virasatSessionId = response.session_id;
                    addMessage(chatMessages, response.reply, 'ai');
                })
                .catch(() => {
                    addMessage(chatMessages, generateAIResponse(message), 'ai');
                });
        } else {
            setTimeout(function() {
                addMessage(chatMessages, generateAIResponse(message), 'ai');
            }, 600);
        }
    }
}

function addMessage(container, text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// Region-Aware AI Response Engine
function generateAIResponse(userMessage) {
    const region = REGIONAL_DATA[currentRegionKey] || REGIONAL_DATA.maharashtra;
    const knowledge = region.chatbot.knowledge || {};
    const lower = userMessage.toLowerCase();
    
    // Check keyword matches in current region knowledge base
    for (const [key, response] of Object.entries(knowledge)) {
        if (key !== 'default' && lower.includes(key)) {
            return response;
        }
    }
    
    // Fallback general topics
    if (lower.includes('food') || lower.includes('dish') || lower.includes('eat') || lower.includes('cuisine')) {
        return knowledge['food'] || knowledge['default'];
    }
    if (lower.includes('festival') || lower.includes('celebration') || lower.includes('yatra')) {
        return knowledge['festival'] || knowledge['rath'] || knowledge['default'];
    }
    if (lower.includes('art') || lower.includes('craft') || lower.includes('painting')) {
        return knowledge['art'] || knowledge['pattachitra'] || knowledge['default'];
    }
    if (lower.includes('dance') || lower.includes('music')) {
        return knowledge['dance'] || knowledge['default'];
    }
    if (lower.includes('temple') || lower.includes('monument') || lower.includes('cave') || lower.includes('fort') || lower.includes('place')) {
        return knowledge['temple'] || knowledge['fort'] || knowledge['cave'] || knowledge['default'];
    }
    
    return knowledge['default'] || `I am your cultural guide for ${region.name}. Ask me about the festivals, historical monuments, culinary classics, or living heritage art forms!`;
}

// Add styles for chat messages dynamically matching Earthy India tokens
const chatStyles = document.createElement('style');
chatStyles.textContent = `
    .chat-message {
        margin-bottom: 0.8rem;
        padding: 0.75rem 0.9rem;
        border-radius: var(--radius-md, 12px);
        animation: fadeIn 0.4s ease-out;
    }
    
    .user-message {
        background: linear-gradient(135deg, var(--ei-olive-dark, #3E3A24) 0%, var(--ei-olive, #585334) 100%);
        color: #FFFFFF;
        margin-left: 1.5rem;
        border-bottom-right-radius: 3px;
        box-shadow: 0 2px 8px rgba(62, 58, 36, 0.2);
    }
    
    .ai-message {
        background: var(--ei-bg-cream-alt, #EEE0C8);
        color: var(--ei-brown, #4A2B13);
        margin-right: 1.5rem;
        border-bottom-left-radius: 3px;
        border-left: 3.5px solid var(--ei-terracotta, #97572C);
        box-shadow: var(--ei-shadow-sm, 0 2px 8px rgba(74, 43, 19, 0.1));
    }
    
    .chat-message p {
        margin: 0;
        font-size: 0.88rem;
        line-height: 1.6;
    }
`;
document.head.appendChild(chatStyles);

// ==================== SUGGESTION BUTTONS ==================== //
function initializeSuggestions() {
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    const chatInput = document.querySelector('.chat-input');
    const chatMessages = document.querySelector('.chat-messages');
    
    suggestionBtns.forEach(btn => {
        btn.onclick = function() {
            const question = this.textContent.trim();
            if (chatInput && chatMessages) {
                chatInput.value = question;
                sendMessage(chatInput, chatMessages);
            }
        };
    });
}

// ==================== MOBILE MENU ==================== //
function initializeMobileMenu() {
    let menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.cultural-sidebar');
    
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Toggle Navigation');
        
        // Add mobile toggle styles
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            .mobile-menu-toggle {
                display: none;
                position: fixed;
                bottom: 1.5rem;
                right: 1.5rem;
                z-index: 1100;
                width: 52px;
                height: 52px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--ei-terracotta) 0%, var(--ei-ochre) 100%);
                color: #fff;
                border: none;
                box-shadow: 0 6px 20px rgba(151, 87, 44, 0.4);
                font-size: 1.25rem;
                cursor: pointer;
            }
            @media (max-width: 1150px) {
                .mobile-menu-toggle { display: flex; align-items: center; justify-content: center; }
            }
        `;
        document.head.appendChild(mobileStyles);
        document.body.appendChild(menuToggle);
    }
    
    if (sidebar) {
        menuToggle.onclick = function() {
            sidebar.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = sidebar.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
            }
        };
        
        // Close sidebar on navigation click on mobile
        document.querySelectorAll('.cultural-navigation a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 1150) {
                    sidebar.classList.remove('open');
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            });
        });
    }
}

// ==================== CARD HOVER EFFECTS ==================== //
function initializeCardHoverEffects() {
    const cards = document.querySelectorAll('.explore-card, .festival-card, .food-card, .craft-card, .monument-card, .practice-card');
    
    cards.forEach(card => {
        card.onmouseenter = function() {
            this.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease';
        };
    });
}

// ==================== GLOBAL EXPORT ==================== //
window.VirasatRegionalPage = {
    REGIONAL_DATA: REGIONAL_DATA,
    loadRegionalContent: loadRegionalContent,
    updateActiveNavItem: updateActiveNavItem
};
