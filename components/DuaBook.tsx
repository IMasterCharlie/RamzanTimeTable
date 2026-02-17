
import React, { useState } from 'react';
// @ts-ignore
import { motion as motionBase, AnimatePresence } from 'framer-motion';

const motion = motionBase as any;

// Rabbana Duas (Quranic)
const RABBANA_DUAS = [
  { id: 1, arabic: "رَبَّنَا تَقَبَّلۡ مِنَّآۖ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلۡعَلِيمُ", transliteration: "Rabbana taqabbal minna innaka Antas Samee'ul Aleem", translation: "Our Lord! Accept from us. You are the All-Hearing, All-Knowing.", reference: "[2:127]" },
  { id: 2, arabic: "رَبَّنَآ ءَاتِنَا فِى ٱلدُّنْيَا حَسَنَةًۭ وَفِى ٱلْـَٔاخِرَةِ حَسَنَةًۭ وَقِنَا عَذَابَ ٱلنَّارِ", transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar", translation: "Our Lord! Grant us good in this world and good in the hereafter, and save us from the Fire.", reference: "[2:201]" },
  { id: 3, arabic: "رَبَّنَا لَا تُؤَاخِذۡنَآ إِن نَّسِينَآ أَوۡ أَخۡطَأۡنَا", transliteration: "Rabbana la tu'akhidhna in nasina aw akhta'na", translation: "Our Lord! Do not take us to task if we forget or make a mistake.", reference: "[2:286]" },
  { id: 4, arabic: "رَبَّنَا لَا تُزِغۡ قُلُوبَنَا بَعۡدَ إِذۡ هَدَيۡتَنَا", transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana", translation: "Our Lord! Do not let our hearts deviate after You have guided us.", reference: "[3:8]" },
  { id: 5, arabic: "رَبَّنَآ إِنَّنَآ ءَامَنَّا فَٱغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ ٱلنَّارِ", transliteration: "Rabbana innana amanna faghfir lana dhunubana wa qina adhaban-nar", translation: "Our Lord! We have believed, so forgive our sins and save us from the Fire.", reference: "[3:16]" },
  { id: 6, arabic: "رَبَّنَا ٱغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِىٓ أَمْرِنَا", transliteration: "Rabbanagh-fir lana dhunubana wa israfana fi amrina", translation: "Our Lord! Forgive our sins and our transgressions.", reference: "[3:147]" },
  { id: 7, arabic: "رَبَّنَا مَا خَلَقْتَ هَٰذَا بَٰطِلًا سُبْحَٰنَكَ فَقِنَا عَذَابَ ٱلنَّارِ", transliteration: "Rabbana ma khalaqta hadha batilan subhanaka faqina adhaban-nar", translation: "Our Lord! You have not created this in vain. Glory to You! Save us from the Fire.", reference: "[3:191]" },
  { id: 8, arabic: "رَبَّنَا ظَلَمْنَآ أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنكُونَنَّ مِنَ ٱلْخَٰسِرِينَ", transliteration: "Rabbana zalamna anfusana wa il-lam taghfir lana wa tarhamna", translation: "Our Lord! We have wronged ourselves. If You do not forgive us, we will be among the losers.", reference: "[7:23]" },
  { id: 9, arabic: "رَبَّنَآ أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ", transliteration: "Rabbana afrigh alayna sabran wa tawaffana muslimeen", translation: "Our Lord! Pour patience upon us and let us die as Muslims.", reference: "[7:126]" },
  { id: 10, arabic: "رَبَّنَا هَبۡ لَنَا مِنۡ أَزۡوَٰجِنَا وَذُرِّيَّـٰتِنَا قُرَّةَ أَعۡيُنٖ", transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun", translation: "Our Lord! Grant us spouses and offspring who will be the comfort of our eyes.", reference: "[25:74]" },
  { id: 11, arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ", transliteration: "Rabbanas-rif anna adhaba jahannam", translation: "Our Lord! Turn away from us the punishment of Hell.", reference: "[25:65]" },
  { id: 12, arabic: "رَبَّنَا ٱغۡفِرۡ لِي وَلِوَٰلِدَيَّ وَلِلۡمُؤۡمِنِينَ يَوۡمَ يَقُومُ ٱلۡحِسَابُ", transliteration: "Rabbanagh-fir li wa liwalidayya wa lil-mu'mineen", translation: "Our Lord! Forgive me, my parents, and believers on the Day of Judgment.", reference: "[14:41]" },
  { id: 13, arabic: "رَبَّنَآ ءَتِنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا", transliteration: "Rabbana atina min ladunka rahmatan wa hayyi lana min amrina rashada", translation: "Our Lord! Grant us mercy and guide us in our affairs.", reference: "[18:10]" },
  { id: 14, arabic: "رَبَّنَآ ءَامَنَّا فَٱغْفِرۡ لَنَا وَٱرۡحَمۡنَا وَأَنتَ خَيْرُ ٱلرَّـٰحِمِينَ", transliteration: "Rabbana amanna faghfir lana warhamna wa anta khairur-rahimeen", translation: "Our Lord! We believe, so forgive us and have mercy. You are the Most Merciful.", reference: "[23:109]" },
  { id: 15, arabic: "رَبَّنَآ أَتۡمِمۡ لَنَا نُورَنَا وَٱغۡفِرۡ لَنَآ", transliteration: "Rabbana atmim lana nurana waghfir lana", translation: "Our Lord! Perfect our light for us and forgive us.", reference: "[66:8]" },
];

// Roman Urdu Duas
const URDU_DUAS = [
  { id: 1, text: "Ae Allah! Mujhe adab aur Durood Shareef naseeb farma." },
  { id: 2, text: "Ae Allah! Mere walidain ko kaamil imaan naseeb farma." },
  { id: 3, text: "Ae Allah! Mere asatiza ko sehat aur lambi umar ata farma." },
  { id: 4, text: "Ae Allah! Mere doston ko naik aur saalih bana." },
  { id: 5, text: "Ae Allah! Mujhe ilm-e-naafi' ata farma." },
  { id: 6, text: "Ae Allah! Mere rizq mein barkat ata farma." },
  { id: 7, text: "Ae Allah! Mujhe sachai par qaim rakh." },
  { id: 8, text: "Ae Allah! Mere gunahon ko maaf farma." },
  { id: 9, text: "Ae Allah! Mujhe walidain ki khidmat ki taufeeq ata farma." },
  { id: 10, text: "Ae Allah! Mujhe badnigahi, badkalaami aur bad-amli se bacha." },
  { id: 11, text: "Ae Allah! Mere dil ko paak saaf farma." },
  { id: 12, text: "Ae Allah! Mujhe dunya aur aakhirat ki bhalaiyan ata farma." },
  { id: 13, text: "Ae Allah! Mere darjaat buland farma." },
  { id: 14, text: "Ae Allah! Mujhe naik logon ki sohbat naseeb farma." },
  { id: 15, text: "Ae Allah! Mere aamaal qubool farma." },
  { id: 16, text: "Ae Allah! Mujhe hasad, ghuroor aur takabbur se bacha." },
  { id: 17, text: "Ae Allah! Mere dil mein apne Nabi ﷺ ki muhabbat paida farma." },
  { id: 18, text: "Ae Allah! Mujhe namaz ki pabandi naseeb farma." },
  { id: 19, text: "Ae Allah! Mujhe sabr o shukar karne wala bana." },
  { id: 20, text: "Ae Allah! Mujhe hidayat ke raaste par chala." },
  { id: 21, text: "Ae Allah! Mujhe hamesha sach bolne wala bana." },
  { id: 22, text: "Ae Allah! Mujhe buray logon se mehfooz farma." },
  { id: 23, text: "Ae Allah! Mujhe naik niyat ata farma." },
  { id: 24, text: "Ae Allah! Mere dil ko noor se bhar de." },
  { id: 25, text: "Ae Allah! Mujhe deen ki khidmat ki taufeeq ata farma." },
  { id: 26, text: "Ae Allah! Mujhe kamiyabi ata farma." },
  { id: 27, text: "Ae Allah! Meri zindagi ko barkat wali bana." },
  { id: 28, text: "Ae Allah! Mere mustaqbil ko roshan farma." },
  { id: 29, text: "Ae Allah! Meri dua qubool farma. Aameen." },
];

type Category = 'rabbana' | 'urdu';

interface DuaBookProps {
  onBack: () => void;
}

export const DuaBook: React.FC<DuaBookProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('rabbana');
  const [expandedDua, setExpandedDua] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative z-50">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
            Back to Home
          </button>
          <h1 className="font-cinzel text-xl text-amber-400 font-bold">Ramadan Duas</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveCategory('rabbana')}
            className={`flex-1 py-4 rounded-xl font-bold text-base transition-all ${activeCategory === 'rabbana'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
          >
            🕌 Rabbana Duas
          </button>
          <button
            onClick={() => setActiveCategory('urdu')}
            className={`flex-1 py-4 rounded-xl font-bold text-base transition-all ${activeCategory === 'urdu'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
          >
            📿 Ramzan Duas
          </button>
        </div>

        {/* Category Header */}
        <div className="bg-slate-800 rounded-xl p-6 mb-6 text-center border border-slate-700">
          {activeCategory === 'rabbana' ? (
            <>
              <h2 className="font-amiri text-3xl text-amber-400 mb-2">رَبَّنَا کی دعائیں</h2>
              <p className="text-slate-300">Quranic supplications beginning with "Rabbana" (Our Lord)</p>
            </>
          ) : (
            <>
              <h2 className="font-amiri text-3xl text-amber-400 mb-2">رمضانِ مبارک میں پڑھنے کی دعائیں</h2>
              <p className="text-slate-300">Ramadan duas in Roman Urdu for daily supplication</p>
            </>
          )}
        </div>

        {/* Duas List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {activeCategory === 'rabbana' ? (
              RABBANA_DUAS.map((dua) => (
                <div
                  key={dua.id}
                  className="bg-slate-700 rounded-xl border border-slate-600 overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {dua.id}
                      </div>
                      <div className="flex-grow">
                        <p className="font-amiri text-xl md:text-2xl text-white leading-relaxed text-right mb-3" dir="rtl">
                          {dua.arabic}
                        </p>
                        <p className="text-amber-400 italic text-sm mb-3">
                          "{dua.transliteration}"
                        </p>
                        <button
                          onClick={() => setExpandedDua(expandedDua === dua.id ? null : dua.id)}
                          className="text-sm text-slate-400 hover:text-amber-400 font-bold"
                        >
                          {expandedDua === dua.id ? '▼ Hide Translation' : '▶ Show Translation'}
                        </button>
                        {expandedDua === dua.id && (
                          <div className="mt-3 pt-3 border-t border-slate-700">
                            <p className="text-white">{dua.translation}</p>
                            <span className="text-amber-500 text-sm font-bold mt-2 inline-block">{dua.reference}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              URDU_DUAS.map((dua) => (
                <div
                  key={dua.id}
                  className="bg-slate-700 rounded-xl border border-slate-600 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {dua.id}
                    </div>
                    <p className="text-white text-lg leading-relaxed">
                      {dua.text}
                    </p>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-800">
          <p className="font-amiri text-2xl text-amber-400 mb-2">آمین یا رب العالمین</p>
          <p className="text-slate-400">Aameen Ya Rabbul Aalameen</p>
        </div>
      </div>
    </div>
  );
};
