import { ServiceItem, SituationItem, PortfolioItem } from './types';
import img7828 from './assets/IMG_7828.jpg';
import img8320 from './assets/IMG_8320.jpg';
import img8796 from './assets/IMG_8796.jpg';

export const PHONE = "721 055 441";
export const EMAIL = "strechymohwald@gmail.com";
export const NAME = "Martin Möhwald";

export const SITUATIONS: SituationItem[] = [
  { title: "Kompletní realizace střech" },
  { title: "Přetékající nebo poškozené žlaby" },
  { title: "Špatně provedené oplechování komínů nebo atik" },
  { title: "Nutná rychlá oprava po počasí" }
];

export const SERVICES: ServiceItem[] = [
  { 
    title: "Klempířské práce na střechách", 
    description: "Postavíme vám střechu, která vydrží. Komplexní pokrytí plechem od nejmenších pergol až po velké domy. Titanzinek, hliník, měď – vždy správný materiál pro vaši situaci. Spád, odvodnění, detail – všechno jsme řešili tisíckrát. Vaše střecha nebude výjimka.",
    image: img7828,
    mediaType: 'image'
  },
  { 
    title: "Montáž a opravy žlabů a svodů", 
    description: "Zatékající žlab? To dělá problémy. Instalujeme, opravujeme a údržbujeme žlaby všech typů. Správný spád, tesné spojení, kvalitní materiál. Vaše voda bude téct tam, kam má – a ne přes zeď.",
    image: img8320,
    mediaType: 'image'
  },
  { 
    title: "Oplechování komínů a atik", 
    description: "Precizní oplechování prostupů a ukončení střech je klíčové pro její životnost. Zajišťujeme vodotěsnost kolem komínových těles, atik, střešních oken a dalších prvků.",
    image: img8796,
    mediaType: 'image'
  },
  { 
    title: "Rekonstrukce a výměny prvků", 
    description: "Staré prvky musí pryč, nové mohou přijít. Demontujeme opotřebované díly a instalujeme moderní systémy, které vám vydrží. Dlouhodobě levnější než neustálé opravy.",
    image: img7828,
    mediaType: 'image'
  },
  { 
    title: "Havárie a akutní zásahy", 
    description: "Při poškození střechy větrem nebo krupobitím reagujeme rychle. Provádíme provizorní zajištění proti zatékání i následnou definitivní opravu.",
    image: img8320,
    mediaType: 'image'
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 1,
    image: img7828,
    mediaType: 'image',
    task: "Realizace falcované střechy na novostavbě",
    solution: "Od první trámy po poslední spáru. Středová linie, detaily, kvalita – to dělá rozdíl. Klient má střechu, která se nebude bát deště ani času."
  },
  {
    id: 2,
    image: img8320,
    mediaType: 'image',
    task: "Oplechování v historické (památkové) zástavbě",
    solution: "Tady se nesmí hrát si. Tradici vyhovující materiály, detaily respektující stáří domu. Nový ples bez toho, aby to vypadalo jako Disney kostým."
  },
  {
    id: 3,
    image: img8796,
    mediaType: 'image',
    task: "Moderní střecha a oplechování na rodinném domě",
    solution: "Současné techniky, čisté linie, bezpečí. Střecha, na kterou se nový majitel koukne s pocitem hrdosti – i z finančního hlediska to byla dobrá investice."
  }
];