(() => {
  const account = document.querySelector('.member-area .account-input');
  const password = document.querySelector('.member-area .password-input');
  const passwordCheck = document.querySelector(
    '.member-area .password-check-input'
  );
  const error = document.querySelectorAll('.member-area .error');
  const login = document.querySelector('.member-area .login');
  console.log(error);
  let passwordResult = false;
  let accountResult = false;

  function accountHandler() {
    // console.log(this.value);
    // 利用正規表達式，去篩選符合條件的資料
    let match = new RegExp(/^[A-Za-z]{1}[0-9]{7}$/g);
    let data = this.value.toString();
    // console.log(match.test(data));
    // match.lastIndex = 0;
    // 判斷是否第一位為大小寫字母及後7位任意數字組合
    if (match.test(data)) {
      accountResult = true;
      error[0].style.display = 'none';
      account.style.border = 'solid 0.1rem rgba(23, 185, 120 ,0.5)';
      //   console.log(123);
    } else {
      accountResult = false;
      error[0].style.display = 'flex';
      account.style.border = 'solid 1px rgba(0, 0, 0, 0.35)';
    }
  }
  function passwordHandler() {
    let match = new RegExp(/^[A-Za-z0-9]{8}$/g);
    let data = this.value.toString();
    // 判斷是否第一位為大小寫字母及後7位任意數字組合
    if (match.test(data)) {
      error[1].style.display = 'none';
      password.style.border = 'solid 0.1rem rgba(23, 185, 120 ,0.5)';
      //   console.log(123);
      passwordResult = true;
    } else {
      passwordResult = false;
      error[1].style.display = 'flex';
      password.style.border = 'solid 1px rgba(0, 0, 0, 0.35)';
    }
  }
  //   function passwordCheckHandler(password) {
  //     console.log(this.value);
  //     console.log(password);
  //     console.log(this.value == password);
  //     if (this.value == password) {
  //       error[2].style.display = 'none';
  //       passwordCheck.style.border = 'solid 0.1rem rgba(23, 185, 120 ,0.5)';
  //       //   console.log(123);
  //     } else {
  //       error[2].style.display = 'flex';
  //       passwordCheck.style.border = 'solid 1px rgba(0, 0, 0, 0.35)';
  //     }
  //   }
  function loginHandler() {
    passwordResult && accountResult && passwordCheck.value == password.value
      ? alert('登入成功')
      : alert('登入失敗');
  }
  account.addEventListener('blur', accountHandler);
  password.addEventListener('blur', passwordHandler);
  login.addEventListener('click', loginHandler);
})();
