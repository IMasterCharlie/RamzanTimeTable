
import React, { useState } from 'react';
// @ts-ignore
import { motion as motionBase, AnimatePresence } from 'framer-motion';

const motion = motionBase as any;

interface Dua {
  id: number;
  transliteration: string;
  translation: string;
  arabic: string;
  reference: string;
}

const DUAS: Dua[] = [
  {
    id: 1,
    transliteration: "Rabbanaa taqabbal minnaa innaka Antas Samee'ul Aleem",
    translation: "Our Lord! Accept (this service) from us: For Thou art the All-Hearing, the All-knowing",
    arabic: "رَبَّنَا تَقَبَّلۡ مِنَّآۖ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلۡعَلِيمُ",
    reference: "[2:127]"
  },
  {
    id: 2,
    transliteration: "Rabbanaa waj'alnaa muslimaini laka wa min zurriyyatinaaa ummatam muslimatal laka wa arinaa manaasikanaa wa tub 'alainaa innaka antat Tawwaabur Raheem",
    translation: "Our Lord! Make of us Muslims, bowing to Thy (Will), and of our progeny a people Muslim, bowing to Thy (will); and show us our place for the celebration of (due) rites; and turn unto us (in Mercy); for Thou art the Oft-Returning, Most Merciful",
    arabic: "رَبَّنَا وَٱجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَآ أُمَّةًۭ مُّسْلِمَةًۭ لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَآ ۖ إِنَّكَ أَنتَ ٱلتَّوَّابُ ٱلرَّحِيمُ",
    reference: "[2:128]"
  },
  {
    id: 3,
    transliteration: "Rabbanaaa aatina fid dunyaa hasanatanw wa fil aakhirati hasanatanw wa qinaa azaaban Naar",
    translation: "Our Lord! Grant us good in this world and good in the hereafter, and save us from the chastisement of the fire",
    arabic: "رَبَّنَآ ءَاتِنَا فِى ٱلدُّنْيَا حَسَنَةًۭ وَفِى ٱلْـَٔاخِرَةِ حَسَنَةًۭ وَقِنَا عَذَابَ ٱلنَّارِ",
    reference: "[2:201]"
  },
  {
    id: 4,
    transliteration: "Rabbanaaa afrigh 'alainaa sabranw wa sabbit aqdaamanaa wansurnaa 'alal qawmil kaafireen",
    translation: "Our Lord! Bestow on us endurance, make our foothold sure, and give us help against the disbelieving folk",
    arabic: "رَبَّنَآ أَفْرِغْ عَلَيْنَا صَبْرًۭا وَثَبِّتْ أَقْدَامَنَا وَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَـٰفِرِينَ",
    reference: "[2:250]"
  },
  {
    id: 5,
    transliteration: "Rabbanaa laa tu'aakhiznaaa in naseenaaa aw akhtaanaa",
    translation: "Our Lord! Condemn us not if we forget or fall into error",
    arabic: "رَبَّنَا لَا تُؤَاخِذۡنَآ إِن نَّسِينَآ أَوۡ أَخۡطَأۡنَاۚ",
    reference: "[2:286]"
  },
  {
    id: 6,
    transliteration: "Rabbanaa wa laa tahmil-'alainaaa isran kamaa hamaltahoo 'alal-lazeena min qablinaa",
    translation: "Our Lord! Lay not on us a burden Like that which Thou didst lay on those before us",
    arabic: "رَبَّنَا وَلَا تَحۡمِلۡ عَلَيۡنَآ إِصۡرٗا كَمَا حَمَلۡتَهُۥ عَلَى ٱلَّذِينَ مِن قَبۡلِنَاۚ",
    reference: "[2:286]"
  },
  {
    id: 7,
    transliteration: "Rabbanaa wa laa tuhammilnaa maa laa taaqata lanaa bih; wa'fu 'annaa waghfir lanaa warhamnaa; Anta mawlaanaa fansurnaa 'alal qawmil kaafireen",
    translation: "Our Lord! Lay not on us a burden greater than we have strength to bear. Blot out our sins, and grant us forgiveness. Have mercy on us. Thou art our Protector; Help us against those who stand against faith",
    arabic: "رَبَّنَا وَلَا تُحَمِّلۡنَا مَا لَا طَاقَةَ لَنَا بِهِۦۖ وَٱعۡفُ عَنَّا وَٱغۡفِرۡ لَنَا وَٱرۡحَمۡنَآۚ أَنتَ مَوۡلَىٰنَا فَٱنصُرۡنَا عَلَى ٱلۡقَوْمِ ٱلۡكَٰفِرِينَ",
    reference: "[2:286]"
  },
  {
    id: 8,
    transliteration: "Rabbanaa laa tuzigh quloobanaa ba'da iz hadaitanaa wa hab lanaa mil ladunka rahmah; innaka antal Wahhaab",
    translation: "Our Lord! (they say), Let not our hearts deviate now after Thou hast guided us, but grant us mercy from Thine own Presence; for Thou art the Grantor of bounties without measure",
    arabic: "رَبَّنَا لَا تُزِغۡ قُلُوبَنَا بَعۡدَ إِذۡ هَدَيۡتَنَا وَهَبۡ لَنَا مِن لَّدُنكَ رَحۡمَةًۚ إِنَّكَ أَنتَ ٱلۡوَهَّابُ",
    reference: "[3:8]"
  },
  {
    id: 9,
    transliteration: "Rabbana innaka jami'unnasi li-Yawmil la raiba fi innallaha la yukhliful mi'aad",
    translation: "Our Lord! Thou art He that will gather mankind Together against a day about which there is no doubt; for Allah never fails in His promise.",
    arabic: "رَبَّنَآ إِنَّكَ جَامِعُ ٱلنَّاسِ لِيَوْمٍ لَّا رَيْبَ فِيهِ ۚ إِنَّ ٱللَّهَ لَا يُخْلِفُ ٱلْمِيعَادَ",
    reference: "[3:9]"
  },
  {
    id: 10,
    transliteration: "Rabbanaaa innanaaa aamannaa faghfir lanaa zunoobanaa wa qinaa 'azaaban Naar",
    translation: "Our Lord! We have indeed believed: forgive us, then, our sins, and save us from the agony of the Fire",
    arabic: "رَبَّنَآ إِنَّنَآ ءَامَنَّا فَٱغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ ٱلنَّارِ",
    reference: "[3:16]"
  },
  {
    id: 11,
    transliteration: "Rabbanaaa aamannaa bimaaa anzalta wattaba'nar Rasoola faktubnaa ma'ash shaahideen",
    translation: "Our Lord! We believe in what Thou hast revealed, and we follow the Messenger. Then write us down among those who bear witness",
    arabic: "رَبَّنَآ ءَامَنَّا بِمَآ أَنزَلۡتَ وَٱتَّبَعۡنَا ٱلرَّسُولَ فَٱكۡتُبۡنَا مَعَ ٱلشَّـٰهِدِينَ",
    reference: "[3:53]"
  },
  {
    id: 12,
    transliteration: "Rabbanagh fir lanaa zunoobanaa wa israafanaa feee amrinaa wa sabbit aqdaamanaa wansurnaa 'alal qawmil kaafireen",
    translation: "Our Lord! Forgive us our sins and anything We may have done that transgressed our duty: Establish our feet firmly, and help us against those that resist Faith",
    arabic: "رَبَّنَا ٱغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِىٓ أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَٰفِرِينَ",
    reference: "[3:147]"
  },
  {
    id: 13,
    transliteration: "Rabbanaa maa khalaqta haaza baatilan Subhaanaka faqinaa 'azaaban Naar",
    translation: "Our Lord! Not for naught Hast Thou created (all) this! Glory to Thee! Give us salvation from the penalty of the Fire",
    arabic: "رَبَّنَا مَا خَلَقْتَ هَٰذَا بَٰطِلًا سُبْحَٰنَكَ فَقِنَا عَذَابَ ٱلنَّارِ",
    reference: "[3:191]"
  },
  {
    id: 14,
    transliteration: "Rabbanaaa innaka man tudkhilin Naara faqad akhzai tahoo wa maa lizzaalimeena min ansaar",
    translation: "Our Lord! Any whom Thou dost admit to the Fire, Truly Thou coverest with shame, and never will wrong-doers Find any helpers!",
    arabic: "رَبَّنَآ إِنَّكَ مَن تُدْخِلِ ٱلنَّارَ فَقَدْ أَخْزَيْتَهُۥ ۖ وَمَا لِلظَّٰلِمِينَ مِنْ أَنصَارٍ",
    reference: "[3:192]"
  },
  {
    id: 15,
    transliteration: "Rabbanaaa innanaa sami'naa munaadiyai yunaadee lil eemaani an aaminoo bi Rabbikum fa aamannaa",
    translation: "Our Lord! We have heard the call of one calling (Us) to Faith, 'Believe ye in the Lord,' and we have believed",
    arabic: "رَّبَّنَآ إِنَّنَا سَمِعۡنَا مُنَادِيٗا يُنَادِي لِلۡإِيمَٰنِ أَنۡ ءَامِنُواْ بِرَبِّكُمۡ فَـَٔامَنَّاۚ",
    reference: "[3:193]"
  },
  {
    id: 16,
    transliteration: "Rabbanaa faghfir lanaa zunoobanaa wa kaffir 'annaa saiyi aatina wa tawaffanaa ma'al abraar",
    translation: "Our Lord! Forgive us our sins, blot out from us our iniquities, and take to Thyself our souls in the company of the righteous",
    arabic: "رَبَّنَا فَٱغۡفِرۡ لَنَا ذُنُوبَنَا وَكَفِّرۡ عَنَّا سَيِّـَٔاتِنَا وَتَوَفَّنَا مَعَ ٱلۡأَبۡرَارِ",
    reference: "[3:193]"
  },
  {
    id: 17,
    transliteration: "Rabbana wa 'atina ma wa'adtana 'ala rusulika wa la tukhzina yawmal-Qiyamah innaka la tukhliful mi'aad",
    translation: "Our Lord! Grant us what Thou didst promise unto us through Thine apostles, and save us from shame on the Day of Judgment: For Thou never breakest Thy promise",
    arabic: "رَبَّنَا وَءَاتِنَا مَا وَعَدتَّنَا عَلَىٰ رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ ٱلْقِيَٰمَةِ ۗ إِنَّكَ لَا تُخْلِفُ ٱلْمِيعَادَ",
    reference: "[3:194]"
  },
  {
    id: 18,
    transliteration: "Rabbana aamanna faktubna ma' ash-shahideen",
    translation: "Our Lord! We believe; write us down among the witnesses",
    arabic: "رَبَّنَآ ءَامَنَّا فَٱكْتُبْنَا مَعَ ٱلشَّٰهِدِينَ",
    reference: "[5:83]"
  },
  {
    id: 19,
    transliteration: "Rabbana anzil 'alaina ma'idatam minas-Samai takunu lana 'idal li-awwa-lina wa aakhirna wa ayatam-minka war-zuqna wa anta Khayrul-Raziqeen",
    translation: "O Allah our Lord! Send us from heaven a table set (with viands), that there may be for us - for the first and the last of us - a solemn festival and a sign from thee; and provide for our sustenance, for thou art the best Sustainer (of our needs)",
    arabic: "رَبَّنَآ أَنزِلْ عَلَيْنَا مَآئِدَةً مِّنَ ٱلسَّمَآءِ تَكُونُ لَنَا عِيدًا لِّأَوَّلِنَا وَءَاخِرِنَا وَءَايَةً مِّنكَ ۖ وَٱرْزُقْنَا وَأَنتَ خَيْرُ ٱلرَّٰزِقِينَ",
    reference: "[5:114]"
  },
  {
    id: 20,
    transliteration: "Rabbana zalamna anfusana wa il lam taghfir lana wa tarhamna lanakoonanna minal khaasireen",
    translation: "Our Lord! We have wronged our own souls: If thou forgive us not and bestow not upon us Thy Mercy, we shall certainly be lost",
    arabic: "رَبَّنَا ظَلَمْنَآ أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ ٱلْخَٰسِرِينَ",
    reference: "[7:23]"
  },
  {
    id: 21,
    transliteration: "Rabbana la taj'alna ma'al qawwmi-dhalimeen",
    translation: "Our Lord! Send us not to the company of the wrong-doers",
    arabic: "رَبَّنَا لَا تَجۡعَلۡنَا مَعَ ٱلۡقَوۡمِ ٱلظَّـٰلِمِينَ",
    reference: "[7:47]"
  },
  {
    id: 22,
    transliteration: "Rabbanaf-tah bainana wa baina qawmina bil haqqi wa anta Khairul Fatiheen",
    translation: "Our Lord! Decide Thou between us and our people in truth, for Thou art the best to decide",
    arabic: "رَبَّنَا ٱفۡتَحۡ بَيۡنَنَا وَبَيۡنَ قَوۡمِنَا بِٱلۡحَقِّ وَأَنتَ خَيۡرُ ٱلۡفَٰتِحِينَ",
    reference: "[7:89]"
  },
  {
    id: 23,
    transliteration: "Rabbana afrigh 'alaina sabraw wa tawaffana Muslimeen",
    translation: "Our Lord! Pour out on us patience and constancy, and take our souls unto thee as Muslims (who bow to thy will)",
    arabic: "رَبَّنَآ أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ",
    reference: "[7:126]"
  },
  {
    id: 24,
    transliteration: "Rabbana la taj'alna fitnatal lil-qawmidh-Dhalimeen wa najjina bi-Rahmatika minal qawmil kafireen",
    translation: "Our Lord! Make us not a trial for those who practise oppression; And deliver us by Thy Mercy from those who reject (Thee)",
    arabic: "رَبَّنَا لَا تَجۡعَلۡنَا فِتۡنَةٗ لِّلۡقَوۡمِ ٱلظَّـٰلِمِينَ ; وَنَجِّنَا بِرَحۡمَتِكَ مِنَ ٱلۡقَوۡمِ ٱلۡكَٰفِرِينَ",
    reference: "[10:85-86]"
  },
  {
    id: 25,
    transliteration: "Rabbanaaa innaka ta'lamu maa nukhfee wa maa nu'lin; wa maa yakhfaa 'alal laahi min shai'in fil ardi wa laa fis samaaa'",
    translation: "O our Lord! Truly Thou dost know what we conceal and what we reveal: for nothing whatever is hidden from Allah, whether on earth or in heaven",
    arabic: "رَبَّنَآ إِنَّكَ تَعْلَمُ مَا نُخْفِى وَمَا نُعْلِنُ ۗ وَمَا يَخْفَىٰ عَلَى ٱللَّهِ مِن شَىْءٍۢ فِى ٱلْأَرْضِ وَلَا فِى ٱلسَّمَآءِ",
    reference: "[14:38]"
  },
  {
    id: 26,
    transliteration: "Rabbij 'alnee muqeemas Salaati wa min zurriyyatee Rabbanaa wa taqabbal du'aaa'",
    translation: "O my Lord! make me one who establishes regular Prayer, and also (raise such) among my offspring O our Lord! and accept Thou my Prayer",
    arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَآءِ",
    reference: "[14:40]"
  },
  {
    id: 27,
    transliteration: "Rabbanagh fir lee wa liwaalidaiya wa lilmu'mineena Yawma yaqoomul hisaab",
    translation: "O our Lord! Cover (us) with Thy Forgiveness - me, my parents, and (all) Believers, on the Day that the Reckoning will be established!",
    arabic: "رَبَّنَا ٱغۡفِرۡ لِي وَلِوَٰلِدَيَّ وَلِلۡمُؤۡمِنِينَ يَوۡمَ يَقُومُ ٱلۡحِسَابُ",
    reference: "[14:41]"
  },
  {
    id: 28,
    transliteration: "Rabbana 'atina mil-ladunka Rahmataw wa haiyi lana min amrina rashada",
    translation: "Our Lord! Bestow on us Mercy from Thyself, and dispose of our affair for us in the right way!",
    arabic: "رَبَّنَآ ءَتِنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
    reference: "[18:10]"
  },
  {
    id: 29,
    transliteration: "Rabbana innana nakhafu ai-yafruta 'alaina aw any-yatgha",
    translation: "Our Lord! We fear lest he hasten with insolence against us, or lest he transgress all bounds",
    arabic: "رَبَّنَآ إِنَّنَا نَخَافُ أَن يَفْرُطَ عَلَيْنَآ أَوْ أَن يَطْغَى",
    reference: "[20: 45]"
  },
  {
    id: 30,
    transliteration: "Rabbana amanna faghfir lana warhamna wa anta khairur Rahimiin",
    translation: "Our Lord! We believe; then do Thou forgive us, and have mercy upon us: For Thou art the Best of those who show mercy",
    arabic: "رَبَّنَآ ءَامَنَّا فَٱغۡفِرۡ لَنَا وَٱرۡحَمۡنَا وَأَنتَ خَيْرُ ٱلرَّـٰحِمِينَ",
    reference: "[23: 109]"
  },
  {
    id: 31,
    transliteration: "Rabbanas-rif 'anna 'adhaba jahannama inna 'adhabaha kana gharama innaha sa'at musta-qarranw wa muqama",
    translation: "Our Lord! Avert from us the Wrath of Hell, for its Wrath is indeed an affliction grievous,- Evil indeed is it as an abode, and as a place to rest in",
    arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَامًا إِنَّهَا سَآءَتْ مُسْتَقَرًّا وَمُقَامًا",
    reference: "[25: 65-66]"
  },
  {
    id: 32,
    transliteration: "Rabbana Hablana min azwaajina wadhurriy-yatina, qurrata 'ayioni wa-jalna lil-muttaqeena Imaama",
    translation: "O my Lord! Grant unto us wives and offspring who will be the comfort of our eyes, and give us (the grace) to lead the righteous",
    arabic: "رَبَّنَا هَبۡ لَنَا مِنۡ أَزۡوَٰجِنَا وَذُرِّيَّـٰتِنَا قُرَّةَ أَعۡيُنٖ وَٱجۡعَلۡنَا لِلۡمُتَّقِينَ إِمَامًا",
    reference: "[25:74]"
  },
  {
    id: 33,
    transliteration: "Rabbana la Ghafurun shakur",
    translation: "Our Lord is indeed Oft-Forgiving Ready to appreciate (service)",
    arabic: "رَبَّنَا لَغَفُورٌ شَكُورٌ",
    reference: "[35: 34]"
  },
  {
    id: 34,
    transliteration: "Rabbana wasi'ta kulla sha'ir Rahmatanw wa 'ilman faghfir lilladhina tabu wattaba'u sabilaka waqihim 'adhabal-Jahiim",
    translation: "Our Lord! Thy Reach is over all things, in Mercy and Knowledge. Forgive, then, those who turn in Repentance, and follow Thy Path; and preserve them from the Penalty of the Blazing Fire!",
    arabic: "رَبَّنَا وَسِعۡتَ كُلَّ شَيۡءٖ رَّحۡمَةٗ وَعِلۡمٗا فَٱغۡفِرۡ لِلَّذِينَ تَابُواْ وَٱتَّبَعُواْ سَبِيلَكَ وَقِهِمۡ عَذَابَ ٱلۡجَحِيمِ",
    reference: "[40:7]"
  },
  {
    id: 35,
    transliteration: "Rabbana wa adhkhilhum Jannati 'adninil-lati wa'attahum wa man salaha min aba'ihim wa azwajihim wa dhuriyyatihim innaka antal 'Azizul-Hakim, waqihimus saiyi'at wa man taqis-saiyi'ati yawma'idhin faqad rahimatahu wa dhalika huwal fawzul-'Adheem",
    translation: "And grant, our Lord! that they enter the Gardens of Eternity, which Thou hast promised to them, and to the righteous among their fathers, their wives, and their posterity! For Thou art (He), the Exalted in Might, Full of Wisdom. And preserve them from (all) ills; and any whom Thou dost preserve from ills that Day,- on them wilt Thou have bestowed Mercy indeed: and that will be truly (for them) the highest Achievement",
    arabic: "رَبَّنَا وَأَدۡخِلۡهُمۡ جَنَّـٰتِ عَدۡنٍ ٱلَّتِي وَعَدتَّهُمۡ وَمَن صَلَحَ مِنۡ ءَابَآئِهِمۡ وَأَزۡوَٰجِهِمۡ وَذُرِّيَّـٰتِهِمۡۚ إِنَّكَ أَنتَ ٱلۡعَزِيزُ ٱلۡحَكِيمُ وَقِهِمُ ٱلسَّيِّـَٔاتِۚ وَمَن تَقِ ٱلسَّيِّـَٔاتِ يَوۡمئِذٖ فَقَدۡ رَحِمۡتَهُۥۚ وَذَٰلِكَ هُوَ ٱلۡفَوۡزُ ٱلۡعَظِيمُ",
    reference: "[40:8-9]"
  },
  {
    id: 36,
    transliteration: "Rabbana-ghfir lana wa li 'ikhwani nalladhina sabaquna bil imani wa la taj'al fi qulubina ghillal-lilladhina amanu",
    translation: "Our Lord! Forgive us, and our brethren who came before us into the Faith, and leave not, in our hearts, rancour (or sense of injury) against those who have believed",
    arabic: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ اٰمَنُوا",
    reference: "[59:10]"
  },
  {
    id: 37,
    transliteration: "Rabbana innaka Ra'ufur Rahim",
    translation: "Our Lord! Thou art indeed Full of Kindness, Most Merciful",
    arabic: "رَبَّنَآ إِنَّكَ رَءُوفٞ رَّحِيمٌ",
    reference: "[59:10]"
  },
  {
    id: 38,
    transliteration: "Rabbana 'alaika tawakkalna wa-ilaika anabna wa-ilaikal masir",
    translation: "Our Lord! In Thee do we trust, and to Thee do we turn in repentance: to Thee is (our) Final Goal",
    arabic: "رَّبَّنَا عَلَيۡكَ تَوَكَّلۡنَا وَإِلَيۡكَ أَنَبۡنَا وَإِلَيۡكَ ٱلۡمَصِيرُ",
    reference: "[60:4]"
  },
  {
    id: 39,
    transliteration: "Rabbana la taj'alna fitnatal lilladhina kafaru waghfir lana Rabbana innaka antal 'Azizul-Hakim",
    translation: "Our Lord! Make us not a (test and) trial for the Unbelievers, but forgive us, our Lord! for Thou art the Exalted in Might, the Wise",
    arabic: "رَبَّنَا لَا تَجۡعَلۡنَا فِتۡنَةٗ لِّلۡقَوۡمِ ٱلظَّـٰلِمِينَ ; وَنَجِّنَا بِرَحۡمَتِكَ مِنَ ٱلۡقَوۡمِ ٱلۡكَٰفِرِينَ",
    reference: "[60:5]"
  },
  {
    id: 40,
    transliteration: "Rabbana atmim lana nurana waighfir lana innaka 'ala kulli shai-in qadir",
    translation: "Our Lord! Perfect our Light for us, and grant us Forgiveness: for Thou hast power over all things",
    arabic: "رَبَّنَآ أَتۡمِمۡ لَنَا نُورَنَا وَٱغۡفِرۡ لَنَآۖ إِنَّكَ عَلَىٰ كُلِّ شَيۡءٖ قَدِيرٞ",
    reference: "[66:8]"
  }
];

const INITIAL_SHOW_COUNT = 6;

export const DuaSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedDuas = isExpanded ? DUAS : DUAS.slice(0, INITIAL_SHOW_COUNT);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AnimatePresence>
          {displayedDuas.map((dua, index) => (
            <motion.div
              key={dua.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: isExpanded ? (index >= INITIAL_SHOW_COUNT ? (index - INITIAL_SHOW_COUNT) * 0.05 : 0) : index * 0.1 }}
              className="glass-morphism rounded-2xl p-6 relative group border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold font-cinzel text-xs">
                {dua.id}
              </div>
              <div className="text-right mb-6">
                <p className="font-amiri text-2xl md:text-3xl text-white leading-loose tracking-wide dir-rtl">
                  {dua.arabic}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-amber-400 font-medium italic text-sm leading-relaxed">
                  "{dua.transliteration}"
                </p>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed border-l-2 border-amber-500/30 pl-4 py-1">
                  {dua.translation}
                </p>
                <div className="pt-2 flex justify-end">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800/50 px-3 py-1 rounded-full">
                    Reference {dua.reference}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group relative flex items-center gap-3 px-8 py-3 bg-amber-500/5 border border-amber-500/30 text-amber-400 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-amber-500 hover:text-slate-900 transition-all duration-500 overflow-hidden"
        >
          <span className="relative z-10">{isExpanded ? 'Show Less' : 'See More Duas'}</span>
          <motion.span
            className="relative z-10"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </motion.span>
        </button>
      </motion.div>
    </div>
  );
};
