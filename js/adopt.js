(() => {
  // 更改領養經驗樣式
  const dropMenus = document.querySelectorAll('#filter .dropdown-menu a');
  // 獲取要放資料的row
  const dogResult = document.querySelector('.adopt-result .row');
  // 獲取要放詳情的row
  const dogDetail = document.querySelector('.modal-dialog .modal-content');
  let dogDatas = null;
  let filterArray = null;

  // 獲取資料
  const getData = (function() {
    fetch('./data/dog.json')
      .then(res => res.json())
      .then(data => (dogDatas = data));
  })();

  // 移入條件樣式改變
  function mouseoverHandler() {
    // console.log('enter');
    this.classList.add('active');
    this.addEventListener('mouseleave', cancelDropmenueHandler);
  }
  function cancelDropmenueHandler() {
    this.classList.remove('active');
  }
  // 當選擇條件，drop標會跟著改變
  function dropMenuClickHandler() {
    // console.log(this);
    // 獲取父層
    const dropTitle = this.parentNode.parentNode.parentNode.querySelector(
      '#filter .dropdown .nav-link'
    );
    dropTitle.text = this.text;
  }
  // 處理設定好條件的資料，並回傳
  function dogsMatches(options, dogDatas) {
    return dogDatas.filter(data => {
      // 比對資料
      return (
        // 資料預設為全部，如果有符合則回傳符合
        (options.type == '全部' || data.type === options.type) &&
        (options.breed == '全部' || data.breed === options.breed) &&
        (options.age == '全部' || data.agesDetail === options.age) &&
        (options.weight == '全部' || data.weightDeatil === options.weight) &&
        data.sex
      );
    });
  }
  // 類型篩選
  // function typeMatches(type, dogDatas) {
  //   return dogDatas.filter(data => data.type === type);
  // }

  // 過濾資料
  function filterHandler() {
    let options = {
      // 加上trim去空白，防呆機制
      type: document.querySelectorAll('#filter .nav-link')[0].text.trim(),
      breed: document.querySelectorAll('#filter .nav-link')[1].text.trim(),
      age: document.querySelectorAll('#filter .nav-link')[2].text.trim(),
      weight: document.querySelectorAll('#filter .nav-link')[3].text.trim()
    };
    // 將我們所選擇的條件(第一個參數)，及全部的資料(第二個參數)，傳入函數並進行過濾
    console.log(options);
    return (data = dogsMatches(options, dogDatas));
  }

  // 顯示狗狗
  function dogsHandler() {
    // 獲取當前所選擇的條件(四大種)
    filterHandler();
    console.log(data);
    const html = data
      .map(type => {
        const dogData = `
      <div class="result-img">
          <img src="${type.img}" alt="" class="img-fluid">
      </div>
      <div class="result-name">
          <h2>${type.name}</h2>
      </div>
      `;
        console.log(type);

        // 最後回傳符合條件
        return `
      <div class="dog-data col-lg-3 col-md-4 col-sm-6">
      <div class="result-item">
      ${dogData}
      <div class="result-more">
      <a data-toggle="modal" href="#dog-detail">多了解我</a>
      </div>
      </div>
      </div>
    `;
      })
      .join('');
    // console.log(html);
    dogResult.innerHTML = html;
    // 更多詳情
    setTimeout(() => {
      const moreDeatils = document.querySelectorAll('.result-more a');
      moreDeatils.forEach(item => {
        item.addEventListener('click', moreDetailHandler);
      });
    }, 10);
    // 顯示詳情
    function moreDetailHandler() {
      // console.log(this);
      filterHandler();
      // 獲取當前狗狗圖片
      const dogdata1 = this.parentNode.parentNode.querySelector(
        '.result-img img'
      );
      // 獲取當前狗狗名字
      const dogdata2 = this.parentNode.parentNode.querySelector(
        '.result-name h2'
      );
      console.log(data);
      // 拿當前狗狗資料，去跟資料庫符合條件的資料比對，並回傳
      const dogdatas = data
        .map(dog => {
          if (dog.name === dogdata2.innerHTML) {
            return dog;
          }
        })
        .find(dog => {
          if (dog) {
            return dog;
          }
        });
      console.log(dogdatas);
      console.log(dogdatas[4]);
      const html2 = `
          <div class="col-lg-5 col-md-5 col-sm-12 modal-image-area">
          <div class="modal-image">
          <img src="${dogdatas.img}" alt="" class="img-fluid">  
          </div>
      </div>
      <div class="col-lg-5 col-md-5 col-sm-6">
          <div class="modal-image-detail ">
              <h3>名字: ${dogdatas.name} </h3>
              <p>性別 : ${dogdatas.sex}</p>
              <p>年齡 : ${dogdatas.ages}</p>
              <p>品種 : ${dogdatas.breed}</p>
              <p>體重 : ${dogdatas.weight}</p>
          </div>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-6">
      <div class="modal-detail container-fluid">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quae pariaturam, dolore,
              exceptuotam officia quidem unde.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ex
              quae
              pariaturam, dolore,
              exceptuotam officia quidem unde.</p>
      </div>
      </div>
        <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
        `;
      dogDetail.innerHTML = html2;
    }
  }
  // 對下拉選項增加監聽事件
  dropMenus.forEach(item => {
    item.addEventListener('mouseover', mouseoverHandler);
    item.addEventListener('click', dropMenuClickHandler);
    item.addEventListener('click', dogsHandler);
  });
})();
