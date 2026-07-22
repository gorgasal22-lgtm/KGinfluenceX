import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Lang = 'ka' | 'en' | 'ru' | 'tr' | 'zh' | 'hi'
interface LangContextType { lang: Lang; setLang: (l: Lang) => void }

const LangContext = createContext<LangContextType>({ lang: 'ka', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ka')

  useEffect(() => {
    const saved = localStorage.getItem('kg_lang') as Lang
    if (saved && ['ka','en','ru','tr','zh','hi'].includes(saved)) setLangState(saved)
  }, [])

  const setLang = (l: Lang) => { 
    setLangState(l); 
    localStorage.setItem('kg_lang', l) 
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

export const NAV_LABELS: Record<Lang, Record<string, string>> = {
  ka: { dashboard:'მთავარი', campaigns:'კამპანიები', influencers:'ინფლუენსერები', brands:'ბრენდები', content:'კონტენტი', analytics:'Analytics', academy:'AI გენერაცია', academyPage:'Academy', settings:'პარამეტრები', aiStudio:'AI Studio', logout:'გამოსვლა', search:'ძებნა...', messages:'შეტყობინებები', payments:'გადახდები', workspace:'WORKSPACE', aitools:'AI TOOLS', system:'SYSTEM', kgcoin:'KGCOIN', team:'გუნდი', matches:'Matches', profile:'ჩემი პროფილი' },
  en: { dashboard:'Dashboard', campaigns:'Campaigns', influencers:'Influencers', brands:'Brands', content:'Content', analytics:'Analytics', academy:'AI Generation', academyPage:'Academy', settings:'Settings', aiStudio:'AI Studio', logout:'Sign out', search:'Search...', messages:'Messages', payments:'Payments', workspace:'WORKSPACE', aitools:'AI TOOLS', system:'SYSTEM', kgcoin:'KGCOIN', team:'Team', matches:'Matches', profile:'My Profile' },
  ru: { dashboard:'Главная', campaigns:'Кампании', influencers:'Инфлюенсеры', brands:'Бренды', content:'Контент', analytics:'Аналитика', academy:'AI Генерация', academyPage:'Academy', settings:'Настройки', aiStudio:'AI Studio', logout:'Выйти', search:'Поиск...', messages:'Сообщения', payments:'Платежи', workspace:'WORKSPACE', aitools:'AI TOOLS', system:'СИСТЕМА', kgcoin:'KGCOIN', team:'Команда', matches:'Matches', profile:'Мой профиль' },
  tr: { dashboard:'Ana Sayfa', campaigns:'Kampanyalar', influencers:'Influencerlar', brands:'Markalar', content:'İçerik', analytics:'Analitik', academy:'AI Üretim', academyPage:'Academy', settings:'Ayarlar', aiStudio:'AI Studio', logout:'Çıkış', search:'Ara...', messages:'Mesajlar', payments:'Ödemeler', workspace:'WORKSPACE', aitools:'AI TOOLS', system:'SİSTEM', kgcoin:'KGCOIN', team:'Ekip', matches:'Eşleşmeler', profile:'Profilim' },
  zh: { dashboard:'主页', campaigns:'活动', influencers:'网红', brands:'品牌', content:'内容', analytics:'分析', academy:'AI生成', academyPage:'学院', settings:'设置', aiStudio:'AI工作室', logout:'退出', search:'搜索...', messages:'消息', payments:'支付', workspace:'工作区', aitools:'AI工具', system:'系统', kgcoin:'KGCOIN', team:'团队', matches:'匹配', profile:'我的主页' },
  hi: { dashboard:'होम', campaigns:'अभियान', influencers:'इन्फ्लुएंसर', brands:'ब्रांड', content:'सामग्री', analytics:'विश्लेषण', academy:'AI जनरेशन', academyPage:'अकादमी', settings:'सेटिंग', aiStudio:'AI स्टूडियो', logout:'साइन आउट', search:'खोजें...', messages:'संदेश', payments:'भुगतान', workspace:'कार्यक्षेत्र', aitools:'AI टूल्स', system:'सिस्टम', kgcoin:'KGCOIN', team:'टीम', matches:'मिलान', profile:'मेरी प्रोफ़ाइल' },
}
