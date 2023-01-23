const form = document.querySelector(".input_wrap form");
const input = document.querySelector(".input_wrap input");
const msg = document.querySelector(".input_wrap .msg");
const apiKey = "4d8fb5b93d4af21d66a2948710284366";
const info = document.querySelector(".info_wrap");
const card = document.querySelector(".card_wrap");
const loadingMsg = document.querySelector(".card_wrap .loading_txt");
const search = document.querySelector(".keyword_wrap");
const submit = document.querySelector(".submit_btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = input.value;

  card.classList.add("loading");

  loadingMsg.innerText = "Getting weather details...";
  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const { main, name, weather, wind } = data;
      const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      const background = document.querySelector(".container");
      background.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${inputVal})`;

      const div = document.createElement("div");
      div.classList.add("city");
      const markup = `
        <h2 class="city_place">
          Weather in ${name}
        </h2>
        <p class="city_temp">
          <span>${main.temp}<sup>°C</sup></span>
        </p>
        <figure>
          <img class="city_icon" src="${icon}" alt="${weather[0].description}"/>
          <figcaption>${weather[0].description}</figcaption>
        </figure>
        <div class="city_info">
          <p>Humidity : ${main.humidity}%</p>
          <p>Wind Speed : ${wind.speed}km/h</p>
        </div>
      `;
      div.innerHTML = markup;

      const keyword = document.createElement("button");
      keyword.innerText = inputVal;
      keyword.type = "button";
      keyword.classList.add("keyword");
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "X";
      deleteBtn.classList.add("delete_btn");
      keyword.append(deleteBtn);
      //키워드 click -> submit 버튼 click event
      keyword.addEventListener("click", function (e) {
        input.value = e.target.innerText;
        submit.click();
      });

      const keywords = document.querySelectorAll(".keyword");

      // append 전 반복문
      keywords.forEach((el, index) => {
        console.log("el", el);
        console.log("keyword", keyword);

        // 중복값 삭제
        if (el.innerText == keyword.innerText) {
          el.remove();
        }
        // keyword 5개 이상이면 삭제 (append되기전 index -1)
        if (index > 3) {
          el.remove();
        }
      });

      search.append(keyword);

      // delete btn
      deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        e.currentTarget.parentNode.remove();
        console.log(e.currentTarget.parentNode);
      });
      // city 정보 최대 1개
      const city = document.querySelectorAll(".info_wrap > .city");
      if (city.length > 0) {
        info.innerHTML = "";
      }
      info.appendChild(div);
      card.classList.remove("loading");
      loadingMsg.innerText = "";

      // Reset
      const resetBtn = document.querySelector(".reset_btn");
      resetBtn.addEventListener("click", (e) => {
        e.preventDefault();
        info.innerHTML = "";
      });
    })
    .catch(() => {
      card.classList.remove("loading");
      loadingMsg.innerText = "";
      msg.textContent = "Please search for a valid city";
      info.innerHTML = "";
    });

  form.reset();
  msg.textContent = "";
  input.focus();
});
