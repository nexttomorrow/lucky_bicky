export const generateFortunePrompt = (userData, date) => {
  return `
당신은 전문 운세 상담가입니다. 
다음 정보를 바탕으로 오늘의 운세를 상세하게 작성해주세요:

- 이름: ${userData.name}
- 생년월일: ${userData.birthdate}
- 성별: ${userData.gender}
- 날짜: ${date}

다음 형식으로 운세를 작성해주세요:
1. 오늘의 총운 (100자 이내)
2. 금전운 (50자 이내)
3. 애정운 (50자 이내)
4. 건강운 (50자 이내)
5. 행운의 색상
6. 행운의 방향
7. 행운의 시간
8. 오늘의 조언 (50자 이내)

전문적이고 긍정적인 톤으로 작성해주시되, 지나치게 미신적이거나 비현실적인 내용은 피해주세요.
`;
}; 