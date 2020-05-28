(() => {
  // 初始頁面
  let page = 1;
  let currentPage = 1;
  const pageControls = document.querySelectorAll('.bottom-area li');
  const pageSwitch = document.querySelectorAll('.bottom-area li a');

  let videodata = null;
  // 拿來裝頁面資料
  const pageDatas = document.querySelector('section .content .content-area');
  // 獲取資料
  (function() {
    fetch('./data/example.json')
      .then(res => res.json())
      .then(data => (videodata = data));
  })();
  let i = 1;
  const contents = document.querySelectorAll('.content-region');
  contents.forEach(item => {
    i++;
    i % 2 == 0
      ? (item.style.backgroundColor = '#27296d') &&
        (item.style.color = '#fff6f6')
      : (item.style.backgroundColor = '#ffaa64') &&
        (item.style.color = '#0e3150');
    // console.log(i);
  });
  // 下一頁上一頁
  function pageControlsHandler(e) {
    // 先移除所有active
    const pageUl = this.parentNode.parentNode.querySelector('ul');
    // console.log(pageUl);
    const pageLi = pageUl.querySelectorAll('li');
    pageLi.forEach(item => {
      item.classList.remove('active');
    });
    // console.log(currentPage);

    if (this.className == '1') {
      page = 1;
      currentPage = page;
      pageLi[currentPage].classList.add('active');
      pageSwitchHandler(currentPage);
    }
    if (this.className == '2') {
      page = 2;
      currentPage = page;
      pageLi[currentPage].classList.add('active');
      pageSwitchHandler(currentPage);
    }
    if (this.className == '3') {
      page = 3;
      currentPage = page;
      pageLi[currentPage].classList.add('active');
      pageSwitchHandler(currentPage);
    }
    if (this.className == 'prev') {
      if (page > 1 && page < 4) {
        page--;
        currentPage = page;
        pageLi[currentPage].classList.add('active');
        pageSwitchHandler(currentPage);
      } else {
        currentPage = page;
        pageLi[currentPage].classList.add('active');
        pageSwitchHandler(currentPage);
      }
    }
    if (this.className == 'next') {
      if (page > 0 && page < 3) {
        page++;
        currentPage = page;
        pageLi[currentPage].classList.add('active');
        pageSwitchHandler(currentPage);
      } else {
        currentPage = page;
        pageLi[currentPage].classList.add('active');
        pageSwitchHandler(currentPage);
      }
    }
  }
  // 頁面處理
  function pagesMatch(current, videodata) {
    return (datas = videodata.filter(data => {
      // 比對資料
      return data.page == current;
    }));
  }
  // 處理資料
  // function filterHandler() {
  //   let page = document.querySelectorAll('.bottom-area li a');
  //   let pages = page.forEach(item => {
  //     return item.text;
  //   });

  //   return (data = pagesMatch(pages, videodata));
  // }

  // 頁面處理
  function pageSwitchHandler(currentPage) {
    let current = currentPage;
    console.log(current);
    pagesMatch(current, videodata);
    console.log(datas);
    const html = datas
      .map(data => {
        // 最後回傳符合條件
        return `
      <div class="content-region">
      <div class="row">
          <div class="col-lg-6 col-md-12 col-sm-12 content-area">
              <div class="title">
                  <p>${data.title}</p>
              </div>
              <div class="content-detail">
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, asperiores totam!
                      Necessitatibus nobis facilis dolorem aliquam itaque aspernatur nisi dicta, veniam odio
                      molestias corrupti facere impedit, <a href="#">safkgs</a> voluptatem quos adipisci
                      accusantium.</p>
              </div>
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12 videos">
              <div class="iframe-rwd">
                  <iframe src="${data.src}" frameborder="0" allowfullscreen
                      class="img-fluid"></iframe>
              </div>
          </div>
      </div>                  
      </div>
  `;
      })
      .join('');
    // console.log(html);
    pageDatas.innerHTML = html;
    // 隔行變色
    let i = 1;
    const contents = document.querySelectorAll('.content-region');
    contents.forEach(item => {
      i++;
      i % 2 == 0
        ? (item.style.backgroundColor = '#27296d') &&
          (item.style.color = '#fff6f6')
        : (item.style.backgroundColor = '#ffaa64') &&
          (item.style.color = '#0e3150');
      // console.log(i);
    });
  }

  pageControls.forEach(item => {
    item.addEventListener('click', pageControlsHandler);
  });
  pageSwitch.forEach(item => {
    item.addEventListener('click', pageSwitchHandler);
  });
})();
