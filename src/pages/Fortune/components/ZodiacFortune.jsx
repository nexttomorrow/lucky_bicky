import { useState } from 'react';
import ZodiacDetailModal from '../../../components/modals/ZodiacDetailModal';

const ZodiacFortune = () => {
  const [selectedZodiac, setSelectedZodiac] = useState(null);

  const zodiacSigns = [
    { id: 'rat', name: '쥐', emoji: '🐀', year: '2020, 2008, 1996, 1984', 
      summary: '새로운 기회가 찾아올 수 있는 날입니다.',
      yearlyFortune: {
        '2020': '창의력이 돋보이는 시기입니다. 예체능 활동에서 특히 두각을 나타낼 수 있어요.',
        '2008': '학업운이 매우 좋은 해입니다. 집중력이 높아질 수 있어요.',
        '1996': '새로운 도전과 변화가 필요한 시기입니다. 적극적인 자세로 임하면 좋은 결과가 있을 거예요.',
        '1984': '사업과 학업에서 큰 발전이 기대되는 해입니다. 특히 3월과 9월에 좋은 기회가 올 수 있어요.'
      },
      details: {
        luck: '행운이 가득한 하루가 될 것 같아요',
        love: '소중한 인연과의 만남이 기대됩니다',
        money: '재물운이 상승하는 시기입니다',
        health: '건강관리에 신경 쓰면 좋겠어요'
      }
    },
    { id: 'ox', name: '소', emoji: '🐂', year: '2021, 2009, 1997, 1985',
      summary: '꾸준한 노력이 결실을 맺을 수 있습니다.',
      details: {
        luck: '차분하게 계획을 세워보세요',
        love: '마음의 여유를 가지면 좋겠어요',
        money: '안정적인 수입이 예상됩니다',
        health: '규칙적인 생활이 도움이 될 거예요'
      }
    },
    { id: 'tiger', name: '호랑이', emoji: '🐅', year: '2022, 2010, 1998, 1986',
      summary: '도전적인 시도가 행운을 가져올 수 있어요.',
      details: {
        luck: '적극적인 태도가 행을 부를 거예요',
        love: '새로운 만남이 기대됩니다',
        money: '과감한 투자가 성공할 수 있어요',
        health: '활동적인 운동이 도움될 거예요'
      }
    },
    { id: 'rabbit', name: '토끼', emoji: '🐇', year: '2023, 2011, 1999, 1987',
      summary: '신중한 판단이 좋은 결과를 가져올 수 있습니다.',
      details: {
        luck: '직감을 믿으면 좋은 결과가 있을 거예요',
        love: '진실된 마음이 통할 수 있어요',
        money: '계획적인 소비가 필요해요',
        health: '충분한 휴식을 취하세요'
      }
    },
    { id: 'dragon', name: '용', emoji: '🐉', year: '2024, 2012, 2000, 1988',
      summary: '큰 성과를 이룰 수 있는 날입니다.',
      details: {
        luck: '당신의 능력을 발휘할 때예요',
        love: '자신감 있는 모습이 매력적일 거예요',
        money: '의미 있는 투자 기회가 있어요',
        health: '긍정적인 마인드가 건강에 도움돼요'
      }
    },
    { id: 'snake', name: '뱀', emoji: '🐍', year: '2013, 2001, 1989, 1977',
      summary: '지혜로운 선택이 필요한 시기입니다.',
      details: {
        luck: '신중한 결정이 행운을 가져올 거예요',
        love: '깊이 있는 대화가 필요해요',
        money: '장기적인 계획을 세워보세요',
        health: '마음의 안정이 중요해요'
      }
    },
    { id: 'horse', name: '말', emoji: '🐎', year: '2014, 2002, 1990, 1978',
      summary: '활기찬 에너지가 넘치는 하루입니다.',
      details: {
        luck: '적극적인 행동이 기회를 만들어요',
        love: '열정적인 만남이 기대돼요',
        money: '새로운 수입원이 생길 수 있어요',
        health: '야외 활동이 도움될 거예요'
      }
    },
    { id: 'sheep', name: '양', emoji: '🐑', year: '2015, 2003, 1991, 1979',
      summary: '평화로운 하루가 될 것 같습니다.',
      details: {
        luck: '조화로운 관계가 행운을 가져와요',
        love: '따뜻한 마음이 통할 거예요',
        money: '안정적인 수입이 유지돼요',
        health: '편안한 휴식이 필요해요'
      }
    },
    { id: 'monkey', name: '원숭이', emoji: '🐒', year: '2016, 2004, 1992, 1980',
      summary: '창의적인 아이디어가 빛을 발할 수 있어요.',
      details: {
        luck: '독창적인 생각이 행운을 부를 거예요',
        love: '재치 있는 대화가 매력적이에요',
        money: '새로운 시도가 이익이 될 수 있어요',
        health: '유���한 사고가 스트레스 해소에 좋아요'
      }
    },
    { id: 'rooster', name: '닭', emoji: '🐓', year: '2017, 2005, 1993, 1981',
      summary: '자신감이 빛나는 하루가 될 것 같아요.',
      details: {
        luck: '당당한 모습이 행운을 가져와요',
        love: '적극적인 표현이 좋은 결과를 만들어요',
        money: '성실한 노력이 보상받을 거예요',
        health: '규칙적인 생활이 중요해요'
      }
    },
    { id: 'dog', name: '개', emoji: '🐕', year: '2018, 2006, 1994, 1982',
      summary: '신뢰와 우정이 빛나는 날입니다.',
      details: {
        luck: '진실된 마음이 행운을 가져와요',
        love: '믿음직한 모습이 매력적일 거예요',
        money: '안정적인 재운이 예상돼요',
        health: '친구와의 운동이 도움될 거예요'
      }
    },
    { id: 'pig', name: '돼지', emoji: '🐖', year: '2019, 2007, 1995, 1983',
      summary: '풍요로운 하루가 될 것 같습니다.',
      details: {
        luck: '넉넉한 마음이 행운을 부를 거예요',
        love: '따뜻한 배려가 사랑을 키워요',
        money: '여유로운 재운이 함께해요',
        health: '즐거운 마음이 건강에 좋아요'
      }
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="grid grid-cols-3 gap-4">
        {zodiacSigns.map((zodiac) => (
          <button
            key={zodiac.id}
            onClick={() => setSelectedZodiac(zodiac)}
            className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="text-3xl mb-2">{zodiac.emoji}</div>
            <div className="font-medium text-sm">{zodiac.name}띠</div>
          </button>
        ))}
      </div>

      <ZodiacDetailModal
        isOpen={!!selectedZodiac}
        onClose={() => setSelectedZodiac(null)}
        zodiac={selectedZodiac}
      />
    </div>
  );
};

export default ZodiacFortune; 