$(document).ready(function () {
  console.log("Ready");

  // 초기 상태 설정
  gsap.set(".letter", { opacity: 0 });

  // 첫 번째 텍스트 애니메이션
  gsap.to(".text-wrapper-8 .letter", {
    opacity: 1,
    duration: 0.5,
    stagger: 0.5, // 각 글자마다 0.5초 지연
  });

  // 두 번째 텍스트 애니메이션
  gsap.to(".text-wrapper-9 .letter", {
    opacity: 1,
    duration: 0.5,
    stagger: 0.5,
    delay: 1, // 첫 번째 애니메이션이 끝난 후 지연
  });

  // 세 번째 텍스트 애니메이션 및 화면 숨기기
  gsap.to(".text-wrapper-10 .letter", {
    opacity: 1,
    duration: 0.5,
    stagger: 0.4,
    delay: 3, // 두 번째 애니메이션 후 지연
    onComplete: function () {
      // 애니메이션이 끝난 후 실행
      gsap.to(".overlap-group-wrapper", {
        opacity: 0,
        duration: 1, // 화면 숨기기 애니메이션
        onComplete: function () {
          $(".overlap-group-wrapper").css("display", "none"); // 완전히 숨기기
        },
      });
    },
  });
});

$(document).ready(function () {
  var theLetters = "abcdefghijklmnopqrstuvwxyz#%&^+=-";
  var ctnt = "Banksy: Art Beyond Boundaries.";
  var speed = 50;
  var increment = 8;

  var clen = ctnt.length;
  var si = 0;
  var stri = 1;
  var block = "";
  var fixed = ctnt.charAt(0);

  (function rustle(i) {
    setTimeout(function () {
      if (--i) {
        rustle(i);
      }
      nextFrame(i);
      si = si + 1;
    }, speed);
  })(clen * increment + 1);

  function nextFrame(pos) {
    block = "";
    for (var i = 1; i < clen; i++) {
      if (i < stri) {
        block += ctnt.charAt(i);
      } else {
        var num = Math.floor(theLetters.length * Math.random());
        var letter = theLetters.charAt(num);
        block += letter;
      }
    }
    if (si == increment) {
      stri++;
      si = 0;
    }
    $("#output").html(fixed + block);

    if (stri === clen) {
      startCombinedAnimation(); // 애니메이션 동시에 시작
    }
  }

  function startCombinedAnimation() {
    let count = 0;
    let maxCount = 7;
    const loveText = document.querySelector(".LOVE-IN-PARADISE");

    // LOVE-IN-PARADISE 애니메이션
    function stampEffect() {
      count++;
      const randomX = Math.random() * (window.innerWidth - 300);
      const randomY = Math.random() * (window.innerHeight - 150);
      const randomScale = Math.random() * 2 + 0.5;

      gsap.set(loveText, {
        x: randomX,
        y: randomY,
        scale: randomScale,
        opacity: 0,
      });

      gsap.to(loveText, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(loveText, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
              if (count < maxCount) {
                stampEffect();
              }
            },
          });
        },
      });
    }

    // Torn 애니메이션
    function startTornAnimation() {
      gsap.to(".torn", {
        y: 400,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          document.querySelector(".torn").classList.add("tornAnimationEnd");
          showStampTextAnimation(); // 텍스트 애니메이션 시작
        },
      });
    }

    // LOVE-IN-PARADISE와 torn 애니메이션 동시에 시작
    stampEffect();
    startTornAnimation();
  }

  // 텍스트 애니메이션
  function showStampTextAnimation() {
    const textWrappers = [".text-wrapper-50", ".text-wrapper-60"];
    let delay = 0;

    textWrappers.forEach((selector) => {
      const element = document.querySelector(selector);

      gsap.set(element, {
        scale: 0.5,
        opacity: 0, // 초기 상태: 투명
      });

      gsap.to(element, {
        scale: 1,
        opacity: 1, // 애니메이션 중: 보이게
        duration: 1.5,
        delay: delay,
        ease: "back.out(1.7)", // 팡 튀어나오는 효과
      });

      delay += 1; // 각 텍스트마다 지연 시간 추가
    });
  }
});
