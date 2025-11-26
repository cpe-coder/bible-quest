"use client";

import {
	Award,
	Book,
	Check,
	Crown,
	Heart as HeartIcon,
	RefreshCw,
	Sparkles,
	Star,
	Trophy,
	X,
} from "lucide-react";
import { useState } from "react";

type Question = {
	question: string;
	options: string[];
	correct: number;
};

type QuestionsGroup = {
	easy: Question[];
	medium: Question[];
	hard: Question[];
};

function shuffle<T>(array: T[]) {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}

const BibleQuest: React.FC = () => {
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const [lives, setLives] = useState<number>(3);
	const [answered, setAnswered] = useState<boolean>(false);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [difficulty, setDifficulty] = useState<
		null | "easy" | "medium" | "hard"
	>(null);
	const [streak, setStreak] = useState<number>(0);
	const [achievements, setAchievements] = useState<string[]>([]);
	const [showVerse, setShowVerse] = useState<boolean>(false);
	const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

	const allQuestions = {
		easy: [
			{
				question: "Sino ang nagtayo ng arka ayon sa utos ng Panginoon?",
				options: ["Moises", "Noe", "Abraham", "David"],
				correct: 1,
			},
			{
				question: "Ano ang unang aklat ng Banal na Kasulatan?",
				options: ["Exodo", "Genesis", "Mateo", "Pahayag"],
				correct: 1,
			},
			{
				question: "Sa ilang araw nilikha ng Panginoon ang langit at lupa?",
				options: ["Lima", "Anim", "Pito", "Sampu"],
				correct: 1,
			},
			{
				question:
					"Sino ang unang tao na nilikha ng Diyos ayon sa Kanyang larawan?",
				options: ["Noe", "Moises", "Adan", "Abraham"],
				correct: 2,
			},
			{
				question: "Sino ang unang babae na nilikha mula sa tadyang ni Adan?",
				options: ["Sara", "Eba", "Maria", "Rachel"],
				correct: 1,
			},
			{
				question: "Saan inilagay ng Panginoon sina Adan at Eba nang pasimula?",
				options: ["Canaan", "Halamanan ng Eden", "Egipto", "Jerusalem"],
				correct: 1,
			},
			{
				question:
					"Alin ang tatlong anak nina Adan at Eba na binanggit sa Kasulatan?",
				options: [
					"Cain, Abel, Set",
					"Sem, Cam, Jafet",
					"Isac, Jacob, Esau",
					"Moises, Aaron, Josue",
				],
				correct: 0,
			},
			{
				question: "Ilang araw at gabi bumuhos ang ulan sa panahon ng baha?",
				options: ["Tatlumpu", "Apatnapu", "Limampu", "Sandaan"],
				correct: 1,
			},
			{
				question:
					"Ano ang tanda ng tipan ng Panginoon kay Noe na hindi na lilipulin ang lupa sa baha?",
				options: ["Kalapati", "Bahaghari", "Sangang olibo", "Ulap"],
				correct: 1,
			},
			{
				question:
					"Ilang kapatid na lalaki ang mayroon si Jose na anak ni Jacob?",
				options: ["Sampu", "Labing-isa", "Labindalawa", "Siyam"],
				correct: 1,
			},
			{
				question: "Anong damit na makukulay ang ibinigay ni Israel kay Jose?",
				options: [
					"Singsing",
					"Tunikang may maraming kulay",
					"Korona",
					"Tungkod",
				],
				correct: 1,
			},
			{
				question: "Saang lungsod isinilang ang Panginoong Jesucristo?",
				options: ["Nazaret", "Jerusalem", "Betlehem", "Capernaum"],
				correct: 2,
			},
			{
				question: "Sino ang nagbautismo sa Panginoong Jesucristo sa Jordan?",
				options: ["Pedro", "Juan na Tagapagbautismo", "Felipe", "Andres"],
				correct: 1,
			},
			{
				question:
					"Ilang alagad ang pinili ng Panginoon upang maging apostoles?",
				options: ["Sampu", "Labindalawa", "Pitumpu", "Pitumpu’t dalawa"],
				correct: 1,
			},
			{
				question: "Ano ang pinakamaikling talata sa buong Kasulatan?",
				options: [
					"“Gayon na lamang ang pag-ibig”",
					"“Tumangis si Jesus”",
					"“Mananalangin kayo”",
					"“Magsayahan kayo”",
				],
				correct: 1,
			},
			{
				question:
					"Ano ang ginawa ng Panginoon sa tubig sa kasalan sa Cana ng Galilea?",
				options: ["Gatas", "Alak", "Langis", "Katas"],
				correct: 1,
			},
			{
				question:
					"Sino ang nagkanulo sa Panginoon sa halagang tatlumpung pirasong pilak?",
				options: ["Pedro", "Juan", "Judas Iscariote", "Tomas"],
				correct: 2,
			},
			{
				question:
					"Anong araw ng linggo muling nabuhay ang Panginoon mula sa mga patay?",
				options: ["Biyernes", "Sabado", "Unang araw ng linggo", "Lunes"],
				correct: 2,
			},
			{
				question: "Ano ang huling aklat ng Banal na Kasulatan?",
				options: ["Judas", "Pahayag kay Juan", "3 Juan", "Mga Hebreo"],
				correct: 1,
			},
			{
				question: "Sino ang pumatay sa Filisteong higanteng si Goliat?",
				options: ["Saul", "Jonatan", "Samuel", "David"],
				correct: 3,
			},
			{
				question: "Ilang taon nabuhay si Matusalem, ang pinakamatandang tao?",
				options: ["777", "888", "969", "999"],
				correct: 2,
			},
			{
				question: "Sino ang unang hari ng Israel na pinahiran ni Samuel?",
				options: ["David", "Salomon", "Saul", "Jeroboam"],
				correct: 2,
			},
			{
				question: "Sino ang birheng ina ng Panginoong Jesucristo?",
				options: ["Elizabeth", "Maria", "Marta", "Ana"],
				correct: 1,
			},
			{
				question: "Sino ang lalaking itinuring na ama sa lupa ng Panginoon?",
				options: ["Zacarias", "Jose", "Simeon", "Juan"],
				correct: 1,
			},
			{
				question: "Saang dagat naglakad ang Panginoon sa ibabaw ng tubig?",
				options: [
					"Dagat Patay",
					"Dagat na Pula",
					"Dagat ng Galilea",
					"Ilog Jordan",
				],
				correct: 2,
			},
			{
				question:
					"Ilang tinapay at isda ang ginamit ng Panginoon upang pakainin ang mahigit limang libo?",
				options: [
					"5 tinapay, 2 isda",
					"7 tinapay, 3 isda",
					"12 tinapay, 5 isda",
					"4 tinapay, 1 isda",
				],
				correct: 0,
			},
			{
				question:
					"Ano ang ginawa ng Panginoon sa paa ng Kanyang mga alagad sa Huling Hapunan?",
				options: [
					"Pinahiran ng langis",
					"Hinugasan",
					"Hinalikan",
					"Pinahiran ng pabango",
				],
				correct: 1,
			},
			{
				question:
					"Sino ang tatlong beses tumanggi sa Panginoon bago tumilaok ang manok?",
				options: ["Judas", "Pedro", "Tomas", "Andres"],
				correct: 1,
			},
			{
				question: "Paano umakyat ang Panginoong Jesucristo sa langit?",
				options: [
					"Sa karwahe ng apoy",
					"Siya’y dinala ng mga anghel",
					"Siya’y umakyat sa alapaap",
					"Sa pamamagitan ng hagdan",
				],
				correct: 2,
			},
			{
				question: "Ilang aklat sa Bagong Tipan ang isinulat ni apostol Juan?",
				options: ["Isa", "Dalawa", "Tatlumpu", "Apat"],
				correct: 2,
			},
			{
				question:
					"Alin ang apat na Ebanghelyo na nagsasalaysay ng buhay ng Panginoon?",
				options: [
					"Mga Gawa, Roma, 1 Corinto, Galacia",
					"Mateo, Marcos, Lucas, Juan",
					"Genesis, Exodo, Levitico, Bilang",
					"Mga Awit, Kawikaan, Eclesiastes, Cantares",
				],
				correct: 1,
			},
			{
				question: "Sino ang pinagbili ng kanyang mga kapatid sa mga Ismaelita?",
				options: ["Moises", "Jose", "Benjamin", "Ruben"],
				correct: 1,
			},
			{
				question:
					"Sino ang itinapon sa lungga ng mga leon dahil sa panalangin?",
				options: ["Jeremias", "Daniel", "Ezequiel", "Isaias"],
				correct: 1,
			},
			{
				question: "Sino ang humati sa Dagat na Pula sa harap ng mga Israelita?",
				options: ["Josue", "Moises", "Aaron", "Caleb"],
				correct: 1,
			},
			{
				question: "Sino ang pinahiran ni Samuel bilang hari sa Bethlehem?",
				options: ["Saul", "David", "Salomon", "Absalom"],
				correct: 1,
			},
			{
				question: "Sino ang nakipagbuno sa anghel hanggang madaling-araw?",
				options: ["Abraham", "Jacob", "Moises", "Elias"],
				correct: 1,
			},
			{
				question: "Ano ang bagong pangalan na ibinigay ng Panginoon kay Jacob?",
				options: ["Jose", "Israel", "Juda", "Benjamin"],
				correct: 1,
			},
			{
				question:
					"Sino ang nilamon ng malaking isda tatlong araw at tatlong gabi?",
				options: ["Jonas", "Nahum", "Habacuc", "Obadias"],
				correct: 0,
			},
			{
				question: "Sino ang kaibigang lubos na minahal ni David?",
				options: ["Samuel", "Jonatan", "Natan", "Abner"],
				correct: 1,
			},
			{
				question: "Sino ang pinakamarunong na hari na nagtayo ng Templo?",
				options: ["David", "Salomon", "Asa", "Josaphat"],
				correct: 1,
			},
			{
				question:
					"Sino ang reyna na bumisita kay Salomon at nagdala ng mga regalo?",
				options: [
					"Reyna ng Egipto",
					"Reyna ng Sheba",
					"Reyna Ester",
					"Reyna Jezabel",
				],
				correct: 1,
			},
			{
				question: "Sino ang tinatawag na “propeta na umiiyak”?",
				options: ["Isaias", "Jeremias", "Ezequiel", "Daniel"],
				correct: 1,
			},
			{
				question: "Sino ang dinala sa langit sa nagniningas na karwahe?",
				options: ["Elias", "Eliseo", "Enoc", "Moises"],
				correct: 0,
			},
			{
				question: "Sino ang ipinagbili ng tatlumpung pirasong pilak?",
				options: ["Jose", "Panginoong Jesucristo", "Samson", "Jeremias"],
				correct: 1,
			},
			{
				question: "Sino ang nagbigti pagkatapos magkanulo sa Panginoon?",
				options: ["Pedro", "Judas Iscariote", "Tomas", "Bartolome"],
				correct: 1,
			},
			{
				question: "Sino ang pumalit kay Judas bilang ikalabindalawang apostol?",
				options: ["Bernabe", "Matias", "Pablo", "Silas"],
				correct: 1,
			},
			{
				question:
					"Sa ika-ilang araw pagkatapos ng Paskuwa dumating ang Espiritu Santo sa Pentecostes?",
				options: ["Ika-40", "Ika-50", "Ika-7", "Ika-120"],
				correct: 1,
			},
			{
				question: "Ilang tao ang nasa loob ng arka ni Noe?",
				options: ["Apat", "Anim", "Walo", "Labindalawa"],
				correct: 2,
			},
			{
				question: "Anong ibon ang unang pinakawalan ni Noe pagkatapos ng baha?",
				options: ["Kalapati", "Uwak", "Agila", "Lawin"],
				correct: 1,
			},
			{
				question: "Sino ang pinakamatandang tao sa Kasulatan?",
				options: ["Adan", "Noe", "Matusalem", "Enoc"],
				correct: 2,
			},
			{
				question: "Sino ang nagtayo ng Templo sa Jerusalem?",
				options: ["David", "Salomon", "Zorobabel", "Herodes"],
				correct: 1,
			},
			{
				question: "Sino ang ama ni David?",
				options: ["Isai", "Obed", "Boaz", "Salmon"],
				correct: 0,
			},
			{
				question: "Sino ang pinakamalakas na hukom ng Israel?",
				options: ["Gideon", "Debora", "Samson", "Samuel"],
				correct: 2,
			},
			{
				question:
					"Sino ang nakalakad sa tubig kasama ang Panginoon nang sandali?",
				options: ["Juan", "Pedro", "Andres", "Felipe"],
				correct: 1,
			},
			{
				question:
					"Sino ang hindi naniniwala hanggang hinawakan ang mga sugat ng Panginoon?",
				options: ["Pedro", "Juan", "Tomas", "Santiago"],
				correct: 2,
			},
			{
				question: "Sino ang nagpasan ng krus ng Panginoon patungong Golgota?",
				options: [
					"Juan",
					"Simon na taga-Cirene",
					"Jose na taga-Arimatea",
					"Nicodemo",
				],
				correct: 1,
			},
			{
				question: "Sino ang nagbigay ng kanyang libingan para sa Panginoon?",
				options: ["Nicodemo", "Jose na taga-Arimatea", "Pilato", "Caifas"],
				correct: 1,
			},
			{
				question: "Anong wika ang karaniwang ginamit sa Bagong Tipan?",
				options: ["Hebreo", "Griyego", "Latin", "Arameo"],
				correct: 1,
			},
			{
				question:
					"Sino ang iniligtas ng kanyang ina sa pamamagitan ng basket sa Nilo?",
				options: ["Moises", "Aaron", "Josue", "Samuel"],
				correct: 0,
			},
			{
				question: "Ano ang unang salot sa Egipto?",
				options: ["Tubig na naging dugo", "Palaka", "Balang", "Kadiliman"],
				correct: 0,
			},
			{
				question: "Saan ibinigay ng Panginoon ang Sampung Utos kay Moises?",
				options: ["Bundok Horeb", "Bundok Sinai", "Bundok Sion", "Bundok Nebo"],
				correct: 1,
			},
			{
				question:
					"Ano ang gintong guya na ginawa ng mga Israelita sa paanan ng bundok?",
				options: [
					"Gintong ahas",
					"Gintong guya",
					"Gintong kordero",
					"Gintong toro",
				],
				correct: 1,
			},
			{
				question: "Sino ang unang mataas na saserdote ng Israel?",
				options: ["Eli", "Aaron", "Pinehas", "Samuel"],
				correct: 1,
			},
			{
				question: "Sino ang propetang babae na humukom sa Israel?",
				options: ["Ana", "Debora", "Hulda", "Miriam"],
				correct: 1,
			},
			{
				question: "Sino ang nagwika: “Narito ako, sugin mo ako”?",
				options: ["Samuel", "Isaias", "Jeremias", "Ezequiel"],
				correct: 1,
			},
			{
				question: "Sino ang pinahirang hari nang lihim sa Bethlehem?",
				options: ["Saul", "David", "Salomon", "Adonias"],
				correct: 1,
			},
			{
				question: "Sino ang kaaway na Filisteo na pinatay ni David?",
				options: ["Goliat", "Achis", "Abimelec", "Hanan"],
				correct: 0,
			},
			{
				question: "Sino ang anak ni David na nagrebelde laban sa kanya?",
				options: ["Salomon", "Absalom", "Adonias", "Amnon"],
				correct: 1,
			},
			{
				question:
					"Sino ang propeta na humarap kay David pagkatapos ng kasalanan kay Batsheba?",
				options: ["Samuel", "Natan", "Gad", "Ahias"],
				correct: 1,
			},
			{
				question:
					"Sino ang reyna na nagligtas sa mga Judio mula sa kamay ni Aman?",
				options: ["Vasthi", "Ester", "Jezabel", "Athalia"],
				correct: 1,
			},
			{
				question:
					"Sino ang propeta na dinala sa langit nang hindi nakaranas ng kamatayan?",
				options: ["Elias", "Eliseo", "Enoc", "Moises"],
				correct: 2,
			},
			{
				question:
					"Sino ang propeta na nakakita ng pangitain ng mga tuyot na buto?",
				options: ["Isaias", "Jeremias", "Ezequiel", "Daniel"],
				correct: 2,
			},
			{
				question:
					"Sino ang propeta na nagsabi: “Narito, ang birhen ay maglilihi”?",
				options: ["Isaias", "Micah", "Jeremias", "Malaquias"],
				correct: 0,
			},
			{
				question:
					"Sino ang propeta na hinulaan ang Betlehem bilang pook na isisilang ng Mesias?",
				options: ["Isaias", "Micah", "Jeremias", "Daniel"],
				correct: 1,
			},
			{
				question:
					"Sino ang nagbautismo sa Panginoon at nakakita ng Espiritu na bumababa na parang kalapati?",
				options: ["Pedro", "Juan na Tagapagbautismo", "Felipe", "Andres"],
				correct: 1,
			},
			{
				question: "Sino ang alagad na tinawag na “Batong lalaki” ng Panginoon?",
				options: ["Pedro", "Andres", "Juan", "Santiago"],
				correct: 0,
			},
			{
				question: "Sino ang alagad na “minamahal ng Panginoon”?",
				options: ["Pedro", "Santiago", "Juan", "Andres"],
				correct: 2,
			},
			{
				question: "Sino ang naghugas ng paa ng mga alagad sa Huling Hapunan?",
				options: ["Pedro", "Panginoong Jesucristo", "Judas", "Juan"],
				correct: 1,
			},
			{
				question:
					"Sino ang nagsabi: “Panginoon, kanino kami pupunta? Nasa iyo ang salita ng buhay na walang hanggan”?",
				options: ["Pedro", "Tomas", "Felipe", "Judas (hindi Iscariote)"],
				correct: 0,
			},
			{
				question: "Sino ang nagsabi: “Aking Panginoon at aking Diyos”?",
				options: ["Pedro", "Juan", "Tomas", "Natanael"],
				correct: 2,
			},
			{
				question: "Sino ang unang martir ng Kristiyanismo?",
				options: ["Santiago", "Esteban", "Pablo", "Juan"],
				correct: 1,
			},
			{
				question: "Sino ang dating maniningil ng buwis na naging apostol?",
				options: ["Mateo", "Lucas", "Marcos", "Bartolome"],
				correct: 0,
			},
			{
				question: "Sino ang dating manunulsol na naging apostol sa mga Hentil?",
				options: ["Pedro", "Pablo", "Bernabe", "Silas"],
				correct: 1,
			},
			{
				question: "Sino ang nagsulat ng Aklat ng mga Gawa?",
				options: ["Pablo", "Pedro", "Juan", "Lucas"],
				correct: 3,
			},
			{
				question: "Sino ang nagsulat ng Pahayag kay Juan?",
				options: ["Pablo", "Pedro", "Santiago", "Juan"],
				correct: 3,
			},
			{
				question: "Saang isla isinulat ni Juan ang Pahayag?",
				options: ["Crete", "Cyprus", "Patmos", "Malta"],
				correct: 2,
			},
			{
				question: "Ano ang kahulugan ng “Immanuel”?",
				options: [
					"Makapangyarihang Diyos",
					"Diyos na kasama natin",
					"Prinsipe ng Kapayapaan",
					"Ama na walang hanggan",
				],
				correct: 1,
			},
			{
				question: "Sino ang lalaking nag-alay ng tinapay at alak kay Abraham?",
				options: ["Melchizedek", "Abimelec", "Lot", "Faraon"],
				correct: 0,
			},
			{
				question:
					"Sino ang asawa ni Abraham na birhen nang ipinangako ang anak?",
				options: ["Hagar", "Keturah", "Sara", "Rebeca"],
				correct: 2,
			},
			{
				question:
					"Sino ang anak na ipinangako na isisilang kay Abraham at Sara?",
				options: ["Ismael", "Isac", "Jacob", "Esau"],
				correct: 1,
			},
			{
				question:
					"Sino ang babaeng nag-alay ng awit pagkatapos tumawid sa Dagat na Pula?",
				options: ["Maria", "Miriam", "Debora", "Jael"],
				correct: 1,
			},
			{
				question: "Sino ang propetang hinulaan ang “Bagong Tipan”?",
				options: ["Isaias", "Jeremias", "Ezequiel", "Daniel"],
				correct: 1,
			},
			{
				question: "Sino ang propeta na nagsabi: “Isang daan sa ilang”?",
				options: ["Isaias", "Malaquias", "Micah", "Hagai"],
				correct: 0,
			},
			{
				question: "Sino ang propeta na nagdala ng sulat mula sa langit?",
				options: ["Elias", "Eliseo", "Jonas", "Isaias"],
				correct: 0,
			},
			{
				question:
					"Sino ang propeta na gumaling sa ketong sa pamamagitan ng pagligo sa Jordan?",
				options: ["Giezi", "Naaman", "Benhaded", "Hazael"],
				correct: 1,
			},
			{
				question:
					"Sino ang propeta na nagpagaling ng lalaking nahulog mula sa bintana?",
				options: ["Elias", "Eliseo", "Isaias", "Jeremias"],
				correct: 1,
			},
			{
				question: "Sino ang propeta na nagpalutang ng palakol sa tubig?",
				options: ["Elias", "Eliseo", "Samuel", "Natan"],
				correct: 1,
			},
			{
				question:
					"Sino ang propeta na nakakita ng “mga gulong sa loob ng gulong”?",
				options: ["Isaias", "Jeremias", "Ezequiel", "Daniel"],
				correct: 2,
			},
			{
				question:
					"Sino ang propeta na isinulat ang “Mene, Mene, Tekel, Upharsin”?",
				options: ["Isaias", "Jeremias", "Ezequiel", "Daniel"],
				correct: 3,
			},
			{
				question: "Sino ang propeta na hinulaan ang “pitumpu’t pitong linggo”?",
				options: ["Isaias", "Jeremias", "Ezequiel", "Daniel"],
				correct: 3,
			},
			{
				question: "Sino ang propeta na dinala ng Espiritu sa ibang lugar?",
				options: ["Ezequiel", "Felipe", "Elias", "Eliseo"],
				correct: 0,
			},
		],
		medium: [
			{
				question: "Totoo o Mali: Si David ang sumulat ng lahat ng Mga Awit.",
				options: ["Totoo", "Mali"],
				correct: 1,
			},
			{
				question: "Ano ang pinakamaikling aklat sa Bagong Tipan?",
				options: ["Filemon", "2 Juan", "3 Juan", "Judas"],
				correct: 2,
			},
			{
				question: "Ilang aklat meron ang buong Biblia?",
				options: ["39", "66", "73", "100"],
				correct: 1,
			},
			{
				question: "Ilang aklat ang nasa Lumang Tipan?",
				options: ["27", "39", "46", "52"],
				correct: 1,
			},
			{
				question: "Ilang aklat ang nasa Bagong Tipan?",
				options: ["27", "39", "66", "12"],
				correct: 0,
			},
			{
				question: "Saang Ebanghelyo matatagpuan ang Sermon sa Bundok?",
				options: ["Marcos", "Lucas", "Mateo", "Juan"],
				correct: 2,
			},
			{
				question: "Sino ang anak ni David na naging hari pagkatapos niya?",
				options: ["Absalom", "Salomon", "Adonias", "Amnon"],
				correct: 1,
			},
			{
				question: "Anong wika ang karaniwang ginamit sa Lumang Tipan?",
				options: ["Griyego", "Hebreo", "Arameo", "Latin"],
				correct: 1,
			},
			{
				question: "Sino ang sumulat ng pinakamaraming aklat sa Bagong Tipan?",
				options: ["Juan", "Pedro", "Lucas", "Pablo"],
				correct: 3,
			},
			{
				question: "Sino ang sumulat ng pinakamaraming salita sa buong Biblia?",
				options: ["Pablo", "Moises", "David", "Lucas"],
				correct: 1,
			},
			{
				question: "Alin ang tatlong anak ni Noe?",
				options: [
					"Sem, Cam, Jafet",
					"Cain, Abel, Set",
					"Isac, Jacob, Esau",
					"Moises, Aaron, Josue",
				],
				correct: 0,
			},
			{
				question: "Sino ang tinawag ng Panginoon mula sa Ur ng mga Caldeo?",
				options: ["Abram", "Lot", "Tera", "Haran"],
				correct: 0,
			},
			{
				question: "Ano ang bagong pangalan na ibinigay ng Panginoon kay Sarai?",
				options: ["Rebeca", "Rachel", "Sara", "Lea"],
				correct: 2,
			},
			{
				question: "Sino ang alipin ni Sara na naging ina ni Ismael?",
				options: ["Hagar", "Bilha", "Zilpa", "Keturah"],
				correct: 0,
			},
			{
				question: "Sino ang anak na ipinangako sa tipan kay Abraham?",
				options: ["Ismael", "Isac", "Jacob", "Esau"],
				correct: 1,
			},
			{
				question: "Sino ang pumili ng asawa ni Isac na si Rebeca?",
				options: ["Abraham", "Ang lingkod ni Abraham", "Lot", "Ismael"],
				correct: 1,
			},
			{
				question: "Alin ang kambal na anak ni Isac?",
				options: [
					"Jacob at Esau",
					"Ruben at Simeon",
					"Jose at Benjamin",
					"Manases at Efraim",
				],
				correct: 0,
			},
			{
				question: "Ano ang ipinagbili ni Esau sa isang mangkok ng pagkain?",
				options: [
					"Kanyang mana",
					"Kanyang primohenitura",
					"Kanyang asawa",
					"Kanyang tirahan",
				],
				correct: 1,
			},
			{
				question: "Sino ang tumulong kay Jacob upang makuha ang pagpapala?",
				options: ["Rachel", "Lea", "Rebeca", "Laban"],
				correct: 2,
			},
			{
				question:
					"Sino ang unang asawa ni Jacob na ipinagtrabaho siya ng pitong taon?",
				options: ["Lea", "Rachel", "Bilha", "Zilpa"],
				correct: 1,
			},
			{
				question:
					"Ilang taon pang pinagtrabaho si Jacob upang makasal kay Rachel?",
				options: ["Pito", "Labing-apat", "Dalawampu", "Tatlumpu"],
				correct: 0,
			},
			{
				question:
					"Ano ang ginawa ng palumpong na hindi nasunog nang kausapin ng Panginoon si Moises?",
				options: [
					"Nagliyab nang walang nasusunog",
					"Naging ahas",
					"Naging tungkod",
					"Naging krus",
				],
				correct: 0,
			},
			{
				question: "Ilang salot ang ipinadala ng Panginoon sa Egipto?",
				options: ["Pito", "Sampu", "Labindalawa", "Labinglima"],
				correct: 1,
			},
			{
				question:
					"Ano ang huling salot na pumatay sa lahat ng panganay sa Egipto?",
				options: [
					"Balang",
					"Kadiliman",
					"Pagkamatay ng mga panganay",
					"Ulan ng apoy",
				],
				correct: 2,
			},
			{
				question:
					"Alin ang dalawang espiya na naniwala na kaya nilang sakupin ang Canaan?",
				options: [
					"Josue at Caleb",
					"Moises at Aaron",
					"Nadab at Abihu",
					"Gideon at Barak",
				],
				correct: 0,
			},
			{
				question:
					"Saang lungsod tumumba ang pader pagkatapos ng pitong araw na pag-ikot?",
				options: ["Ai", "Jericho", "Gabaon", "Lachis"],
				correct: 1,
			},
			{
				question:
					"Sino ang hukom na babae na tumawag kay Barak laban kay Sisara?",
				options: ["Ana", "Debora", "Jael", "Hulda"],
				correct: 1,
			},
			{
				question:
					"Sino ang tumalo sa mga Midianita gamit ang tatlong daang lalaki?",
				options: ["Samson", "Gideon", "Saul", "David"],
				correct: 1,
			},
			{
				question: "Sino ang hukom na may mahabang buhok at Nazarita?",
				options: ["Samuel", "Saul", "Samson", "Eli"],
				correct: 2,
			},
			{
				question: "Paano namatay si Samson?",
				options: [
					"Sa katandaan",
					"Itinulak ang mga haligi ng templo",
					"Sa labanan",
					"Lason",
				],
				correct: 1,
			},
			{
				question: "Sino ang pumahid ng langis kay Saul bilang unang hari?",
				options: ["David", "Samuel", "Natan", "Gad"],
				correct: 1,
			},
			{
				question: "Ilang beses pinatawad ni David ang buhay ni Saul?",
				options: ["Isa", "Dalawa", "Tatlumpu", "Hindi kailanman"],
				correct: 1,
			},
			{
				question: "Saan unang pinatawad ni David si Saul?",
				options: ["Sa palasyo", "Sa kuweba", "Sa bukid", "Sa labanan"],
				correct: 1,
			},
			{
				question:
					"Sino ang anak ni David na nag-aklas at nagpahayag na hari sa Hebron?",
				options: ["Salomon", "Absalom", "Adonias", "Amnon"],
				correct: 1,
			},
			{
				question: "Sino ang pumatay kay Absalom habang nakabitin sa puno?",
				options: ["David", "Joab", "Abisai", "Asahel"],
				correct: 1,
			},
			{
				question:
					"Ano ang hiniling ni Salomon sa Panginoon nang siya’y maging hari?",
				options: ["Yaman", "Mahabang buhay", "Karunungan", "Maraming anak"],
				correct: 2,
			},
			{
				question: "Ilang asawa ang mayroon si Salomon?",
				options: ["100", "300", "700", "1000"],
				correct: 2,
			},
			{
				question: "Ano ang nangyari sa kaharian pagkatapos mamatay ni Salomon?",
				options: ["Lumaki pa", "Nahati sa dalawa", "Nasakop", "Nagkaisa uli"],
				correct: 1,
			},
			{
				question:
					"Sino ang sumakop sa kaharian ng Israel (hilagang sampung lipi)?",
				options: ["Babilonia", "Asiria", "Egipto", "Persia"],
				correct: 1,
			},
			{
				question: "Sino ang sumakop sa kaharian ng Juda?",
				options: ["Asiria", "Babilonia", "Persia", "Roma"],
				correct: 1,
			},
			{
				question:
					"Alin ang tatlong Hebreo na itinapon sa nagniningas na hurno?",
				options: [
					"Daniel, Shadrac, Meshac",
					"Shadrac, Meshac, Abednego",
					"Hanania, Misael, Azaria",
					"Belteshazar, Abednego, Meshac",
				],
				correct: 1,
			},
			{
				question:
					"Sino ang nagpaliwanag ng panaginip ni Nabucodonosor tungkol sa malaking rebulto?",
				options: ["Daniel", "Jose", "Ezequiel", "Isaias"],
				correct: 0,
			},
			{
				question: "Sino ang nagbalik upang itayo ang mga pader ng Jerusalem?",
				options: ["Esdras", "Nehemias", "Zorobabel", "Josue"],
				correct: 1,
			},
			{
				question: "Sino ang reyna na nagligtas sa mga Judio mula kay Aman?",
				options: ["Vasthi", "Ester", "Jezabel", "Athalia"],
				correct: 1,
			},
			{
				question: "Ilang araw patay si Lazaro bago siya buhayin ng Panginoon?",
				options: ["Isa", "Dalawa", "Tatlumpu", "Apat"],
				correct: 3,
			},
			{
				question: "Saang hardin nanalangin ang Panginoon bago Siya dakpin?",
				options: ["Eden", "Getsemani", "Olivo", "Paraiso"],
				correct: 1,
			},
			{
				question:
					"Sino ang naghugas ng kanyang mga kamay sa paghatol sa Panginoon?",
				options: ["Herodes", "Pilato", "Caifas", "Anas"],
				correct: 1,
			},
			{
				question:
					"Gaano karaming tao ang nakakita sa muling nabuhay na Panginoon ayon kay Pablo?",
				options: ["Mahigit 300", "Mahigit 500", "Mahigit 700", "Mahigit 1000"],
				correct: 1,
			},
			{
				question:
					"Sino ang nangaral sa unang Pentecostes pagkatapos ng pag-akyat ng Panginoon?",
				options: ["Pablo", "Pedro", "Juan", "Santiago"],
				correct: 1,
			},
			{
				question: "Sino ang unang martir ng iglesia?",
				options: ["Pedro", "Santiago", "Esteban", "Pablo"],
				correct: 2,
			},
			{
				question: "Ano ang dating pangalan ni Pablo?",
				options: ["Simon", "Saulo", "Silas", "Sergio"],
				correct: 1,
			},
			{
				question: "Sino ang tumakas sa Damasco sa loob ng basket?",
				options: ["Pedro", "Pablo", "Bernabe", "Juan Marcos"],
				correct: 1,
			},
			{
				question: "Saang lungsod unang tinawag na “Kristiyano” ang mga alagad?",
				options: ["Jerusalem", "Antioquia", "Efeso", "Corinto"],
				correct: 1,
			},
			{
				question: "Saan matatagpuan ang Panalangin ng Panginoon?",
				options: [
					"Mateo 6 lamang",
					"Lucas 11 lamang",
					"Sa Mateo at Lucas",
					"Juan 17",
				],
				correct: 2,
			},
			{
				question: "Saan nakatala ang Bunga ng Espiritu?",
				options: ["Roma 12", "Galacia 5", "Efeso 4", "Colosas 3"],
				correct: 1,
			},
			{
				question: "Ilan ang bunga ng Espiritu Santo?",
				options: ["7", "9", "10", "12"],
				correct: 1,
			},
			{
				question: "Sino ang nagsulat ng Mga Gawa ng mga Apostoles?",
				options: ["Pablo", "Pedro", "Juan", "Lucas"],
				correct: 3,
			},
			{
				question: "Sino ang nagsulat ng Sulat sa mga taga-Roma?",
				options: ["Pedro", "Pablo", "Santiago", "Judas"],
				correct: 1,
			},
			{
				question:
					"Saang iglesia isinulat ni Pablo ang tungkol sa mga kaloob ng Espiritu?",
				options: ["Roma", "Corinto", "Galacia", "Efeso"],
				correct: 1,
			},
			{
				question:
					"Sino ang tatlong beses na nakaranas ng pagkabagbag ng barko?",
				options: ["Pedro", "Pablo", "Juan", "Bernabe"],
				correct: 1,
			},
			{
				question: "Sino ang nagsulat ng mga sulat mula sa bilangguan?",
				options: ["Pedro", "Juan", "Pablo", "Silas"],
				correct: 2,
			},
			{
				question:
					"Sino ang nakakita ng pangitain ng malaking kumot na may mga hayop na marumi?",
				options: ["Pablo", "Pedro", "Juan", "Felipe"],
				correct: 1,
			},
			{
				question: "Sino ang nagbautismo sa isang taga-Etiopia na opisyal?",
				options: ["Pedro", "Pablo", "Felipe", "Juan"],
				correct: 2,
			},
			{
				question: "Sino ang nagbangon kay Tabita (Dorcas) mula sa mga patay?",
				options: ["Pablo", "Pedro", "Felipe", "Bernabe"],
				correct: 1,
			},
			{
				question: "Sino ang unang Hentil na naging Kristiyano sa Mga Gawa?",
				options: ["Lidia", "Eunuco ng Etiopia", "Cornelio", "Sergio Paulo"],
				correct: 2,
			},
			{
				question: "Alin ang dalawang misyonero na nag-away at naghiwalay?",
				options: [
					"Pedro at Pablo",
					"Pablo at Bernabe",
					"Bernabe at Juan Marcos",
					"Silas at Timoteo",
				],
				correct: 1,
			},
			{
				question: "Saang sulat nakasulat ang Baluti ng Diyos?",
				options: ["Roma", "Efeso", "Filipos", "Colosas"],
				correct: 1,
			},
			{
				question: "Saang aklat sinabi na “Ang Diyos ay pag-ibig”?",
				options: ["Juan", "1 Juan", "Roma", "1 Corinto"],
				correct: 1,
			},
			{
				question: "Saang Ebanghelyo tinawag si Jesus na “ang Salita”?",
				options: ["Mateo", "Marcos", "Lucas", "Juan"],
				correct: 3,
			},
			{
				question: "Sino ang nagsulat ng Aklat ng Pahayag?",
				options: ["Pablo", "Pedro", "Santiago", "Juan"],
				correct: 3,
			},
			{
				question: "Sino ang pinakapunong saserdote na humatol sa Panginoon?",
				options: ["Anas", "Caifas", "Gamaliel", "Hillel"],
				correct: 1,
			},
			{
				question: "Sino ang mayamang kabataan na umalis na malungkot?",
				options: [
					"Nicodemo",
					"Jose na taga-Arimatea",
					"Zaqueo",
					"Hindi binanggit ang pangalan",
				],
				correct: 3,
			},
			{
				question:
					"Sino ang umakyat sa puno ng sikamoro upang makita ang Panginoon?",
				options: ["Nicodemo", "Zaqueo", "Natanael", "Lazaro"],
				correct: 1,
			},
			{
				question: "Alin ang talinghaga tungkol sa ama at dalawang anak?",
				options: [
					"Mabuting Samaritano",
					"Alibughang Anak",
					"Paghasik",
					"Mga Talento",
				],
				correct: 1,
			},
			{
				question: "Alin ang talinghaga tungkol sa sampung dalaga?",
				options: [
					"Mga Talento",
					"Masamang Magsasaka",
					"Sampung Dalaga",
					"Nawawalang Tupa",
				],
				correct: 2,
			},
			{
				question: "Sino ang binato hanggang mamatay dahil sa pangangaral?",
				options: ["Esteban", "Santiago", "Pablo", "Bernabe"],
				correct: 0,
			},
			{
				question: "Sino ang nakaligtas sa kagat ng ulupong sa Malta?",
				options: ["Pedro", "Pablo", "Juan", "Lucas"],
				correct: 1,
			},
			{
				question:
					"Saang sulat isinulat para kay Filemon tungkol sa aliping si Onesimo?",
				options: ["Tito", "Filemon", "2 Timoteo", "Santiago"],
				correct: 1,
			},
			{
				question: "Sino ang lola ni Timoteo?",
				options: ["Lois", "Eunice", "Lidia", "Priscilla"],
				correct: 0,
			},
			{
				question: "Sino ang babaeng nagbenta ng telang purpura sa Tesalonica?",
				options: ["Lidia", "Priscilla", "Febe", "Euodia"],
				correct: 0,
			},
			{
				question:
					"Saang aklat sinabi na “Ang pag-ibig sa salapi ay ugat ng lahat ng kasamaan”?",
				options: ["Kawikaan", "Eclesiastes", "1 Timoteo", "Santiago"],
				correct: 2,
			},
			{
				question:
					"Alin ang aklat sa Lumang Tipan na hindi binabanggit ang Diyos?",
				options: ["Ruth", "Ester", "Awit ni Solomon", "Eclesiastes"],
				correct: 1,
			},
			{
				question: "Sino ang sikat na apo ni Ruth?",
				options: ["Salomon", "David", "Isai", "Obed"],
				correct: 1,
			},
			{
				question:
					"Sino ang nagsabi: “Ang iyong bayan ay magiging aking bayan, at ang iyong Diyos ay magiging aking Diyos”?",
				options: ["Rachel", "Ruth", "Naomi", "Orpa"],
				correct: 1,
			},
			{
				question: "Sino ang kilalang kamag-anak na manunubos ni Boaz?",
				options: ["Elimelec", "Naomi", "Ruth", "David"],
				correct: 0,
			},
			{
				question: "Ano ang kahulugan ng “Immanuel”?",
				options: [
					"Diyos na kasama natin",
					"Prinsipe ng Kapayapaan",
					"Makapangyarihang Diyos",
					"Ama na walang hanggan",
				],
				correct: 0,
			},
			{
				question: "Sino ang propetang naghula na isang birhen ang maglilihi?",
				options: ["Isaias", "Jeremias", "Micah", "Ezequiel"],
				correct: 0,
			},
			{
				question:
					"Sino ang propetang naghula na sa Betlehem isisilang ang Mesias?",
				options: ["Isaias", "Jeremias", "Micah", "Oseas"],
				correct: 2,
			},
			{
				question:
					"Sino ang propetang nakakita ng pangitain ng mga gulong sa loob ng gulong?",
				options: ["Isaias", "Jeremias", "Ezequiel", "Daniel"],
				correct: 2,
			},
			{
				question: "Sino ang propetang ipinadala sa Nineve?",
				options: ["Nahum", "Jonas", "Obadias", "Amos"],
				correct: 1,
			},
		],
		hard: [
			{
				question: "Ilang taon nabuhay si Matusalem?",
				options: ["777", "888", "969", "999"],
				correct: 2,
			},
			{
				question:
					"Nang talunin ni Saul ang mga Amalecita, sino ang buhay na iniwan labag sa utos ng Panginoon?",
				options: ["Haring Agag", "Haring Amalec", "Haring Og", "Haring Sihon"],
				correct: 0,
			},
			{
				question:
					"Alin ang mga aklat na nagtala ng lahat ng hari ng Israel at Juda?",
				options: [
					"1 & 2 Samuel",
					"1 & 2 Hari, 1 & 2 Cronica",
					"Esdras & Nehemias",
					"Maccabees",
				],
				correct: 1,
			},
			{
				question: "Ilang hari ang namuno sa kaharian ng Juda (timog)?",
				options: ["19", "20", "21", "22"],
				correct: 1,
			},
			{
				question: "Ilang hari ang namuno sa kaharian ng Israel (hilaga)?",
				options: ["19", "20", "21", "22"],
				correct: 0,
			},
			{
				question: "Sino ang sumakop sa Juda at binihag si Daniel?",
				options: ["Asiria", "Babilonia", "Persia", "Grecia"],
				correct: 1,
			},
			{
				question:
					"Alin ang mga pangalang Babilonio nina Shadrac, Meshac, at Abednego?",
				options: [
					"Hanania, Misael, Azaria",
					"Shadrac, Meshac, Abednego",
					"Belteshazar, Abednego, Meshac",
					"Azaria, Hanania, Misael",
				],
				correct: 1,
			},
			{
				question:
					"Sino ang nagpaliwanag kay Daniel ng pangitain ng lalaking tupa at kambing?",
				options: ["Miguel", "Gabriel", "Rafael", "Uriel"],
				correct: 1,
			},
			{
				question:
					"Totoo o Mali: Si Juan na Tagapagbautismo ay nagsuot ng balahibo ng kamelyo.",
				options: ["Totoo", "Mali"],
				correct: 0,
			},
			{
				question:
					"Totoo o Mali: Minsan ay inakala ng pamilya ng Panginoon na Siya’y nawala sa katinuan.",
				options: ["Totoo", "Mali"],
				correct: 0,
			},
			{
				question: "Sino ang Pariseong dumalaw sa Panginoon sa gabi?",
				options: ["Gamaliel", "Nicodemo", "Jose na taga-Arimatea", "Anas"],
				correct: 1,
			},
			{
				question: "Ilang araw patay si Lazaro bago siya buhayin ng Panginoon?",
				options: ["2", "3", "4", "7"],
				correct: 2,
			},
			{
				question: "Ano ang pangalan ng demonyong inilabas sa lalaki sa Geresa?",
				options: ["Beelzebul", "Legion", "Abaddon", "Asmodeus"],
				correct: 1,
			},
			{
				question:
					"Sino-sino ang lumitaw kasama ng Panginoon sa Pagbabagong-anyo?",
				options: [
					"Elias at Moises",
					"Abraham at David",
					"Enoc at Elias",
					"David at Salomon",
				],
				correct: 0,
			},
			{
				question:
					"Sino ang bulag na sumigaw ng “Anak ni David, mahabag po kayo sa akin”?",
				options: ["Bartimeo", "Zaqueo", "Malco", "Lazaro"],
				correct: 0,
			},
			{
				question: "Sino ang naglagay ng koronang tinik sa ulo ng Panginoon?",
				options: [
					"Pilato",
					"Herodes",
					"Mga sundalong Romano",
					"Mga punong saserdote",
				],
				correct: 2,
			},
			{
				question:
					"Gaano karaming tao ang nakakita sa muling nabuhay na Panginoon ayon sa 1 Corinto 15?",
				options: ["Mahigit 300", "Mahigit 500", "Mahigit 700", "Mahigit 1000"],
				correct: 1,
			},
			{
				question: "Sino ang nangaral sa unang Pentecostes ng iglesia?",
				options: ["Pablo", "Pedro", "Santiago", "Juan"],
				correct: 1,
			},
			{
				question:
					"Sino ang mag-asawang nagsinungaling sa Espiritu Santo at namatay?",
				options: [
					"Ananias at Safira",
					"Simon na Mangkukulam",
					"Elimas",
					"Demas",
				],
				correct: 0,
			},
			{
				question: "Ilan ang mga diakono na hinirang sa Mga Gawa 6?",
				options: ["5", "7", "12", "70"],
				correct: 1,
			},
			{
				question:
					"Ano ang kahulugan ng pangitain ni Pedro tungkol sa mga hayop na marumi?",
				options: [
					"Tapos na ang mga batas tungkol sa pagkain",
					"Maaari nang maligtas ang mga Hentil",
					"Pareho",
					"Wala sa dalawa",
				],
				correct: 2,
			},
			{
				question: "Saang lungsod unang tinawag na Kristiyano ang mga alagad?",
				options: ["Jerusalem", "Antioquia", "Efeso", "Corinto"],
				correct: 1,
			},
			{
				question: "Sino ang nakakita ng pangitain ng lalaking taga-Macedonia?",
				options: ["Pedro", "Pablo", "Silas", "Timoteo"],
				correct: 1,
			},
			{
				question:
					"Sino ang alagad na nag-alaga kay Maria pagkatapos ng kamatayan ng Panginoon?",
				options: ["Pedro", "Santiago", "Juan", "Andres"],
				correct: 2,
			},
			{
				question: "Sino ang humiling ng katawan ng Panginoon para ilibing?",
				options: [
					"Nicodemo",
					"Jose na taga-Arimatea",
					"Gamaliel",
					"Simon na taga-Cirene",
				],
				correct: 1,
			},
			{
				question:
					"Anong pangako ang ibinigay ng Panginoon sa labindalawang apostoles?",
				options: [
					"Yaman",
					"Mga trono na huhukom sa Israel",
					"Mahabang buhay",
					"Karangalan",
				],
				correct: 1,
			},
			{
				question: "Sino ang nagtago ng mga espiya sa ilalim ng flax sa bubong?",
				options: ["Rahab", "Debora", "Jael", "Delila"],
				correct: 0,
			},
			{
				question:
					"Saang aklat matatagpuan ang pangitain ni Nabucodonosor tungkol sa malaking rebulto?",
				options: ["Daniel", "Ezequiel", "Pahayag", "Isaias"],
				correct: 0,
			},
			{
				question: "Aling lipi ang walang mana sa lupaing ipinamana?",
				options: ["Juda", "Levi", "Benjamin", "Dan"],
				correct: 1,
			},
			{
				question: "Sino ang hari ng Juda nang mahulog ang Israel sa Asiria?",
				options: ["Ahaz", "Ezequias", "Josias", "Manases"],
				correct: 1,
			},
			{
				question: "Sino ang pamangkin ni Abraham?",
				options: ["Isac", "Lot", "Laban", "Nahor"],
				correct: 1,
			},
			{
				question:
					"Sino ang nakakilala sa Kasulatan mula pa sa kanyang pagkabata?",
				options: ["Timoteo", "Tito", "Juan Marcos", "Silas"],
				correct: 0,
			},
			{
				question: "Sino ang naghatid ng sulat ni Pablo kay Filemon?",
				options: ["Tychicus", "Onesimo", "Epafrodito", "Timoteo"],
				correct: 1,
			},
			{
				question: "Sino ang biyenan ni Caifas?",
				options: ["Gamaliel", "Anas", "Hillel", "Nicodemo"],
				correct: 1,
			},
			{
				question: "Ano ang nangyari kay Nabucodonosor sa loob ng pitong taon?",
				options: [
					"Namuhay na parang hayop",
					"Nawala ang kaharian",
					"Nabulag",
					"Nabilanggo",
				],
				correct: 0,
			},
			{
				question:
					"Nang akalain ng mga alagad na multo ang Panginoon sa ibabaw ng tubig, ano talaga Siya?",
				options: ["Anghel", "Espiritu", "Naglalakad sa tubig", "Pangitain"],
				correct: 2,
			},
			{
				question:
					"Sino ang dapat tawagin na Zacarias kung hindi pinigilan ni Elizabeth?",
				options: ["Jesus", "Juan na Tagapagbautismo", "Samuel", "Elias"],
				correct: 1,
			},
			{
				question: "Ano ang inialay ni Melchizedek kay Abraham?",
				options: ["Tinapay at alak", "Ginto at pilak", "Espada", "Tipan"],
				correct: 0,
			},
			{
				question: "Sino ang nanalangin ng anak sa Shiloh?",
				options: ["Sara", "Rebeca", "Ana", "Rachel"],
				correct: 2,
			},
			{
				question: "Aling dalawang lipi ang ipinangalan sa mga anak ni Jose?",
				options: [
					"Efraim at Manases",
					"Dan at Neftali",
					"Gad at Aser",
					"Isacar at Zabulon",
				],
				correct: 0,
			},
			{
				question: "Ilan ang maliliit na propeta?",
				options: ["10", "12", "15", "17"],
				correct: 1,
			},
			{
				question: "Sino ang sumulat ng karamihan sa Mga Kawikaan?",
				options: ["David", "Salomon", "Lemuel", "Agur"],
				correct: 1,
			},
			{
				question: "Sino ang asawa ni Oseas?",
				options: ["Gomer", "Delila", "Jezabel", "Rahab"],
				correct: 0,
			},
			{
				question: "Sino ang propetang inutusang mag-asawa ng patutot?",
				options: ["Oseas", "Amos", "Jonas", "Micah"],
				correct: 0,
			},
			{
				question:
					"Sino ang propetang nasa tiyan ng malaking isda tatlong araw?",
				options: ["Nahum", "Jonas", "Habacuc", "Sofonias"],
				correct: 1,
			},
			{
				question:
					"Sino ang propetang naghula tungkol sa “laman na mabubuhay sa mga tuyot na buto”?",
				options: ["Isaias", "Jeremias", "Ezequiel", "Daniel"],
				correct: 2,
			},
			{
				question:
					"Sino ang nagpaliwanag ng “Mene, Mene, Tekel, Upharsin” sa pader?",
				options: ["Daniel", "Ezequiel", "Isaias", "Jeremias"],
				correct: 0,
			},
			{
				question: "Ano ang kahulugan ng “Mene, Mene, Tekel, Upharsin”?",
				options: [
					"Binilang, tinimbang, nahati",
					"Magsisi o mapapahamak",
					"Nawala ang kaharian",
					"Nanalo ang Diyos",
				],
				correct: 0,
			},
			{
				question: "Sino ang huling hari ng Juda?",
				options: ["Joiachin", "Zedekias", "Josias", "Joacim"],
				correct: 1,
			},
			{
				question: "Sino ang nag-utos na ihulog si Jeremias sa balon?",
				options: ["Zedekias", "Nabucodonosor", "Mga opisyal", "Ebed-melec"],
				correct: 2,
			},
			{
				question: "Sino ang nag-ahon kay Jeremias mula sa balon?",
				options: ["Baruc", "Ebed-melec", "Gedalias", "Seraias"],
				correct: 1,
			},
			{
				question: "Sino ang unang mataas na saserdote ng Israel?",
				options: ["Eli", "Aaron", "Pinehas", "Samuel"],
				correct: 1,
			},
			{
				question: "Alin ang masasamang anak ni Eli?",
				options: [
					"Joel at Abias",
					"Hofni at Pinehas",
					"Nadab at Abihu",
					"Gershom at Eliezer",
				],
				correct: 1,
			},
			{
				question: "Sino ang huling hukom ng Israel?",
				options: ["Eli", "Samuel", "Samson", "Saul"],
				correct: 1,
			},
			{
				question: "Sino ang babaeng nagbaon ng pako sa ulo ni Sisara?",
				options: ["Debora", "Jael", "Rahab", "Delila"],
				correct: 1,
			},
			{
				question: "Sino ang nagpugot ng buhok ni Samson?",
				options: [
					"Delila",
					"Isang lingkod",
					"Mga panginoon ng Filisteo",
					"Si Samson mismo",
				],
				correct: 0,
			},
			{
				question: "Sino ang kaliweteng hukom na pumatay kay Eglon?",
				options: ["Ehud", "Samgar", "Otoniel", "Tola"],
				correct: 0,
			},
			{
				question: "Sino ang nangako ng kanyang anak dahil sa tagumpay?",
				options: ["Gideon", "Jefte", "Ibzam", "Abdon"],
				correct: 1,
			},
			{
				question: "Sino ang nagnakaw ng mga dios-diosan at saserdote ni Mica?",
				options: [
					"Mga Filisteo",
					"Mga Danita",
					"Mga Benjaminita",
					"Mga Amonita",
				],
				correct: 1,
			},
			{
				question: "Aling lipi ang halos napuksa ng iba pang lipi ng Israel?",
				options: ["Juda", "Efraim", "Lahat ng Israel", "Levi"],
				correct: 2,
			},
			{
				question: "Sino ang manunubos na kamag-anak ni Ruth?",
				options: ["Boaz", "Elimelec", "Kapatid ni Naomi", "Obed"],
				correct: 0,
			},
			{
				question: "Sino ang anak ni Obed?",
				options: ["Isai", "David", "Salomon", "Eliab"],
				correct: 0,
			},
			{
				question: "Sino ang ama ni Isai?",
				options: ["Obed", "Boaz", "Salmon", "Naason"],
				correct: 0,
			},
			{
				question: "Sino ang propeta sa panahon ni David (bukod kay Samuel)?",
				options: ["Samuel", "Natan", "Gad", "Lahat ng nabanggit"],
				correct: 3,
			},
			{
				question:
					"Sino ang gumamit ng bagong karo sa pagdadala ng Kaban (mali ang paraan)?",
				options: ["David", "Uza", "Abinadab", "Obed-edom"],
				correct: 0,
			},
			{
				question: "Sino ang namatay nang hipuin ang Kaban ng Tipan?",
				options: ["Uza", "Ahio", "Obed-edom", "Abinadab"],
				correct: 0,
			},
			{
				question:
					"Sino ang sumayaw sa harap ng Panginoon nang dalhin ang Kaban sa Jerusalem?",
				options: ["David", "Michal", "Jonatan", "Abner"],
				correct: 0,
			},
			{
				question: "Sino ang humamak kay David dahil sa pagsasayaw?",
				options: ["Saul", "Michal", "Joab", " Abner"],
				correct: 1,
			},
			{
				question: "Sino ang pumatay ng leon sa hukay nang nagyeyelo?",
				options: ["David", "Benaias", "Abisai", "Samson"],
				correct: 1,
			},
			{
				question: "Sino ang kumander na pumatay kay Absalom?",
				options: ["Joab", "Abisai", "Ittai", "Amasa"],
				correct: 0,
			},
			{
				question:
					"Sino ang nagrebelde at nagpahayag na hari sa Hebron pagkatapos ni David?",
				options: ["Absalom", "Adonias", "Seba", "Jeroboam"],
				correct: 1,
			},
			{
				question:
					"Sino ang nagsabi: “Ako lamang ang natira” bago siya itama ng Panginoon?",
				options: ["Elias", "Eliseo", "Micaiah", "Isaias"],
				correct: 0,
			},
			{
				question: "Ilan ang mga propeta ni Baal na hinamon ni Elias sa Carmel?",
				options: ["400", "450", "500", "850"],
				correct: 1,
			},
			{
				question: "Sino ang tumakbo nang mas mabilis kaysa karwahe ng hari?",
				options: ["Elias", "Eliseo", "Giezi", "Ahazias"],
				correct: 0,
			},
			{
				question: "Sino ang nakakita nang dinala si Elias sa langit?",
				options: [
					"Eliseo",
					"Giezi",
					"Mga anak ng mga propeta",
					"Lahat ng nabanggit",
				],
				correct: 0,
			},
			{
				question: "Sino ang tumanggap ng doble ng espiritu ni Elias?",
				options: ["Eliseo", "Giezi", "Naaman", "Jonas"],
				correct: 0,
			},
			{
				question:
					"Sino ang gumaling sa ketong nang maligo sa Jordan pitong beses?",
				options: ["Giezi", "Naaman", "Benhaded", "Hazael"],
				correct: 1,
			},
			{
				question: "Sino ang tinamaan ng ketong dahil sa kasinungalingan?",
				options: ["Giezi", "Ozias", "Miriam", "Naaman"],
				correct: 0,
			},
			{
				question:
					"Sa panahon ni anong hari natagpuan ang aklat ng kautusan sa Templo?",
				options: ["Ezequias", "Josias", "Manases", "Amon"],
				correct: 1,
			},
			{
				question: "Sino ang pinakamasamang hari ng Juda?",
				options: ["Ahaz", "Manases", "Joacim", "Zedekias"],
				correct: 1,
			},
			{
				question:
					"Sino ang nagbigay pahintulot sa mga Judio na bumalik mula sa Babilonia?",
				options: ["Nabucodonosor", "Ciro", "Dario", "Artajerjes"],
				correct: 1,
			},
			{
				question: "Sino-sino ang tumutol sa muling pagtatayo ng Templo?",
				options: ["Sanballat at Tobias", "Aman", "Goliat", "Geshem"],
				correct: 0,
			},
			{
				question:
					"Sino ang bumasa ng kautusan sa mga tao mula sa tanghalang kahoy?",
				options: ["Esdras", "Nehemias", "Zorobabel", "Jesua"],
				correct: 0,
			},
			{
				question:
					"Sino ang tagasubsob ng alak ng hari na nagbalik sa Jerusalem?",
				options: ["Esdras", "Nehemias", "Mardokeo", "Daniel"],
				correct: 1,
			},
			{
				question: "Sino ang tumangging yumuko kay Aman?",
				options: ["Daniel", "Mardokeo", "Esdras", "Nehemias"],
				correct: 1,
			},
			{
				question:
					"Ano ang huling salita ng Lumang Tipan sa mga Bibliang Ingles?",
				options: ["Amen", "Sumpa", "Israel", "Hallelujah"],
				correct: 1,
			},
			{
				question: "Saang Ebanghelyo isinulat para kay Teofilo?",
				options: ["Mateo", "Marcos", "Lucas", "Juan"],
				correct: 2,
			},
			{
				question:
					"Aling dalawang Ebanghelyo ang may talaangkanan ng Panginoong Jesucristo?",
				options: [
					"Mateo at Lucas",
					"Marcos at Juan",
					"Mateo at Marcos",
					"Lucas at Juan",
				],
				correct: 0,
			},
			{
				question: "Sino ang pinakadakilang propeta ayon sa Panginoon?",
				options: ["Elias", "Moises", "Juan na Tagapagbautismo", "Isaias"],
				correct: 2,
			},
			{
				question:
					"Sino ang asawa ni Zacarias na ama ni Juan na Tagapagbautismo?",
				options: ["Maria", "Elizabeth", "Ana", "Salome"],
				correct: 1,
			},
			{
				question:
					"Sino ang matandang propetisa sa Templo nang iharap ang Sanggol na Jesus?",
				options: ["Elizabeth", "Ana", "Maria", "Joanna"],
				correct: 1,
			},
			{
				question:
					"Ilang taong gulang ang Panginoon nang magturo Siya sa Templo?",
				options: ["8", "12", "15", "30"],
				correct: 1,
			},
			{
				question: "Sino ang nawalan ng palakol sa tubig?",
				options: [
					"Lingkod ni Eliseo",
					"Giezi",
					"Naaman",
					"Isang anak ng mga propeta",
				],
				correct: 3,
			},
			{
				question: "Sino ang nagpalutang ng palakol?",
				options: ["Elias", "Eliseo", "Isaias", "Jeremias"],
				correct: 1,
			},
			{
				question: "Saang bansa ngayon ang Reyna ng Sheba?",
				options: ["Etiopia o Yemen", "Egipto", "Persia", "India"],
				correct: 0,
			},
			{
				question:
					"Sino ang unang martir na binabanggit ang pangalan sa Bagong Tipan?",
				options: ["Juan na Tagapagbautismo", "Esteban", "Santiago", "Jesus"],
				correct: 1,
			},
			{
				question: "Sino ang mangkukulam na binulag ni Pablo?",
				options: [
					"Simon",
					"Elimas (Bar-Jesus)",
					"Demetrio",
					"Alexander na panday",
				],
				correct: 1,
			},
			{
				question: "Aling iglesia ang “malamig at mainit-init”?",
				options: ["Efeso", "Laodicea", "Sardis", "Filadelfia"],
				correct: 1,
			},
			{
				question:
					"Aling iglesia ang sinabihan na “inwan mo ang iyong unang pag-ibig”?",
				options: ["Efeso", "Pergamo", "Tiatira", "Esmirna"],
				correct: 0,
			},
			{
				question: "Ilan ang mga iglesia sa Pahayag?",
				options: ["7", "12", "24", "144"],
				correct: 0,
			},
		],
	};

	// shuffle helper
	const startGame = (level: "easy" | "medium" | "hard") => {
		if (!allQuestions[level] || allQuestions[level].length === 0) return;
		setDifficulty(level);
		const shuffled = shuffle(allQuestions[level]).slice(0, 10);
		setShuffledQuestions(shuffled);
		setCurrentQuestion(0);
		setScore(0);
		setLives(3);
		setAnswered(false);
		setSelectedAnswer(null);
		setGameOver(false);
		setStreak(0);
		setShowVerse(false);
		setAchievements([]);
	};

	const handleAnswer = (answerIndex: number) => {
		if (answered) return;
		const question = shuffledQuestions[currentQuestion];
		if (!question) return;

		setSelectedAnswer(answerIndex);
		setAnswered(true);

		const isCorrect = answerIndex === question.correct && answerIndex !== -1;
		if (isCorrect) {
			const points =
				difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20;
			setScore((p) => p + points);
			setStreak((s) => {
				const next = s + 1;
				if (next === 5) {
					setAchievements((a) =>
						a.includes("streak5") ? a : [...a, "streak5"]
					);
				}
				return next;
			});
		} else {
			setLives((l) => {
				const next = l - 1;
				if (next <= 0) setGameOver(true);
				return next;
			});
			setStreak(0);
		}

		setTimeout(() => setShowVerse(true), 350);
	};

	const nextQuestion = () => {
		const total = shuffledQuestions.length || 0;
		if (currentQuestion + 1 < total && lives > 0) {
			setCurrentQuestion((c) => c + 1);
			setAnswered(false);
			setSelectedAnswer(null);
			setShowVerse(false);
		} else {
			setGameOver(true);
			setAnswered(false);
			setShowVerse(false);
			if (lives > 0)
				setAchievements((a) =>
					a.includes("complete") ? a : [...a, "complete"]
				);
		}
	};

	const resetGame = () => {
		setCurrentQuestion(0);
		setScore(0);
		setLives(3);
		setAnswered(false);
		setSelectedAnswer(null);
		setGameOver(false);
		setDifficulty(null);
		setStreak(0);
		setShowVerse(false);
		setShuffledQuestions([]);
		setAchievements([]);
	};

	const difficultyInfo = {
		easy: {
			name: "Beginner",
			color: "bg-purple-500",
			icon: "📖",
			questions: 10,
		},
		medium: {
			name: "Disciple",
			color: "bg-purple-600",
			icon: "⭐",
			questions: 10,
		},
		hard: {
			name: "Scholar",
			color: "bg-purple-700",
			icon: "👑",
			questions: 10,
		},
	};

	// START SCREEN: choose difficulty
	if (!difficulty) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 p-4 flex items-center justify-center">
				<div className="max-w-2xl w-full">
					<div className="text-center mb-12">
						<div className="flex items-center justify-center gap-3 mb-4">
							<Book className="text-purple-300" size={48} />
							<h1 className="text-5xl font-bold text-white drop-shadow-lg">
								Bible Quest
							</h1>
						</div>
						<p className="text-purple-200 text-lg">
							Test your knowledge of God&apos;s Word
						</p>
						<p className="text-purple-300 text-sm mt-2">
							✨ Random questions every game! ✨
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-2xl font-bold text-white text-center mb-6">
							Choose Your Level
						</h2>
						{Object.entries(difficultyInfo).map(([key, info]) => (
							<button
								key={key}
								onClick={() => startGame(key as "easy" | "medium" | "hard")}
								className={`w-full p-6 rounded-2xl ${info.color} hover:opacity-90 transition-all transform hover:scale-105 border-2 border-purple-300 shadow-lg shadow-purple-500/50`}
								aria-label={`Start ${info.name} level`}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<span className="text-5xl">{info.icon}</span>
										<div className="text-left">
											<h3 className="text-2xl font-bold text-white">
												{info.name}
											</h3>
											<p className="text-purple-100">
												{info.questions} random questions
											</p>
										</div>
									</div>
									<Sparkles className="text-purple-200" size={32} />
								</div>
							</button>
						))}
					</div>

					<div className="mt-8 bg-purple-900 bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 border border-purple-400">
						<h3 className="text-white font-semibold mb-3 flex items-center gap-2">
							<Trophy className="text-purple-300" size={20} />
							How to Play
						</h3>
						<ul className="text-purple-200 text-sm space-y-2">
							<li>• Questions are randomized each game</li>
							<li>
								• You have 3 lives - lose them all and it&apos;s game over
							</li>
							<li>• Build streaks for bonus achievements</li>
							<li>• Learn Bible verses with each question</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}

	// if questions not yet prepared
	if (difficulty && shuffledQuestions.length === 0) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-white">Preparing questions…</div>
			</div>
		);
	}

	// gameOver UI
	if (gameOver) {
		const totalQuestions = shuffledQuestions.length || 0;
		const maxPointsPer =
			difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20;
		const percentage =
			totalQuestions === 0
				? 0
				: Math.round((score / (totalQuestions * maxPointsPer)) * 100);

		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 p-4 flex items-center justify-center">
				<div className="max-w-xl w-full">
					<div className="bg-purple-900 bg-opacity-60 backdrop-blur-md rounded-3xl p-8 border-2 border-purple-400 shadow-2xl shadow-purple-500/50 text-center">
						<Trophy
							className="text-yellow-300 mx-auto mb-4 drop-shadow-lg"
							size={64}
						/>
						<h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
							Quest Complete!
						</h2>

						<div className="bg-purple-800 bg-opacity-60 rounded-2xl p-6 mb-6 border border-purple-400">
							<div className="text-6xl font-bold text-white mb-2 drop-shadow-lg">
								{score}
							</div>
							<div className="text-purple-200 text-lg">Final Score</div>
							<div className="text-purple-100 text-sm mt-2">
								{percentage}% Correct
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4 mb-6">
							<div className="bg-purple-800 bg-opacity-60 rounded-xl p-4 border border-purple-400">
								<Star className="text-yellow-300 mx-auto mb-2" size={32} />
								<div className="text-white font-semibold">Best Streak</div>
								<div className="text-purple-200">{streak}</div>
							</div>

							<div className="bg-purple-800 bg-opacity-60 rounded-xl p-4 border border-purple-400">
								<Award className="text-purple-300 mx-auto mb-2" size={32} />
								<div className="text-white font-semibold">Level</div>
								<div className="text-purple-200 capitalize">{difficulty}</div>
							</div>
						</div>

						{achievements.length > 0 && (
							<div className="bg-purple-700 bg-opacity-60 rounded-xl p-4 mb-6 border border-purple-400">
								<h3 className="text-white font-semibold mb-3 flex items-center justify-center gap-2">
									<Crown className="text-yellow-300" size={20} />
									Achievements Unlocked
								</h3>
								<div className="flex justify-center gap-2 flex-wrap">
									{achievements.includes("streak5") && (
										<span className="bg-purple-600 px-3 py-1 rounded-full text-white text-sm border border-purple-300">
											🔥 5 Streak
										</span>
									)}
									{achievements.includes("complete") && (
										<span className="bg-purple-600 px-3 py-1 rounded-full text-white text-sm border border-purple-300">
											✅ Completed
										</span>
									)}
								</div>
							</div>
						)}

						<button
							onClick={resetGame}
							className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg border border-purple-400"
						>
							<RefreshCw className="inline mr-2" size={20} />
							Play Again
						</button>

						<p className="text-purple-200 text-sm mt-6 italic">
							&quot;Study to show thyself approved unto God&quot; - 2 Timothy
							2:15
						</p>
					</div>
				</div>
			</div>
		);
	}

	// main game UI
	const question = shuffledQuestions[currentQuestion];
	const totalQuestions = shuffledQuestions.length;

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 p-4">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					<div className="flex items-center gap-2">
						<Book className="text-purple-300" size={32} />
						<h1 className="text-3xl font-bold text-white drop-shadow-lg">
							Bible Quest
						</h1>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={resetGame}
							className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl transition-all border border-purple-400"
							aria-label="Back to level selection"
						>
							<RefreshCw size={20} />
						</button>
					</div>
				</div>

				{/* Stats Bar */}
				<div className="grid grid-cols-3 gap-4 mb-6">
					<div className="bg-purple-900 bg-opacity-60 backdrop-blur-md rounded-xl p-4 border-2 border-purple-400 shadow-lg shadow-purple-500/30">
						<div className="flex items-center gap-2 mb-1">
							<Star className="text-yellow-300" size={20} />
							<span className="text-white font-semibold text-sm">Score</span>
						</div>
						<div className="text-2xl font-bold text-white">{score}</div>
					</div>

					<div className="bg-purple-900 bg-opacity-60 backdrop-blur-md rounded-xl p-4 border-2 border-purple-400 shadow-lg shadow-purple-500/30">
						<div className="flex items-center gap-2 mb-1">
							<HeartIcon className="text-pink-300" size={20} />
							<span className="text-white font-semibold text-sm">Lives</span>
						</div>
						<div className="flex gap-1">
							{[...Array(3)].map((_, i) => (
								<HeartIcon
									key={i}
									size={24}
									className={
										i < lives ? "text-pink-400" : "text-gray-600 opacity-50"
									}
									aria-hidden
								/>
							))}
						</div>
					</div>

					<div className="bg-purple-900 bg-opacity-60 backdrop-blur-md rounded-xl p-4 border-2 border-purple-400 shadow-lg shadow-purple-500/30">
						<div className="flex items-center gap-2 mb-1">
							<Sparkles className="text-purple-300" size={20} />
							<span className="text-white font-semibold text-sm">Streak</span>
						</div>
						<div className="text-2xl font-bold text-white">{streak}🔥</div>
					</div>
				</div>

				{/* Progress */}
				<div className="bg-purple-900 bg-opacity-60 backdrop-blur-md rounded-xl p-4 mb-6 border-2 border-purple-400 shadow-lg shadow-purple-500/30">
					<div className="flex justify-between text-white text-sm mb-2">
						<span>
							Question {currentQuestion + 1} of {totalQuestions}
						</span>
						<span className="capitalize">{difficulty} Level</span>
					</div>
					<div className="bg-purple-800 rounded-full h-3 overflow-hidden border border-purple-400">
						<div
							className="h-full bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 transition-all duration-500"
							style={{
								width: `${
									((currentQuestion + 1) / (totalQuestions || 1)) * 100
								}%`,
							}}
						/>
					</div>
				</div>

				{/* Question */}
				<div className="bg-purple-900 bg-opacity-60 backdrop-blur-md rounded-2xl p-8 mb-6 border-2 border-purple-400 shadow-2xl shadow-purple-500/30">
					<h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">
						{question?.question ?? "Question not found"}
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{(question?.options || []).map((option, index) => {
							const isSelected = selectedAnswer === index;
							const isCorrectAnswer = index === question.correct;

							let buttonClass =
								"bg-purple-700 bg-opacity-60 hover:bg-opacity-80 border-2 border-purple-400 text-white";

							if (answered) {
								if (isCorrectAnswer) {
									buttonClass =
										"bg-green-600 bg-opacity-90 border-2 border-green-400 text-white";
								} else if (isSelected && !isCorrectAnswer) {
									buttonClass =
										"bg-red-600 bg-opacity-90 border-2 border-red-400 text-white";
								} else {
									buttonClass =
										"bg-purple-800 bg-opacity-40 border-2 border-purple-500 text-white";
								}
							} else if (isSelected) {
								buttonClass =
									"bg-purple-600 bg-opacity-80 border-2 border-purple-300 text-white";
							}

							return (
								<button
									key={index}
									onClick={() => handleAnswer(index)}
									disabled={answered}
									aria-pressed={isSelected}
									className={`py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:cursor-not-allowed flex items-center justify-between ${buttonClass}`}
								>
									<span>{option}</span>
									{answered && isCorrectAnswer && (
										<Check className="ml-4" size={20} />
									)}
									{answered && isSelected && !isCorrectAnswer && (
										<X className="ml-4" size={20} />
									)}
								</button>
							);
						})}
					</div>
				</div>

				{showVerse && question && (
					<div className="bg-purple-800 bg-opacity-70 p-6 rounded-xl border border-purple-400 text-white mb-6">
						<div className="mt-4 flex gap-3 justify-center">
							<button
								onClick={nextQuestion}
								className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow-lg border border-purple-400"
							>
								Next Question →
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default BibleQuest;
