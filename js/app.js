// Үндсэн өгөгдлүүд
const calendar2021 = {
  Jan: { 1: "Сайхан амарна" },
  Feb: {1: "Сагсны тэмцээнтэй",3: "Шагнал гардуулна даа",17: "Жавхлан багшийн лаб 2-ыг хийнэ",},
  Mar: {2: "Энэ лабынхаа хугацааг сунгах уу яах вэ гэдэгээ шийднэ",6: "Энд юу бичье дээ байз",8: "Эмэгтэйчүүддээ баяр хүргэнэ дээ",},
  Apr: { 1: "Бүгдээрээ худлаа ярьцаагаагаарай" },
  May: { 10: "Энэ сард ч ёстой юу ч болдоггүй сар даа" },
  Jun: { 6: "Жавхлан багшийн төрсөн өдөр" },
  Jul: { 4: "Хичээл амарсаан ураа" },
  Aug: { 1: "Хөдөө явдаг цаг даа", 25: "Хичээл сонголт эхэллээ" },
  Sept: { 1: "9-н сарын нэгэн боллоо ерөөсөө бидний баяр даа" },
  Oct: { 13: "Сур сур бас дахин сур" },
  Nov: { 2: "Сурсаар л бай" },
  Dec: {
    20: "Өвлийн семистер хаагдах нь дээ",
    30: "Дүн гаргаж дууслаа баярлалаа баяртай",
  },
};
let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec",];
const colors = ["BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkKhaki","DarkMagenta",
"DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise", "DarkViolet",
"DeepPink", "DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen",];

// Golbal Variable-ууд
let color = 0;
let monthNumber = 0;

// Dom-оос select хийж байгаа хэсэг
const spDays = document.querySelector(".specialDays");
const calContainer = document.querySelector(".cal-container");
const calendar = document.querySelector(".calendar");
const error  = document.querySelector(".error");

// Tэмдэглэлт өдрүүдийг дэлгэцрүү нэмж байгаа хэсэг
let renderSpecials = (number, day, color) => {
  let html = `
          <div class = "specialP">
              <div class = "front">
                  <div class = "oval" style = "background-color : ${color}""></div>
                  <div><p>${months[number]} - ${day}</p></div>
              </div>
              <div class = "back">
                  <div><p>${calendar2021[months[number]][day]}</p></div>
              </div>
          </div>
      `;
  spDays.insertAdjacentHTML("beforeend", html);
};

// 1сар-ыг хэвлэж байгаа хэсэг
const render_months = (n, color) => {
  if (typeof n === "object") {
    spDays.innerHTML = "";
    let length = n.length;
    for (let i = 0; i < length; i++) {
      let html = `<div class="calendar">
          <div class="month">
            <i class="fas fa-angle-left"></i>
            <div class="monthName${i}"></div>
            <i class="fas fa-angle-right"></i>
          </div>
          <div class="weekdays${i} weekday-layout"></div>
          <div class="days${i} days-layout"></div>
        </div>`;
      calContainer.insertAdjacentHTML("beforeend", html);
      render_month_cal(n[i], color, i, 1);
    }
  } else {
    for (let i = 0; i < 1; i++) {
      let html = `<div class="calendar">
          <div class="month">
            <i class="fas fa-angle-left"></i>
            <div class="monthName${i}"></div>
            <i class="fas fa-angle-right"></i>
          </div>
          <div class="weekdays${i} weekday-layout"></div>
          <div class="days${i} days-layout"></div>
        </div>`;
      calContainer.innerHTML = "";
      calContainer.innerHTML = html;
      render_month_cal(n, color, i);
    }
  }
};

// Каледарыг дэлгэцэд үзүүлж байгаа хэсэг
const render_month_cal = (number, color, n = 0, state = 0) => {
  if(state === 0) spDays.innerHTML = "";
  const dt = new Date();
  dt.setMonth(number);
  const month = dt.toLocaleString("default", { month: "long" });
  const monthName = document.querySelector(".monthName" + n);
  monthName.innerHTML = month;
  const md = document.querySelector(".days" + n);
  const wd = document.querySelector(".weekdays" + n);
  const currentMonthld = new Date(
    dt.getFullYear(),
    dt.getMonth() + 1,
    0
  ).getDate();

  const lastMonthld = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
  dt.setDate(1);
  let start_index = dt.getDay();
  dt.setDate(currentMonthld);
  let last_index = dt.getDay();
  let html = "";
  for (let i = lastMonthld - start_index + 1; i <= lastMonthld; i++) {
    html += `<div class = "prev">${i}</div>`;
  }
  for (let i = number; i < number + 1; i++) {
    for (let j = 1; j <= currentMonthld; j++) {
      if (calendar2021[months[i]][j] != undefined) {
        html += `<div class = "active" style = "background : ${colors[color]}">${j}</div>`;

        renderSpecials(number, j, colors[color]);
        color++;
      } else {
        html += `<div>${j}</div>`;
      }
    }
  }
  if (last_index == 6) md.innerHTML = html;

  for (let i = 1; i < 7 - last_index; i++) {
    html += `<div class = "next">${i}</div>`;
    md.innerHTML = html;
  }
  wd.innerHTML = `<div class="wd">Sun</div>
                      <div class="wd">Mon</div>
                      <div class="wd">Tue</div>
                      <div class="wd">Wed</div>
                      <div class="wd">Thu</div>
                      <div class="wd">Fri</div>
                      <div class="wd">Sat</div>`;
};

// Үгээр хайлт хийх хэсэг
const searchByValue = (searchString) => {
  let monthArr = [];
  let c = 0, counter = 0;
  for (let i = 0; i < 12; i++) {
    for (let j = 1; j < 31; j++) {
      if (calendar2021[months[i]][j] != undefined) {
        if (calendar2021[months[i]][j].toLowerCase().includes(searchString.toLowerCase())) {
          monthArr[c] = i;
          c++;
          counter++;
        }
      }
    }
  }
  if(counter !==0){
    render_months(monthArr, color);
    error.classList.remove("background");
    error.innerHTML = "";
  }
  else {
    error.innerHTML = "Таны оруулсан үг агуулагдсан тэмдэглэлт өдөр байхгүй байна";
    error.classList.add("background");
    render_months(0, color);
  }
};
// Дэлгэц load хийхэд ажиллах хэсэг
window.addEventListener("load", render_months(monthNumber, color));

// Event listener-үүд
calContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".fas");
  if (btn) {
    if (btn.classList.value.includes("right")) {
      if (monthNumber < 11) {
        monthNumber++;
        color++;
        render_months(monthNumber, color);
      }
    } else {
      if (monthNumber > 0) {
        monthNumber--;
        color--;
        render_months(monthNumber, color);
      }
    }
  }
});

document.addEventListener("keypress", function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    const searchString = document.getElementById("search").value;
    calContainer.innerHTML = "";
    searchByValue(searchString);
    document.getElementById("search").value = "";
  }
});



