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
      <h3>${el.alt_description}</h3>
      <div class="views">
        
      <span>${el.likes} <i class="fas fa-long-arrow-alt-down"></i></span>
      <span>30 <i class="fas fa-comment-alt"></i></span
      <span>${el.height} <i class="fas fa-eye"></i></span
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
