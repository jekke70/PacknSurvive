/**
 * Resefakta & Kuriosa för Crazy Camper: Packa & Överlev
 * 40 ordinarie destinationer + 20 legendariska bonusbanor.
 * Varje bana har en fängslande faktatext (2–3 meningar) med ett guldkorn och ett konkret husbilstips.
 */

export interface DestinationFact {
  badge?: string;
  tag?: string;
  fact: string;
}

export const DESTINATION_FACTS: Record<string, DestinationFact> = {
  // =========================================================================
  // 10 LÄTTA BANOR (SVERIGE & DANMARK)
  // =========================================================================
  oland: {
    badge: '💡 Visste du att?',
    tag: 'Öar & Sol',
    fact: 'Öland har flest soltimmar i Sverige och över 70 historiska väderkvarnar på det unika kalkstensalvaret. Kustvägen längs västra sidan bjuder på magiska solnedgångar över Kalmarsund – besök gärna under för- eller sensommar när ställplatserna vid Byxelkrok och Böda har gott om plats och lugn stämning.',
  },
  gotland: {
    badge: '💡 Visste du att?',
    tag: 'Raukar & Kust',
    fact: 'Gotlands raukfält, som Digerhuvud på Fårö, skapades för 400 miljoner år sedan när ön låg vid ekvatorn som ett tropiskt korallrev! Ta husbilen med morgonfärjan till Fårö för att slippa köer, och övernatta på kustnära ställplatser med direkt havsutsikt och obrutna solnedgångar.',
  },
  skane: {
    badge: '💡 Visste du att?',
    tag: 'Kust & Österlen',
    fact: 'Vid Kåseberga tronar den 67 meter långa skeppssättningen Ales stenar på en brant gräsbacke 32 meter ovanför havsytan. Slingra dig fram längs kustvägen mellan Ystad och Simrishamn under maj när rapsfälten lyser gula, och parkera vid mysiga gårdsställplatser intill äppelodlingarna.',
  },
  bohuslan: {
    badge: '💡 Visste du att?',
    tag: 'Granitklippor & Skärgård',
    fact: 'Bohusläns släta, rosaskimrande granitklippor är över 900 miljoner år gamla och har formats av inlandsisen till världens vackraste skärgård. Västkustens ställplatser vid Smögen, Fjällbacka och Grebbestad fylls snabbt under juli – sensommaren i augusti bjuder på varma klippbad och färska skaldjur i hamnen.',
  },
  halland: {
    badge: '💡 Visste du att?',
    tag: 'Stränder & Dynor',
    fact: 'Kattegattleden passerar rakt genom Halland och har utsetts till Europas bästa cykelled tack vare sina milslånga sandstränder och strandtallskogar. Mellan Halmstad och Falkenberg hittar du suveräna kustställplatser – ta med nivåklossar för sandmarken och ta kvällsdoppet direkt utanför bildörren.',
  },
  smaland: {
    badge: '💡 Visste du att?',
    tag: 'Skogar & Sjöar',
    fact: 'Småländska höglandet gömmer den 800 meter långa Skurugata-kanjonen – en dramatisk förkastningsspricka där snön kan ligga kvar ända in i juni! De lummiga sjöarna kring Eksjö och Nässjö är perfekta för kanotpaddling, och många ställplatser erbjuder egen vedeldad bastu vid strandkanten.',
  },
  siljan: {
    badge: '💡 Visste du att?',
    tag: 'Tradition & Dalarna',
    fact: 'Sjön Siljan bildades av ett enormt meteoritnedslag för 377 miljoner år sedan och är norra Europas största meteoritkrater. Midsommarhelgen kring Rättvik och Tällberg är legendarisk, men augusti bjuder på perfekt campingväder med bad från Långbryggan och hantverksbagerier längs vägarna.',
  },
  bornholm: {
    badge: '💡 Visste du att?',
    tag: 'Solskensön & Borgan',
    fact: 'Den danska klippön Bornholm hyser Hammershus – norra Europas största medeltida borgruin som vakar ståtligt över Östersjön. Färjan från Ystad tar bara 80 minuter med husbil, och öns pittoreska fiskelägen bjuder på nyrökt sill, cykelvägar i världsklass och havsnära ställplatser.',
  },
  skagen: {
    badge: '💡 Visste du att?',
    tag: 'Två Hav Möts',
    fact: 'Vid Grenen på Danmarks nordspets kan du stå med en fot i Skagerrak och en fot i Kattegatt och se de två haven slå sina vågor mot varandra. Det unika ljuset har lockat konstnärer i generationer – ställplatserna nära hamnen ger promenadavstånd till färsk stekt rödspätta och Den Tilsandede Kirke.',
  },
  vattern: {
    badge: '💡 Visste du att?',
    tag: 'Källsjö & Polkagris',
    fact: 'Vättern är en av Europas djupaste källsjöar med ett siktdjup på över 15 meter – vattnet är så rent att det går att dricka direkt ur sjön! Kör den hisnande Turistvägen längs förkastningsbranten mellan Gränna och Ödeshög och ta gärna färjan över till historiska Visingsö för en dagsutflykt.',
  },

  // =========================================================================
  // 10 MEDELSVÅRA BANOR (NORDEN & NORDEUROPA)
  // =========================================================================
  dalsland: {
    badge: '💡 Visste du att?',
    tag: 'Akvedukter & Paddling',
    fact: 'Håverudakvedukten i Dalsland är en världsberömd ingenjörskonst där en landsvägsbro, en järnvägsbro och en stålplåtsakvedukt korsar varandra i tre våningar. Dalslands kanal kallas Sveriges sjörikaste landskap – ställplatserna vid sjön Stora Le är en dröm för dig som älskar stillhet och kanotäventyr.',
  },
  hogakusten: {
    badge: '💡 Visste du att?',
    tag: 'Världsarv & Kalottberg',
    fact: 'Höga Kusten har världens högsta landhöjning efter istiden (nästan 300 meter), vilket skapat dramatiska berg som stupar lodrätt ner i Bottenhavet. Parkera vid Skulebergets fot och ta linbanan till toppen, och missa inte idylliska ställplatser i fiskelägena Norrfällsviken och Barsta.',
  },
  jamtland: {
    badge: '💡 Visste du att?',
    tag: 'Forsar & Fjäll',
    fact: 'Tännforsen väster om Åre är Sveriges största forsfall med en fallhöjd på 37 meter och ett öronbedövande dån som sprider svalkande vattendimma. Vägarna runt Åre och Vålådalen är som gjorda för husbil under sensommaren när fjällbjörkarna sprakar i höstgult och hjortronen mognar på myrarna.',
  },
  fulufjallet: {
    badge: '💡 Visste du att?',
    tag: 'Sveriges Högsta Vattenfall',
    fact: 'Här störtar Njupeskär – Sveriges högsta vattenfall med 93 meters fallhöjd – och i närheten växer Old Tjikko, världens äldsta individuella trädklon på 9 560 år! Nationalparken har en fin besöksparkering och ställplatser i Mörkret och Särna; packa kängor för den vackra träspången genom ravinen.',
  },
  hardangervidda: {
    badge: '💡 Visste du att?',
    tag: 'Europas Största Högplatå',
    fact: 'Hardangervidda är Europas största högfjällsplatå och hemvist för kontinentens största stam av vilda fjällrenar. Riksvei 7 över platån är en spektakulär Nationell Turistväg – se till att ha full vattentank och fyllda gasolflaskor, då vädret kan slå om till kylig dimma och frisk vind även mitt i sommaren.',
  },
  saimen: {
    badge: '💡 Visste du att?',
    tag: 'Tusen Sjöar & Säl',
    fact: 'Saimen i östra Finland rymmer över 13 000 öar och är det enda hemmet för den sällsynta saimenvikaren – en sötvattenssäl som trivs på de solvarma klipporna. Vägnätet runt Savonlinna och det medeltida slottet Olofsborg bjuder på underbara sjönära ställplatser med tillgång till vedeldad bastu.',
  },
  ostsee: {
    badge: '💡 Visste du att?',
    tag: 'Hansa & Kust',
    fact: 'De historiska Hansastäderna Wismar och Stralsund längs tyska Östersjökusten är upptagna på UNESCO:s världsarvslista för sin ståtliga tegelgotik. Längs kusten i Mecklenburg finns utmärkta Wohnmobilstellplätze med full service; hyr en klassisk strandkorg (Strandkorb) för en lat eftermiddag i lä.',
  },
  rugen: {
    badge: '💡 Visste du att?',
    tag: 'Kritklippor & Bokskog',
    fact: 'De snövita kritklipporna vid Königsstuhl i nationalparken Jasmund reser sig 118 meter lodrätt ur havet och inspirerade den romantiske mästaren Caspar David Friedrich. Bropassagen från Stralsund är avgiftsfri, och ställplatserna i Sassnitz och badorterna Binz och Sellin har nära till vandringsstigar.',
  },
  harz: {
    badge: '💡 Visste du att?',
    tag: 'Ångtåg & Häxsagor',
    fact: 'Berget Brocken (1 142 m) är berömt från Goethes Faust och sägnen om häxsabbaten på Blåkulla, och hit kan man åka med historiska smalspåriga ånglok! Harzbergen bjuder på hisnande skogsvägar och korsvirkesstäder som Wernigerode och Quedlinburg med fina ställplatser nära vandringslederna.',
  },
  ardennes: {
    badge: '💡 Visste du att?',
    tag: 'Djupa Dalar & Slott',
    fact: 'Floden Meuse har meandrat sig djupt genom Ardennernas skifferberg och skapat svindlande utsiktsplatser som klippan La Roche à Sept Heures i Monthermé. Regionen är känd för medeltida borgar, grottor och trappistbryggerier – ställplatserna i Bouillon och Dinant är perfekta baser för kajak och cykel.',
  },

  // =========================================================================
  // 20 SVÅRA / EXPERT PRO-BANOR (EUROPA & EXTREMVÄDER)
  // =========================================================================
  lofoten: {
    badge: '💡 Visste du att?',
    tag: 'Granittoppar & Midnattssol',
    fact: 'Lofoten reser sig som en ogenomtränglig vägg av spetsiga alptoppar rakt ur Norska havet, med traditionella röda rorbuer (fiskestugor) vilande på träpålar. Kör E10 hela vägen till byn Å – ställplatserna vid Reine och Haukland strand bjuder på oslagbar utsikt mot midnattssol på sommaren och norrsken på hösten.',
  },
  alps: {
    badge: '💡 Visste du att?',
    tag: 'Alptoppar & Vinter',
    fact: 'Grossglockner och de österrikiska alppassen hyser några av Europas mäktigaste glaciärer och högst belägna vägar. Vintercamping här kräver dubbdäck eller snökedjor och bra isolering för gråvattentanken, men belöningen är pister i världsklass och uppvärmda campinganläggningar med bastulandskap.',
  },
  highlands: {
    badge: '💡 Visste du att?',
    tag: 'Lochs & Slott',
    fact: 'Eilean Donan Castle och den mytiska dalen Glen Coe i Skottland har agerat kuliss i odödliga storfilmer som Skyfall och Braveheart. Kustrutten North Coast 500 bjuder på vilda vyer – kör varsamt på de smala enfiliga vägarna och utnyttja mötesplatserna (passing places) när du möter lokaltrafik.',
  },
  iceland: {
    badge: '💡 Visste du att?',
    tag: 'Gejsrar & Vulkaner',
    fact: 'Islands vulkaniska krafter gör att du kan bada i naturligt heta källor mitt i karga lavafält med utsikt mot glaciärer och rykande mark. Husbilar håller sig tryggt till den asfalterade Ringvägen (Väg 1); övernatta på kustens campingar och upplev mäktiga dån vid vattenfallen Skógafoss och Seljalandsfoss.',
  },
  pyrenees: {
    badge: '💡 Visste du att?',
    tag: 'Högfjällspass & Dalar',
    fact: 'Bergspasset Col du Tourmalet (2 115 m) i Pyrenéerna är Tour de Frances mest legendariska stigning och kröns av en enorm cykelskulptur bland molnen. Serpentinvägarna mellan Frankrike och Spanien bjuder på fantastiska naturupplevelser under försommaren när bergsängarna står i full blom.',
  },
  dolomites: {
    badge: '💡 Visste du att?',
    tag: 'Rosa Kalkstensberg',
    fact: 'Dolomiternas ikoniska toppar Tre Cime di Lavaredo lyser i flammande rosa och orange vid solnedgången – ett naturfenomen som kallas Enrosadira. Passvägarna som Passo Sella kräver god motorbroms; ställ dig tidigt på ställplatserna kring Cortina d’Ampezzo för att säkra startplats inför morgonvandringen.',
  },
  lappland: {
    badge: '💡 Visste du att?',
    tag: 'Polarnatt & Norrsken',
    fact: 'I Abisko och Kiruna råder polarnatt i januari, men den arktiska himlen lyses upp av färgsprakande norrsken över ett knarrande snötäcke i 25 minusgrader. Vintercamping här kräver fungerande gasol (Propan), vinterisolerade tankar och 230V-kabel – missa inte ett besök på Ishotellet i Jukkasjärvi!',
  },
  nordkap: {
    badge: '💡 Visste du att?',
    tag: 'Europas Ände',
    fact: 'Nordkapsplatån reser sig 307 meter lodrätt ur Norra Ishavet och markerar symboliskt Europas nordligaste bilburna punkt på 71 grader nordlig breddgrad. Att stå parkerad med husbilen intill den berömda Globen under midnattssolens sken är ett oförglömligt minne – packa med varma, vindtäta kläder!',
  },
  transylvania: {
    badge: '💡 Visste du att?',
    tag: 'Serpentiner & Sagoslott',
    fact: 'Transfăgărășan-vägen genom Karpaterna har korats till världens bästa körväg av Top Gear, med 90 kilometer av kurvor genom greve Draculas hemtrakter. Vägen är öppen från slutet av juni till oktober – håll utkik efter vilda björnar vid vägkanten och bo på ställplatser nära medeltidsstaden Sibiu.',
  },
  corsica: {
    badge: '💡 Visste du att?',
    tag: 'Medelhavets Klippö',
    fact: 'Korsika kallas Skönhetens ö och reser sig som ett 2 700 meter högt granitberg ur Medelhavet, där den legendariska vandringsleden GR20 korsar bergskammarna. Vägarna genom Calanques de Piana har hisnande röda klippor mot turkost hav – välj gärna en smidig plåtis då bergsvägarna är smala.',
  },
  faroe: {
    badge: '💡 Visste du att?',
    tag: 'Atlantklippor & Sjöar',
    fact: 'Färöarna har fler får än människor och hyser sjön Sørvágsvatn som ser ut att sväva optiskt hundra meter ovanför det dånande Atlanthavet! Bilfärjan Smyril Line tar husbilar från Danmark till Tórshavn, och det moderna nätet av undervattenstunnlar gör det smidigt att nå alla öarnas campingar.',
  },
  tatras: {
    badge: '💡 Visste du att?',
    tag: 'Kompakta Alptoppar',
    fact: 'Höga Tatra i Slovakien är världens minsta alpmassiv till ytan men packar över 25 toppar över 2 500 meter med kristallklara glaciärsjöar som Štrbské Pleso. Här finns mycket prisvärda campingar vid bergskanten; ta linbanan upp till Lomnický štít för en makalös panoramavy över Centraleuropa.',
  },
  swissalps: {
    badge: '💡 Visste du att?',
    tag: 'Glaciärer & Furkapass',
    fact: 'Furkapasset i Schweiz blev odödligt genom James Bond-filmen Goldfinger, där 007 förföljer skurken i sin Aston Martin längs de snöklädda kurvorna. Utnyttja motorbromsen på väg ner och njut av schweiziska campingar i toppklass med smidiga tåganslutningar till bilfria alpbyar som Zermatt.',
  },
  picos: {
    badge: '💡 Visste du att?',
    tag: 'Kanjoner & Kustberg',
    fact: 'Nationalparken Picos de Europa i norra Spanien bjuder på den 1,5 kilometer djupa Cares-klyftan där stigen är uthuggen rakt i den lodräta bergsväggen. Bergen ligger bara tre mil från Atlantkusten, vilket gör att du kan surfa på stranden på förmiddagen och vandra bland bergsgetter på eftermiddagen!',
  },
  julianalps: {
    badge: '💡 Visste du att?',
    tag: 'Smaragdgröna Floder',
    fact: 'Floden Soča i Slovenien är världsberömd för sin otroliga, smaragdgröna färg och sitt kristallklara smältvatten från kalkstensbergen. Vršič-passet har 50 numrerade kullerstenskurvor med spektakulär utsikt, och längs floddalen finns idylliska ekocampingar för paddling och flugfiske.',
  },
  durmitor: {
    badge: '💡 Visste du att?',
    tag: 'Europas Djupaste Kanjon',
    fact: 'Tara-flodens kanjon i Montenegro är Europas djupaste ravin med 1 300 meters stup och korsas av den storslagna Đurđevića Tara-bron. Durmitor nationalpark bjuder på orörd vildmark och glaciärsjön Svarta sjön (Crno jezero) med prisvärda ställplatser i bergsstaden Žabljak på 1 450 meters höjd.',
  },
  senja: {
    badge: '💡 Visste du att?',
    tag: 'Norge i Miniatyr',
    fact: 'Ön Senja i Nordnorge kallas ett Norge i miniatyr med sina taggiga bergskammar Okshornan (Djävulens tänder) som störtar rakt ner i havet. Den nationella turistvägen bjuder på fantastiska utsiktsramper vid Tungeneset – här slipper du Lofotens trängsel men får minst lika spektakulära vyer.',
  },
  wildatlantic: {
    badge: '💡 Visste du att?',
    tag: '250 Mil Kustäventyr',
    fact: 'Den 2 500 kilometer långa Wild Atlantic Way längs Irlands västkust är en av världens längsta skyltade kustvägar och passerar de mäktiga Cliffs of Moher. Stanna vid en traditionell irländsk pub med livemusik på kvällen och njut av kustställplatserna vid Connemara och Dinglehalvön.',
  },
  sardinia: {
    badge: '💡 Visste du att?',
    tag: 'Karibiskt Vatten & Klippor',
    fact: 'Sardiniens Costa Smeralda och viken Cala Goloritzé har kritvita sandstränder och turkost vatten som mäter sig med Karibien, inramade av doftande vild myrten. Vår och tidig höst är bästa tiden för husbil här – bo gärna på lantliga Agricampeggio-gårdar med ställplatser mitt i olivlundarna.',
  },
  inari: {
    badge: '💡 Visste du att?',
    tag: 'Samernas Heliga Sjö',
    fact: 'Enare träsk (Inarijärvi) är samernas heliga sjö med över 3 000 öar, där den branta klippön Ukonkivi tjänat som forntida offerplats i årtusenden. Besök det prisbelönta samiska museet Siida i Inari – vägarna genom de oändliga tallskogarna bjuder på tysta ställplatser och vilda renar vid vägrenen.',
  },

  // =========================================================================
  // 20 LEGENDARISKA & PÅHITTADE RESMÅL (HEMLIG 4:E NIVÅ)
  // =========================================================================
  high_chaparral: {
    badge: '🤠 Legendarisk Resefakta',
    tag: 'Vilda Västern',
    fact: 'I Smålands egen westernstad råder revolverdueller på huvudgatan varje helg klockan tolv! Parkera husbilen med dragkroken mot diligensstationen och se upp för flygande tumbleweeds och sheriffens lasso när du vevar ut markisen.',
  },
  hogwarts: {
    badge: '⚡ Magisk Resefakta',
    tag: 'Trolldom & Häxkonst',
    fact: 'Hogwarts slott har 142 trappor som flyttar på sig när de har lust, och källaren rymmer ett hemligt husbilsgarage för flygande Ford Anglior. Parkera absolut inte under Piskande Pilträdet på innergården, och håll trollformeln Lumos redo om dementorer sänker kvällstemperaturen!',
  },
  jurassic_park: {
    badge: '🦖 Förhistorisk Resefakta',
    tag: 'Isla Nublar',
    fact: 'Ön Isla Nublar har frodig jurassisk djungel och världens enda ställplats med 10 000 volts elstängsel som standardutrustning. Lämna aldrig kylskåpet öppet med färsk biff om en T-Rex stampar förbi, och kom ihåg att föremål i backspegeln kan vara närmare än de ser ut!',
  },
  mordor: {
    badge: '🌋 Mörk Resefakta',
    tag: 'Domedagsberget',
    fact: 'Domedagsbergets vulkaniska aska håller ställplatsen naturligt golvvärmd året runt, även om luften luktar kraftigt av svavel och smälta ringar. Veva in markisen vid plötsliga orcherattacker och lita inte på GPS-vägvisare som viskar "My Precious" i serpentinkurvorna.',
  },
  north_pole: {
    badge: '🎅 Polarfakta',
    tag: 'Tomtens Verkstad',
    fact: 'På Nordpolen möts alla världens meridianer i en enda punkt, och tomtens flygande renar har reserverade gräsplättar intill elstolpen. Bjud nissarna på pepparkakor och varm glögg så skottar de fram husbilens hjul snabbare än en kälke i full karriär på julafton!',
  },
  area_51: {
    badge: '🛸 Topphemlig Resefakta',
    tag: 'Nevadaöknen',
    fact: 'Den mytomspunna militärbasen vid Groom Lake har fler blinkande UFO-ljus på natthimlen än det finns stjärnor i hela Vintergatan. Klä husbilstaket med aluminiumfolie mot utomjordisk tankeläsning, och fotografera inte de svarta helikoptrarna som hovrar över morgonkaffet.',
  },
  sherwood: {
    badge: '🏹 Laglös Resefakta',
    tag: 'Nottinghamshire',
    fact: 'Robin Hoods uråldriga jätteek Major Oak är över 800 år gammal och rymmer ett helt gäng fredlösa bågskyttar i sin ihåliga stam. Håll hårt i plånboken om du ser män i gröna trikåer bland ekarna – men bjuder du på lägereldssoppa delar de gärna med sig av kungens hjortstek.',
  },
  atlantis: {
    badge: '🔱 Undervattensfakta',
    tag: 'Sjunkna Riket',
    fact: 'Den mytomspunna sjunkna civilisationen på havets botten har gator belagda med skimrande orikalkum och korallpelare med självlysande maneter. Kom ihåg att fälla ner ubåtskölen och täta takluckorna ordentligt innan du parkerar intill Poseidons gyllene undervattenspalats!',
  },
  moon_base: {
    badge: '🚀 Kosmisk Resefakta',
    tag: 'Lugnets Hav',
    fact: 'På månen väger din husbil bara en sjättedel så mycket som på jorden, vilket gör att även den tyngsta packningen klarar maxvikten galant! Parkera alltid med solpanelerna riktade mot jorden och glöm inte rymddräkten när du ska tömma toatanken i det kosmiska vakuumet.',
  },
  wild_west_town: {
    badge: '🐎 Saloonfakta',
    tag: 'Guldrush-Dalen',
    fact: 'Denna dammiga guldgrävarstad har en saloon med svängdörrar och en smed som gärna riktar en böjd husbilsaxel i utbyte mot ett par guldklimpar. Knyt fast husbilen ordentligt i hästbommen utanför banken och se till att ha full vattentank – öknens törst skämtar man inte bort.',
  },
  narnia: {
    badge: '🦁 Förtrollad Resefakta',
    tag: 'Bortom Garderoben',
    fact: 'När du backar husbilen längst in i klädgarderoben möts du av evig vinter, doftande granbarr och en märklig viktoriansk lyktstolpe som brinner utan gasol. Bjud faunen herr Tumnus på te och rostat bröd i husbilen, men tacka nej till Vita Häxans förtrollade turkiska konfekt!',
  },
  neverland: {
    badge: '🧚 Äventyrsfakta',
    tag: 'Landet Ingenstans',
    fact: 'På denna magiska ö behöver du varken bli vuxen eller besiktiga husbilen, och sjöjungfrurna sjunger stämsång i lagunen vid varje solnedgång. Följ andra stjärnan till höger och flyg rakt fram till morgonen – se bara upp för Kapten Kroks kanonkulor när du fäller ner stödbenen!',
  },
  el_dorado: {
    badge: '👑 Gyllene Resefakta',
    tag: 'Guldstaden',
    fact: 'Den legendariska guldstaden i regnskogens djup är byggd av massivt guld, vilket ger husbilens solceller 300 % laddningseffekt från solreflektionerna. Akta chassit för tunga guldstenar på djungelstigen och byt inte bort husbilens konservöppnare mot rent guld – den är ovärderlig!',
  },
  bermuda_triangle: {
    badge: '🌀 Mystisk Resefakta',
    tag: 'Husbilsfärjan',
    fact: 'I detta beryktade havsområde snurrar kompassen som en frisbee och klockorna på instrumentpanelen börjar ticka baklänges mot 1970-talet. Lita på campingmagkänslan istället för navigatorn, och bli inte förvånad om borttappade campingbestick plötsligt dyker upp i kylskåpet.',
  },
  dracula_castle: {
    badge: '🧛 Gotisk Resefakta',
    tag: 'Greve Draculas Hemvist',
    fact: 'Det gotiska slottet på den dimmiga bergstoppen har hemliga lönngångar i källaren och fladdermöss stora som handväskor kretsande kring tinnarna. Häng en rejäl fläta vitlök i backspegeln och tacka nej till sena nattbesök av herrn i svart slängkappa – han dricker sällan morgonkaffe.',
  },
  nangijala: {
    badge: '🕊️ Sagolik Resefakta',
    tag: 'Körsbärsdalen',
    fact: 'I Nangijala råder lägereldarnas och sagornas tid, där körsbärsträden blommar året runt och floden flyter spegelblank genom den gröna dalen. Ställ husbilen intill Ryttargården i Körsbärsdalen, lyssna på Jonathans visor vid elden och hälsa på duvorna som flyger med frihetsbudskap.',
  },
  mars_colony: {
    badge: '🔴 Planetär Resefakta',
    tag: 'Olympus Mons',
    fact: 'Olympus Mons på Mars är solsystemets högsta vulkan – tre gånger högre än Mount Everest och så vidsträckt att den täcker hela Frankrike! Röd marssand och mikrometeoriter kräver täta filter; njut av den blå solnedgången från förarhytten medan hydroponiken grönskar i bodelen.',
  },
  pirate_cove: {
    badge: '🏴‍☠️ Sjörövarfakta',
    tag: 'Tortuga',
    fact: 'Sjörövarnästet Tortuga doftar av kryddrom, saltstänk och nygrillad fisk, och hamnens papegojor kan vissla femton piratsånger utantill. Gräv inte ner husbilsnyckeln tillsammans med skattkistan, och hissa den svartvita piratflaggan över markisen för att smälta in bland sjörövarna!',
  },
  mount_olympus: {
    badge: '⚡ Mytologisk Resefakta',
    tag: 'Gudarnas Boning',
    fact: 'På toppen av det mytologiska berget tronar Zeus och de grekiska gudarna bland molnen och bjuder ibland på gudomlig nektar och ambrosia. Var noga med jordningen när åskguden slungar blixtar över bergskammen, och fråga Pegasos snällt om han kan hämta färskt morgonbröd.',
  },
  cyberpunk_2099: {
    badge: '🌆 Futuristisk Resefakta',
    tag: 'Neon City 2099',
    fact: 'År 2099 parkerar man husbilen på skyskrapornas tak bland svävande neonskyltar, flygande taxibilar och glödande cyberljus. Koppla upp bodelen direkt mot stadens fusionsnät och kom ihåg att stänga av antigravitations-stödbenen innan du kliver ut på morgonen!',
  },
};

export function getDestinationFact(destOrId: string | { id: string } | null | undefined): DestinationFact {
  const id = typeof destOrId === 'string' ? destOrId : destOrId?.id || '';
  return (
    DESTINATION_FACTS[id] || {
      badge: '📍 Visste du att?',
      tag: 'Natur & Camping',
      fact: 'Varje resa bjuder på unika smultronställen och fantastiska naturupplevelser. Hitta ställplatser med el, vatten och natursköna vyer direkt på Campsite Swe!',
    }
  );
}
