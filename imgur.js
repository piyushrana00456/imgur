let data = [];
let page = 1;

const fetchData = async (page) => {
  try {
    let req = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=L&client_id=WdleZc1GO2SvZj7EPJ0jE3frFtuId8CkHLM9UiVB3iw`
    );
    let res = await req.json();
    console.log(res);
    data = [...data, ...res.results];

    console.log("data:", data);
    appendData();
  } catch (error) {
    console.log("error:", error);
  }
};
fetchData();

function appendData() {
  data.forEach((el) => {
    let div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="contain"></div>
    <div class="randomImg">
      <img src=${el.urls.small} alt="">
    </div>
    <div class="details">
      <h3>${
        el.alt_description != null ? el.alt_description : "Happy coding"
      }</h3>
      <div class="views">
        
      <span>${el.likes} <i class="fas fa-long-arrow-alt-down"></i></span>
      <span>${
        Math.floor(Math.random() * 50) + 1
      } <i class="fas fa-comment-alt"></i></span
      <span>${
        Math.floor(Math.random() * 10000) + 1
      } <i class="fas fa-eye"></i></span
      </div>
    </div>`;
    document.querySelector(".cards").append(div);
  });
}
appendData();

window.addEventListener("scroll", function () {
  let footer = document.querySelector(".footer");
  let cards = document.querySelector(".cards");
  footer.classList.toggle("sticky", window.scrollY);
});

const handleScroll = () => {
  const html = document.documentElement;
  const body = document.body;
  const windowHeight =
    "innerHeight" in window ? window.innerHeight : html.offsetHeight;

  const docHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  const windowBottom = windowHeight + window.pageYOffset;
  if (windowBottom >= docHeight) {
    page += 1;

    fetchData(page);
  }
};

window.addEventListener("scroll", handleScroll);

function handleSearch() {
  let input = document.getElementById("query").value;
  console.log(input);
  fetchQueryData(input);
  input.value = "";
}

function fetchQueryData(query) {
  fetch(
    `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${query}&client_id=WdleZc1GO2SvZj7EPJ0jE3frFtuId8CkHLM9UiVB3iw`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let d = res.results;
      data = [...d];
      appendData();
    })
    .catch((err) => {
      console.log(err);
    });
}
