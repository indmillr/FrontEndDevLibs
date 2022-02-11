// local quotes data
const quotes = [
  {
    id: 1,
    name: "Gene Ween",
    text: "I was never into smart college boy music.",
  },
  {
    id: 2,
    name: "Dean Ween",
    text: "If you can find one thing in life that can keep you in the moment, you're totally lucky.",
  },
  {
    id: 3,
    name: "Douglas Adams",
    text: "For instance, on the planet Earth, man had always assumed that he was more intelligent than dolphins because he had achieved so much—the wheel, New York, wars and so on—whilst all the dolphins had ever done was muck about in the water having a good time. But conversely, the dolphins had always believed that they were far more intelligent than man—for precisely the same reasons.",
  },
  {
    id: 4,
    name: "Douglas Adams",
    text: "There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable. There is another theory which states that this has already happened.",
  },
  {
    id: 5,
    name: "Ursula K Le Guin",
    text: "It had never occured to me before that music and thinking are so much alike. In fact you could say music is another way of thinking, or maybe thinking is another kind of music.",
  },
  {
    id: 6,
    name: "Hunter S Thompson",
    text: "Yes sir, I am a tortured man for all seasons, as they say, and I have powerful friends in high places. Birds sing where I walk, and children smile when they see me coming.",
  },
  {
    id: 7,
    name: "Steven Wright",
    text: "I went to a restaurant that serves 'breakfast at any time.' So I ordered French Toast during the Renaissance.",
  },
  {
    id: 8,
    name: "George Carlin",
    text: "Some people see things that are and ask, Why? Some people dream of things that never were and ask, Why not? Some people have to go to work and don't have time for all that.",
  },
  {
    id: 9,
    name: "Snoop Dogg",
    text: "If the ride is more fly, then you must buy.",
  },
  {
    id: 10,
    name: "Paul Simon",
    text: "It's actually very difficult to make something both simple and good.",
  },
];

// select items
const author = document.getElementById("author");
const info = document.getElementById("text");

const randomBtn = document.querySelector(".random-btn");

// set starting item
let currentItem = 0;

// show person based on item
function showPerson(person) {
  const item = quotes[person];
  author.textContent = item.name;
  info.textContent = item.text;
}

// show random Quote with Author
randomBtn.addEventListener("click", function () {
  currentItem = Math.floor(Math.random() * quotes.length);
  showPerson(currentItem);
});

// Load random Quote/Author when the page loads
window.onload = function () {
  currentItem = Math.floor(Math.random() * quotes.length);
  showPerson(currentItem);
};
