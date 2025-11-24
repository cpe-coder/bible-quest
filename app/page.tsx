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

/**
 * BibleQuest - complete working React component (JSX).
 * Paste into your app as BibleQuest.jsx and render <BibleQuest />.
 */

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

// --- shuffle helper (module scope) ---
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

	// --- YOUR QUESTIONS (copied from your original object) ---
	const allQuestions = {
		easy: [
			{
				question: "Who built the ark?",
				options: ["Moses", "Noah", "Abraham", "David"],
				correct: 1,
			},
			{
				question: "What is the first book in the Bible?",
				options: ["Exodus", "Genesis", "Matthew", "Revelation"],
				correct: 1,
			},
			{
				question: "How many days did God take to create the world?",
				options: ["5", "6", "7", "10"],
				correct: 1,
			},
			{
				question: "Who was the first man?",
				options: ["Noah", "Moses", "Adam", "Abraham"],
				correct: 2,
			},
			{
				question: "Who was the first woman?",
				options: ["Sarah", "Eve", "Mary", "Rachel"],
				correct: 1,
			},
			{
				question: "Where did Adam and Eve live at the beginning of the world?",
				options: ["Canaan", "Garden of Eden", "Egypt", "Jerusalem"],
				correct: 1,
			},
			{
				question: "Who were Adam and Eve's three sons listed in the Bible?",
				options: [
					"Cain, Abel, Seth",
					"Noah, Shem, Ham",
					"Isaac, Jacob, Esau",
					"Moses, Aaron, Joshua",
				],
				correct: 0,
			},
			{
				question:
					"How many days and nights did it rain when Noah was on the ark?",
				options: ["30", "40", "50", "100"],
				correct: 1,
			},
			{
				question:
					"What was God’s sign to Noah that he would never destroy the earth again?",
				options: ["A dove", "A rainbow", "An olive branch", "A cloud"],
				correct: 1,
			},
			{
				question: "How many brothers did Joseph have?",
				options: ["10", "11", "12", "9"],
				correct: 1,
			},
			{
				question:
					"What did Jacob give Joseph that sparked jealousy from his siblings?",
				options: ["A ring", "A coat of many colors", "A crown", "A sword"],
				correct: 1,
			},
			{
				question:
					"What did Joseph tell his brothers about his dreams that upset them?",
				options: [
					"They would die",
					"He would rule over them",
					"They would become rich",
					"He would leave them",
				],
				correct: 1,
			},
			{
				question: "How did Moses’ mother save him from the Egyptian soldiers?",
				options: [
					"Hid him in a cave",
					"Put him in a basket in the river",
					"Sent him to Midian",
					"Gave him to Pharaoh's daughter",
				],
				correct: 1,
			},
			{
				question: "Through what did God speak to Moses in the desert?",
				options: ["A dream", "A burning bush", "An angel", "A cloud"],
				correct: 1,
			},
			{
				question: "How many plagues did God send on Egypt?",
				options: ["7", "10", "12", "15"],
				correct: 1,
			},
			{
				question:
					"What was the final plague that convinced Pharaoh to let the slaves go?",
				options: ["Locusts", "Darkness", "Death of firstborn", "Frogs"],
				correct: 2,
			},
			{
				question: "What sea did God part to let the Israelites escape Egypt?",
				options: ["Dead Sea", "Red Sea", "Mediterranean Sea", "Sea of Galilee"],
				correct: 1,
			},
			{
				question: "Where did God give Moses the Ten Commandments?",
				options: ["Mt. Sinai", "Mt. Zion", "Mt. Carmel", "Mt. Nebo"],
				correct: 0,
			},
			{
				question: "What golden image did the Israelites make at Mt. Sinai?",
				options: [
					"A golden serpent",
					"A golden calf",
					"A golden lamb",
					"A golden lion",
				],
				correct: 1,
			},
			{
				question: "Who was the first king of Israel?",
				options: ["David", "Solomon", "Saul", "Samuel"],
				correct: 2,
			},
			{
				question:
					"When Daniel prayed to God after it was not allowed, where was he thrown?",
				options: ["Prison", "Lion’s den", "Fiery furnace", "Well"],
				correct: 1,
			},
			{
				question: "Who was Jesus’ human mother?",
				options: ["Elizabeth", "Mary", "Martha", "Ruth"],
				correct: 1,
			},
			{
				question: "Who was Jesus’ adoptive father on Earth?",
				options: ["Zechariah", "Joseph", "John", "Simeon"],
				correct: 1,
			},
			{
				question: "Name the city where Jesus was born.",
				options: ["Nazareth", "Jerusalem", "Bethlehem", "Capernaum"],
				correct: 2,
			},
			{
				question: "Who baptized Jesus?",
				options: ["Peter", "John the Baptist", "Philip", "Andrew"],
				correct: 1,
			},
			{
				question: "Before Jesus started preaching, what was his job?",
				options: ["Fisherman", "Carpenter", "Tax collector", "Shepherd"],
				correct: 1,
			},
			{
				question: "Name Jesus’ hometown.",
				options: ["Bethlehem", "Nazareth", "Jerusalem", "Galilee"],
				correct: 1,
			},
			{
				question: "Name the place where Jesus walked on water?",
				options: ["Jordan River", "Dead Sea", "Sea of Galilee", "Red Sea"],
				correct: 2,
			},
			{
				question: "How many disciples did Jesus choose?",
				options: ["10", "12", "70", "72"],
				correct: 1,
			},
			{
				question: "What is the shortest verse in the Bible?",
				options: [
					"“God so loved”",
					"“Jesus wept.”",
					"“Pray without ceasing”",
					"“Rejoice always”",
				],
				correct: 1,
			},
			{
				question:
					"How much bread and fish did Jesus use to feed more than 5,000 people?",
				options: [
					"5 loaves, 2 fish",
					"7 loaves, 3 fish",
					"12 loaves, 5 fish",
					"4 loaves, 1 fish",
				],
				correct: 0,
			},
			{
				question: "What did Jesus do at the Last Supper to his disciples?",
				options: [
					"Gave them crowns",
					"Washed their feet",
					"Gave them swords",
					"Anointed them",
				],
				correct: 1,
			},
			{
				question: "Name the disciple who betrayed Jesus.",
				options: ["Peter", "John", "Judas Iscariot", "Thomas"],
				correct: 2,
			},
			{
				question: "Which disciple denied Jesus three times?",
				options: ["Judas", "Peter", "John", "James"],
				correct: 1,
			},
			{
				question: "What happened after Jesus was buried in the tomb?",
				options: [
					"He stayed dead",
					"He rose again",
					"Angels took him",
					"He disappeared",
				],
				correct: 1,
			},
			{
				question: "What day of the week did Jesus rise back to life?",
				options: ["Friday", "Saturday", "Sunday", "Monday"],
				correct: 2,
			},
			{
				question: "How did Jesus leave Earth and go to Heaven?",
				options: [
					"In a chariot",
					"He rose into the clouds",
					"On a donkey",
					"Through a portal",
				],
				correct: 1,
			},
			{
				question: "How many books have the name John in them?",
				options: ["1", "2", "3", "4"],
				correct: 3,
			},
			{
				question: "What is the last book in the Bible?",
				options: ["Jude", "Revelation", "3 John", "Hebrews"],
				correct: 1,
			},
			{
				question: "What four books tell about Jesus’ life on Earth?",
				options: [
					"Acts, Romans, Corinthians, Galatians",
					"Matthew, Mark, Luke, John",
					"Genesis, Exodus, Leviticus, Numbers",
					"Psalms, Proverbs, Ecclesiastes, Song",
				],
				correct: 1,
			},
			{
				question: "Which book did Jesus directly write?",
				options: ["Revelation", "Matthew", "John", "None"],
				correct: 3,
			},
			{
				question: "What were men trying to do at the Tower of Babel?",
				options: [
					"Reach heaven",
					"Hide from God",
					"Escape a flood",
					"Worship idols",
				],
				correct: 0,
			},
			{
				question: "How did the 12 brothers get rid of Joseph?",
				options: [
					"Killed him",
					"Sold him to slave traders",
					"Left him in the desert",
					"Threw him in the sea",
				],
				correct: 1,
			},
			{
				question: "Where did the slave traders take Joseph?",
				options: ["Canaan", "Egypt", "Babylon", "Midian"],
				correct: 1,
			},
			{
				question: "Who bought Joseph in Egypt?",
				options: ["Pharaoh", "Potiphar", "Baker", "Cupbearer"],
				correct: 1,
			},
			{
				question: "What was the giant’s name that David killed?",
				options: ["Goliath", "Og", "Nebuchadnezzar", "Nimrod"],
				correct: 0,
			},
			{
				question: "How did David kill Goliath?",
				options: ["Sword", "Spear", "Slingshot and stone", "Bare hands"],
				correct: 2,
			},
			{
				question: "True or False: Jesus was an only child.",
				options: ["True", "False"],
				correct: 1,
			},
			{
				question:
					"True or False: The Bible is the most popular book ever written (by copies sold).",
				options: ["True", "False"],
				correct: 0,
			},
			{
				question: "True or False: Jesus turned water into wine.",
				options: ["True", "False"],
				correct: 0,
			},
			{
				question: "True or False: Jesus welcomed children.",
				options: ["True", "False"],
				correct: 0,
			},
			{
				question: "True or False: Everywhere Jesus went, people loved him.",
				options: ["True", "False"],
				correct: 1,
			},
			{
				question: "True or False: Jesus obeyed his parents.",
				options: ["True", "False"],
				correct: 0,
			},
			{
				question: "True or False: Jesus stayed away from sinners.",
				options: ["True", "False"],
				correct: 1,
			},
			{
				question:
					"True or False: Jesus said dirty hands make a person spiritually unclean.",
				options: ["True", "False"],
				correct: 1,
			},
			{
				question: "True or False: Jesus knew he would be arrested and killed.",
				options: ["True", "False"],
				correct: 0,
			},
			{
				question: "What does Jesus say is the first and greatest commandment?",
				options: [
					"Love your neighbor",
					"Love God with all your heart",
					"Honor your parents",
					"Keep the Sabbath",
				],
				correct: 1,
			},
			{
				question: "What is the 1st commandment?",
				options: [
					"No other gods",
					"No idols",
					"Don’t take God’s name in vain",
					"Keep Sabbath",
				],
				correct: 0,
			},
			{
				question: "What is the 5th commandment?",
				options: [
					"No murder",
					"Honor your father and mother",
					"No stealing",
					"No adultery",
				],
				correct: 1,
			},
			{
				question: "What is the 10th commandment?",
				options: ["No false witness", "No coveting", "No stealing", "No idols"],
				correct: 1,
			},
			{
				question: "Who killed a giant with a stone?",
				options: ["Saul", "Jonathan", "David", "Joshua"],
				correct: 2,
			},
			{
				question: "How many of Jesus’ brothers are named in the Bible?",
				options: ["2", "3", "4", "5"],
				correct: 2,
			},
			{
				question: "Who was Jesus’ most famous cousin?",
				options: ["John the Baptist", "James", "Peter", "Andrew"],
				correct: 0,
			},
			{
				question: "How many lepers did Jesus heal at one time?",
				options: ["1", "10", "12", "100"],
				correct: 1,
			},
			{
				question:
					"What did the woman pour on Jesus’ feet at Simon the Leper’s home?",
				options: ["Water", "Oil", "Expensive perfume", "Wine"],
				correct: 2,
			},
			{
				question: "What was rolled away from the tomb?",
				options: ["A curtain", "A large stone", "A gate", "A veil"],
				correct: 1,
			},
			{
				question: "What job did Matthew have before following Jesus?",
				options: ["Fisherman", "Carpenter", "Tax collector", "Soldier"],
				correct: 2,
			},
			{
				question: "Who killed 1,000 Philistines with a donkey’s jawbone?",
				options: ["David", "Samson", "Gideon", "Saul"],
				correct: 1,
			},
			{
				question: "Who had a coat of many colors?",
				options: ["Moses", "Joseph", "David", "Daniel"],
				correct: 1,
			},
			{
				question: "Who was thrown into the lions' den?",
				options: ["Daniel", "David", "Joseph", "Jeremiah"],
				correct: 0,
			},
			{
				question: "Who parted the Red Sea?",
				options: ["Joshua", "Moses", "Aaron", "Elijah"],
				correct: 1,
			},
			{
				question: "Who was the strongest judge?",
				options: ["Gideon", "Deborah", "Samson", "Samuel"],
				correct: 2,
			},
			{
				question: "Who walked on water with Jesus for a moment?",
				options: ["John", "Peter", "Andrew", "Philip"],
				correct: 1,
			},
			{
				question: "Who doubted Jesus rose until he touched the wounds?",
				options: ["Peter", "John", "Thomas", "James"],
				correct: 2,
			},
			{
				question: "Who cut off the ear of the high priest’s servant?",
				options: ["Peter", "John", "James", "Judas"],
				correct: 0,
			},
			{
				question: "Who fell asleep while Jesus prayed in Gethsemane?",
				options: [
					"Peter, James, John",
					"All disciples",
					"Only Judas",
					"Only Peter",
				],
				correct: 0,
			},
			{
				question: "Who carried Jesus’ cross?",
				options: [
					"John",
					"Simon of Cyrene",
					"Joseph of Arimathea",
					"Nicodemus",
				],
				correct: 1,
			},
			{
				question: "Who provided the tomb for Jesus?",
				options: ["Nicodemus", "Joseph of Arimathea", "Pilate", "Caiaphas"],
				correct: 1,
			},
			{
				question: "What language was the New Testament mostly written in?",
				options: ["Hebrew", "Greek", "Latin", "Aramaic"],
				correct: 1,
			},
			{
				question: "How many people were on Noah’s ark?",
				options: ["4", "6", "8", "12"],
				correct: 2,
			},
			{
				question: "What bird did Noah first send out?",
				options: ["Dove", "Raven", "Eagle", "Sparrow"],
				correct: 1,
			},
			{
				question: "Who wrestled with God?",
				options: ["Jacob", "Moses", "Abraham", "David"],
				correct: 0,
			},
			{
				question: "What was Jacob’s name changed to?",
				options: ["Israel", "Isaac", "Joseph", "Judah"],
				correct: 0,
			},
			{
				question: "Who was swallowed by a big fish?",
				options: ["Jonah", "Noah", "Daniel", "Ezekiel"],
				correct: 0,
			},
			{
				question: "Who killed Goliath with one stone?",
				options: ["Saul", "Jonathan", "David", "Abner"],
				correct: 2,
			},
			{
				question: "Who was David’s best friend?",
				options: ["Samuel", "Jonathan", "Nathan", "Goliath"],
				correct: 1,
			},
			{
				question: "Who was the wisest man?",
				options: ["David", "Solomon", "Moses", "Paul"],
				correct: 1,
			},
			{
				question: "What did Solomon build?",
				options: ["A palace", "The Temple", "A tower", "An ark"],
				correct: 1,
			},
			{
				question: "Who visited Solomon and brought gifts?",
				options: [
					"Queen of Egypt",
					"Queen of Sheba",
					"Queen Esther",
					"Queen Jezebel",
				],
				correct: 1,
			},
			{
				question: "Who was the weeping prophet?",
				options: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
				correct: 1,
			},
			{
				question: "Who saw a vision of dry bones?",
				options: ["Ezekiel", "Daniel", "Isaiah", "Jeremiah"],
				correct: 0,
			},
			{
				question: "Who was taken to heaven in a chariot of fire?",
				options: ["Elijah", "Elisha", "Moses", "Enoch"],
				correct: 0,
			},
			{
				question: "Who was sold for 20 pieces of silver?",
				options: ["Jesus", "Joseph", "Samson", "Jeremiah"],
				correct: 1,
			},
			{
				question: "Who was sold for 30 pieces of silver?",
				options: ["Jesus", "Joseph", "Judas", "Peter"],
				correct: 0,
			},
			{
				question: "Who hanged himself after betraying Jesus?",
				options: ["Peter", "Judas", "Thomas", "Philip"],
				correct: 1,
			},
			{
				question: "Who replaced Judas as an apostle?",
				options: ["Barnabas", "Matthias", "Paul", "Silas"],
				correct: 1,
			},
			{
				question: "On what day did the Holy Spirit come at Pentecost?",
				options: ["50th day after Passover", "40th day", "7th day", "1st day"],
				correct: 0,
			},
		],
		medium: [
			{
				question: "True or False: David wrote the entire book of Psalms.",
				options: ["True", "False"],
				correct: 1,
			},
			{
				question: "What is the shortest book in the Bible?",
				options: ["Philemon", "2 John", "3 John", "Jude"],
				correct: 2,
			},
			{
				question: "How many books are in the Bible?",
				options: ["39", "66", "73", "100"],
				correct: 1,
			},
			{
				question: "How many books in the Old Testament?",
				options: ["27", "39", "46", "52"],
				correct: 1,
			},
			{
				question: "How many books in the New Testament?",
				options: ["27", "39", "66", "12"],
				correct: 0,
			},
			{
				question: "Which New Testament book has Jesus’ Sermon on the Mount?",
				options: ["Mark", "Luke", "Matthew", "John"],
				correct: 2,
			},
			{
				question: "Who was David’s son that became king?",
				options: ["Absalom", "Solomon", "Adonijah", "Jonathan"],
				correct: 1,
			},
			{
				question: "In what language was most of the Old Testament written?",
				options: ["Greek", "Hebrew", "Aramaic", "Latin"],
				correct: 1,
			},
			{
				question: "In what language was most of the New Testament written?",
				options: ["Hebrew", "Greek", "Latin", "Aramaic"],
				correct: 1,
			},
			{
				question:
					"Which human author wrote the most books in the New Testament?",
				options: ["John", "Peter", "Luke", "Paul"],
				correct: 3,
			},
			{
				question: "Which human author wrote the most words in the Bible?",
				options: ["Paul", "Moses", "David", "Luke"],
				correct: 1,
			},
			{
				question: "Who were Noah’s three sons?",
				options: [
					"Shem, Ham, Japheth",
					"Cain, Abel, Seth",
					"Isaac, Jacob, Esau",
					"Moses, Aaron, Joshua",
				],
				correct: 0,
			},
			{
				question: "How many people were saved on the ark?",
				options: ["4", "6", "8", "12"],
				correct: 2,
			},
			{
				question: "Who did God call out of Ur to move to Canaan?",
				options: ["Abram", "Lot", "Terah", "Isaac"],
				correct: 0,
			},
			{
				question:
					"Even though Abram and Sarah were too old, what did God promise them?",
				options: ["Riches", "A son", "Land", "Victory"],
				correct: 1,
			},
			{
				question: "What was Sarai’s name changed to?",
				options: ["Rebekah", "Rachel", "Sarah", "Leah"],
				correct: 2,
			},
			{
				question: "Who was Abraham’s handmaid?",
				options: ["Hagar", "Bilhah", "Zilpah", "Keturah"],
				correct: 0,
			},
			{
				question: "Who did Abraham send to find Isaac a wife?",
				options: ["His servant", "Lot", "Ishmael", "Eliezer"],
				correct: 0,
			},
			{
				question: "Who did the servant choose as Isaac’s wife?",
				options: ["Rachel", "Rebekah", "Leah", "Ruth"],
				correct: 1,
			},
			{
				question: "What were Isaac’s sons’ names?",
				options: [
					"Jacob and Esau",
					"Reuben and Simeon",
					"Joseph and Benjamin",
					"Manasseh and Ephraim",
				],
				correct: 0,
			},
			{
				question: "How did Esau provide food for the family?",
				options: ["Farming", "Hunting", "Fishing", "Trading"],
				correct: 1,
			},
			{
				question: "What did Esau trade for a bowl of stew?",
				options: ["His bow", "His birthright", "His wife", "His tent"],
				correct: 1,
			},
			{
				question: "Who tricked Isaac into giving Jacob the blessing?",
				options: ["Jacob alone", "Rebekah", "Esau", "Laban"],
				correct: 1,
			},
			{
				question:
					"When Jacob met Laban, which daughter did he want to marry first?",
				options: ["Leah", "Rachel", "Bilhah", "Zilpah"],
				correct: 1,
			},
			{
				question: "What did Laban make Jacob do to finally marry Rachel?",
				options: [
					"Work 7 more years",
					"Pay gold",
					"Fight Esau",
					"Build a house",
				],
				correct: 0,
			},
			{
				question: "What did God change Jacob’s name to?",
				options: ["Israel", "Judah", "Joseph", "Benjamin"],
				correct: 0,
			},
			{
				question: "What did Moses’ staff turn into?",
				options: ["A sword", "A snake", "A rod of fire", "A branch"],
				correct: 1,
			},
			{
				question: "What did God send to feed the Israelites in the desert?",
				options: [
					"Bread from heaven",
					"Quail and manna",
					"Fish and bread",
					"Angels' food",
				],
				correct: 1,
			},
			{
				question:
					"Who were the only two spies who said Canaan could be conquered?",
				options: [
					"Joshua and Caleb",
					"Moses and Aaron",
					"Nadab and Abihu",
					"Gideon and Barak",
				],
				correct: 0,
			},
			{
				question: "What city’s walls fell after marching and shouting?",
				options: ["Ai", "Jericho", "Lachish", "Gibeon"],
				correct: 1,
			},
			{
				question: "Who was the woman judge of Israel?",
				options: ["Ruth", "Deborah", "Esther", "Hannah"],
				correct: 1,
			},
			{
				question: "Who defeated the Midianites with 300 men?",
				options: ["Samson", "Gideon", "Saul", "David"],
				correct: 1,
			},
			{
				question: "Who took a Nazarite vow and fought Philistines?",
				options: ["Samuel", "Saul", "Samson", "Goliath"],
				correct: 2,
			},
			{
				question: "How did Samson die?",
				options: [
					"Old age",
					"Pushing down temple pillars",
					"In battle",
					"Poison",
				],
				correct: 1,
			},
			{
				question: "Who anointed Saul as the first king?",
				options: ["David", "Samuel", "Nathan", "Gad"],
				correct: 1,
			},
			{
				question: "What happened to the idol Dagon beside the Ark?",
				options: [
					"It fell and broke",
					"It came alive",
					"It burned",
					"It disappeared",
				],
				correct: 0,
			},
			{
				question: "How many times did David spare Saul’s life?",
				options: ["Once", "Twice", "Three times", "Never"],
				correct: 1,
			},
			{
				question: "Where did David first spare Saul’s life?",
				options: ["In a cave", "In a field", "In the palace", "In battle"],
				correct: 0,
			},
			{
				question: "Who was David’s son who rebelled against him?",
				options: ["Solomon", "Absalom", "Adonijah", "Amnon"],
				correct: 1,
			},
			{
				question: "Who killed Absalom?",
				options: ["David", "Joab", "Abishai", "Solomon"],
				correct: 1,
			},
			{
				question: "What was David’s second major sin?",
				options: ["Adultery", "Taking a census", "Murder", "Lying"],
				correct: 1,
			},
			{
				question: "What did Solomon pray for when he became king?",
				options: ["Wealth", "Long life", "Wisdom", "Many children"],
				correct: 2,
			},
			{
				question: "How many wives did Solomon have?",
				options: ["100", "300", "700", "1000"],
				correct: 2,
			},
			{
				question: "What happened to the kingdom after Solomon died?",
				options: [
					"It grew larger",
					"It split into two",
					"It was conquered",
					"It became one again",
				],
				correct: 1,
			},
			{
				question: "Who conquered the northern kingdom of Israel?",
				options: ["Babylon", "Assyria", "Egypt", "Persia"],
				correct: 1,
			},
			{
				question: "Who conquered the southern kingdom of Judah?",
				options: ["Assyria", "Babylon", "Persia", "Rome"],
				correct: 1,
			},
			{
				question: "Who was thrown into the fiery furnace?",
				options: [
					"Daniel",
					"Shadrach, Meshach, Abednego",
					"Ezekiel",
					"Jeremiah",
				],
				correct: 1,
			},
			{
				question: "Who interpreted Nebuchadnezzar’s dream of the statue?",
				options: ["Daniel", "Joseph", "Ezekiel", "Isaiah"],
				correct: 0,
			},
			{
				question: "Who returned to rebuild Jerusalem’s walls?",
				options: ["Ezra", "Nehemiah", "Zerubbabel", "Joshua"],
				correct: 1,
			},
			{
				question: "Who was queen and saved her people from genocide?",
				options: ["Vashti", "Esther", "Jezebel", "Athalia"],
				correct: 1,
			},
			{
				question: "How many days was Lazarus dead before Jesus raised him?",
				options: ["1", "2", "3", "4"],
				correct: 3,
			},
			{
				question: "What garden did Jesus pray in before his arrest?",
				options: ["Eden", "Gethsemane", "Olives", "Paradise"],
				correct: 1,
			},
			{
				question: "Who washed his hands during Jesus’ trial?",
				options: ["Herod", "Pilate", "Caiaphas", "Annas"],
				correct: 1,
			},
			{
				question: "How many people saw the risen Jesus?",
				options: ["12", "40", "120", "Over 500"],
				correct: 3,
			},
			{
				question: "Who preached the first sermon at Pentecost?",
				options: ["Paul", "Peter", "John", "James"],
				correct: 1,
			},
			{
				question: "Who was the first Christian martyr?",
				options: ["Peter", "James", "Stephen", "Paul"],
				correct: 2,
			},
			{
				question: "What was Paul’s name before conversion?",
				options: ["Simon", "Saul", "Silas", "Sergius"],
				correct: 1,
			},
			{
				question: "Who escaped Damascus in a basket?",
				options: ["Peter", "Paul", "Barnabas", "John Mark"],
				correct: 1,
			},
			{
				question: "In what city were believers first called Christians?",
				options: ["Jerusalem", "Antioch", "Ephesus", "Corinth"],
				correct: 1,
			},
			{
				question: "Where is the Lord’s Prayer found?",
				options: ["Matthew 6", "Luke 11", "Both", "John 17"],
				correct: 2,
			},
			{
				question: "Where is the Fruit of the Spirit listed?",
				options: ["Romans 12", "Galatians 5", "Ephesians 4", "Colossians 3"],
				correct: 1,
			},
			{
				question: "How many fruits of the Spirit are there?",
				options: ["7", "9", "10", "12"],
				correct: 1,
			},
			{
				question: "Who wrote the book of Acts?",
				options: ["Paul", "Peter", "John", "Luke"],
				correct: 3,
			},
			{
				question: "Who wrote Romans?",
				options: ["Peter", "Paul", "James", "Jude"],
				correct: 1,
			},
			{
				question: "Which church did Paul write to about spiritual gifts?",
				options: ["Rome", "Corinth", "Galatia", "Ephesus"],
				correct: 1,
			},
			{
				question: "Who was shipwrecked three times?",
				options: ["Peter", "Paul", "John", "Barnabas"],
				correct: 1,
			},
			{
				question: "Which prisoner wrote letters from jail?",
				options: ["Peter", "John", "Paul", "Silas"],
				correct: 2,
			},
			{
				question: "Who had a vision of a sheet with unclean animals?",
				options: ["Paul", "Peter", "John", "Philip"],
				correct: 1,
			},
			{
				question: "Who baptized an Ethiopian official?",
				options: ["Peter", "Paul", "Philip", "John"],
				correct: 2,
			},
			{
				question: "Who raised Tabitha (Dorcas) from the dead?",
				options: ["Paul", "Peter", "Philip", "Barnabas"],
				correct: 1,
			},
			{
				question: "Who was the first Gentile convert in Acts?",
				options: ["Lydia", "Ethiopian eunuch", "Cornelius", "Sergius Paulus"],
				correct: 2,
			},
			{
				question: "Which two missionaries argued and split up?",
				options: [
					"Peter & Paul",
					"Paul & Barnabas",
					"Barnabas & John Mark",
					"Silas & Timothy",
				],
				correct: 1,
			},
			{
				question: "What is the Armor of God described in?",
				options: ["Romans", "Ephesians", "Philippians", "Colossians"],
				correct: 1,
			},
			{
				question: "Which book says “God is love”?",
				options: ["John", "1 John", "Romans", "1 Corinthians"],
				correct: 1,
			},
			{
				question: "Which book calls Jesus “the Word”?",
				options: ["Matthew", "Mark", "Luke", "John"],
				correct: 3,
			},
			{
				question: "Who wrote Revelation?",
				options: ["Paul", "Peter", "James", "John"],
				correct: 3,
			},
			{
				question: "On what island was John when he wrote Revelation?",
				options: ["Crete", "Cyprus", "Patmos", "Malta"],
				correct: 2,
			},
			{
				question: "Who was the high priest who condemned Jesus?",
				options: ["Annas", "Caiaphas", "Gamaliel", "Hillel"],
				correct: 1,
			},
			{
				question: "Who was the rich young ruler who walked away sad?",
				options: ["Nicodemus", "Joseph of Arimathea", "Zacchaeus", "Unnamed"],
				correct: 3,
			},
			{
				question: "Who climbed a tree to see Jesus?",
				options: ["Nicodemus", "Zacchaeus", "Nathanael", "Lazarus"],
				correct: 1,
			},
			{
				question: "Which parable is about a father with two sons?",
				options: ["Good Samaritan", "Prodigal Son", "Sower", "Talents"],
				correct: 1,
			},
			{
				question: "Which parable is about 10 virgins?",
				options: ["Talents", "Wicked tenants", "Ten virgins", "Lost sheep"],
				correct: 2,
			},
			{
				question: "Who was stoned for preaching?",
				options: ["Stephen", "James", "Paul", "Barnabas"],
				correct: 0,
			},
			{
				question: "Who survived being bitten by a viper?",
				options: ["Peter", "Paul", "John", "Luke"],
				correct: 1,
			},
			{
				question: "Which epistle was written to a slave owner?",
				options: ["Titus", "Philemon", "Timothy", "James"],
				correct: 1,
			},
			{
				question: "Who was Timothy’s grandmother?",
				options: ["Lois", "Eunice", "Lydia", "Priscilla"],
				correct: 0,
			},
			{
				question: "Who was the female seller of purple?",
				options: ["Lydia", "Priscilla", "Phoebe", "Euodia"],
				correct: 0,
			},
			{
				question:
					"Which book says “the love of money is the root of all evil”?",
				options: ["Proverbs", "Ecclesiastes", "1 Timothy", "James"],
				correct: 2,
			},
			{
				question: "Which Old Testament book never mentions God?",
				options: ["Ruth", "Esther", "Song of Solomon", "Ecclesiastes"],
				correct: 1,
			},
			{
				question: "Who was Ruth’s famous grandson?",
				options: ["Solomon", "David", "Jesse", "Obed"],
				correct: 1,
			},
			{
				question:
					"Who said, “Your people shall be my people, and your God my God”?",
				options: ["Rachel", "Ruth", "Naomi", "Orpah"],
				correct: 1,
			},
			{
				question: "Who was Boaz’s famous relative?",
				options: ["Elimelech", "Naomi", "Ruth", "David"],
				correct: 0,
			},
			{
				question: "What does “Immanuel” mean?",
				options: [
					"God with us",
					"Prince of Peace",
					"Mighty God",
					"Everlasting Father",
				],
				correct: 0,
			},
			{
				question: "Which prophet foretold a virgin would conceive?",
				options: ["Isaiah", "Jeremiah", "Micah", "Ezekiel"],
				correct: 0,
			},
			{
				question: "Which prophet prophesied Bethlehem as Jesus’ birthplace?",
				options: ["Isaiah", "Jeremiah", "Micah", "Hosea"],
				correct: 2,
			},
			{
				question: "Which prophet saw a vision of wheels within wheels?",
				options: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
				correct: 2,
			},
			{
				question: "Who was the prophet in Nineveh?",
				options: ["Nahum", "Jonah", "Obadiah", "Amos"],
				correct: 1,
			},
		],
		hard: [
			{
				question: "How many years did Methuselah live?",
				options: ["777", "888", "969", "999"],
				correct: 2,
			},
			{
				question:
					"When Saul conquered the Amalekites, who did he keep alive against God’s command?",
				options: ["King Agag", "King Amalek", "King Og", "King Sihon"],
				correct: 0,
			},
			{
				question: "Which books record all the kings of Israel and Judah?",
				options: [
					"1 & 2 Samuel",
					"1 & 2 Kings, 1 & 2 Chronicles",
					"Ezra & Nehemiah",
					"1 & 2 Maccabees",
				],
				correct: 1,
			},
			{
				question: "How many kings ruled over the southern kingdom of Judah?",
				options: ["19", "20", "21", "22"],
				correct: 1,
			},
			{
				question: "How many kings ruled over the northern kingdom of Israel?",
				options: ["19", "20", "21", "22"],
				correct: 0,
			},
			{
				question: "Who conquered Judah and took Daniel captive?",
				options: ["Assyria", "Babylon", "Persia", "Greece"],
				correct: 1,
			},
			{
				question: "Daniel’s three friends’ Babylonian names were:",
				options: [
					"Shadrach, Meshach, Abednego",
					"Hananiah, Mishael, Azariah",
					"Belteshazzar, Abednego, Meshach",
					"Azariah, Hananiah, Mishael",
				],
				correct: 0,
			},
			{
				question: "Who told Daniel the meaning of the ram and goat vision?",
				options: ["Michael", "Gabriel", "Raphael", "Uriel"],
				correct: 1,
			},
			{
				question: "True or False: John the Baptist wore camel hair.",
				options: ["True", "False"],
				correct: 0,
			},
			{
				question: "True or False: Jesus’ family once thought he was crazy.",
				options: ["True", "False"],
				correct: 0,
			},
			{
				question: "Which Jewish leader visited Jesus at night?",
				options: ["Gamaliel", "Nicodemus", "Joseph of Arimathea", "Annas"],
				correct: 1,
			},
			{
				question: "How many days was Lazarus dead before Jesus raised him?",
				options: ["2", "3", "4", "7"],
				correct: 2,
			},
			{
				question: "Name of the demon cast out of the Gerasene man:",
				options: ["Beelzebub", "Legion", "Abaddon", "Asmodeus"],
				correct: 1,
			},
			{
				question: "Who appeared with Jesus at the Transfiguration?",
				options: [
					"Elijah & Moses",
					"Abraham & David",
					"Enoch & Elijah",
					"David & Solomon",
				],
				correct: 0,
			},
			{
				question: "Who was blind and shouted “Son of David”?",
				options: ["Bartimaeus", "Zacchaeus", "Malchus", "Lazarus"],
				correct: 0,
			},
			{
				question: "Who gave Jesus a crown of thorns?",
				options: ["Pilate", "Herod", "Roman soldiers", "Jewish leaders"],
				correct: 2,
			},
			{
				question: "How many people saw the risen Christ according to Paul?",
				options: ["Over 300", "Over 500", "Over 700", "Over 1000"],
				correct: 1,
			},
			{
				question: "Who preached at Pentecost?",
				options: ["Paul", "Peter", "James", "John"],
				correct: 1,
			},
			{
				question: "Who lied to the Holy Spirit and died?",
				options: [
					"Ananias & Sapphira",
					"Simon the Sorcerer",
					"Elymas",
					"Demas",
				],
				correct: 0,
			},
			{
				question: "How many deacons were chosen in Acts 6?",
				options: ["5", "7", "12", "70"],
				correct: 1,
			},
			{
				question: "Peter’s vision of unclean animals meant what?",
				options: [
					"Diet laws ended",
					"Gentiles can be saved",
					"Both",
					"Neither",
				],
				correct: 1,
			},
			{
				question: "In what city were disciples first called Christians?",
				options: ["Jerusalem", "Antioch", "Ephesus", "Corinth"],
				correct: 1,
			},
			{
				question: "Paul saw a vision of a man from what region?",
				options: ["Macedonia", "Asia", "Carthage", "Spain"],
				correct: 0,
			},
			{
				question: "Where is the Fruit of the Spirit found?",
				options: [
					"Galatians 5",
					"Ephesians 5",
					"Colossians 3",
					"Philippians 4",
				],
				correct: 0,
			},
			{
				question: "Which disciple took care of Mary after Jesus died?",
				options: ["Peter", "James", "John", "Andrew"],
				correct: 2,
			},
			{
				question: "Who requested Jesus’ body for burial?",
				options: [
					"Nicodemus",
					"Joseph of Arimathea",
					"Gamaliel",
					"Simon of Cyrene",
				],
				correct: 1,
			},
			{
				question: "What reward did Jesus promise the 12 apostles?",
				options: ["Riches", "Thrones judging Israel", "Long life", "Fame"],
				correct: 1,
			},
			{
				question: "Who hid spies under flax on her roof?",
				options: ["Rahab", "Deborah", "Jael", "Delilah"],
				correct: 0,
			},
			{
				question: "In which book is Nebuchadnezzar’s dream statue?",
				options: ["Daniel", "Ezekiel", "Revelation", "Isaiah"],
				correct: 0,
			},
			{
				question: "Which tribe had no land inheritance?",
				options: ["Judah", "Levi", "Benjamin", "Dan"],
				correct: 1,
			},
			{
				question: "Who was king of Judah when Israel fell to Assyria?",
				options: ["Ahaz", "Hezekiah", "Josiah", "Manasseh"],
				correct: 1,
			},
			{
				question: "Who was Abraham’s nephew?",
				options: ["Isaac", "Lot", "Laban", "Nahor"],
				correct: 1,
			},
			{
				question: "Who knew the Scriptures from childhood?",
				options: ["Timothy", "Titus", "John Mark", "Silas"],
				correct: 0,
			},
			{
				question: "Who delivered Paul’s letter to Philemon?",
				options: ["Tychicus", "Onesimus", "Epaphroditus", "Timothy"],
				correct: 0,
			},
			{
				question: "Who was Caiaphas’ father-in-law?",
				options: ["Gamaliel", "Annas", "Hillel", "Nicodemus"],
				correct: 1,
			},
			{
				question: "What happened to Nebuchadnezzar for 7 years?",
				options: [
					"Lived like an animal",
					"Lost his kingdom",
					"Went blind",
					"Was imprisoned",
				],
				correct: 0,
			},
			{
				question:
					"When the disciples thought Jesus was a ghost on water, what was he?",
				options: ["An angel", "A spirit", "Walking on water", "A vision"],
				correct: 2,
			},
			{
				question: "Who was to be named Zacharias until Elizabeth intervened?",
				options: ["Jesus", "John the Baptist", "Samuel", "Elijah"],
				correct: 1,
			},
			{
				question: "What did Melchizedek give Abraham?",
				options: ["Bread and wine", "Gold and silver", "A sword", "A covenant"],
				correct: 0,
			},
			{
				question: "Who prayed for a child at Shiloh?",
				options: ["Sarah", "Rebekah", "Hannah", "Rachel"],
				correct: 2,
			},
			{
				question: "Which two tribes were named after Joseph’s sons?",
				options: [
					"Ephraim & Manasseh",
					"Dan & Naphtali",
					"Gad & Asher",
					"Issachar & Zebulun",
				],
				correct: 0,
			},
			{
				question: "How many minor prophets are there?",
				options: ["10", "12", "15", "17"],
				correct: 1,
			},
			{
				question: "Who wrote most of the Proverbs?",
				options: ["David", "Solomon", "Lemuel", "Agur"],
				correct: 1,
			},
			{
				question: "Who was Hosea married to?",
				options: ["Gomer", "Delilah", "Jezebel", "Rahab"],
				correct: 0,
			},
			{
				question: "Which prophet was told to marry a prostitute?",
				options: ["Hosea", "Amos", "Jonah", "Micah"],
				correct: 0,
			},
			{
				question: "Which prophet was in the belly of a fish 3 days?",
				options: ["Nahum", "Jonah", "Habakkuk", "Zephaniah"],
				correct: 1,
			},
			{
				question: "Who prophesied about the “valley of dry bones”?",
				options: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
				correct: 2,
			},
			{
				question: "Who interpreted the writing on the wall?",
				options: ["Daniel", "Ezekiel", "Isaiah", "Jeremiah"],
				correct: 0,
			},
			{
				question: "What does “Mene, Mene, Tekel, Parsin” mean?",
				options: [
					"Numbered, weighed, divided",
					"Repent or perish",
					"Kingdom lost",
					"God has won",
				],
				correct: 0,
			},
			{
				question: "Who was the last king of Judah?",
				options: ["Jehoiachin", "Zedekiah", "Josiah", "Jehoiakim"],
				correct: 1,
			},
			{
				question: "Who threw Jeremiah into a cistern?",
				options: ["Zedekiah", "Nebuchadnezzar", "Officials", "Ebed-Melech"],
				correct: 2,
			},
			{
				question: "Who pulled Jeremiah out of the cistern?",
				options: ["Baruch", "Ebed-Melech", "Gedaliah", "Seraiah"],
				correct: 1,
			},
			{
				question: "Who was the first high priest of Israel?",
				options: ["Eli", "Aaron", "Phinehas", "Samuel"],
				correct: 1,
			},
			{
				question: "Who was Samuel’s wicked sons?",
				options: [
					"Joel and Abijah",
					"Hophni and Phinehas",
					"Nadab and Abihu",
					"Gershom and Eliezer",
				],
				correct: 1,
			},
			{
				question: "Who was the last judge of Israel?",
				options: ["Eli", "Samuel", "Samson", "Saul"],
				correct: 1,
			},
			{
				question: "What woman drove a tent peg through Sisera’s head?",
				options: ["Deborah", "Jael", "Rahab", "Delilah"],
				correct: 1,
			},
			{
				question: "Who cut Samson’s hair?",
				options: ["Delilah", "A servant", "Philistine lords", "Samson himself"],
				correct: 0,
			},
			{
				question: "Who was the left-handed judge that killed Eglon?",
				options: ["Ehud", "Shamgar", "Othniel", "Tola"],
				correct: 0,
			},
			{
				question: "Who vowed his daughter because of a victory?",
				options: ["Gideon", "Jephthah", "Ibzan", "Abdon"],
				correct: 1,
			},
			{
				question: "Who stole Micah’s idols and priest?",
				options: ["Philistines", "Danites", "Benjaminites", "Ammonites"],
				correct: 1,
			},
			{
				question: "Which tribe almost wiped out Benjamin?",
				options: ["Judah", "Ephraim", "All Israel", "Levi"],
				correct: 2,
			},
			{
				question: "Who was Ruth’s kinsman-redeemer?",
				options: ["Boaz", "Elimelech", "Naomi’s brother", "Obed"],
				correct: 0,
			},
			{
				question: "Who was Obed’s son?",
				options: ["Jesse", "David", "Solomon", "Eliab"],
				correct: 0,
			},
			{
				question: "Who was Jesse’s father?",
				options: ["Obed", "Boaz", "Salmon", "Nahshon"],
				correct: 0,
			},
			{
				question: "Who was the prophet during David’s reign?",
				options: ["Samuel", "Nathan", "Gad", "All of them"],
				correct: 3,
			},
			{
				question: "Who moved the Ark on a new cart (wrong way)?",
				options: ["David", "Uzzah", "Abinadab", "Obed-Edom"],
				correct: 0,
			},
			{
				question: "Who died touching the Ark?",
				options: ["Uzzah", "Ahio", "Obed-Edom", "Abinadab"],
				correct: 0,
			},
			{
				question: "Who danced before the Lord when the Ark came to Jerusalem?",
				options: ["David", "Michal", "Jonathan", "Abner"],
				correct: 0,
			},
			{
				question: "Who despised David for dancing?",
				options: ["Saul", "Michal", "Joab", "Abner"],
				correct: 1,
			},
			{
				question: "Who killed a lion in a pit on a snowy day?",
				options: ["David", "Benaiah", "Abishai", "Samson"],
				correct: 1,
			},
			{
				question: "Who was the commander who killed Absalom?",
				options: ["Joab", "Abishai", "Ittai", "Amasa"],
				correct: 0,
			},
			{
				question: "Who rebelled and declared himself king in Hebron?",
				options: ["Absalom", "Adonijah", "Sheba", "Jeroboam"],
				correct: 1,
			},
			{
				question: "Who said “I alone am left” before God corrected him?",
				options: ["Elijah", "Elisha", "Micaiah", "Isaiah"],
				correct: 0,
			},
			{
				question: "How many prophets of Baal did Elijah challenge?",
				options: ["400", "450", "500", "850"],
				correct: 1,
			},
			{
				question: "Who ran faster than a chariot?",
				options: ["Elijah", "Elisha", "Gehazi", "Ahaziah"],
				correct: 0,
			},
			{
				question: "Who saw Elijah taken to heaven?",
				options: ["Elisha", "Gehazi", "Sons of prophets", "All of them"],
				correct: 0,
			},
			{
				question: "Who received a double portion of Elijah’s spirit?",
				options: ["Elisha", "Gehazi", "Naaman", "Jonah"],
				correct: 0,
			},
			{
				question: "Who was healed of leprosy in the Jordan?",
				options: ["Gehazi", "Naaman", "Benhadad", "Hazael"],
				correct: 1,
			},
			{
				question: "Who got leprosy for lying?",
				options: ["Gehazi", "Uzziah", "Miriam", "Naaman"],
				correct: 0,
			},
			{
				question: "Who was king when the book of the law was found?",
				options: ["Hezekiah", "Josiah", "Manasseh", "Amon"],
				correct: 1,
			},
			{
				question: "Who was the most evil king of Judah?",
				options: ["Ahaz", "Manasseh", "Jehoiakim", "Zedekiah"],
				correct: 1,
			},
			{
				question: "Who let the people return from Babylon?",
				options: ["Nebuchadnezzar", "Cyrus", "Darius", "Artaxerxes"],
				correct: 1,
			},
			{
				question: "Who opposed the rebuilding of the temple?",
				options: ["Sanballat & Tobiah", "Haman", "Goliath", "Geshem"],
				correct: 0,
			},
			{
				question:
					"Who read the law to the people standing on a wooden platform?",
				options: ["Ezra", "Nehemiah", "Zerubbabel", "Jesua"],
				correct: 0,
			},
			{
				question: "Who was cupbearer to the king?",
				options: ["Ezra", "Nehemiah", "Mordecai", "Daniel"],
				correct: 1,
			},
			{
				question: "Who refused to bow to Haman?",
				options: ["Daniel", "Mordecai", "Ezra", "Nehemiah"],
				correct: 1,
			},
			{
				question:
					"What is the last word of the Old Testament in English Bibles?",
				options: ["Amen", "Curse", "Israel", "Hallelujah"],
				correct: 1,
			},
			{
				question: "Which Gospel is written to Theophilus?",
				options: ["Matthew", "Mark", "Luke", "John"],
				correct: 2,
			},
			{
				question: "Which two Gospels have the genealogy of Jesus?",
				options: [
					"Matthew & Luke",
					"Mark & John",
					"Matthew & Mark",
					"Luke & John",
				],
				correct: 0,
			},
			{
				question:
					"Who was the greatest prophet born of women according to Jesus?",
				options: ["Elijah", "Moses", "John the Baptist", "Isaiah"],
				correct: 2,
			},
			{
				question: "Who was Zacharias’ wife?",
				options: ["Mary", "Elizabeth", "Anna", "Salome"],
				correct: 1,
			},
			{
				question:
					"Who was the old prophetess in the temple when Jesus was presented?",
				options: ["Elizabeth", "Anna", "Mary", "Joanna"],
				correct: 1,
			},
			{
				question: "How old was Jesus when he taught in the temple?",
				options: ["8", "12", "15", "30"],
				correct: 1,
			},
			{
				question: "Who lost an ax head in the water?",
				options: [
					"Elisha’s servant",
					"Gehazi",
					"Naaman",
					"A son of the prophets",
				],
				correct: 3,
			},
			{
				question: "Who made an ax head float?",
				options: ["Elijah", "Elisha", "Isaiah", "Jeremiah"],
				correct: 1,
			},
			{
				question: "Who was the Queen of Sheba’s modern-day country?",
				options: ["Ethiopia or Yemen", "Egypt", "Persia", "India"],
				correct: 0,
			},
			{
				question:
					"Who was the first martyr mentioned by name in the New Testament?",
				options: ["John the Baptist", "Stephen", "James", "Jesus"],
				correct: 1,
			},
			{
				question: "Who was the sorcerer struck blind by Paul?",
				options: [
					"Simon",
					"Elymas (Bar-Jesus)",
					"Demetrius",
					"Alexander the coppersmith",
				],
				correct: 1,
			},
			{
				question: "Which church had the lukewarm problem?",
				options: ["Ephesus", "Laodicea", "Sardis", "Philadelphia"],
				correct: 1,
			},
			{
				question: "Which church was told “you have left your first love”?",
				options: ["Ephesus", "Pergamos", "Thyatira", "Smyrna"],
				correct: 0,
			},
			{
				question: "How many churches are in Revelation?",
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

		const isCorrect = answerIndex === question.correct;
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

				{/* Verse + Explanation + Next */}
				{showVerse && question && (
					<div className="bg-purple-800 bg-opacity-70 p-6 rounded-xl border border-purple-400 text-white mb-6">
						<div className="mt-4 flex gap-3 justify-center">
							<button
								onClick={nextQuestion}
								className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow-lg border border-purple-400"
							>
								Next Question →
							</button>

							<button
								onClick={() => setShowVerse(true)}
								className="bg-transparent border border-purple-500 text-white py-2 px-4 rounded-lg"
							>
								Read Again
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default BibleQuest;
