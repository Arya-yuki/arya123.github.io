document.addEventListener("DOMContentLoaded", function () {

    /* ══════════════════════════════════════
       SLIDER
    ══════════════════════════════════════ */
    const row   = document.querySelector(".movie-row");
    const leftA = document.querySelector(".left-arrow");
    const rightA= document.querySelector(".right-arrow");

    function refreshArrows() {
        if (!row||!leftA||!rightA) return;
        leftA.style.display  = row.scrollLeft <= 0 ? "none" : "block";
        rightA.style.display = row.scrollLeft + row.clientWidth >= row.scrollWidth - 5 ? "none" : "block";
    }
    rightA && rightA.addEventListener("click", ()=>{ row.scrollLeft+=500; setTimeout(refreshArrows,300); });
    leftA  && leftA.addEventListener("click",  ()=>{ row.scrollLeft-=500; setTimeout(refreshArrows,300); });
    row    && row.addEventListener("scroll", refreshArrows);
    refreshArrows();

    /* ══════════════════════════════════════
       POPUP
    ══════════════════════════════════════ */
    const backdrop = document.getElementById("popupBackdrop");
    const pClose   = document.getElementById("popupClose");
    const pImg     = document.getElementById("popupImg");
    const pTitle   = document.getElementById("popupTitle");
    const pTags    = document.getElementById("popupTags");
    const pDesc    = document.getElementById("popupDesc");

    document.querySelectorAll(".movie-card").forEach(card => {
        card.addEventListener("click", () => {
            pImg.src   = card.dataset.img   || "";
            pImg.alt   = card.dataset.title || "";
            pTitle.textContent = card.dataset.title || "";
            pDesc.textContent  = card.dataset.desc  || "";
            pTags.innerHTML = "";
            (card.dataset.tags||"").split(",").forEach(t => {
                const s = document.createElement("span");
                s.textContent = t.trim();
                pTags.appendChild(s);
            });
            backdrop.classList.add("open");
            document.body.classList.add("blurred");
        });
    });

    function closePopup() {
        backdrop.classList.remove("open");
        document.body.classList.remove("blurred");
    }
    pClose   && pClose.addEventListener("click", closePopup);
    backdrop && backdrop.addEventListener("click", e => { if(e.target===backdrop) closePopup(); });
    document.addEventListener("keydown", e => { if(e.key==="Escape") closePopup(); });

    /* ══════════════════════════════════════
       FAQ ACCORDION
    ══════════════════════════════════════ */
    document.querySelectorAll(".faq-q").forEach(btn => {
        btn.addEventListener("click", () => {
            const answer = btn.nextElementSibling;
            const isOpen = btn.classList.contains("open");
            // close all
            document.querySelectorAll(".faq-q").forEach(b => {
                b.classList.remove("open");
                b.nextElementSibling.classList.remove("open");
            });
            // open clicked if it was closed
            if (!isOpen) {
                btn.classList.add("open");
                answer.classList.add("open");
            }
        });
    });

    /* ══════════════════════════════════════
       TRANSLATIONS
    ══════════════════════════════════════ */
    const LANG = {
        en: {
            signIn:"Sign In", heroTitle:"Unlimited movies, shows,", heroSub:"and more",
            heroBot:"Starts at ₹149. Cancel at any time.",
            heroGround:"Ready to watch? Enter your email to create or restart your membership.",
            emailPh:"Email address", getStarted:"Get Started", trendHead:"Trending Now",
            popupBtn:"Get Started ❯", reasonHead:"More reasons to join",
            r1t:"Enjoy on your TV", r1d:"Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV and more.",
            r2t:"Download your shows to watch offline", r2d:"Save your favourites easily and always have something to watch.",
            r3t:"Watch everywhere", r3d:"Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
            r4t:"Create profiles for kids", r4d:"Send kids on adventures with their favourite characters in a space made just for them.",
            faqHead:"Frequently Asked Questions",
            faqCtaText:"Ready to watch? Enter your email to create or restart your membership.",
            fqs:["What is Netflix?","How much does Netflix cost?","Where can I watch?","How do I cancel?","What can I watch on Netflix?","Is Netflix good for kids?"],
            fas:[
                "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single ad — all for one low monthly price.",
                "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.",
                "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web from your personal computer or on any internet-connected device that offers the Netflix app.",
                "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees — start or stop your account at any time.",
                "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
                "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. Kids profiles come with PIN-protected parental controls."
            ],
            footerCall:"Questions? Call",
            fl:["FAQ","Help Centre","Account","Media Centre","Investor Relations","Jobs","Ways to Watch","Terms of Use","Privacy","Cookie Preferences","Corporate Information","Contact Us","Speed Test","Legal Notices","Only on Netflix"],
            region:"Netflix India"
        },
        hi: {
            signIn:"साइन इन", heroTitle:"अनलिमिटेड फ़िल्में, टीवी शो,", heroSub:"और बहुत कुछ",
            heroBot:"₹149 से शुरू। कभी भी कैंसल करें।",
            heroGround:"देखने के लिए तैयार हैं? मेम्बरशिप बनाने के लिए ईमेल दर्ज करें।",
            emailPh:"ईमेल पता", getStarted:"शुरू करें", trendHead:"ट्रेंडिंग नाव",
            popupBtn:"शुरू करें ❯", reasonHead:"शामिल होने की ज़्यादा वजहें",
            r1t:"अपने टीवी पर आनंद लें", r1d:"स्मार्ट टीवी, PlayStation, Xbox, Chromecast, Apple TV और बहुत कुछ पर देखें।",
            r2t:"ऑफलाइन देखने के लिए डाउनलोड करें", r2d:"पसंदीदा सीरीज़ आसानी से सेव करें।",
            r3t:"हर जगह देखें", r3d:"फोन, टैबलेट, लैपटॉप और टीवी पर बिना किसी सीमा के स्ट्रीम करें।",
            r4t:"बच्चों के लिए प्रोफ़ाइल बनाएं", r4d:"बच्चों को पसंदीदा किरदारों के साथ अलग जगह पर रोमांच पर भेजें।",
            faqHead:"अक्सर पूछे जाने वाले सवाल",
            faqCtaText:"देखने के लिए तैयार? मेम्बरशिप बनाने के लिए ईमेल दर्ज करें।",
            fqs:["Netflix क्या है?","Netflix की कीमत कितनी है?","मैं कहाँ देख सकता/सकती हूँ?","मैं कैसे कैंसल करूं?","मैं Netflix पर क्या देख सकता/सकती हूँ?","क्या Netflix बच्चों के लिए ठीक है?"],
            fas:[
                "Netflix एक स्ट्रीमिंग सेवा है जो हज़ारों इंटरनेट-कनेक्टेड डिवाइस पर पुरस्कार विजेता टीवी शो, फ़िल्में, एनिमे, डॉक्यूमेंट्री और बहुत कुछ प्रदान करती है। बिना किसी विज्ञापन के जितना चाहें देखें।",
                "एक निश्चित मासिक शुल्क पर स्मार्टफोन, टैबलेट, स्मार्ट टीवी या लैपटॉप पर Netflix देखें। प्लान ₹149 से ₹649 प्रति माह।",
                "कहीं भी, कभी भी देखें। Netflix ऐप वाले किसी भी इंटरनेट-कनेक्टेड डिवाइस पर तुरंत देखें।",
                "Netflix लचीला है। दो क्लिक में अकाउंट कैंसल करें। कोई कैंसलेशन शुल्क नहीं।",
                "फ़िल्में, डॉक्यूमेंट्री, टीवी शो, एनिमे, Netflix ओरिजिनल — जब चाहें देखें।",
                "Netflix Kids सदस्यता के साथ आता है। PIN-सुरक्षित parental controls के साथ।"
            ],
            footerCall:"सवाल? कॉल करें",
            fl:["सामान्य प्रश्न","सहायता केंद्र","खाता","मीडिया केंद्र","निवेशक संबंध","नौकरियां","देखने के तरीके","उपयोग की शर्तें","गोपनीयता","कुकी प्राथमिकताएं","कॉर्पोरेट जानकारी","संपर्क करें","स्पीड टेस्ट","कानूनी नोटिस","केवल Netflix पर"],
            region:"Netflix इंडिया"
        },
        gu: {
            signIn:"સાઇન ઇન", heroTitle:"અમર્યાદિત ફિલ્મો, શો,", heroSub:"અને વધુ",
            heroBot:"₹149 થી શરૂ. ગમે ત્યારે રદ કરો.",
            heroGround:"જોવા તૈયાર? સભ્યપદ બનાવવા ઇમેઇલ દાખલ કરો.",
            emailPh:"ઇમેઇલ સરનામું", getStarted:"શરૂ કરો", trendHead:"ટ્રેન્ડિંગ હવે",
            popupBtn:"શરૂ કરો ❯", reasonHead:"જોડાવાના વધુ કારણો",
            r1t:"TV પર આનંદ કરો", r1d:"સ્માર્ટ TV, PlayStation, Xbox, Chromecast, Apple TV પર જુઓ.",
            r2t:"ઓફલાઇન જોવા ડાઉનલોડ કરો", r2d:"મનપસંદ સહેલાઈથી સેવ કરો.",
            r3t:"દરેક જગ્યાએ જુઓ", r3d:"ફોન, ટેબ્લેટ, લેપટોપ અને TV પર સ્ટ્રીમ કરો.",
            r4t:"બાળકો માટે પ્રોફાઇલ", r4d:"બાળકોને મનપસંદ પાત્રો સાથે ખાસ જગ્યામાં મોકલો.",
            faqHead:"વારંવાર પૂછાતા પ્રશ્નો",
            faqCtaText:"જોવા તૈયાર? સભ્યપદ માટે ઇમેઇલ દાખલ કરો.",
            fqs:["Netflix શું છે?","Netflix ની કિંમત?","હું ક્યાં જોઈ શકું?","રદ કેવી રીતે કરું?","Netflix પર શું જોઈ શકું?","Netflix બાળકો માટે?"],
            fas:[
                "Netflix એ સ્ટ્રીમિંગ સેવા છે જે TV શો, ફિલ્મો, એનિમે, ડૉક્યૂ. આપે છે. ₹149/માસ.",
                "પ્લાન ₹149 થી ₹649/માસ. કોઈ વધારો ખર્ચ નહીં, કૉન્ટ્રૅક્ટ નહીં.",
                "ગમે ત્યાં, ગમે ત્યારે. Netflix app ઉ-પ-ર-ત-ક.",
                "Netflix ફ્લૅક્સ. ઑ-ન-લ-ઈ-ન બ-ક-ક.",
                "ફિ-ડ-TV-એ-Ne-Ori.",
                "Netflix Kids PIN-control-ped."
            ],
            footerCall:"પ્રશ્ન? કૉલ કરો",
            fl:["FAQ","સહાય કેન્દ્ર","એકાઉન્ટ","મીડિયા","રોકાણ","નોકરી","જોવું","શરતો","ગોપ.","કૂકી","કૉ.","સંપ.","સ્પીડ","કાન.","Netflix પર"],
            region:"Netflix ઇન્ડિયા"
        },
        jp: {
            signIn:"ログイン", heroTitle:"映画、ドラマ、", heroSub:"もっと楽しもう",
            heroBot:"月額149ルピーから。いつでもキャンセル可能。",
            heroGround:"メールアドレスを入力してメンバーシップを開始してください。",
            emailPh:"メールアドレス", getStarted:"今すぐ始める", trendHead:"今話題の作品",
            popupBtn:"今すぐ始める ❯", reasonHead:"さらなる理由",
            r1t:"テレビで楽しもう", r1d:"スマートTV、PlayStation、Xbox、Chromecast、Apple TVなどで視聴。",
            r2t:"オフライン視聴用にダウンロード", r2d:"お気に入りを保存していつでも視聴。",
            r3t:"どこでも視聴", r3d:"スマホ、タブレット、ノートPC、テレビで無制限にストリーミング。",
            r4t:"子供用プロフィール作成", r4d:"お気に入りのキャラクターと子供だけの空間で冒険。",
            faqHead:"よくある質問",
            faqCtaText:"視聴の準備はできていますか？メールアドレスを入力してください。",
            fqs:["Netflixとは？","料金は？","どこで見られますか？","キャンセル方法は？","何が見られますか？","子供に安全ですか？"],
            fas:[
                "Netflixは受賞歴のあるTVドラマ、映画、アニメ、ドキュメンタリーを提供するストリーミングサービスです。",
                "月額149〜649ルピーの固定料金。スマホ、タブレット、スマートTVで視聴可能。",
                "いつでもどこでも。NetflixアプリがあるインターネットデバイスでOK。",
                "いつでも2クリックでキャンセル可能。キャンセル料なし。",
                "映画、ドキュメンタリー、TVドラマ、アニメ、Netflixオリジナルなど豊富。",
                "Netflix Kidsは会員資格に含まれます。PIN保護の保護者設定付き。"
            ],
            footerCall:"ご不明な点は",
            fl:["よくある質問","ヘルプ","アカウント","メディア","投資家","採用","視聴方法","利用規約","プライバシー","Cookie","企業情報","お問合せ","速度テスト","法的通知","Netflixだけで"],
            region:"Netflix Japan"
        },
        kr: {
            signIn:"로그인", heroTitle:"무제한 영화, 쇼,", heroSub:"그리고 더 많은 콘텐츠",
            heroBot:"₹149부터 시작. 언제든 취소하세요.",
            heroGround:"이메일을 입력하여 멤버십을 시작하거나 다시 시작하세요.",
            emailPh:"이메일 주소", getStarted:"시작하기", trendHead:"지금 뜨는 콘텐츠",
            popupBtn:"시작하기 ❯", reasonHead:"가입해야 할 더 많은 이유",
            r1t:"TV에서 즐기세요", r1d:"스마트 TV, PlayStation, Xbox, Chromecast, Apple TV 등에서 시청.",
            r2t:"오프라인 시청을 위해 다운로드", r2d:"좋아하는 콘텐츠를 저장하고 언제든지 시청.",
            r3t:"어디서나 시청", r3d:"스마트폰, 태블릿, 노트북, TV에서 무제한 스트리밍.",
            r4t:"어린이 프로필 만들기", r4d:"어린이들이 좋아하는 캐릭터와 함께하는 공간을 만드세요.",
            faqHead:"자주 묻는 질문",
            faqCtaText:"시청할 준비가 되셨나요? 이메일을 입력하세요.",
            fqs:["Netflix란?","요금은?","어디서 볼 수 있나요?","어떻게 해지하나요?","무엇을 볼 수 있나요?","아이들에게 안전한가요?"],
            fas:[
                "Netflix는 수상 경력에 빛나는 TV 프로그램, 영화, 애니메이션, 다큐멘터리를 제공하는 스트리밍 서비스입니다.",
                "월 ₹149~₹649 고정 요금으로 스마트폰, 태블릿, 스마트TV에서 시청.",
                "언제 어디서나. Netflix 앱이 있는 모든 인터넷 연결 기기에서 즉시 시청.",
                "두 번의 클릭으로 쉽게 해지. 해지 수수료 없음.",
                "영화, 다큐, TV, 애니메이션, Netflix 오리지널 등 방대한 라이브러리.",
                "Netflix 키즈는 멤버십에 포함. PIN 보호 자녀 보호 기능 제공."
            ],
            footerCall:"질문이 있으신가요?",
            fl:["FAQ","고객센터","계정","미디어","투자자","채용","시청방법","이용약관","개인정보","쿠키","기업정보","문의","속도테스트","법적고지","Netflix만의"],
            region:"Netflix Korea"
        },
        cn: {
            signIn:"登录", heroTitle:"无限电影、剧集，", heroSub:"以及更多",
            heroBot:"低至₹149起。随时取消。",
            heroGround:"准备好了吗？输入您的电子邮件创建或重启会员资格。",
            emailPh:"电子邮件地址", getStarted:"立即开始", trendHead:"当前热门",
            popupBtn:"立即开始 ❯", reasonHead:"加入的更多理由",
            r1t:"在电视上享受", r1d:"在智能电视、PlayStation、Xbox、Chromecast、Apple TV等设备上观看。",
            r2t:"下载节目离线观看", r2d:"轻松保存您的最爱，随时都有内容可看。",
            r3t:"随处观看", r3d:"在手机、平板、笔记本电脑和电视上无限流媒体。",
            r4t:"为孩子创建档案", r4d:"让孩子们在专属空间中与最喜爱的角色一起探险。",
            faqHead:"常见问题",
            faqCtaText:"准备好观看了吗？输入您的电子邮件创建或重启会员资格。",
            fqs:["Netflix是什么？","费用多少？","在哪里观看？","如何取消？","可以看什么？","适合孩子吗？"],
            fas:[
                "Netflix是提供获奖TV节目、电影、动漫、纪录片等的流媒体服务。每月低价无广告。",
                "月费₹149到₹649，可在智能手机、平板、智能TV、笔记本上观看。",
                "随时随地。在任何联网设备Netflix应用上即时观看。",
                "两次点击即可取消，无需承诺，无取消费用。",
                "Netflix拥有海量电影、纪录片、TV节目、动漫及原创内容。",
                "Netflix儿童版包含在会员中，提供PIN保护的家长控制。"
            ],
            footerCall:"有问题？请致电",
            fl:["常见问题","帮助中心","账户","媒体中心","投资者关系","招聘","观看方式","使用条款","隐私","Cookie偏好","企业信息","联系我们","速度测试","法律声明","仅在Netflix上"],
            region:"Netflix 中国"
        },
        fr: {
            signIn:"Se connecter", heroTitle:"Films, séries et bien plus,", heroSub:"en illimité",
            heroBot:"À partir de ₹149. Annulez à tout moment.",
            heroGround:"Prêt à regarder ? Entrez votre e-mail pour créer ou reprendre votre abonnement.",
            emailPh:"Adresse e-mail", getStarted:"Commencer", trendHead:"Tendances actuelles",
            popupBtn:"Commencer ❯", reasonHead:"Plus de raisons de nous rejoindre",
            r1t:"Regardez sur votre TV", r1d:"Regardez sur smart TVs, PlayStation, Xbox, Chromecast, Apple TV et plus.",
            r2t:"Téléchargez hors ligne", r2d:"Enregistrez vos favoris et ayez toujours quelque chose à regarder.",
            r3t:"Regardez partout", r3d:"Streamez sur votre téléphone, tablette, ordinateur et TV.",
            r4t:"Profils pour enfants", r4d:"Un espace dédié aux enfants avec leurs personnages préférés.",
            faqHead:"Questions fréquemment posées",
            faqCtaText:"Prêt à regarder ? Entrez votre e-mail pour créer ou reprendre votre abonnement.",
            fqs:["Qu'est-ce que Netflix ?","Combien ça coûte ?","Où regarder ?","Comment annuler ?","Que puis-je regarder ?","Netflix pour les enfants ?"],
            fas:[
                "Netflix est un service de streaming proposant des émissions TV, films, animes et documentaires primés sur des milliers d'appareils connectés.",
                "Abonnements de ₹149 à ₹649 par mois. Pas de frais supplémentaires, pas de contrats.",
                "Regardez n'importe où, à tout moment sur n'importe quel appareil connecté avec l'app Netflix.",
                "Annulez en deux clics en ligne. Aucun frais d'annulation.",
                "Films, documentaires, séries TV, animes, et créations originales Netflix primées.",
                "Netflix Kids inclus dans l'abonnement. Contrôles parentaux protégés par PIN."
            ],
            footerCall:"Des questions ? Appelez le",
            fl:["FAQ","Centre d'aide","Compte","Médias","Investisseurs","Emplois","Façons de voir","Conditions","Confidentialité","Cookies","Infos société","Contact","Test vitesse","Mentions légales","Uniquement Netflix"],
            region:"Netflix France"
        },
        it: {
            signIn:"Accedi", heroTitle:"Film, serie TV e tanto altro,", heroSub:"senza limiti",
            heroBot:"A partire da ₹149. Cancella quando vuoi.",
            heroGround:"Pronto a guardare? Inserisci la tua email per creare o riprendere l'abbonamento.",
            emailPh:"Indirizzo email", getStarted:"Inizia ora", trendHead:"Di tendenza ora",
            popupBtn:"Inizia ora ❯", reasonHead:"Altri motivi per unirti",
            r1t:"Guarda sulla tua TV", r1d:"Guarda su smart TV, PlayStation, Xbox, Chromecast, Apple TV e altro.",
            r2t:"Scarica per guardare offline", r2d:"Salva i tuoi preferiti e hai sempre qualcosa da guardare.",
            r3t:"Guarda ovunque", r3d:"Streaming illimitato su telefono, tablet, laptop e TV.",
            r4t:"Profili per i bambini", r4d:"Uno spazio dedicato con i loro personaggi preferiti.",
            faqHead:"Domande frequenti",
            faqCtaText:"Pronto a guardare? Inserisci la tua email per creare o riprendere l'abbonamento.",
            fqs:["Che cos'è Netflix?","Quanto costa?","Dove guardare?","Come cancellare?","Cosa posso guardare?","Adatto ai bambini?"],
            fas:[
                "Netflix offre serie TV, film, anime e documentari premiati su migliaia di dispositivi connessi. Un prezzo mensile, senza pubblicità.",
                "Piani da ₹149 a ₹649 al mese. Nessun costo extra, nessun contratto.",
                "Guarda ovunque su qualsiasi dispositivo connesso con l'app Netflix.",
                "Cancella in due clic online. Nessun costo di cancellazione.",
                "Film, documentari, serie TV, anime e Netflix Originali premiati.",
                "Netflix Kids incluso nell'abbonamento con controlli parentali PIN."
            ],
            footerCall:"Domande? Chiama il",
            fl:["FAQ","Assistenza","Account","Media","Investitori","Lavora","Come vedere","Termini","Privacy","Cookie","Azienda","Contatti","Test velocità","Note legali","Solo su Netflix"],
            region:"Netflix Italia"
        }
    };

    const footerLinkIds = ["flFAQ","flHelp","flAccount","flMedia","flInvestor","flJobs","flWatch","flTerms","flPrivacy","flCookie","flCorp","flContact","flSpeed","flLegal","flOnly"];

    function set(id, text) { const el=document.getElementById(id); if(el) el.textContent=text; }
    function ph(id, text)  { const el=document.getElementById(id); if(el) el.placeholder=text; }

    function applyLang(lang) {
        const t = LANG[lang] || LANG.en;

        set("signInBtn",   t.signIn);
        set("heroTitle",   t.heroTitle);
        set("heroSubtitle",t.heroSub);
        set("heroBottom",  t.heroBot);
        set("heroGround",  t.heroGround);
        ph("heroEmail",    t.emailPh);
        set("heroBtn",     t.getStarted);
        set("trendHead",   t.trendHead);
        set("popupBtn",    t.popupBtn);
        set("reasonHead",  t.reasonHead);
        set("r1t",t.r1t); set("r1d",t.r1d);
        set("r2t",t.r2t); set("r2d",t.r2d);
        set("r3t",t.r3t); set("r3d",t.r3d);
        set("r4t",t.r4t); set("r4d",t.r4d);
        set("faqHead",     t.faqHead);
        set("faqCtaText",  t.faqCtaText);
        ph("faqEmail",     t.emailPh);
        set("faqBtn",      t.getStarted);

        // FAQ questions & answers
        t.fqs.forEach((q,i) => { set("fq"+i, q); set("fa"+i, t.fas[i]); });

        // Footer
        set("footerCallText", t.footerCall);
        footerLinkIds.forEach((id,i) => { set(id, t.fl[i]); });
        set("footerRegion", t.region);

        // Sync both selectors
        document.querySelectorAll(".language-select").forEach(s => s.value = lang);
    }

    document.querySelectorAll(".language-select").forEach(sel => {
        sel.addEventListener("change", function() { applyLang(this.value); });
    });

});
