(() => {
  // 更改領養經驗樣式
  const adoptProcess = document.querySelectorAll('.adopt-process');

  function storyDeatilTitleHandler(e) {
    const storyDeatilTitle = this.querySelector('.story-detail-title');
    console.log(storyDeatilTitle);
    const Title = storyDeatilTitle.querySelector('p');
    Title.classList.add('story-transtion');
  }
  function cancelStoryDeatilTitleHandler(e) {
    const storyDeatilTitle = this.querySelector('.story-detail-title');
    console.log(storyDeatilTitle);
    const Title = storyDeatilTitle.querySelector('p');
    Title.classList.remove('story-transtion');
  }
  adoptProcess.forEach(item => {
    item.addEventListener('mouseover', storyDeatilTitleHandler);
    item.addEventListener('mouseleave', cancelStoryDeatilTitleHandler);
  });
})();
