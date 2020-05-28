(() => {
  const account = document.querySelector('.member-area .account-input');
  const password = document.querySelector('.member-area .password-input');
  const email = document.querySelector('.member-area .email-input');
  const name = document.querySelector('.member-area .name-input');

  const passwordCheck = document.querySelector(
    '.member-area .password-check-input'
  );

  const error = document.querySelectorAll('.member-area .error');
  const register = document.querySelector('.member-area .register');

  let passwordResult = false;
  let accountResult = false;
  let nameResult = false;
  let emailResult = false;

  function nameHandler() {
    //   test() 的執行會改變正則表達式 lastIndex屬性。
    //   連續的執行test()方法，後續的執行將會從 lastIndex 處開始匹配字符串
    //   所以要連續執行可每次都將正則表達式 lastIndex屬性設為0
    // 利用正規表達式，去篩選符合條件的資料
    let match = new RegExp(/^[A-Za-z0-9]{2,8}$/g);
    let data = this.value.toString();
    match.lastIndex = 0;
    // 判斷是否2位至8位任意英文或數字
    if (match.test(data)) {
      nameResult = true;
      error[0].style.display = 'none';
      name.style.border = 'solid 0.1rem rgba(23, 185, 120 ,0.5)';
    } else {
      nameResult = false;
      error[0].style.display = 'flex';
      name.style.border = 'solid 1px rgba(0, 0, 0, 0.35)';
    }
  }

  function emailHandler() {
    // emailRule = /^\w+((-\w+)|(\.\w+))+\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    // 利用正規表達式，去篩選符合條件的資料
    let match = new RegExp(/^\w+((-\w+)|(.\w+))+\@(\w+)+((\.|\-)(\w+))+$/g);
    let data = this.value.toString();
    console.log(match.test(data));
    match.lastIndex = 0;
    // 判斷是否開頭為一個以上任意數字英文而後可為一個以上'-(一個以上任意英文數字)'或'.(一個以上任意英文數字)'
    // (-,.不可連續出現)，而後中間需加上@，@後可為一個以上任意英文數字，而後結尾須為一個'.'或'-'組合一個以上任意英文數字
    if (match.test(data)) {
      emailResult = true;
      error[1].style.display = 'none';
      email.style.border = 'solid 0.1rem rgba(23, 185, 120 ,0.5)';
    } else {
      emailResult = false;
      error[1].style.display = 'flex';
      email.style.border = 'solid 1px rgba(0, 0, 0, 0.35)';
    }
  }

  function accountHandler() {
    // console.log(this.value);
    // 利用正規表達式，去篩選符合條件的資料
    let match = new RegExp(/^[A-Za-z]{1}[0-9]{7}$/g);
    let data = this.value.toString();
    // console.log(match.test(data));
    match.lastIndex = 0;
    // 判斷是否第一位為大小寫字母及後7位任意數字組合
    if (match.test(data)) {
      accountResult = true;
      error[2].style.display = 'none';
      account.style.border = 'solid 0.1rem rgba(23, 185, 120 ,0.5)';
    } else {
      accountResult = false;
      error[2].style.display = 'flex';
      account.style.border = 'solid 1px rgba(0, 0, 0, 0.35)';
    }
  }
  function passwordHandler() {
    let match = new RegExp(/^[A-Za-z0-9]{8}$/g);
    let data = this.value.toString();
    // 判斷是否第一位為大小寫字母及後7位任意數字組合
    match.lastIndex = 0;
    if (match.test(data)) {
      error[3].style.display = 'none';
      password.style.border = 'solid 0.1rem rgba(23, 185, 120 ,0.5)';
      passwordResult = true;
    } else {
      passwordResult = false;
      error[3].style.display = 'flex';
      password.style.border = 'solid 1px rgba(0, 0, 0, 0.35)';
    }
  }
  function loginHandler(params) {
    passwordResult && accountResult && emailResult && nameResult
      ? alert('註冊成功')
      : alert('註冊失敗');
  }
  account.addEventListener('blur', accountHandler);
  password.addEventListener('blur', passwordHandler);
  email.addEventListener('blur', emailHandler);
  name.addEventListener('blur', nameHandler);

  register.addEventListener('click', loginHandler);
})();
