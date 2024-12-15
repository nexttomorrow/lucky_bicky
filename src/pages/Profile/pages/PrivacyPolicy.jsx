import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack, IoChevronDown } from 'react-icons/io5';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('privacy');

  const sections = {
    privacy: {
      title: '개인정보 처리방침',
      content: [
        {
          title: '제1조 (개인정보의 처리목적)',
          items: [
            '① 회원 식별 및 본인확인, 회원가입 의사확인, 중복가입 방지, 부정이용 방지',
            '② 맞춤형 서비스 제공, 서비스 이용 기록 분석, 서비스 개선',
            '③ 구매 및 요금 결제, 환불, 서비스 이용 내역 관리',
            '④ 신규 서비스 개발, 이벤트 정보 및 참여기회 제공, 광고성 정보 제공'
          ]
        },
        {
          title: '제2조 (개인정보의 처리 및 보유기간)',
          text: '회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.',
          items: [
            '① 회원 가입 정보: 회원 탈퇴 시까지',
            '② 결제 및 구매 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)',
            '③ 서비스 이용 기록: 1년',
            '④ 마케팅 및 광고 활용 정보: 동의 철회 시까지'
          ]
        }
      ]
    },
    payment: {
      title: '결제 및 환불 정책',
      content: [
        {
          title: '제1조 (결제 방법 및 절차)',
          items: [
            '① 신용카드: 국내/외 모든 신용카드 결제 가능',
            '② 계좌이체: 실시간 계좌이체 및 무통장입금',
            '③ 간편결제: 카카오페이, 네이버페이, 토스 등',
            '④ 해외결제: VISA, MasterCard, UnionPay 등 가능'
          ]
        },
        {
          title: '제2조 (청약철회 및 환불)',
          items: [
            '① 구독 서비스 청약철회: 서비스 개시 후 7일 이내 전액 환불 가능',
            '② 중도해지: 잔여기간에 대한 일할 계산 후 환불 (위약금 없음)',
            '③ 작명 서비스: 작명 진행 전 100% 환불, 진행 후 환불 불가',
            '④ 환불 처리 기간: 청약철회 요청 후 3영업일 이내 처리'
          ]
        }
      ]
    },
    marketing: {
      title: '마케팅 정보 수신 동의',
      content: [
        {
          title: '1. 마케팅 활용 목적',
          items: [
            '새로운 서비스 및 이벤트 정보 제공',
            '맞춤형 광고 및 혜택 제공',
            '서비스 이용 통계 분석'
          ]
        },
        {
          title: '2. 수신 동의 항목',
          items: [
            '이메일 수신 동의',
            'SMS/MMS 수신 동의',
            '앱 푸시 알림 수신 동의'
          ]
        }
      ]
    },
    terms: {
      title: '이용약관',
      content: [
        {
          title: '제1조 (목적)',
          text: '이 약관은 주식회사 ○○○(이하 "회사"라 함)이 제공하는 모든 서비스(이하 "서비스"라 함)의 이용조건 및 절차, 회사와 회원 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.'
        },
        {
          title: '제2조 (용어의 정의)',
          items: [
            '① "서비스"란 회사가 제공하는 모든 서비스를 의미합니다.',
            '② "회원"이란 회사와 서비스 이용계약을 체결한 개인을 의미합니다.',
            '③ "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 설정하고 회사가 승인한 문자와 숫자의 조합을 의미합니다.'
          ]
        },
        {
          title: '제3조 (약관의 효력 및 변경)',
          items: [
            '① 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.',
            '② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.',
            '③ 약관 변경 시 시행일자 및 개정사유를 명시하여 현행약관과 함께 서비스 초기화면에 그 시행일자 7일 전부터 공지합니다.'
          ]
        }
      ]
    },
    rights: {
      title: '이용자의 권리와 의무',
      content: [
        {
          title: '제1조 (회원의 권리)',
          items: [
            '① 회원은 개인정보보호 관련 법령에 의거하여 자신의 개인정보를 열람, 정정, 삭제할 수 있습니다.',
            '② 회원은 언제든지 회원탈퇴를 통해 개인정보 이용에 대한 동의를 철회할 수 있습니다.',
            '③ 회원은 서비스 이용과 관련하여 고객지원을 요청할 수 있습니다.',
            '④ 회원은 회사의 서비스 이용과 관련하여 관련 법령 및 이 약관의 규정을 준수하여야 합니다.'
          ]
        },
        {
          title: '제2조 (회원의 의무)',
          items: [
            '① 회원은 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다.',
            '   - 타인의 정보도용 및 부정한 행위',
            '   - 회사의 서비스를 이용하여 얻은 정보를 회사의 사전승낙 없이 복제, 유통, 상업적 이용하는 행위',
            '   - 서비스의 안정적 운영을 방해하는 행위',
            '   - 타인의 명예를 손상시키거나 불이익을 주는 행위'
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white pt-2">
      <div className="flex items-center px-4 py-3 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-gray-50 rounded-full"
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">약관 및 정책</h1>
      </div>

      <div className="px-4 py-4 space-y-3">
        {Object.entries(sections).map(([key, section]) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className="w-full text-left"
          >
            <div className={`p-4 rounded-xl border transition-colors ${
              activeSection === key 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-100 hover:border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{section.title}</span>
                <IoChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                  activeSection === key ? 'transform rotate-180' : ''
                }`} />
              </div>
              
              {activeSection === key && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-6">
                  {section.content.map((item, index) => (
                    <div key={index} className="text-left">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      {item.text && (
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                          {item.text}
                        </p>
                      )}
                      {item.items && (
                        <ul className="space-y-2">
                          {item.items.map((subItem, subIndex) => (
                            <li 
                              key={subIndex}
                              className="text-sm text-gray-600 leading-relaxed flex items-start"
                            >
                              <span className="mr-2 text-primary">•</span>
                              <span className="flex-1">{subItem}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy; 