const changeBackground = () => {
  const arrayBackground = [
    {
      background: `linear-gradient(123deg, #fffcac 0%, #ffffff 67%),
    linear-gradient(180deg, #d8d8d8 0%, #6b0000 100%),
    linear-gradient(
      142deg,
      #f9f5f0 0%,
      #f9f5f0 33%,
      #f2ead3 calc(33% + 1px),
      #f2ead3 56%,
      #f4991a calc(56% + 1px),
      #f4991a 62%,
      #321313 calc(62% + 1px),
      #321313 100%
    )`,
      backgroundBlendMode: `multiply, overlay, normal`,
    },
    {
      background: `linear-gradient(120deg, #FFFFFF 0%, #FF006B 100%), linear-gradient(235deg, #FFFFFF 0%, #FF006B 100%), linear-gradient(235deg, #FFFFFF 0%, #000000 100%), linear-gradient(90deg, #FFE037 0%, #FFE037 40%, #1DCD9F 40%, #1DCD9F 50%, #088C6F 50%, #088C6F 70%, #23033C 70%, #23033C 100%)`,
      backgroundBlendMode: `overlay, overlay, overlay, normal`,
    },
    {
      background: `linear-gradient(123deg, #2E99B0 0%, #2E99B0 40%, #FCD77F calc(40% + 1px), #FCD77F 60%, #FF2E4C calc(60% + 1px), #FF2E4C 75%, #1E1548 calc(75% + 1px), #1E1548 100%)`,
    },
    {
      background: `linear-gradient(123deg, #461B93 0%, #461B93 40%, #6A3CBC calc(40% + 1px), #6A3CBC 60%, #8253D7 calc(60% + 1px), #8253D7 70%, #F78F1E calc(70% + 1px), #F78F1E 100%)`,
    },

    {
      background: `linear-gradient(60deg, #2B2E4A 0%, #2B2E4A 30%, #E84545 calc(30% + 1px), #E84545 60%, #903749 calc(60% + 1px), #903749 70%, #53354A calc(70% + 1px), #53354A 100%)`,
    },
    {
      background: `linear-gradient(70deg, #F9ED69 0%, #F9ED69 40%, #F08A5D calc(40% + 1px), #F08A5D 60%, #B83B5E calc(60% + 1px), #B83B5E 70%, #6A2C70 calc(70% + 1px), #6A2C70 100%)`,
    },
    {
      background: `linear-gradient(40deg, #155263 9%, #155263 43%, #FF6F3C calc(43% + 1px), #FF6F3C 52%, #FF9A3C calc(52% + 1px), #FF9A3C 80%, #FFC93C calc(80% + 1px), #FFC93C 100%)`,
    },
    {
      background: `linear-gradient(55deg, #212121 0%, #212121 40%, #323232 calc(40% + 1px), #323232 60%, #008F95 calc(60% + 1px), #008F95 70%, #14FFEC calc(70% + 1px), #14FFEC 100%)`,
    },
    {
      background: `linear-gradient(288deg, #FFB6B9 0%, #FFB6B9 35%, #FAE3D9 calc(35% + 1px), #FAE3D9 45%, #BBDED6 calc(45% + 1px), #BBDED6 65%, #61C0BF calc(65% + 1px), #61C0BF 100%)`,
    },
    {
      background: `linear-gradient(110deg, #FFD9E8 4%, #FFD9E8 40%, #DE95BA calc(40% + 1px), #DE95BA 50%, #7F4A88 calc(50% + 1px), #7F4A88 70%, #4A266A calc(70% + 1px), #4A266A 100%)`,
    },
    {
      background: `linear-gradient(90deg, #00F0FF 0%, #00F0FF 40%, #0017E3 40%, #0017E3 60%, #000F8F 60%, #000F8F 70%, #00073F 70%, #00073F 100%)`,
    },
    {
      background: `linear-gradient(56deg, rgb(255, 180, 172) 0%, rgb(255, 180, 172) 40%, rgb(103, 145, 134) calc(40% + 1px), rgb(103, 145, 134) 50%, rgb(38, 78, 112) calc(50% + 1px), rgb(38, 78, 112) 70%, rgb(255, 235, 211) calc(70% + 1px), rgb(255, 235, 211) 100%)`,
    },
    {
      background: `linear-gradient(65deg, rgb(7, 26, 82) 3%, rgb(7, 26, 82) 40%, rgb(8, 105, 114) calc(40% + 1px), rgb(8, 105, 114) 60%, rgb(23, 185, 120) calc(60% + 1px), rgb(23, 185, 120) 68%, rgb(167, 255, 131) calc(68% + 1px), rgb(167, 255, 131) 100%)`,
    },
    {
      background: `linear-gradient(45deg, #C7F5FE 10%, #C7F5FE 40%, #FCC8F8 40%, #FCC8F8 60%, #EAB4F8 60%, #EAB4F8 65%, #F3F798 65%, #F3F798 90%)`,
    },
  ];

  const randombaCkground = Math.floor(Math.random() * arrayBackground.length);

  // console.log(randombaCkground);
  localStorage.setItem(
    "background",
    JSON.stringify(arrayBackground[randombaCkground])
  );
  return arrayBackground[randombaCkground];
};

export default changeBackground;
