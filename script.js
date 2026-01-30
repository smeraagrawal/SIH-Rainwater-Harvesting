var currentStep = 1;
        var userData = { roofArea: 0, areaMethod: 'manual' };
        var map, drawingManager, polygons = [];
        var isDrawingMode = false;
        var AQUIFER_DATA = {
    // Maharashtra
    "411001": { // Pune
        aquiferType: "Hard Rock (Basaltic)",
        depth: "10-25 meters",
        quality: "Good to Moderate",
        yieldPotential: "Low to Moderate (1-10 lps)",
        rechargeability: "Moderate",
        suitability: "Good for artificial recharge",
        soilType: "Black Cotton Soil",
        permeability: "Low to Moderate",
        infiltrationRate: "2-5 cm/hour",
        recommendedStructures: ["Recharge Pit", "Percolation Tank", "Check Dam"],
        geology: "Deccan Trap Basalt"
    },
    "400001": { // Mumbai
        aquiferType: "Coastal Alluvium",
        depth: "5-15 meters",
        quality: "Poor to Moderate (Saline intrusion)",
        yieldPotential: "Moderate (5-15 lps)",
        rechargeability: "High",
        suitability: "Excellent for recharge",
        soilType: "Sandy Clay",
        permeability: "Moderate to High",
        infiltrationRate: "8-15 cm/hour",
        recommendedStructures: ["Injection Well", "Recharge Well", "Spreading Basin"],
        geology: "Recent Alluvium"
    },
    "413001": { // Solapur
        aquiferType: "Hard Rock (Granite-Gneiss)",
        depth: "15-35 meters",
        quality: "Good",
        yieldPotential: "Low (0.5-5 lps)",
        rechargeability: "Low to Moderate",
        suitability: "Moderate for recharge",
        soilType: "Red Sandy Soil",
        permeability: "Low",
        infiltrationRate: "1-3 cm/hour",
        recommendedStructures: ["Recharge Pit", "Dug Well Recharge", "Fracture Zone Targeting"],
        geology: "Archean Crystalline"
    },

    // Karnataka
    "560001": { // Bangalore
        aquiferType: "Hard Rock (Granite)",
        depth: "8-20 meters",
        quality: "Good to Moderate",
        yieldPotential: "Low to Moderate (1-8 lps)",
        rechargeability: "Moderate",
        suitability: "Good for recharge",
        soilType: "Red Lateritic Soil",
        permeability: "Moderate",
        infiltrationRate: "3-8 cm/hour",
        recommendedStructures: ["Recharge Pit", "Percolation Tank", "Rooftop Recharge"],
        geology: "Peninsular Gneiss"
    },
    "575001": { // Mangalore
        aquiferType: "Coastal Sedimentary",
        depth: "3-12 meters",
        quality: "Good (Fresh water lens)",
        yieldPotential: "Moderate to High (8-20 lps)",
        rechargeability: "High",
        suitability: "Excellent for recharge",
        soilType: "Lateritic Sandy Clay",
        permeability: "High",
        infiltrationRate: "10-20 cm/hour",
        recommendedStructures: ["Spreading Basin", "Infiltration Gallery", "Recharge Well"],
        geology: "Tertiary Sediments"
    },

    // Tamil Nadu
    "600001": { // Chennai
        aquiferType: "Coastal Alluvium",
        depth: "5-18 meters",
        quality: "Poor to Moderate (Saline intrusion)",
        yieldPotential: "Moderate (3-12 lps)",
        rechargeability: "High",
        suitability: "Good for managed recharge",
        soilType: "Sandy Clay",
        permeability: "Moderate to High",
        infiltrationRate: "6-12 cm/hour",
        recommendedStructures: ["Injection Well", "Managed Aquifer Recharge", "Desalination + Recharge"],
        geology: "Quaternary Alluvium"
    },
    "641001": { // Coimbatore
        aquiferType: "Hard Rock (Charnockite)",
        depth: "12-28 meters",
        quality: "Good",
        yieldPotential: "Low to Moderate (2-10 lps)",
        rechargeability: "Moderate",
        suitability: "Good for recharge",
        soilType: "Red Sandy Loam",
        permeability: "Moderate",
        infiltrationRate: "4-10 cm/hour",
        recommendedStructures: ["Recharge Pit", "Percolation Tank", "Check Dam"],
        geology: "Archean Crystalline"
    },

    // Andhra Pradesh/Telangana
    "500001": { // Hyderabad
        aquiferType: "Hard Rock (Granite)",
        depth: "15-40 meters",
        quality: "Good to Moderate",
        yieldPotential: "Low to Moderate (1-8 lps)",
        rechargeability: "Low to Moderate",
        suitability: "Moderate for recharge",
        soilType: "Red Sandy Soil",
        permeability: "Low to Moderate",
        infiltrationRate: "2-6 cm/hour",
        recommendedStructures: ["Recharge Pit", "Percolation Tank", "Dug Well Recharge"],
        geology: "Dharwar Supergroup"
    },
    "530001": { // Visakhapatnam
        aquiferType: "Coastal Sedimentary",
        depth: "8-25 meters",
        quality: "Good to Moderate",
        yieldPotential: "Moderate (5-15 lps)",
        rechargeability: "High",
        suitability: "Excellent for recharge",
        soilType: "Alluvial Sandy Clay",
        permeability: "High",
        infiltrationRate: "8-18 cm/hour",
        recommendedStructures: ["Spreading Basin", "Recharge Well", "Infiltration Gallery"],
        geology: "Gondwana + Alluvium"
    },

    // Kerala
    "682001": { // Kochi
        aquiferType: "Coastal Sedimentary",
        depth: "2-10 meters",
        quality: "Good (Shallow fresh water)",
        yieldPotential: "High (10-25 lps)",
        rechargeability: "Very High",
        suitability: "Excellent for recharge",
        soilType: "Lateritic Clay",
        permeability: "High",
        infiltrationRate: "12-25 cm/hour",
        recommendedStructures: ["Spreading Basin", "Infiltration Pond", "Recharge Well"],
        geology: "Tertiary Sediments + Alluvium"
    },
    "695001": { // Thiruvananthapuram
        aquiferType: "Hard Rock (Crystalline)",
        depth: "5-15 meters",
        quality: "Good",
        yieldPotential: "Moderate (3-12 lps)",
        rechargeability: "Moderate",
        suitability: "Good for recharge",
        soilType: "Lateritic Red Soil",
        permeability: "Moderate",
        infiltrationRate: "5-12 cm/hour",
        recommendedStructures: ["Recharge Pit", "Percolation Tank", "Rooftop Recharge"],
        geology: "Khondalite Group"
    },

    // Gujarat
    "380001": { // Ahmedabad
        aquiferType: "Alluvial",
        depth: "20-60 meters",
        quality: "Good to Moderate",
        yieldPotential: "High (15-40 lps)",
        rechargeability: "High",
        suitability: "Excellent for recharge",
        soilType: "Alluvial Clay",
        permeability: "Moderate to High",
        infiltrationRate: "8-15 cm/hour",
        recommendedStructures: ["Injection Well", "Spreading Basin", "Percolation Tank"],
        geology: "Quaternary Alluvium"
    },
    "395001": { // Surat
        aquiferType: "Alluvial",
        depth: "15-45 meters",
        quality: "Good",
        yieldPotential: "High (20-50 lps)",
        rechargeability: "Very High",
        suitability: "Excellent for recharge",
        soilType: "Alluvial Sandy Clay",
        permeability: "High",
        infiltrationRate: "10-20 cm/hour",
        recommendedStructures: ["Injection Well", "Spreading Basin", "MAR Systems"],
        geology: "Recent Alluvium"
    },

    // Rajasthan
    "302001": { // Jaipur
        aquiferType: "Hard Rock (Aravalli)",
        depth: "25-80 meters",
        quality: "Good to Poor (High TDS)",
        yieldPotential: "Low (0.5-3 lps)",
        rechargeability: "Low",
        suitability: "Moderate for targeted recharge",
        soilType: "Sandy Desert Soil",
        permeability: "Low",
        infiltrationRate: "1-4 cm/hour",
        recommendedStructures: ["Recharge Pit", "Johad", "Bawri (Stepwell)"],
        geology: "Delhi Supergroup"
    },
    "342001": { // Jodhpur
        aquiferType: "Sandstone Aquifer",
        depth: "30-100 meters",
        quality: "Moderate to Poor (Saline)",
        yieldPotential: "Low to Moderate (1-8 lps)",
        rechargeability: "Moderate",
        suitability: "Good for strategic recharge",
        soilType: "Desert Sandy Soil",
        permeability: "Moderate",
        infiltrationRate: "3-8 cm/hour",
        recommendedStructures: ["Injection Well", "Recharge Pit", "Johad"],
        geology: "Jodhpur Sandstone"
    },

    // Punjab
    "141001": { // Ludhiana
        aquiferType: "Alluvial",
        depth: "10-30 meters",
        quality: "Good to Moderate",
        yieldPotential: "High (20-60 lps)",
        rechargeability: "Very High",
        suitability: "Excellent for recharge",
        soilType: "Alluvial Loam",
        permeability: "High",
        infiltrationRate: "12-25 cm/hour",
        recommendedStructures: ["Injection Well", "Spreading Basin", "Farm Pond"],
        geology: "Indo-Gangetic Alluvium"
    },

    // West Bengal
    "700001": { // Kolkata
        aquiferType: "Deltaic Alluvium",
        depth: "5-20 meters",
        quality: "Poor (Arsenic contamination)",
        yieldPotential: "High (15-40 lps)",
        rechargeability: "Very High",
        suitability: "Good with treatment",
        soilType: "Deltaic Clay",
        permeability: "Moderate to High",
        infiltrationRate: "6-15 cm/hour",
        recommendedStructures: ["Managed Aquifer Recharge", "Injection Well", "Treatment + Recharge"],
        geology: "Recent Deltaic Deposits"
    },

    // Delhi
    "110001": { // New Delhi
        aquiferType: "Alluvial",
        depth: "8-25 meters",
        quality: "Poor to Moderate",
        yieldPotential: "Moderate (8-25 lps)",
        rechargeability: "High",
        suitability: "Good for managed recharge",
        soilType: "Alluvial Sandy Clay",
        permeability: "Moderate to High",
        infiltrationRate: "8-18 cm/hour",
        recommendedStructures: ["Injection Well", "Recharge Pit", "Percolation Tank"],
        geology: "Yamuna Alluvium"
    }
};
        // Google Maps API Key - Replace with your actual API key
        var GOOGLE_MAPS_API_KEY = 'AIzaSyB8hnaC2gCub-neWOXSQAuj6bttrXr0hVo';
        var STATE_DISTRICT_PINCODE_DATA = {
    "Andhra Pradesh": {
        "Anantapur": ["515001", "515004", "515005", "515701"],
        "Chittoor": ["517001", "517002", "517004", "517501"],
        "Guntur": ["522001", "522002", "522003", "522201"],
        "Kadapa": ["516001", "516002", "516003", "516360"],
        "Krishna": ["520001", "520002", "520003", "520008"],
        "Kurnool": ["518001", "518002", "518003", "518004"],
        "Prakasam": ["523001", "523002", "523155", "523280"],
        "Srikakulam": ["532001", "532005", "532201", "532426"],
        "Visakhapatnam": ["530001", "530002", "530003", "530016"],
        "Vizianagaram": ["535001", "535002", "535101", "535544"],
        "West Godavari": ["534001", "534002", "534101", "534426"],
        "East Godavari": ["533001", "533002", "533103", "533249"]
    },
    "Arunachal Pradesh": {
        "Itanagar": ["791111", "791113", "791114", "791001"],
        "Pasighat": ["791102", "791103", "791104", "791105"],
        "Tawang": ["790104", "790105", "790106", "790107"],
        "Bomdila": ["790001", "790002", "790003", "790004"]
    },
    "Assam": {
        "Guwahati": ["781001", "781002", "781003", "781005"],
        "Jorhat": ["785001", "785002", "785004", "785005"],
        "Dibrugarh": ["786001", "786002", "786003", "786125"],
        "Silchar": ["788001", "788002", "788003", "788005"],
        "Tinsukia": ["786125", "786126", "786127", "786181"],
        "Nagaon": ["782001", "782002", "782003", "782123"]
    },
    "Bihar": {
        "Patna": ["800001", "800002", "800003", "800013"],
        "Gaya": ["823001", "823002", "823003", "823004"],
        "Bhagalpur": ["812001", "812002", "812003", "812005"],
        "Muzaffarpur": ["842001", "842002", "842003", "842005"],
        "Purnia": ["854301", "854302", "854303", "854304"],
        "Darbhanga": ["846001", "846003", "846004", "846005"]
    },
    "Chhattisgarh": {
        "Raipur": ["492001", "492002", "492003", "492004"],
        "Bilaspur": ["495001", "495002", "495003", "495004"],
        "Korba": ["495001", "495002", "495677", "495678"],
        "Durg": ["491001", "491002", "491441", "491557"],
        "Raigarh": ["496001", "496002", "496003", "496445"]
    },
    "Delhi": {
        "Central Delhi": ["110001", "110002", "110003", "110005"],
        "North Delhi": ["110006", "110007", "110009", "110033"],
        "South Delhi": ["110016", "110017", "110019", "110024"],
        "West Delhi": ["110015", "110018", "110027", "110058"],
        "East Delhi": ["110032", "110051", "110053", "110092"],
        "New Delhi": ["110001", "110011", "110021", "110023"]
    },
    "Gujarat": {
        "Ahmedabad": ["380001", "380002", "380003", "380004"],
        "Surat": ["395001", "395002", "395003", "395004"],
        "Vadodara": ["390001", "390002", "390003", "390004"],
        "Rajkot": ["360001", "360002", "360003", "360005"],
        "Bhavnagar": ["364001", "364002", "364003", "364004"],
        "Gandhinagar": ["382001", "382002", "382006", "382007"]
    },
    "Haryana": {
        "Gurugram": ["122001", "122002", "122003", "122004"],
        "Faridabad": ["121001", "121002", "121003", "121004"],
        "Hisar": ["125001", "125002", "125003", "125004"],
        "Rohtak": ["124001", "124002", "124003", "124005"],
        "Panipat": ["132103", "132104", "132105", "132106"],
        "Ambala": ["134001", "134002", "134003", "134004"]
    },
    "Himachal Pradesh": {
        "Shimla": ["171001", "171002", "171003", "171004"],
        "Manali": ["175131", "175132", "175133", "175134"],
        "Dharamshala": ["176215", "176216", "176217", "176218"],
        "Kullu": ["175101", "175102", "175103", "175104"],
        "Solan": ["173001", "173002", "173003", "173004"]
    },
    "Jharkhand": {
        "Ranchi": ["834001", "834002", "834003", "834004"],
        "Jamshedpur": ["831001", "831002", "831003", "831004"],
        "Dhanbad": ["826001", "826002", "826003", "826004"],
        "Bokaro": ["827001", "827002", "827003", "827004"],
        "Deoghar": ["814112", "814113", "814114", "814115"]
    },
    "Karnataka": {
        "Bengaluru": ["560001", "560002", "560003", "560004"],
        "Mysore": ["570001", "570002", "570003", "570004"],
        "Hubli": ["580001", "580002", "580003", "580004"],
        "Mangalore": ["575001", "575002", "575003", "575004"],
        "Belgaum": ["590001", "590002", "590003", "590004"],
        "Gulbarga": ["585101", "585102", "585103", "585104"]
    },
    "Kerala": {
        "Thiruvananthapuram": ["695001", "695002", "695003", "695004"],
        "Kochi": ["682001", "682002", "682003", "682004"],
        "Kozhikode": ["673001", "673002", "673003", "673004"],
        "Thrissur": ["680001", "680002", "680003", "680004"],
        "Kollam": ["691001", "691002", "691003", "691004"],
        "Kottayam": ["686001", "686002", "686003", "686004"]
    },
    "Madhya Pradesh": {
        "Bhopal": ["462001", "462002", "462003", "462004"],
        "Indore": ["452001", "452002", "452003", "452004"],
        "Gwalior": ["474001", "474002", "474003", "474004"],
        "Jabalpur": ["482001", "482002", "482003", "482004"],
        "Ujjain": ["456001", "456002", "456003", "456004"],
        "Sagar": ["470001", "470002", "470003", "470004"]
    },
    "Maharashtra": {
        "Mumbai": ["400001", "400002", "400003", "400004"],
        "Pune": ["411001", "411002", "411003", "411004"],
        "Nagpur": ["440001", "440002", "440003", "440004"],
        "Nashik": ["422001", "422002", "422003", "422004"],
        "Aurangabad": ["431001", "431002", "431003", "431004"],
        "Solapur": ["413001", "413002", "413003", "413004"]
    },
    "Odisha": {
        "Bhubaneswar": ["751001", "751002", "751003", "751004"],
        "Cuttack": ["753001", "753002", "753003", "753004"],
        "Puri": ["752001", "752002", "752003", "752004"],
        "Berhampur": ["760001", "760002", "760003", "760004"],
        "Sambalpur": ["768001", "768002", "768003", "768004"]
    },
    "Punjab": {
        "Chandigarh": ["160001", "160002", "160003", "160004"],
        "Amritsar": ["143001", "143002", "143003", "143004"],
        "Ludhiana": ["141001", "141002", "141003", "141004"],
        "Jalandhar": ["144001", "144002", "144003", "144004"],
        "Patiala": ["147001", "147002", "147003", "147004"],
        "Bathinda": ["151001", "151002", "151003", "151004"]
    },
    "Rajasthan": {
        "Jaipur": ["302001", "302002", "302003", "302004"],
        "Jodhpur": ["342001", "342002", "342003", "342004"],
        "Udaipur": ["313001", "313002", "313003", "313004"],
        "Kota": ["324001", "324002", "324003", "324004"],
        "Ajmer": ["305001", "305002", "305003", "305004"],
        "Bikaner": ["334001", "334002", "334003", "334004"]
    },
    "Tamil Nadu": {
        "Chennai": ["600001", "600002", "600003", "600004"],
        "Coimbatore": ["641001", "641002", "641003", "641004"],
        "Madurai": ["625001", "625002", "625003", "625004"],
        "Tiruchirappalli": ["620001", "620002", "620003", "620004"],
        "Salem": ["636001", "636002", "636003", "636004"],
        "Tirunelveli": ["627001", "627002", "627003", "627004"]
    },
    "Telangana": {
        "Hyderabad": ["500001", "500002", "500003", "500004"],
        "Warangal": ["506001", "506002", "506003", "506004"],
        "Nizamabad": ["503001", "503002", "503003", "503004"],
        "Karimnagar": ["505001", "505002", "505003", "505004"],
        "Khammam": ["507001", "507002", "507003", "507004"]
    },
    "Uttar Pradesh": {
        "Lucknow": ["226001", "226002", "226003", "226004"],
        "Kanpur": ["208001", "208002", "208003", "208004"],
        "Ghaziabad": ["201001", "201002", "201003", "201004"],
        "Agra": ["282001", "282002", "282003", "282004"],
        "Meerut": ["250001", "250002", "250003", "250004"],
        "Varanasi": ["221001", "221002", "221003", "221004"]
    },
    "West Bengal": {
        "Kolkata": ["700001", "700002", "700003", "700004"],
        "Howrah": ["711101", "711102", "711103", "711104"],
        "Durgapur": ["713201", "713202", "713203", "713204"],
        "Asansol": ["713301", "713302", "713303", "713304"],
        "Siliguri": ["734001", "734002", "734003", "734004"],
        "Malda": ["732101", "732102", "732103", "732104"]
    }
};
        // Enhanced rainfall database with comprehensive pincode coverage
        const RAINFALL_DATA = {
    // Andaman and Nicobar Islands
    "744101": { district: "Nicobar", state: "Andaman And Nicobar Islands", annual: 2805.2, monsoon: 1207.2, coordinates: [8.8474, 92.7319] },
    "744102": { district: "South Andaman", state: "Andaman And Nicobar Islands", annual: 3015.7, monsoon: 1757.2, coordinates: [11.6234, 92.7265] },
    "744201": { district: "N & M Andaman", state: "Andaman And Nicobar Islands", annual: 2913.3, monsoon: 1884.4, coordinates: [12.2958, 92.9376] },
    
    // Arunachal Pradesh
    "792001": { district: "Lohit", state: "Arunachal Pradesh", annual: 3043.8, monsoon: 1848.5, coordinates: [27.9056, 96.0260] },
    "792002": { district: "East Siang", state: "Arunachal Pradesh", annual: 4034.7, monsoon: 3008.4, coordinates: [28.0679, 95.0332] },
    "790001": { district: "Tirap", state: "Arunachal Pradesh", annual: 3571.5, monsoon: 2385.5, coordinates: [26.9999, 95.7499] },
    
    // Assam
    "781001": { district: "Cachar", state: "Assam", annual: 2999.2, monsoon: 1889.9, coordinates: [24.8333, 92.9167] },
    "784001": { district: "Darrang", state: "Assam", annual: 1957.8, monsoon: 1259.1, coordinates: [26.4541, 92.0277] },
    "783101": { district: "Goalpara", state: "Assam", annual: 2575.3, monsoon: 1710.1, coordinates: [26.1666, 90.6166] },
    "781101": { district: "Kamrup", state: "Assam", annual: 1813.4, monsoon: 1147.7, coordinates: [26.1445, 91.7362] },
    "787001": { district: "Lakhimpur", state: "Assam", annual: 2859.3, monsoon: 2025.2, coordinates: [27.2330, 94.1413] },
    
    // West Bengal
    "700001": { district: "Kolkata", state: "West Bengal", annual: 1582.2, monsoon: 1274.9, coordinates: [22.5726, 88.3639] },
    "700002": { district: "Kolkata", state: "West Bengal", annual: 1582.2, monsoon: 1274.9, coordinates: [22.5726, 88.3639] },
    "736101": { district: "Cooch Behar", state: "West Bengal", annual: 3443.7, monsoon: 2737.6, coordinates: [26.3269, 89.4509] },
    "734101": { district: "Darjeeling", state: "West Bengal", annual: 3118.5, monsoon: 2440.3, coordinates: [27.0360, 88.2627] },
    "735101": { district: "Jalpaiguri", state: "West Bengal", annual: 3468.3, monsoon: 2757.9, coordinates: [26.5499, 88.7096] },
    "732101": { district: "Malda", state: "West Bengal", annual: 1419.4, monsoon: 1117.3, coordinates: [25.0961, 88.1450] },
    
    // Maharashtra
    "400001": { district: "Mumbai City", state: "Maharashtra", annual: 2374.1, monsoon: 2316.9, coordinates: [19.0760, 72.8777] },
    "400002": { district: "Mumbai City", state: "Maharashtra", annual: 2374.1, monsoon: 2316.9, coordinates: [19.0760, 72.8777] },
    "400003": { district: "Mumbai City", state: "Maharashtra", annual: 2374.1, monsoon: 2316.9, coordinates: [19.0760, 72.8777] },
    "411001": { district: "Pune", state: "Maharashtra", annual: 647.1, monsoon: 636.2, coordinates: [18.5204, 73.8567] },
    "411002": { district: "Pune", state: "Maharashtra", annual: 647.1, monsoon: 636.2, coordinates: [18.5204, 73.8567] },
    "411003": { district: "Pune", state: "Maharashtra", annual: 647.1, monsoon: 636.2, coordinates: [18.5204, 73.8567] },
    "413001": { district: "Solapur", state: "Maharashtra", annual: 747.1, monsoon: 636.2, coordinates: [17.6599, 75.9064] },
    "415001": { district: "Satara", state: "Maharashtra", annual: 1544.4, monsoon: 1348.6, coordinates: [17.6805, 74.0183] },
    "416001": { district: "Kolhapur", state: "Maharashtra", annual: 2257.5, monsoon: 2142.4, coordinates: [16.7050, 74.2433] },
    
    // Karnataka
    "560001": { district: "Bangalore Urban", state: "Karnataka", annual: 905.7, monsoon: 833.7, coordinates: [12.9716, 77.5946] },
    "560002": { district: "Bangalore Urban", state: "Karnataka", annual: 905.7, monsoon: 833.7, coordinates: [12.9716, 77.5946] },
    "560003": { district: "Bangalore Urban", state: "Karnataka", annual: 905.7, monsoon: 833.7, coordinates: [12.9716, 77.5946] },
    "575001": { district: "Dakshina Kannada", state: "Karnataka", annual: 3278.9, monsoon: 3117.7, coordinates: [12.8420, 75.2479] },
    "576101": { district: "Udupi", state: "Karnataka", annual: 3470.6, monsoon: 3261.5, coordinates: [13.3409, 74.7421] },
    "590001": { district: "Belgaum", state: "Karnataka", annual: 836.4, monsoon: 437.6, coordinates: [15.8497, 74.4977] },
    
    // Kerala
    "682001": { district: "Ernakulam", state: "Kerala", annual: 3029.9, monsoon: 2065.0, coordinates: [10.0261, 76.3105] },
    "682002": { district: "Ernakulam", state: "Kerala", annual: 3029.9, monsoon: 2065.0, coordinates: [10.0261, 76.3105] },
    "695001": { district: "Thiruvananthapuram", state: "Kerala", annual: 1803.2, monsoon: 871.3, coordinates: [8.5241, 76.9366] },
    "680001": { district: "Thrissur", state: "Kerala", annual: 3063.1, monsoon: 2197.5, coordinates: [10.5276, 76.2144] },
    "673001": { district: "Kozhikode", state: "Kerala", annual: 3384.1, monsoon: 2603.1, coordinates: [11.2588, 75.7804] },
    
    // Tamil Nadu
    "600001": { district: "Chennai", state: "Tamil Nadu", annual: 1326.6, monsoon: 1158.4, coordinates: [13.0827, 80.2707] },
    "600002": { district: "Chennai", state: "Tamil Nadu", annual: 1326.6, monsoon: 1158.4, coordinates: [13.0827, 80.2707] },
    "600003": { district: "Chennai", state: "Tamil Nadu", annual: 1326.6, monsoon: 1158.4, coordinates: [13.0827, 80.2707] },
    "641001": { district: "Coimbatore", state: "Tamil Nadu", annual: 730.9, monsoon: 641.8, coordinates: [11.0168, 76.9558] },
    "625001": { district: "Madurai", state: "Tamil Nadu", annual: 871.5, monsoon: 543.0, coordinates: [9.9252, 78.1198] },
    "620001": { district: "Thanjavur", state: "Tamil Nadu", annual: 1160.4, monsoon: 783.9, coordinates: [10.7870, 79.1378] },
    
    // Andhra Pradesh/Telangana
    "500001": { district: "Hyderabad", state: "Telangana", annual: 851.3, monsoon: 643.5, coordinates: [17.3850, 78.4867] },
    "500002": { district: "Hyderabad", state: "Telangana", annual: 851.3, monsoon: 643.5, coordinates: [17.3850, 78.4867] },
    "530001": { district: "Visakhapatnam", state: "Andhra Pradesh", annual: 1120.7, monsoon: 674.4, coordinates: [17.6868, 83.2185] },
    "515001": { district: "Anantapur", state: "Andhra Pradesh", annual: 572.7, monsoon: 322.8, coordinates: [14.6819, 77.6006] },
    
    // Rajasthan
    "302001": { district: "Jaipur", state: "Rajasthan", annual: 652.9, monsoon: 469.1, coordinates: [26.9124, 75.7873] },
    "302002": { district: "Jaipur", state: "Rajasthan", annual: 652.9, monsoon: 469.1, coordinates: [26.9124, 75.7873] },
    "342001": { district: "Jodhpur", state: "Rajasthan", annual: 365.9, monsoon: 274.8, coordinates: [26.2389, 73.0243] },
    "313001": { district: "Udaipur", state: "Rajasthan", annual: 612.6, monsoon: 521.7, coordinates: [24.5854, 73.7125] },
    
    // Gujarat
    "380001": { district: "Ahmedabad", state: "Gujarat", annual: 747.1, monsoon: 636.2, coordinates: [23.0225, 72.5714] },
    "380002": { district: "Ahmedabad", state: "Gujarat", annual: 747.1, monsoon: 636.2, coordinates: [23.0225, 72.5714] },
    "395001": { district: "Surat", state: "Gujarat", annual: 1286.2, monsoon: 1158.4, coordinates: [21.1702, 72.8311] },
    "361001": { district: "Jamnagar", state: "Gujarat", annual: 579.1, monsoon: 540.1, coordinates: [22.4707, 70.0577] },
    
    // Punjab
    "141001": { district: "Ludhiana", state: "Punjab", annual: 719.1, monsoon: 551.5, coordinates: [30.9010, 75.8573] },
    "144001": { district: "Jalandhar", state: "Punjab", annual: 685.6, monsoon: 534.2, coordinates: [31.3260, 75.5762] },
    "143001": { district: "Amritsar", state: "Punjab", annual: 721.7, monsoon: 537.6, coordinates: [31.6340, 74.8723] },
    
    // Haryana
    "122001": { district: "Gurgaon", state: "Haryana", annual: 419.8, monsoon: 334.8, coordinates: [28.4595, 77.0266] },
    "132001": { district: "Karnal", state: "Haryana", annual: 644.2, monsoon: 534.3, coordinates: [29.6857, 76.9905] },
    "125001": { district: "Hisar", state: "Haryana", annual: 401.4, monsoon: 325.1, coordinates: [29.1492, 75.7217] },
    
    // Delhi
    "110001": { district: "New Delhi", state: "Delhi", annual: 747.1, monsoon: 636.2, coordinates: [28.6139, 77.2090] },
    "110002": { district: "New Delhi", state: "Delhi", annual: 747.1, monsoon: 636.2, coordinates: [28.6139, 77.2090] },
    "110003": { district: "New Delhi", state: "Delhi", annual: 747.1, monsoon: 636.2, coordinates: [28.6139, 77.2090] },
    
    // Uttar Pradesh
    "226001": { district: "Lucknow", state: "Uttar Pradesh", annual: 918.2, monsoon: 787.9, coordinates: [26.8467, 80.9462] },
    "250001": { district: "Meerut", state: "Uttar Pradesh", annual: 1057.6, monsoon: 915.5, coordinates: [28.9845, 77.7064] },
    "221001": { district: "Varanasi", state: "Uttar Pradesh", annual: 1157.3, monsoon: 858.4, coordinates: [25.3176, 82.9739] },
    "201001": { district: "Ghaziabad", state: "Uttar Pradesh", annual: 747.1, monsoon: 636.2, coordinates: [28.6692, 77.4538] },
    
    // Bihar/Jharkhand
    "800001": { district: "Patna", state: "Bihar", annual: 1003.3, monsoon: 864.8, coordinates: [25.5941, 85.1376] },
    "834001": { district: "Ranchi", state: "Jharkhand", annual: 1421.3, monsoon: 1197.0, coordinates: [23.3441, 85.3096] },
    
    // Odisha
    "751001": { district: "Cuttack", state: "Orissa", annual: 1709.2, monsoon: 1281.1, coordinates: [20.4625, 85.8828] },
    "752001": { district: "Puri", state: "Orissa", annual: 1370.8, monsoon: 1174.1, coordinates: [19.8135, 85.8312] },
    
    // Madhya Pradesh
    "462001": { district: "Bhopal", state: "Madhya Pradesh", annual: 1154.5, monsoon: 995.1, coordinates: [23.2599, 77.4126] },
    "452001": { district: "Indore", state: "Madhya Pradesh", annual: 958.4, monsoon: 863.5, coordinates: [22.7196, 75.8577] },
    
    // Chhattisgarh
    "492001": { district: "Raipur", state: "Chhattisgarh", annual: 1355.2, monsoon: 1122.3, coordinates: [21.2514, 81.6296] },
    "495001": { district: "Bilaspur", state: "Chhattisgarh", annual: 1381.5, monsoon: 1096.9, coordinates: [22.0797, 82.1391] },
    
    // Himachal Pradesh
    "171001": { district: "Shimla", state: "Himachal Pradesh", annual: 1196.0, monsoon: 1005.9, coordinates: [31.1048, 77.1734] },
    "176001": { district: "Kangra", state: "Himachal Pradesh", annual: 1573.1, monsoon: 1383.1, coordinates: [32.0998, 76.2711] },
    
    // Jammu and Kashmir
    "190001": { district: "Srinagar", state: "Jammu And Kashmir", annual: 1211.3, monsoon: 860.5, coordinates: [34.0837, 74.7973] },
    "180001": { district: "Jammu", state: "Jammu And Kashmir", annual: 1132.7, monsoon: 253.2, coordinates: [32.7266, 74.8570] },
    
    // North Eastern States
    "793001": { district: "East Khasi Hills", state: "Meghalaya", annual: 6166.1, monsoon: 4621.8, coordinates: [25.5788, 91.8933] },
    "795001": { district: "Aizawl", state: "Mizoram", annual: 2814.4, monsoon: 1788.0, coordinates: [23.7271, 92.7176] },
    "797001": { district: "Kohima", state: "Nagaland", annual: 1824.8, monsoon: 1308.0, coordinates: [25.6751, 94.1086] },
    "799001": { district: "West Tripura", state: "Tripura", annual: 2641.8, monsoon: 1527.7, coordinates: [23.8315, 91.2868] },
    "737101": { district: "East Sikkim", state: "Sikkim", annual: 3094.5, monsoon: 1810.3, coordinates: [27.5330, 88.5122] }
};
        // Enhanced groundwater level estimation
        var GROUNDWATER_LEVELS = {
            "Rajasthan": 35, "Gujarat": 30, "Haryana": 25, "Punjab": 20,
            "Maharashtra": 18, "Karnataka": 22, "Andhra Pradesh": 28, "Telangana": 28,
            "Tamil Nadu": 25, "Kerala": 15, "West Bengal": 12, "Orissa": 18,
            "Bihar": 15, "Uttar Pradesh": 20, "Madhya Pradesh": 25, "Chhattisgarh": 20,
            "Delhi": 30, "Himachal Pradesh": 8, "Jammu And Kashmir": 5,
            "Assam": 8, "Meghalaya": 5, "Nagaland": 10, "Mizoram": 12, "Tripura": 10,
            "Arunachal Pradesh": 6, "Sikkim": 5, "Andaman And Nicobar Islands": 8,
            "Jharkhand": 18
        };

        function getWaterScarcityLevel(rainfall) {
            if (rainfall < 600) return { level: "Critical", color: "#dc3545", description: "Extremely water scarce region" };
            if (rainfall < 1000) return { level: "High", color: "#fd7e14", description: "Water scarce region" };
            if (rainfall < 1500) return { level: "Moderate", color: "#ffc107", description: "Moderately water stressed" };
            if (rainfall < 2500) return { level: "Low", color: "#28a745", description: "Adequate water resources" };
            return { level: "Very Low", color: "#17a2b8", description: "Abundant water resources" };
        }

        function startAssessment() {
            document.getElementById('landingPage').style.display = 'none';
            document.getElementById('appContainer').style.display = 'block';
            document.body.classList.add('assessment-active');
            updateProgress();
            setupEventListeners();
            loadGoogleMaps();
        }

        // Load Google Maps API
        function loadGoogleMaps() {
            if (window.google && window.google.maps) {
                console.log('Google Maps already loaded');
                return;
            }

            var script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_MAPS_API_KEY + '&libraries=drawing,geometry&callback=initializeGoogleMaps';
            script.async = true;
            script.defer = true;
            
            script.onerror = function() {
                console.error('Failed to load Google Maps API');
                alert('Failed to load Google Maps. Please check your internet connection or API key.');
            };

            document.head.appendChild(script);
        }

        // Initialize Google Maps when API is loaded
        window.initializeGoogleMaps = function() {
            console.log('Google Maps API loaded successfully');
        };

        function setupEventListeners() {
    // Existing listeners
    document.getElementById('userName').addEventListener('input', validateStep1);
    document.getElementById('pincode').addEventListener('input', validatePincode);
    
    document.getElementById('roofLength').addEventListener('input', calculateManualArea);
    document.getElementById('roofWidth').addEventListener('input', calculateManualArea);
    document.getElementById('totalRoofArea').addEventListener('input', updateTotalArea);

    setupButtonGroup('languageButtons', 'language', validateStep1);
    setupButtonGroup('roofTypeButtons', 'roofType', validateStep3);
    setupButtonGroup('areaMethodButtons', 'areaMethod', toggleAreaMethod);
    setupButtonGroup('waterSourceButtons', 'waterSource');
    
    // New listeners for location selection
    setupButtonGroup('locationMethodButtons', 'locationMethod', toggleLocationMethod);
    
    // State dropdown change listener
    document.getElementById('stateSelect').addEventListener('change', function() {
        var selectedState = this.value;
        userData.selectedState = selectedState;
        populateDistrictDropdown(selectedState);
        
        // Reset district selection and hide info
        userData.selectedDistrict = '';
        document.getElementById('locationInfo').style.display = 'none';
        document.getElementById('selectedPincode').style.display = 'none';
        document.getElementById('step2Next').disabled = true;
    });
    
// Aquifer suitability scoring function
function calculateAquiferSuitability(pincode) {
    var aquifer = AQUIFER_DATA[pincode];
    if (!aquifer) return { score: 50, description: "Moderate suitability (data not available)" };

    var score = 0;
    var factors = [];

    // Rechargeability scoring (0-30 points)
    var rechargePoints = 0;
    switch(aquifer.rechargeability) {
        case 'Very High': rechargePoints = 30; break;
        case 'High': rechargePoints = 25; break;
        case 'Moderate': rechargePoints = 18; break;
        case 'Low to Moderate': rechargePoints = 15; break;
        case 'Low': rechargePoints = 10; break;
        default: rechargePoints = 15;
    }
    score += rechargePoints;
    factors.push({ name: "Rechargeability", points: rechargePoints, detail: aquifer.rechargeability });

    // Depth scoring (0-25 points) - shallower is better for recharge
    var depthPoints = 0;
    var depthRange = aquifer.depth;
    if (depthRange.includes("2-") || depthRange.includes("3-") || depthRange.includes("5-")) {
        depthPoints = 25; // Very shallow
    } else if (depthRange.includes("8-") || depthRange.includes("10-")) {
        depthPoints = 20; // Shallow
    } else if (depthRange.includes("15-") || depthRange.includes("20-")) {
        depthPoints = 15; // Moderate
    } else {
        depthPoints = 10; // Deep
    }
    score += depthPoints;
    factors.push({ name: "Aquifer Depth", points: depthPoints, detail: depthRange });

    // Permeability scoring (0-25 points)
    var permPoints = 0;
    switch(aquifer.permeability) {
        case 'High': permPoints = 25; break;
        case 'Moderate to High': permPoints = 22; break;
        case 'Moderate': permPoints = 18; break;
        case 'Low to Moderate': permPoints = 15; break;
        case 'Low': permPoints = 10; break;
        default: permPoints = 15;
    }
    score += permPoints;
    factors.push({ name: "Soil Permeability", points: permPoints, detail: aquifer.permeability });

    // Quality scoring (0-20 points)
    var qualityPoints = 0;
    if (aquifer.quality.includes("Good")) qualityPoints = 20;
    else if (aquifer.quality.includes("Moderate")) qualityPoints = 15;
    else qualityPoints = 10;
    score += qualityPoints;
    factors.push({ name: "Water Quality", points: qualityPoints, detail: aquifer.quality });

    var description = score >= 80 ? "Excellent for recharge" :
                     score >= 65 ? "Very good for recharge" :
                     score >= 50 ? "Good for recharge" :
                     score >= 35 ? "Moderate for recharge" : "Poor for recharge";

    return {
        score: score,
        maxScore: 100,
        description: description,
        factors: factors,
        aquifer: aquifer
    };
}

// Get recommended recharge structure based on aquifer data
function getRechargeStructureRecommendation(pincode, roofArea, rainfall) {
    var aquifer = AQUIFER_DATA[pincode];
    if (!aquifer) {
        return {
            primary: "Recharge Pit",
            secondary: "Percolation Tank",
            cost: Math.round(roofArea * 400),
            description: "Standard recharge structure (aquifer data not available)"
        };
    }

    var runoffVolume = Math.round(roofArea * rainfall * 0.8 / 1000); // cubic meters annually
    var structures = aquifer.recommendedStructures;
    var primaryStructure = structures[0];
    var secondaryStructure = structures[1] || "Percolation Tank";

    // Cost estimation based on structure type and capacity
    var baseCost = 0;
    var description = "";

    switch(primaryStructure) {
        case "Injection Well":
            baseCost = Math.max(75000, roofArea * 600);
            description = `High-efficiency injection well for ${aquifer.aquiferType} aquifer`;
            break;
        case "Spreading Basin":
            baseCost = Math.max(40000, roofArea * 350);
            description = `Surface spreading system for high permeability ${aquifer.soilType}`;
            break;
        case "Recharge Pit":
            baseCost = Math.max(25000, roofArea * 300);
            description = `Excavated recharge pit suitable for ${aquifer.geology}`;
            break;
        case "Managed Aquifer Recharge":
            baseCost = Math.max(100000, roofArea * 800);
            description = `Engineered MAR system for ${aquifer.aquiferType}`;
            break;
        default:
            baseCost = Math.max(35000, roofArea * 400);
            description = `${primaryStructure} system for local geological conditions`;
    }

    return {
        primary: primaryStructure,
        secondary: secondaryStructure,
        cost: baseCost,
        description: description,
        capacity: `${Math.max(2000, runoffVolume * 200)}L + recharge capacity`,
        maintenance: `Based on ${aquifer.soilType} characteristics`,
        infiltrationRate: aquifer.infiltrationRate
    };
}
    
    // District dropdown change listener
    document.getElementById('districtSelect').addEventListener('change', function() {
        var selectedDistrict = this.value;
        userData.selectedDistrict = selectedDistrict;
        
        if (userData.selectedState && selectedDistrict) {
            var pincode = getPincodeForLocation(userData.selectedState, selectedDistrict);
            if (pincode) {
                userData.pincode = pincode;
                document.getElementById('displayPincode').textContent = pincode;
                document.getElementById('selectedPincode').style.display = 'block';
                
                // Validate using existing function
                validateLocationFromDropdown();
            }
        } else {
            document.getElementById('selectedPincode').style.display = 'none';
            document.getElementById('locationInfo').style.display = 'none';
            document.getElementById('step2Next').disabled = true;
        }
    });

    var stars = document.querySelectorAll('.star');
    for (var i = 0; i < stars.length; i++) {
        stars[i].addEventListener('click', function() {
            var rating = parseInt(this.dataset.rating);
            updateStarRating(rating);
        });
    }
    
    // Initialize dropdowns
    populateStateDropdown();
}
// Function to validate location from dropdown selection
function validateLocationFromDropdown() {
    var pincode = userData.pincode;
    var nextBtn = document.getElementById('step2Next');
    var locationInfo = document.getElementById('locationInfo');
    
    if (pincode && RAINFALL_DATA[pincode]) {
        var data = RAINFALL_DATA[pincode];
        userData.location = {
            area: userData.selectedDistrict + ', ' + userData.selectedState,
            district: userData.selectedDistrict,
            state: userData.selectedState,
            rainfall: data.annual,
            monsoonRainfall: data.monsoon || (data.annual * 0.7),
            winterRainfall: data.winter || (data.annual * 0.1),
            summerRainfall: data.summer || (data.annual * 0.2),
            coordinates: data.coordinates,
            groundwater: GROUNDWATER_LEVELS[userData.selectedState] || 20
        };
        
        var scarcity = getWaterScarcityLevel(data.annual);
        
        document.getElementById('locationArea').textContent = userData.location.area;
        document.getElementById('locationRainfall').innerHTML = 
            data.annual + ' mm/year <span style="color: ' + scarcity.color + '; font-weight: bold;">(' + scarcity.level + ' scarcity)</span>';
        document.getElementById('groundwaterLevel').textContent = userData.location.groundwater + ' meters';
        
        locationInfo.style.display = 'block';
        nextBtn.disabled = false;
    } else if (pincode) {
        // Use estimated data for unknown pincodes
        userData.location = {
            area: userData.selectedDistrict + ', ' + userData.selectedState,
            district: userData.selectedDistrict,
            state: userData.selectedState,
            rainfall: 800,
            monsoonRainfall: 600,
            winterRainfall: 40,
            summerRainfall: 160,
            coordinates: [20.5937, 78.9629],
            groundwater: GROUNDWATER_LEVELS[userData.selectedState] || 25
        };
        
        document.getElementById('locationArea').textContent = userData.location.area;
        document.getElementById('locationRainfall').innerHTML = '800 mm/year <em>(Estimated)</em>';
        document.getElementById('groundwaterLevel').textContent = userData.location.groundwater + ' meters (Estimated)';
        
        locationInfo.style.display = 'block';
        nextBtn.disabled = false;
    } else {
        locationInfo.style.display = 'none';
        nextBtn.disabled = true;
    }
}

        function setupButtonGroup(groupId, dataKey, callback) {
            var buttonGroup = document.getElementById(groupId);
            if(buttonGroup) {
                buttonGroup.addEventListener('click', function(e) {
                    if (e.target && e.target.classList.contains('btn-option')) {
                        var buttons = buttonGroup.children;
                        for (var i = 0; i < buttons.length; i++) {
                            buttons[i].classList.remove('active');
                        }
                        e.target.classList.add('active');
                        userData[dataKey] = e.target.dataset.value;
                        if (callback) callback();
                    }
                });
            }
        }
        // Function to populate state dropdown
function populateStateDropdown() {
    var stateSelect = document.getElementById('stateSelect');
    var states = Object.keys(STATE_DISTRICT_PINCODE_DATA).sort();
    
    // Clear existing options except the first one
    stateSelect.innerHTML = '<option value="">Select State</option>';
    
    for (var i = 0; i < states.length; i++) {
        var option = document.createElement('option');
        option.value = states[i];
        option.textContent = states[i];
        stateSelect.appendChild(option);
    }
}

// Function to populate district dropdown based on selected state
function populateDistrictDropdown(selectedState) {
    var districtSelect = document.getElementById('districtSelect');
    
    if (!selectedState) {
        districtSelect.innerHTML = '<option value="">Select District</option>';
        districtSelect.disabled = true;
        return;
    }
    
    districtSelect.disabled = false;
    districtSelect.innerHTML = '<option value="">Select District</option>';
    
    var districts = Object.keys(STATE_DISTRICT_PINCODE_DATA[selectedState]).sort();
    for (var i = 0; i < districts.length; i++) {
        var option = document.createElement('option');
        option.value = districts[i];
        option.textContent = districts[i];
        districtSelect.appendChild(option);
    }
}

// Function to get pincode based on state and district
function getPincodeForLocation(state, district) {
    if (state && district && STATE_DISTRICT_PINCODE_DATA[state] && STATE_DISTRICT_PINCODE_DATA[state][district]) {
        // Return the first pincode from the array for the selected district
        return STATE_DISTRICT_PINCODE_DATA[state][district][0];
    }
    return null;
}

// Function to find state and district for a given pincode
function findLocationForPincode(pincode) {
    for (var state in STATE_DISTRICT_PINCODE_DATA) {
        for (var district in STATE_DISTRICT_PINCODE_DATA[state]) {
            var pincodes = STATE_DISTRICT_PINCODE_DATA[state][district];
            if (pincodes.includes(pincode)) {
                return { state: state, district: district };
            }
        }
    }
    return null;
}

// Function to handle location method toggle
function toggleLocationMethod() {
    var method = userData.locationMethod;
    
    document.getElementById('dropdownInputs').style.display = method === 'dropdown' ? 'block' : 'none';
    document.getElementById('pincodeInputs').style.display = method === 'pincode' ? 'block' : 'none';
    document.getElementById('gpsInputs').style.display = method === 'gps' ? 'block' : 'none';
    
    // Reset selection
    userData.pincode = '';
    userData.selectedState = '';
    userData.selectedDistrict = '';
    document.getElementById('locationInfo').style.display = 'none';
    document.getElementById('selectedPincode').style.display = 'none';
    document.getElementById('step2Next').disabled = true;
    
    // Clear form inputs
    if (method !== 'dropdown') {
        document.getElementById('stateSelect').value = '';
        document.getElementById('districtSelect').value = '';
        document.getElementById('districtSelect').disabled = true;
    }
    if (method !== 'pincode') {
        document.getElementById('pincode').value = '';
    }
}

        function validateStep1() {
            var name = document.getElementById('userName').value.trim();
            var language = userData.language;
            var nextBtn = document.getElementById('step1Next');
            
            if (name && language) {
                nextBtn.disabled = false;
                userData.name = name;
            } else {
                nextBtn.disabled = true;
            }
        }

        function validatePincode() {
    var pincode = document.getElementById('pincode').value;
    var nextBtn = document.getElementById('step2Next');
    var locationInfo = document.getElementById('locationInfo');
    
    if (pincode.length === 6) {
        // Try to find matching state and district
        var location = findLocationForPincode(pincode);
        if (location) {
            // Auto-populate state and district dropdowns
            document.getElementById('stateSelect').value = location.state;
            populateDistrictDropdown(location.state);
            document.getElementById('districtSelect').value = location.district;
            
            userData.selectedState = location.state;
            userData.selectedDistrict = location.district;
        }
        
        // Continue with existing validation logic
        if (RAINFALL_DATA[pincode]) {
            var data = RAINFALL_DATA[pincode];
            userData.pincode = pincode;
            userData.location = {
                area: data.district + ', ' + data.state,
                district: data.district,
                state: data.state,
                rainfall: data.annual,
                monsoonRainfall: data.monsoon || (data.annual * 0.7),
                winterRainfall: data.winter || (data.annual * 0.1),
                summerRainfall: data.summer || (data.annual * 0.2),
                coordinates: data.coordinates,
                groundwater: GROUNDWATER_LEVELS[data.state] || 20
            };
            
            var scarcity = getWaterScarcityLevel(data.annual);
            
            document.getElementById('locationArea').textContent = userData.location.area;
            document.getElementById('locationRainfall').innerHTML = 
                data.annual + ' mm/year <span style="color: ' + scarcity.color + '; font-weight: bold;">(' + scarcity.level + ' scarcity)</span>';
            document.getElementById('groundwaterLevel').textContent = userData.location.groundwater + ' meters';
            
            locationInfo.style.display = 'block';
            nextBtn.disabled = false;
        } else {
            userData.pincode = pincode;
            userData.location = {
                area: location ? location.district + ', ' + location.state : 'Location (Pincode: ' + pincode + ')',
                district: location ? location.district : "Unknown District",
                state: location ? location.state : "Unknown State",
                rainfall: 800,
                monsoonRainfall: 600,
                winterRainfall: 40,
                summerRainfall: 160,
                coordinates: [20.5937, 78.9629],
                groundwater: location ? (GROUNDWATER_LEVELS[location.state] || 25) : 25
            };
            
            document.getElementById('locationArea').textContent = userData.location.area;
            document.getElementById('locationRainfall').innerHTML = '800 mm/year <em>(Estimated)</em>';
            document.getElementById('groundwaterLevel').textContent = userData.location.groundwater + ' meters (Estimated)';
            
            locationInfo.style.display = 'block';
            nextBtn.disabled = false;
        }
    } else {
        locationInfo.style.display = 'none';
        nextBtn.disabled = true;
    }
}

        function useGPS() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        var userLat = position.coords.latitude;
                        var userLng = position.coords.longitude;
                        
                        var nearestPincode = null;
                        var minDistance = Infinity;
                        
                        for (var pincode in RAINFALL_DATA) {
                            var data = RAINFALL_DATA[pincode];
                            if (data.coordinates) {
                                var distance = calculateDistance(userLat, userLng, data.coordinates[0], data.coordinates[1]);
                                if (distance < minDistance) {
                                    minDistance = distance;
                                    nearestPincode = pincode;
                                }
                            }
                        }
                        
                        if (nearestPincode) {
                            document.getElementById('pincode').value = nearestPincode;
                            validatePincode();
                            alert('Location detected! Using nearest area: ' + RAINFALL_DATA[nearestPincode].district + ', ' + RAINFALL_DATA[nearestPincode].state);
                        } else {
                            var estimatedPincode = '000000';
                            document.getElementById('pincode').value = estimatedPincode;
                            validatePincode();
                            alert('Location detected! Using estimated data for your area.');
                        }
                    },
                    function(error) { 
                        alert('Unable to get location. Please enter pincode manually.'); 
                    }
                );
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        }

        function calculateDistance(lat1, lng1, lat2, lng2) {
            var R = 6371;
            var dLat = (lat2 - lat1) * Math.PI / 180;
            var dLng = (lng2 - lng1) * Math.PI / 180;
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                      Math.sin(dLng/2) * Math.sin(dLng/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        }

        function toggleAreaMethod() {
            var method = userData.areaMethod;
            
            document.getElementById('manualInputs').style.display = method === 'manual' ? 'block' : 'none';
            document.getElementById('totalAreaInput').style.display = method === 'total' ? 'block' : 'none';
            document.getElementById('mapInputs').style.display = method === 'map' ? 'block' : 'none';
            
            if (method === 'map' && !map) {
                setTimeout(initMap, 100);
            }
            
            userData.roofArea = 0;
            updateCurrentArea();
        }

        function initMap() {
            if (!window.google || !window.google.maps) {
                console.error('Google Maps API not loaded yet');
                setTimeout(initMap, 1000);
                return;
            }

            var defaultCenter = userData.location && userData.location.coordinates
                ? { lat: userData.location.coordinates[0], lng: userData.location.coordinates[1] }
                : { lat: 20.5937, lng: 78.9629 }; // Center of India

            map = new google.maps.Map(document.getElementById('map'), {
                center: defaultCenter,
                zoom: userData.location && userData.location.coordinates ? 18 : 5,
                mapTypeId: 'hybrid'
            });

            drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: null,
                drawingControl: false,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: ['polygon']
                },
                polygonOptions: {
                    fillColor: '#4285f4',
                    fillOpacity: 0.3,
                    strokeWeight: 2,
                    strokeColor: '#4285f4',
                    clickable: true,
                    editable: true,
                    draggable: false
                }
            });

            drawingManager.setMap(map);

            google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
                polygons.push(polygon);
                calculateMapArea();
                
                // Stop drawing mode after completing a polygon
                drawingManager.setDrawingMode(null);
                isDrawingMode = false;
                var drawBtn = document.getElementById('drawToggleBtn');
                drawBtn.textContent = 'Start Drawing';
                drawBtn.classList.remove('active');

                // Add event listeners for polygon editing
                google.maps.event.addListener(polygon.getPath(), 'set_at', calculateMapArea);
                google.maps.event.addListener(polygon.getPath(), 'insert_at', calculateMapArea);
                google.maps.event.addListener(polygon.getPath(), 'remove_at', calculateMapArea);
            });
        }

        function switchMapLayer(layerType) {
            if (!map) return;
            map.setMapTypeId(layerType);
            
            // Update active button
            var layerBtns = document.querySelectorAll('.layer-btn');
            for (var i = 0; i < layerBtns.length; i++) {
                layerBtns[i].classList.remove('active');
            }
            document.querySelector('[data-layer="' + layerType + '"]').classList.add('active');
        }

        function searchCurrentLocation() {
            if (!navigator.geolocation) {
                alert('Geolocation is not supported by this browser.');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                function(position) {
                    var userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    map.setCenter(userLocation);
                    map.setZoom(18);
                    
                    // Add a marker for current location
                    new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: 'Your Current Location',
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 10,
                            fillColor: '#4285f4',
                            fillOpacity: 0.8,
                            strokeColor: '#ffffff',
                            strokeWeight: 2
                        }
                    });
                },
                function(error) {
                    alert('Unable to get your location. Please ensure location services are enabled.');
                },
                { 
                    enableHighAccuracy: true, 
                    timeout: 10000,
                    maximumAge: 300000
                }
            );
        }

        function searchLocationByPincode() {
            if (userData.location && userData.location.coordinates) {
                var coords = userData.location.coordinates;
                map.setCenter({ lat: coords[0], lng: coords[1] });
                map.setZoom(16);
            } else {
                alert('Please enter a valid pincode in the previous step first.');
            }
        }

        function clearDrawing() {
            for (var i = 0; i < polygons.length; i++) {
                polygons[i].setMap(null);
            }
            polygons = [];
            userData.roofArea = 0;
            document.getElementById('mapArea').textContent = '0';
            updateCurrentArea();
        }

        function toggleDrawingMode() {
            if (!map || !drawingManager) return;

            var btn = document.getElementById('drawToggleBtn');
            isDrawingMode = !isDrawingMode;
            
            if (isDrawingMode) {
                drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
                btn.textContent = 'Stop Drawing';
                btn.classList.add('active');
                alert('Drawing mode enabled! Click on the map to start drawing your roof area.');
            } else {
                drawingManager.setDrawingMode(null);
                btn.textContent = 'Start Drawing';
                btn.classList.remove('active');
            }
        }

        function calculateMapArea() {
            var totalArea = 0;
            
            for (var i = 0; i < polygons.length; i++) {
                var polygon = polygons[i];
                if (polygon.getPath) {
                    var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
                    totalArea += area;
                }
            }
            
            userData.roofArea = Math.round(totalArea);
            document.getElementById('mapArea').textContent = userData.roofArea.toLocaleString();
            updateCurrentArea();
        }

        function calculateManualArea() {
            var length = parseFloat(document.getElementById('roofLength').value) || 0;
            var width = parseFloat(document.getElementById('roofWidth').value) || 0;
            userData.roofArea = length * width;
            updateCurrentArea();
        }

        function updateTotalArea() {
            userData.roofArea = parseFloat(document.getElementById('totalRoofArea').value) || 0;
            updateCurrentArea();
        }

        function updateCurrentArea() {
            document.getElementById('currentArea').textContent = userData.roofArea.toLocaleString() + ' sq meters';
            validateStep3();
        }

        function validateStep3() {
            var roofType = userData.roofType;
            var hasArea = userData.roofArea > 0;
            var nextBtn = document.getElementById('step3Next');
            
            if (roofType && hasArea) {
                nextBtn.disabled = false;
            } else {
                nextBtn.disabled = true;
            }
        }

        function nextStep() {
            if (currentStep < 5) {
                document.getElementById('step' + currentStep).classList.remove('active');
                currentStep++;
                document.getElementById('step' + currentStep).classList.add('active');
                updateProgress();
            }
        }

        function prevStep() {
            if (currentStep > 1) {
                document.getElementById('step' + currentStep).classList.remove('active');
                currentStep--;
                document.getElementById('step' + currentStep).classList.add('active');
                updateProgress();
            }
        }

        function updateProgress() {
            var progress = (currentStep / 5) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
            document.getElementById('stepText').textContent = 'Step ' + currentStep + ' of 5';
            document.getElementById('progressPercent').textContent = Math.round(progress) + '%';
        }

        function calculateResults() {
            userData.familyMembers = parseInt(document.getElementById('familyMembers').value) || 4;
            userData.waterBill = parseFloat(document.getElementById('waterBill').value) || 1500;
            
            var efficiencyMap = { 'concrete': 0.95, 'metal': 0.90, 'clay': 0.85, 'tiles': 0.80 };
            var efficiency = efficiencyMap[userData.roofType] || 0.85;
            var rainfall = userData.location.rainfall;
            var monsoonRainfall = userData.location.monsoonRainfall;
            var winterRainfall = userData.location.winterRainfall;
            var summerRainfall = userData.location.summerRainfall;
            
            // Calculate harvesting potential (convert from cubic meters to liters by multiplying by 1000)
            var annualHarvest = Math.round(userData.roofArea * rainfall * efficiency);
            var monsoonHarvest = Math.round(userData.roofArea * monsoonRainfall * efficiency);
            
            // Monthly pattern calculation (in liters)
            var janFeb = Math.round(userData.roofArea * winterRainfall * efficiency * 0.3);
            var marMay = Math.round(userData.roofArea * summerRainfall * efficiency * 0.6);
            var junSep = Math.round(userData.roofArea * monsoonRainfall * efficiency);
            var octDec = Math.round(userData.roofArea * (winterRainfall + summerRainfall) * efficiency * 0.4);
            
            // Determine recommended structure and costs
            var structureType, capacity, setupCost, paybackYears;
            
            if (annualHarvest < 10000 || userData.roofArea < 50) { 
                structureType = 'Recharge Pit System'; 
                capacity = Math.max(2000, Math.round(annualHarvest * 0.2)) + 'L tank + recharge pit'; 
                setupCost = Math.max(25000, userData.roofArea * 300); 
                paybackYears = 2.5; 
            } else if (annualHarvest < 30000) { 
                structureType = 'Storage Tank System'; 
                capacity = Math.max(5000, Math.round(annualHarvest * 0.25)) + 'L tank + first flush diverter'; 
                setupCost = Math.max(50000, userData.roofArea * 450); 
                paybackYears = 3.5; 
            } else if (annualHarvest < 60000) {
                structureType = 'Dual Purpose System'; 
                capacity = Math.max(8000, Math.round(annualHarvest * 0.3)) + 'L storage + recharge pit'; 
                setupCost = Math.max(80000, userData.roofArea * 600); 
                paybackYears = 4.5; 
            } else { 
                structureType = 'Large Scale Combined System'; 
                capacity = Math.max(15000, Math.round(annualHarvest * 0.35)) + 'L multi-tank + recharge'; 
                setupCost = Math.max(120000, userData.roofArea * 800); 
                paybackYears = 5.5; 
            }
            
            // Calculate savings and feasibility
            var scarcity = getWaterScarcityLevel(rainfall);
            var savingsMultiplier = 0.3;
            
            switch(scarcity.level) {
                case 'Critical': savingsMultiplier = 0.6; break;
                case 'High': savingsMultiplier = 0.5; break;
                case 'Moderate': savingsMultiplier = 0.4; break;
                case 'Low': savingsMultiplier = 0.35; break;
                default: savingsMultiplier = 0.3;
            }
            
            var annualSavings = Math.round(userData.waterBill * 12 * savingsMultiplier);
            var actualPayback = setupCost / annualSavings;
            
            // Calculate feasibility score
            var feasibilityScore = 0;
            var rainfallPoints = 0, areaPoints = 0, sourcePoints = 0, gwPoints = 0;
            
            // Rainfall scoring
            if (rainfall > 1500) { rainfallPoints = 40; }
            else if (rainfall > 1000) { rainfallPoints = 30; }
            else if (rainfall > 600) { rainfallPoints = 20; }
            else { rainfallPoints = 10; }
            
            // Area scoring
            if (userData.roofArea > 200) { areaPoints = 30; }
            else if (userData.roofArea > 100) { areaPoints = 20; }
            else if (userData.roofArea > 50) { areaPoints = 15; }
            else { areaPoints = 10; }
            
            // Water source/bill scoring
            if (userData.waterBill > 2000) { sourcePoints = 20; }
            else if (userData.waterBill > 1000) { sourcePoints = 15; }
            else { sourcePoints = 10; }
            
            // Groundwater depth scoring
            if (userData.location.groundwater > 30) { gwPoints = 10; }
            else if (userData.location.groundwater > 15) { gwPoints = 8; }
            else { gwPoints = 5; }
            
            feasibilityScore = rainfallPoints + areaPoints + sourcePoints + gwPoints;
            
            // Store results
            userData.results = { 
                annualHarvest: annualHarvest, 
                monsoonHarvest: monsoonHarvest, 
                structureType: structureType, 
                capacity: capacity, 
                setupCost: setupCost, 
                paybackYears: Math.ceil(actualPayback), 
                annualSavings: annualSavings,
                monthlyPattern: { janFeb: janFeb, marMay: marMay, junSep: junSep, octDec: octDec },
                feasibilityScore: feasibilityScore,
                rainfallPoints: rainfallPoints,
                areaPoints: areaPoints,
                sourcePoints: sourcePoints,
                gwPoints: gwPoints,
                scarcityLevel: scarcity.level
            };
            
            updateResultsDisplay();
            updateAquiferInfo(userData.pincode);
            nextStep();
        }
        function updateAquiferInfo(pincode) {
    var aquiferData = AQUIFER_DATA[pincode];
    var aquiferCard = document.getElementById('aquiferInfoCard');
    
    if (aquiferData) {
        aquiferCard.style.display = 'block';
        document.getElementById('aquiferType').textContent = aquiferData.aquiferType;
        document.getElementById('aquiferDepth').textContent = aquiferData.depth;
        document.getElementById('aquiferQuality').textContent = aquiferData.quality;
        document.getElementById('soilType').textContent = aquiferData.soilType;
        document.getElementById('recommendedStructure').textContent = aquiferData.recommendedStructures[0];
        userData.aquiferInfo = aquiferData;
    } else {
        aquiferCard.style.display = 'none';
        userData.aquiferInfo = null;
    }
}

        function updateResultsDisplay() {
            // Update basic results
            document.getElementById('resultName').textContent = userData.name;
            document.getElementById('resultLocation').textContent = userData.location.area;
            document.getElementById('resultArea').textContent = userData.roofArea.toLocaleString() + ' sq meters';
            document.getElementById('resultRoofType').textContent = userData.roofType.charAt(0).toUpperCase() + userData.roofType.slice(1);
            
            var harvestPercentage = Math.round((userData.results.annualHarvest / (userData.familyMembers * 140 * 365)) * 100);
            
            document.getElementById('annualPotential').textContent = userData.results.annualHarvest.toLocaleString() + ' liters';
            document.getElementById('monsoonPotential').textContent = userData.results.monsoonHarvest.toLocaleString() + ' liters';
            document.getElementById('structureType').textContent = userData.results.structureType;
            document.getElementById('structureCapacity').textContent = userData.results.capacity;
            document.getElementById('setupCost').textContent = '₹' + userData.results.setupCost.toLocaleString();
            document.getElementById('paybackPeriod').textContent = userData.results.paybackYears + ' years';
            
            var savingsPercentage = Math.round((userData.results.annualSavings / (userData.waterBill * 12)) * 100);
            document.getElementById('annualSavings').innerHTML = 
                '₹' + userData.results.annualSavings.toLocaleString() + 
                '<br><small style="color: #666;">' + savingsPercentage + '% water bill reduction</small>';

            // Update monthly chart
            updateMonthlyChart();
            
            // Update feasibility assessment
            updateFeasibilityAssessment();
        }

        function updateMonthlyChart() {
            var pattern = userData.results.monthlyPattern;
            var maxValue = Math.max(pattern.janFeb, pattern.marMay, pattern.junSep, pattern.octDec);
            
            // Ensure minimum height for visibility and prevent division by zero
            if (maxValue === 0) maxValue = 1;
            
            // Update bar heights proportionally and values
            // Update bar heights proportionally and values
var janFebHeight = Math.max(20, (pattern.janFeb / maxValue) * 150); // Minimum 20px height
var marMayHeight = Math.max(25, (pattern.marMay / maxValue) * 150); // Minimum 25px height  
var junSepHeight = 150; // This will be the tallest bar (150px)
var octDecHeight = Math.max(25, (pattern.octDec / maxValue) * 150); // Minimum 25px height

document.getElementById('janFebBar').style.height = janFebHeight + 'px';
document.getElementById('janFebValue').textContent = pattern.janFeb + 'L';

document.getElementById('marMayBar').style.height = marMayHeight + 'px';
document.getElementById('marMayValue').textContent = pattern.marMay + 'L';

document.getElementById('junSepBar').style.height = junSepHeight + 'px';
document.getElementById('junSepValue').textContent = pattern.junSep + 'L';

document.getElementById('octDecBar').style.height = octDecHeight + 'px';
document.getElementById('octDecValue').textContent = pattern.octDec + 'L';
        }

        function updateFeasibilityAssessment() {
            var score = userData.results.feasibilityScore;
            
            // Update overall score
            document.getElementById('overallScore').textContent = score + '/100';
            document.getElementById('scoreFill').style.width = score + '%';
            
            // Determine recommendation
            var recommendation, description, paybackDesc;
            if (score >= 80) {
                recommendation = "Highly Recommended";
                description = "Excellent conditions for rainwater harvesting. High returns on investment expected.";
                paybackDesc = "Short Term";
            } else if (score >= 60) {
                recommendation = "Recommended";
                description = "Good conditions for rainwater harvesting. Moderate returns on investment expected.";
                paybackDesc = "Medium Term";
            } else if (score >= 40) {
                recommendation = "Conditionally Recommended";
                description = "Fair conditions for rainwater harvesting. Consider additional factors.";
                paybackDesc = "Long Term";
            } else {
                recommendation = "Not Recommended";
                description = "Poor conditions for rainwater harvesting. Consider alternatives.";
                paybackDesc = "Very Long";
            }
            
            document.getElementById('recommendationText').textContent = recommendation;
            document.getElementById('feasibilityDescription').textContent = description;
            document.getElementById('estimatedCost').textContent = '₹' + userData.results.setupCost.toLocaleString();
            document.getElementById('paybackDescription').textContent = paybackDesc;
            
            // Update assessment factors
            var rainfallDesc = userData.results.rainfallPoints >= 30 ? "Good" : userData.results.rainfallPoints >= 20 ? "Moderate" : "Low";
            var areaDesc = userData.results.areaPoints >= 20 ? "Good" : userData.results.areaPoints >= 15 ? "Medium" : "Small";
            var sourceDesc = userData.results.sourcePoints >= 15 ? "High Savings Potential" : "Moderate Savings Potential";
            var gwDesc = userData.results.gwPoints >= 8 ? "Good for RWH" : "Moderate for RWH";
            
            document.getElementById('rainfallFactor').textContent = 'Rainfall: ' + rainfallDesc + ' (' + userData.results.rainfallPoints + ' points)';
            document.getElementById('roofAreaFactor').textContent = 'Roof Area: ' + areaDesc + ' (' + userData.results.areaPoints + ' points)';
            document.getElementById('waterSourceFactor').textContent = 'Water Source: ' + sourceDesc + ' (' + userData.results.sourcePoints + ' points)';
            document.getElementById('groundwaterFactor').textContent = 'Groundwater Depth: ' + gwDesc + ' (' + userData.results.gwPoints + ' points)';
        }

        function downloadReport() {
            var reportContent = 'COMPREHENSIVE RAINWATER HARVESTING ASSESSMENT REPORT\n' +
'================================================\n\n' +
'Personal Details:\n' +
'Name: ' + userData.name + '\n' +
'Location: ' + userData.location.area + '\n' +
'Assessment Date: ' + new Date().toLocaleDateString() + '\n\n' +
'Location Analysis:\n' +
'District: ' + userData.location.district + '\n' +
'State: ' + userData.location.state + '\n' +
'Water Scarcity Level: ' + userData.results.scarcityLevel + '\n' +
'Annual Rainfall: ' + userData.location.rainfall + ' mm\n' +
'Monsoon Rainfall: ' + userData.location.monsoonRainfall + ' mm\n' +
'Groundwater Level: ' + userData.location.groundwater + ' meters\n\n' +
'Roof Information:\n' +
'Area: ' + userData.roofArea.toLocaleString() + ' sq meters\n' +
'Type: ' + userData.roofType + '\n' +
'Collection Efficiency: ' + (userData.roofType === 'concrete' ? '95%' : userData.roofType === 'metal' ? '90%' : userData.roofType === 'clay' ? '85%' : '80%') + '\n\n' +
'Family Details:\n' +
'Members: ' + userData.familyMembers + '\n' +
'Current Water Bill: ₹' + userData.waterBill + '/month\n' +
'Water Source: ' + (userData.waterSource || 'Not specified') + '\n\n' +
'Harvest Potential:\n' +
'Annual Potential: ' + userData.results.annualHarvest.toLocaleString() + ' liters\n' +
'Monsoon Potential: ' + userData.results.monsoonHarvest.toLocaleString() + ' liters\n' +
'Family Needs Coverage: ' + Math.round((userData.results.annualHarvest / (userData.familyMembers * 140 * 365)) * 100) + '%\n\n' +
'Monthly Collection Pattern:\n' +
'Jan-Feb: ' + userData.results.monthlyPattern.janFeb + ' liters\n' +
'Mar-May: ' + userData.results.monthlyPattern.marMay + ' liters\n' +
'Jun-Sep: ' + userData.results.monthlyPattern.junSep + ' liters\n' +
'Oct-Dec: ' + userData.results.monthlyPattern.octDec + ' liters\n\n' +
'Feasibility Assessment:\n' +
'Overall Score: ' + userData.results.feasibilityScore + '/100\n' +
'Recommendation: ' + document.getElementById('recommendationText').textContent + '\n' +
'Assessment: ' + document.getElementById('feasibilityDescription').textContent + '\n\n' +
'Factor Breakdown:\n' +
'- Rainfall Assessment: ' + userData.results.rainfallPoints + ' points\n' +
'- Roof Area Assessment: ' + userData.results.areaPoints + ' points\n' +
'- Water Source Assessment: ' + userData.results.sourcePoints + ' points\n' +
'- Groundwater Assessment: ' + userData.results.gwPoints + ' points\n\n' +
'Recommendations:\n' +
'Structure Type: ' + userData.results.structureType + '\n' +
'Recommended Capacity: ' + userData.results.capacity + '\n' +
'Setup Cost: ₹' + userData.results.setupCost.toLocaleString() + '\n' +
'Payback Period: ' + userData.results.paybackYears + ' years\n' +
'Annual Savings: ₹' + userData.results.annualSavings.toLocaleString() + '\n\n' +
'Implementation Guidelines:\n' +
'1. Install first flush diverter for water quality\n' +
'2. Use proper filtration system\n' +
'3. Regular maintenance of storage tanks\n' +
'4. Monitor water quality periodically\n' +
'5. Consider overflow management system\n\n' +
'Environmental Impact:\n' +
'CO2 Savings: ' + Math.round(userData.results.annualHarvest * 0.0003) + ' kg/year\n' +
'Groundwater Conservation: ' + Math.round(userData.results.annualHarvest * 0.8) + ' liters/year\n' +
'Reduced Urban Flooding: Moderate impact\n' +
'Sustainable Water Management: High positive impact\n\n' +
'Note: This assessment is based on historical rainfall data and standard efficiency parameters.\n' +
'Actual results may vary based on local conditions and implementation quality.\n\n' +
'Generated by RTRWH Assessment Tool\n' +
'Smart India Hackathon 2025';
            
            var blob = new Blob([reportContent], { type: 'text/plain' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'RTRWH_Detailed_Report_' + userData.name.replace(/ /g, '_') + '_' + userData.pincode + '.txt';
            a.click();
            URL.revokeObjectURL(url);
        }

        function showFeedback() {
            document.getElementById('feedbackSection').style.display = 'block';
            document.getElementById('feedbackSection').scrollIntoView({ behavior: 'smooth' });
        }

        function updateStarRating(rating) {
            var stars = document.querySelectorAll('.star');
            for (var i = 0; i < stars.length; i++) {
                if (i < rating) {
                    stars[i].classList.add('active');
                } else {
                    stars[i].classList.remove('active');
                }
            }
            userData.rating = rating;
        }

        function submitFeedback() {
            userData.feedback = { 
                rating: userData.rating || 5, 
                comments: document.getElementById('feedbackComments').value.trim(),
                pincode: userData.pincode,
                location: userData.location.area
            };
            
            console.log('Feedback submitted:', userData.feedback);
            alert('Thank you for your feedback! Your input helps us improve the assessment tool and expand our database coverage.');
            document.getElementById('feedbackSection').style.display = 'none';
        }

        function startOver() {
            // Reset all data
            userData = { roofArea: 0, areaMethod: 'manual' };
            currentStep = 1;
            
            // Clear all form inputs
            var inputs = document.querySelectorAll('.form-input, textarea');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].value = '';
            }
            
            var activeButtons = document.querySelectorAll('.button-group .btn-option.active');
            for (var i = 0; i < activeButtons.length; i++) {
                activeButtons[i].classList.remove('active');
            }
            
            // Reset to default area method
            document.querySelector('#areaMethodButtons .btn-option[data-value="manual"]').classList.add('active');

            // Hide conditional elements
            document.getElementById('locationInfo').style.display = 'none';
            document.getElementById('currentArea').textContent = '0 sq meters';
            document.getElementById('feedbackSection').style.display = 'none';
            
            // Reset step display
            var stepCards = document.querySelectorAll('.step-card');
            for (var i = 0; i < stepCards.length; i++) {
                stepCards[i].classList.remove('active');
            }
            document.getElementById('step1').classList.add('active');
            updateProgress();

            // Disable next buttons
            document.getElementById('step1Next').disabled = true;
            document.getElementById('step2Next').disabled = true;
            document.getElementById('step3Next').disabled = true;
        }

        // Initialize when DOM is loaded
        // Initialize parallax effect
        function initParallax() {
            const parallaxBg = document.querySelector('.parallax-bg');
            const landingContent = document.querySelector('.landing-content');
            
            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                // Move background slightly opposite to mouse movement
                const moveX = (mouseX - 0.5) * 30;
                const moveY = (mouseY - 0.5) * 30;
                parallaxBg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
                
                // Add subtle tilt to content
                const tiltX = (mouseY - 0.5) * 10;
                const tiltY = (mouseX - 0.5) * 10;
                landingContent.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            console.log('RTRWH Assessment Tool with Enhanced Features Initialized');
            console.log('- Monthly Collection Pattern Visualization');
            console.log('- Comprehensive Feasibility Assessment');
            console.log('- Detailed Scoring System');
            console.log('- Enhanced Reporting Features');
            
            // Initialize parallax effect
            initParallax();
        });