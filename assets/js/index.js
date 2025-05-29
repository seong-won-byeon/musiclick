const tabSwiper = new Swiper('.tab-swiper', {
  slidesPerView: 'auto',
  spaceBetween: 8,
});


$('.tab-swiper .tab-item a').click(function (e) {
  e.preventDefault();
  var index = $(this).parent('li').index();
  var goIndex = (index <= 3) ? 0 :index;
  // 탭에 .on 클래스 수동 적용
  $('.tab-swiper .tab-item').removeClass('on');
  $(this).parent().addClass('on');

  // 슬라이드 이동
  tabSwiper.slideTo(goIndex, 300);
});







// 메인 배너슬라이드
const swiper = new Swiper('.banner', {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    // 320~542px → spaceBetween: 12
    0: {
      spaceBetween: 12,
    },
    // 543px 이상 → spaceBetween: 16
    543: {
      spaceBetween: 16,
    },
  },
});



// 살짝 먼저 들어볼까요
const prevSwiper = new Swiper('.prev-swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  speed: 350,  // 350ms → 0.35초 동안 슬라이드 이동
  loopAdditionalSlides: 1,
});


// 편하게 들어보세요
const recommSwiper = new Swiper('.recomm-swiper', {
  direction: 'horizontal',
  loop: false,
  speed: 350,  // 350ms → 0.35초 동안 슬라이드 이동
  loopAdditionalSlides: 1,
  loop: true,
  slidesPerView: 1,
});



// 메인 hotpick 슬라이드
const hotSwiper = new Swiper('.hot-swiper', {
  initialSlide: 0,
  slidesPerView: 2,
  slidesPerGroup: 1,
  loop:true,
  spaceBetween: 12,
  loopAdditionalSlides: 3,
});




document.addEventListener('DOMContentLoaded', () => {

  // 플로팅 버튼클릭시 최상단 이동
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  // 메인 탭메뉴 클릭시 스타일
  const tabButtons = document.querySelectorAll('.tab');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
    });
  });



  // 상세 가사 더보기 클릭시
  const togglelyrics = document.getElementById('togglelyrics');
  const lyrics = document.getElementById('lyrics');

  if (togglelyrics && lyrics) {
    togglelyrics.addEventListener('click', () => {
      const isOpen = lyrics.classList.toggle('open');
      togglelyrics.textContent = isOpen ? '가사 접기' : '가사 더보기';
    });
  }



  // 상세 주의사항 더보기 클릭시
  const noticeList = document.getElementById('noticeList');
  const toggleNotice = document.getElementById('toggleNotice');

  if (toggleNotice && toggleNotice) {
    toggleNotice.addEventListener('click', () => {
      const isOpen = noticeList.classList.toggle('open');
      toggleNotice.textContent = isOpen ? '주의사항 접기' : '주의사항 더보기';
    });
  }  



  // 상세 컨트롤러 토글
  const controller = document.querySelector('.controller');
  const iconImg = document.querySelector('.icon img');

  if(controller && iconImg) {
    controller.addEventListener('click', () => {
      controller.classList.toggle('active');
  
      // 이미지 교체
      const isActive = controller.classList.contains('active');
      iconImg.src = isActive
        ? '../assets/img/ico-pause.svg'
        : '../assets/img/ico-play.svg';
    });
  }
  



  // 고객센터 FAQ 아코디언 
  const headers = document.querySelectorAll('.ac-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });



  // 고객센터 바텀시트
  const openBtn = document.querySelector(".btn-contact"); 
  const bottomSheet = document.getElementById("bottomSheet");
  const closeBtn = document.getElementById("btnClose"); 
  const backdrop = document.getElementById("dimmed"); 
  const textarea = document.getElementById("defaultTextarea"); 
  const charCount = document.getElementById("charCount"); 
  const bodyCont = document.body;

  // 바텀시트 열기
  if(openBtn && bottomSheet && closeBtn && backdrop && textarea && charCount) {
    openBtn.addEventListener("click", () => {
      bottomSheet.classList.add("show");
      backdrop.classList.add("show");
      
      // body 고정
      const scrollY = window.scrollY;
      bodyCont.style.top = `-${scrollY}px`;
      bodyCont.classList.add("fixed");
      bodyCont.dataset.scrollY = scrollY;
    });
  
    // 바텀시트 닫기 (닫기 버튼)
    closeBtn.addEventListener("click", () => {
      bottomSheet.classList.remove("show");
      backdrop.classList.remove("show");

      // body 복원
      const scrollY = bodyCont.dataset.scrollY || 0;
      bodyCont.classList.remove("fixed");
      bodyCont.style.top = "";
      window.scrollTo(0, scrollY);
    });

  }






  // select box 드롭다운
  const customSelect = document.getElementById('customSelect');
  const dropdownList = customSelect.querySelector('.dropdown-list');
  const placeholder = customSelect.querySelector('.placeholder');
  const options = dropdownList.querySelectorAll('li');
  const hiddenInput = document.getElementById('inquiryType');

  // 셀렉트 클릭 시 드롭다운 토글
  customSelect.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
    customSelect.classList.toggle('focus');
  });

  // 옵션 선택
  options.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedValue = option.textContent;

      // 선택값 표시
      placeholder.textContent = selectedValue;
      placeholder.classList.add('selected');
      hiddenInput.value = selectedValue;

      // 선택 스타일 적용
      options.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');

      // 드롭다운 닫기
      dropdownList.style.display = 'none';
      customSelect.classList.remove('focus');
    });
  });

  // 바깥 클릭 시 닫기
  document.addEventListener('click', () => {
    dropdownList.style.display = 'none';
    customSelect.classList.remove('focus');
  });



  

  // textarea
  const customText = document.getElementById("customText");

  textarea.addEventListener("focus", () => {
    customText.classList.add("focus");
  });

  textarea.addEventListener("blur", () => {
    customText.classList.remove("focus");
  });

  textarea.addEventListener("input", () => {
    charCount.textContent = `${textarea.value.length}/200`;
  });
  // 글자 수 세기
  textarea.addEventListener("input", () => {
    charCount.textContent = textarea.value.length;
  });






  // 이메일 input
  const input = document.getElementById('useremail');
  const customInput = document.getElementById('customInput');

  input.addEventListener('focus', () => {
    customInput.classList.add('focus');
  });

  input.addEventListener('blur', () => {
    customInput.classList.remove('focus');
  });









});






