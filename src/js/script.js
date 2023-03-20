let mainEl = document.querySelector(".main");
const formEl = document.createElement("form");
const wrapper = document.createElement('div')
const USER_PER_PAGE = 10;
formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    // wrapper.innerHTML = ''
    const inputsValue = Object.fromEntries(new FormData(e.target));
  
    const response = await fetch(`
 https://api.github.com/search/repositories?q=${inputsValue.name}&per_page=${USER_PER_PAGE}
    `);
 
    if (response.ok) {
      const data = await response.json();   
      let arr = data.items
      
      createProfileEl(arr)
      mainEl.appendChild(wrapper);
      inputEl.value = '';
      if(data.total_count == '0') {
        alert("Ничего не найдено")}
    } else {
      alert("Cплошные ошибки")
    }
  
  })

const inputEl = document.createElement("input");
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name');
inputEl.setAttribute('required', '');
inputEl.setAttribute('minlength', '2')

const searchButtonEl = document.createElement('button')
searchButtonEl.classList.add('search-button');
searchButtonEl.setAttribute('type', 'submit');
searchButtonEl.innerHTML = "Поиск";

formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
mainEl.appendChild(formEl);

function createProfileEl(arr) {
   
for(let i = 0; i<arr.length; i++) {
    const element = document.createElement('div');
    element.classList.add('profile');
    element.innerHTML = `
    <img class="search-image" src=${arr[i].owner.avatar_url}></img>
    <p class="search-text"><span>Название репозитория: </span> <a href="${arr[i].html_url}" target="_blank">${arr[i].name}</a></p>
    <p class="search-text"><span>Видимость репозитория: </span>${arr[i].visibility
    }</p>
    <p class="search-text"><span>Forks: </span>${arr[i].forks}</p>
  `
  wrapper.appendChild(element)
}
   
  }
