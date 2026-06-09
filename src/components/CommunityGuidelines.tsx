"use client";

import { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Open_Sans } from "next/font/google";

type SupportedLanguage = "en" | "de" | "es" | "fr";

type SectionGroup = {
  title: string;
  bullets: string[];
};

type Section = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  groups?: SectionGroup[];
};

type Translation = {
  languageName: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  languageLabel: string;
  sections: Section[];
};

const TRANSLATIONS: Record<SupportedLanguage, Translation> = {
  en: {
    languageName: "English",
    title: "Community Guidelines",
    subtitle:
      "These rules explain who can use Frapic, what content is allowed, and what is forbidden.",
    lastUpdated: "Last updated: March 10, 2026",
    languageLabel: "Language",
    sections: [
      {
        title: "1. Purpose",
        paragraphs: [
          "Frapic is a private social media app for sharing photos and videos with friends only.",
          "It is designed to help people create and keep personal memories together in a trusted, private space.",
        ],
      },
      {
        title: "2. Who Can Use Frapic",
        groups: [
          {
            title: "Allowed",
            bullets: [
              "Private individuals using the app for personal communication and memory sharing with other private individuals.",
              "Accounts used for non-commercial, non-public personal purposes.",
            ],
          },
          {
            title: "Not Allowed",
            bullets: [
              "Public figures and celebrity-style accounts.",
              "Companies, brands, organizations, events, or industry entities.",
              "Influencers, creators, musicians, or similar public-promotion accounts.",
              "Any account primarily intended for public reach, audience growth, or commercial visibility.",
            ],
          },
        ],
      },
      {
        title: "3. What You Can Share",
        bullets: [
          "Personal photos, videos, journal entries, and stories you created.",
          "Creative edits, memes, and commentary that do not target or harm others.",
          "Educational, informative, or inspirational content.",
          "Respectful opinions and discussions, including disagreement without harassment.",
          "Content featuring other people only if you have permission and legal right to post it.",
          "Comments, audio comments, and image-reaction comments.",
        ],
      },
      {
        title: "4. What Is Not Allowed",
        paragraphs: ["You may not upload, post, or distribute content that includes:"],
        bullets: [
          "Hate speech, dehumanizing language, or attacks based on protected characteristics.",
          "Harassment, bullying, threats, stalking, intimidation, or targeted abuse.",
          "Sexual exploitation, non-consensual sexual content, or sexual content involving minors.",
          "Graphic violence, gore, or promotion of self-harm, suicide, or dangerous acts.",
          "Illegal activity, criminal instruction, or content encouraging violence or harm.",
          "Scams, fraud, phishing, impersonation, extortion, or deceptive manipulation.",
          "False or misleading claims likely to cause significant real-world harm.",
          "Spam, inauthentic engagement, mass repetitive posting, or bot abuse.",
          "Malware, malicious links, or attempts to compromise systems or accounts.",
          "Copyright/trademark violations or content you do not have rights to use.",
          "Private/confidential information shared without consent (doxxing).",
          "Child sexual abuse material or any exploitative content involving minors.",
          "Any kind of right-wing opinions, propaganda, or hate-political agitation.",
          "Low-quality mass-generated AI slop intended to flood feeds or reduce community quality.",
        ],
      },
      {
        title: "5. Profile Images and Profile Names",
        bullets: [
          "Profile images are public and must be safe for all users.",
          "Nudity, sexualized imagery, or shirtless profile photos are not allowed.",
          "Profile names must not contain prohibited content listed in Section 4.",
          "Impersonating others in a profile name or image is prohibited.",
        ],
      },
      {
        title: "6. Reporting, Moderation, and Bans",
        bullets: [
          "Users can report accounts or content that violate these guidelines.",
          "Reported content may be reviewed using automated checks and manual moderation.",
          "If a violation is confirmed, the content is removed and the account may be suspended or permanently banned.",
          "Severe violations may result in immediate permanent ban after successful review.",
        ],
      },
      {
        title: "7. Safety and Platform Integrity",
        bullets: [
          "Users who post prohibited harmful content may be banned immediately after confirmed analysis and review.",
          "Do not create fake accounts to evade bans.",
          "Do not use automated systems to scrape, flood, or interfere with the platform.",
        ],
      },
      {
        title: "8. Privacy and Consent",
        bullets: [
          "Respect consent when posting identifiable people.",
          "Do not publish personal data (addresses, phone numbers, IDs, financial details) without consent.",
          "Do not record or share private conversations without legal permission.",
        ],
      },
      {
        title: "9. Enforcement",
        paragraphs: ["If content or behavior violates these guidelines, we may:"],
        bullets: [
          "Remove content.",
          "Limit visibility or disable features.",
          "Issue warnings.",
          "Temporarily suspend accounts.",
          "Permanently ban accounts.",
          "Report severe violations to legal authorities where required.",
        ],
      },
      {
        title: "10. Appeals",
        bullets: [
          "Users can appeal enforcement decisions through support or contact channels.",
          "Appeals are reviewed, but repeated abusive appeals may be ignored.",
          "We may update decisions if new evidence is provided.",
        ],
      },
      {
        title: "11. Updates",
        bullets: [
          "These guidelines may change over time.",
          "Continued use of Frapic means acceptance of the latest published version.",
        ],
      },
    ],
  },
  de: {
    languageName: "Deutsch",
    title: "Community-Richtlinien",
    subtitle:
      "Diese Regeln erklaren, wer Frapic nutzen darf, welche Inhalte erlaubt sind und was verboten ist.",
    lastUpdated: "Zuletzt aktualisiert: 10. Marz 2026",
    languageLabel: "Sprache",
    sections: [
      {
        title: "1. Zweck",
        paragraphs: [
          "Frapic ist eine private Social-Media-App zum Teilen von Fotos und Videos nur mit Freunden.",
          "Die App ist dafur gemacht, gemeinsam personliche Erinnerungen in einem vertrauensvollen, privaten Raum zu erstellen und zu bewahren.",
        ],
      },
      {
        title: "2. Wer Frapic nutzen darf",
        groups: [
          {
            title: "Erlaubt",
            bullets: [
              "Private Personen, die die App fur personliche Kommunikation und Erinnerungsaustausch mit anderen privaten Personen nutzen.",
              "Konten fur nicht-kommerzielle, nicht-offentliche private Nutzung.",
            ],
          },
          {
            title: "Nicht erlaubt",
            bullets: [
              "Offentliche Personen und Promi-ahnliche Konten.",
              "Unternehmen, Marken, Organisationen, Events oder Branchenkonten.",
              "Influencer, Creator, Musiker oder ahnliche Konten mit offentlich-werblichem Zweck.",
              "Jedes Konto, das primar auf offentliche Reichweite, Audience-Wachstum oder kommerzielle Sichtbarkeit abzielt.",
            ],
          },
        ],
      },
      {
        title: "3. Was du teilen darfst",
        bullets: [
          "Personliche Fotos, Videos, Journal-Eintrage und Storys, die du erstellt hast.",
          "Kreative Bearbeitungen, Memes und Kommentare, die niemanden angreifen oder verletzen.",
          "Lehrreiche, informative oder inspirierende Inhalte.",
          "Respektvolle Meinungen und Diskussionen, auch bei Uneinigkeit ohne Belastigung.",
          "Inhalte mit anderen Personen nur, wenn du deren Zustimmung und die rechtlichen Rechte zum Posten hast.",
          "Kommentare, Audio-Kommentare und Bildreaktions-Kommentare.",
        ],
      },
      {
        title: "4. Was nicht erlaubt ist",
        paragraphs: [
          "Du darfst keine Inhalte hochladen, posten oder verbreiten, die Folgendes enthalten:",
        ],
        bullets: [
          "Hassrede, entmenschlichende Sprache oder Angriffe aufgrund geschutzter Merkmale.",
          "Belastigung, Mobbing, Drohungen, Stalking, Einschuchterung oder gezielten Missbrauch.",
          "Sexuelle Ausbeutung, nicht-einvernehmliche sexuelle Inhalte oder sexuelle Inhalte mit Minderjahrigen.",
          "Grafische Gewalt, Gore oder Forderung von Selbstverletzung, Suizid oder gefahrlichen Handlungen.",
          "Illegale Aktivitaten, Anleitungen zu Straftaten oder Inhalte, die Gewalt oder Schaden fordern.",
          "Betrug, Scam, Phishing, Identitatsmissbrauch, Erpressung oder tauschende Manipulation.",
          "Falsche oder irrefuhrende Behauptungen mit wahrscheinlichem erheblichem realem Schaden.",
          "Spam, unauthentisches Engagement, massenhaft wiederholte Posts oder Bot-Missbrauch.",
          "Malware, schadliche Links oder Versuche, Systeme oder Konten zu kompromittieren.",
          "Urheberrechts- oder Markenrechtsverletzungen oder Inhalte ohne Nutzungsrechte.",
          "Private oder vertrauliche Informationen ohne Zustimmung (Doxxing).",
          "Darstellungen sexuellen Kindesmissbrauchs oder jegliche ausbeuterischen Inhalte mit Minderjahrigen.",
          "Jegliche rechte politische Meinungen, Propaganda oder hasserfullte politische Hetze.",
          "Massenhaft KI-generierter AI-Slop von niedriger Qualitat, der Feeds flutet oder die Community-Qualitat senkt.",
        ],
      },
      {
        title: "5. Profilbilder und Profilnamen",
        bullets: [
          "Profilbilder sind offentlich sichtbar und mussen fur alle Nutzer sicher sein.",
          "Nacktheit, sexualisierte Darstellungen oder oberkorperfreie Profilfotos sind nicht erlaubt.",
          "Profilnamen durfen keine verbotenen Inhalte aus Abschnitt 4 enthalten.",
          "Das Vortauschen einer anderen Person in Profilname oder Profilbild ist verboten.",
        ],
      },
      {
        title: "6. Meldungen, Moderation und Sperren",
        bullets: [
          "Nutzer konnen Konten oder Inhalte melden, die gegen diese Richtlinien verstossen.",
          "Gemeldete Inhalte konnen durch automatische Prufungen und manuelle Moderation gepruft werden.",
          "Wird ein Verstoss bestatigt, wird der Inhalt entfernt und das Konto kann vorubergehend gesperrt oder dauerhaft gebannt werden.",
          "Schwere Verstosse konnen nach erfolgreicher Prufung zu einem sofortigen permanenten Bann fuhren.",
        ],
      },
      {
        title: "7. Sicherheit und Plattform-Integritat",
        bullets: [
          "Nutzer, die verbotene schadliche Inhalte posten, konnen nach bestatigter Analyse und Prufung sofort gebannt werden.",
          "Erstelle keine Fake-Konten, um Sperren zu umgehen.",
          "Nutze keine automatisierten Systeme, um die Plattform zu scrapen, zu fluten oder zu storen.",
        ],
      },
      {
        title: "8. Privatsphare und Einwilligung",
        bullets: [
          "Respektiere Einwilligung, wenn identifizierbare Personen gepostet werden.",
          "Veroeffentliche keine personlichen Daten (Adressen, Telefonnummern, IDs, Finanzdaten) ohne Zustimmung.",
          "Nimm keine privaten Gesprache auf und teile sie nicht ohne rechtliche Erlaubnis.",
        ],
      },
      {
        title: "9. Durchsetzung",
        paragraphs: ["Wenn Inhalte oder Verhalten gegen diese Richtlinien verstossen, konnen wir:"],
        bullets: [
          "Inhalte entfernen.",
          "Sichtbarkeit begrenzen oder Funktionen deaktivieren.",
          "Verwarnungen aussprechen.",
          "Konten vorubergehend sperren.",
          "Konten dauerhaft bannen.",
          "Schwere Verstosse, wo erforderlich, an Behorden melden.",
        ],
      },
      {
        title: "10. Einspruche",
        bullets: [
          "Nutzer konnen Entscheidungen uber Support- oder Kontaktkanale anfechten.",
          "Einspruche werden gepruft, wiederholte missbrauchliche Einspruche konnen ignoriert werden.",
          "Entscheidungen konnen bei neuen Beweisen angepasst werden.",
        ],
      },
      {
        title: "11. Aktualisierungen",
        bullets: [
          "Diese Richtlinien konnen sich im Laufe der Zeit andern.",
          "Die weitere Nutzung von Frapic bedeutet die Akzeptanz der neuesten veroffentlichten Version.",
        ],
      },
    ],
  },
  es: {
    languageName: "Español",
    title: "Normas de la Comunidad",
    subtitle:
      "Estas reglas explican quien puede usar Frapic, que contenido esta permitido y que esta prohibido.",
    lastUpdated: "Última actualización: 10 de marzo de 2026",
    languageLabel: "Idioma",
    sections: [
      {
        title: "1. Proposito",
        paragraphs: [
          "Frapic es una app de red social privada para compartir fotos y videos solo con amigos.",
          "Esta disenada para ayudar a crear y guardar recuerdos personales juntos en un espacio privado y de confianza.",
        ],
      },
      {
        title: "2. Quien puede usar Frapic",
        groups: [
          {
            title: "Permitido",
            bullets: [
              "Personas privadas que usan la app para comunicacion personal y compartir recuerdos con otras personas privadas.",
              "Cuentas para uso personal no comercial y no publico.",
            ],
          },
          {
            title: "No permitido",
            bullets: [
              "Figuras publicas y cuentas tipo celebridad.",
              "Empresas, marcas, organizaciones, eventos o entidades de industria.",
              "Influencers, creadores, musicos o cuentas similares de promocion publica.",
              "Cualquier cuenta orientada principalmente a alcance publico, crecimiento de audiencia o visibilidad comercial.",
            ],
          },
        ],
      },
      {
        title: "3. Que puedes compartir",
        bullets: [
          "Fotos personales, videos, entradas de diario e historias que hayas creado.",
          "Ediciones creativas, memes y comentarios que no ataquen ni hagan dano a otras personas.",
          "Contenido educativo, informativo o inspirador.",
          "Opiniones y discusiones respetuosas, incluso con desacuerdo sin acoso.",
          "Contenido con otras personas solo si tienes permiso y derecho legal para publicarlo.",
          "Comentarios, comentarios de audio y comentarios de reaccion con imagen.",
        ],
      },
      {
        title: "4. Que no esta permitido",
        paragraphs: ["No puedes subir, publicar ni distribuir contenido que incluya:"],
        bullets: [
          "Discurso de odio, lenguaje deshumanizante o ataques por caracteristicas protegidas.",
          "Acoso, bullying, amenazas, stalking, intimidacion o abuso dirigido.",
          "Explotacion sexual, contenido sexual sin consentimiento o contenido sexual con menores.",
          "Violencia grafica, gore o promocion de autolesion, suicidio o actos peligrosos.",
          "Actividad ilegal, instrucciones criminales o contenido que fomente violencia o dano.",
          "Estafas, fraude, phishing, suplantacion de identidad, extorsion o manipulacion enganosa.",
          "Afirmaciones falsas o enganosas que probablemente causen dano real significativo.",
          "Spam, interaccion inautentica, publicaciones masivas repetitivas o abuso de bots.",
          "Malware, enlaces maliciosos o intentos de comprometer sistemas o cuentas.",
          "Infracciones de derechos de autor o marca, o contenido sin derechos de uso.",
          "Informacion privada o confidencial compartida sin consentimiento (doxxing).",
          "Material de abuso sexual infantil o cualquier contenido explotador con menores.",
          "Cualquier tipo de opiniones politicas de derecha, propaganda o agitacion politica de odio.",
          "AI slop de baja calidad generado en masa para inundar feeds o reducir la calidad de la comunidad.",
        ],
      },
      {
        title: "5. Imagenes de perfil y nombres de perfil",
        bullets: [
          "Las imagenes de perfil son publicas y deben ser seguras para todos los usuarios.",
          "No se permite desnudez, imagenes sexualizadas ni fotos de perfil sin camiseta.",
          "Los nombres de perfil no pueden contener contenido prohibido de la Seccion 4.",
          "Suplantar a otras personas en nombre o imagen de perfil esta prohibido.",
        ],
      },
      {
        title: "6. Reportes, moderacion y bloqueos",
        bullets: [
          "Los usuarios pueden reportar cuentas o contenido que violen estas normas.",
          "El contenido reportado puede revisarse con verificaciones automaticas y moderacion manual.",
          "Si se confirma una infraccion, se elimina el contenido y la cuenta puede suspenderse temporalmente o bloquearse de forma permanente.",
          "Las infracciones graves pueden causar bloqueo permanente inmediato despues de una revision exitosa.",
        ],
      },
      {
        title: "7. Seguridad e integridad de la plataforma",
        bullets: [
          "Los usuarios que publiquen contenido danino prohibido pueden ser bloqueados inmediatamente tras analisis y revision confirmados.",
          "No crees cuentas falsas para evadir bloqueos.",
          "No uses sistemas automatizados para extraer datos, inundar o interferir con la plataforma.",
        ],
      },
      {
        title: "8. Privacidad y consentimiento",
        bullets: [
          "Respeta el consentimiento al publicar personas identificables.",
          "No publiques datos personales (direcciones, telefonos, IDs, datos financieros) sin consentimiento.",
          "No grabes ni compartas conversaciones privadas sin permiso legal.",
        ],
      },
      {
        title: "9. Aplicacion",
        paragraphs: ["Si contenido o comportamiento infringe estas normas, podemos:"],
        bullets: [
          "Eliminar contenido.",
          "Limitar visibilidad o desactivar funciones.",
          "Emitir advertencias.",
          "Suspender cuentas temporalmente.",
          "Bloquear cuentas de forma permanente.",
          "Reportar infracciones graves a las autoridades cuando sea necesario.",
        ],
      },
      {
        title: "10. Apelaciones",
        bullets: [
          "Los usuarios pueden apelar decisiones por canales de soporte o contacto.",
          "Las apelaciones se revisan, pero apelaciones abusivas repetidas pueden ignorarse.",
          "Podemos actualizar decisiones si se aporta nueva evidencia.",
        ],
      },
      {
        title: "11. Actualizaciones",
        bullets: [
          "Estas normas pueden cambiar con el tiempo.",
          "El uso continuado de Frapic significa aceptacion de la version publicada mas reciente.",
        ],
      },
    ],
  },
  fr: {
    languageName: "Français",
    title: "Regles de la Communaute",
    subtitle:
      "Ces regles expliquent qui peut utiliser Frapic, quel contenu est autorise et ce qui est interdit.",
    lastUpdated: "Derniere mise a jour : 10 mars 2026",
    languageLabel: "Langue",
    sections: [
      {
        title: "1. Objet",
        paragraphs: [
          "Frapic est une application de reseau social privee pour partager des photos et des videos uniquement avec des amis.",
          "Elle est concue pour creer et conserver ensemble des souvenirs personnels dans un espace de confiance et prive.",
        ],
      },
      {
        title: "2. Qui peut utiliser Frapic",
        groups: [
          {
            title: "Autorise",
            bullets: [
              "Les personnes privees qui utilisent l'app pour communiquer et partager des souvenirs avec d'autres personnes privees.",
              "Les comptes pour un usage personnel non commercial et non public.",
            ],
          },
          {
            title: "Non autorise",
            bullets: [
              "Les personnalites publiques et comptes de type celebrites.",
              "Les entreprises, marques, organisations, evenements ou entites industrielles.",
              "Les influenceurs, createurs, musiciens ou comptes similaires de promotion publique.",
              "Tout compte principalement destine a la portee publique, la croissance d'audience ou la visibilite commerciale.",
            ],
          },
        ],
      },
      {
        title: "3. Ce que vous pouvez partager",
        bullets: [
          "Vos photos personnelles, videos, entrees de journal et histoires que vous avez creees.",
          "Des montages creatifs, memes et commentaires qui ne ciblent ni ne blessent autrui.",
          "Du contenu educatif, informatif ou inspirant.",
          "Des opinions et discussions respectueuses, y compris en cas de desaccord sans harcelement.",
          "Du contenu montrant d'autres personnes uniquement si vous avez leur autorisation et le droit legal de publier.",
          "Des commentaires, commentaires audio et commentaires de reaction image.",
        ],
      },
      {
        title: "4. Ce qui est interdit",
        paragraphs: ["Vous ne pouvez pas televerser, publier ou diffuser du contenu incluant :"],
        bullets: [
          "Discours haineux, langage deshumanisant ou attaques basees sur des caracteristiques protegees.",
          "Harcelement, intimidation, menaces, stalking ou abus cible.",
          "Exploitation sexuelle, contenu sexuel non consensuel ou contenu sexuel impliquant des mineurs.",
          "Violence graphique, gore ou promotion de l'automutilation, du suicide ou d'actes dangereux.",
          "Activite illegale, instructions criminelles ou contenu encourageant la violence ou les dommages.",
          "Arnaques, fraude, phishing, usurpation d'identite, extorsion ou manipulation trompeuse.",
          "Affirmations fausses ou trompeuses susceptibles de causer un prejudice reel important.",
          "Spam, engagement inauthentique, publications repetitives de masse ou abus de bots.",
          "Malwares, liens malveillants ou tentatives de compromission de systemes ou comptes.",
          "Violation de droits d'auteur ou de marques, ou contenu sans droits de publication.",
          "Partage d'informations privees/confidentielles sans consentement (doxxing).",
          "Materiel d'abus sexuel sur mineurs ou tout contenu d'exploitation impliquant des mineurs.",
          "Toute opinion politique de droite, propagande ou agitation politique haineuse.",
          "AI slop genere en masse et de faible qualite visant a saturer les flux ou degrader la qualite de la communaute.",
        ],
      },
      {
        title: "5. Images de profil et noms de profil",
        bullets: [
          "Les images de profil sont publiques et doivent etre sures pour tous les utilisateurs.",
          "La nudite, les images sexualisees ou les photos de profil torse nu sont interdites.",
          "Les noms de profil ne doivent pas contenir de contenu interdit de la Section 4.",
          "L'usurpation d'identite via nom ou image de profil est interdite.",
        ],
      },
      {
        title: "6. Signalement, moderation et bannissements",
        bullets: [
          "Les utilisateurs peuvent signaler des comptes ou contenus qui enfreignent ces regles.",
          "Le contenu signale peut etre examine par controles automatiques et moderation manuelle.",
          "Si une violation est confirmee, le contenu est supprime et le compte peut etre suspendu temporairement ou banni definitivement.",
          "Les violations graves peuvent entrainer un bannissement permanent immediat apres verification.",
        ],
      },
      {
        title: "7. Securite et integrite de la plateforme",
        bullets: [
          "Les utilisateurs publiant du contenu nuisible interdit peuvent etre bannis immediatement apres analyse et verification.",
          "Ne creez pas de faux comptes pour contourner des bannissements.",
          "N'utilisez pas de systemes automatises pour scraper, inonder ou perturber la plateforme.",
        ],
      },
      {
        title: "8. Vie privee et consentement",
        bullets: [
          "Respectez le consentement lors de la publication de personnes identifiables.",
          "Ne publiez pas de donnees personnelles (adresses, numeros de telephone, IDs, donnees financieres) sans consentement.",
          "N'enregistrez ni ne partagez de conversations privees sans autorisation legale.",
        ],
      },
      {
        title: "9. Application",
        paragraphs: ["Si du contenu ou un comportement viole ces regles, nous pouvons :"],
        bullets: [
          "Supprimer du contenu.",
          "Limiter la visibilite ou desactiver des fonctionnalites.",
          "Emettre des avertissements.",
          "Suspendre des comptes temporairement.",
          "Bannir des comptes definitivement.",
          "Signaler les violations graves aux autorites lorsque requis.",
        ],
      },
      {
        title: "10. Recours",
        bullets: [
          "Les utilisateurs peuvent faire appel via les canaux support ou contact.",
          "Les recours sont examines, mais les recours abusifs repetes peuvent etre ignores.",
          "Nous pouvons mettre a jour une decision en presence de nouvelles preuves.",
        ],
      },
      {
        title: "11. Mises a jour",
        bullets: [
          "Ces regles peuvent evoluer avec le temps.",
          "L'utilisation continue de Frapic signifie l'acceptation de la version publiee la plus recente.",
        ],
      },
    ],
  },
};

const openSans = Open_Sans({ weight: ["500"], subsets: ["latin"] });

export default function CommunityGuidelines() {
  const { language } = useLanguage();
  const t = useMemo(() => TRANSLATIONS[language as SupportedLanguage] || TRANSLATIONS.en, [language]);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-0 text-gray-300">
      <div className="space-y-4 mb-10">
        <h1 className="text-3xl sm:text-4xl  tracking-tight text-white">{t.title}</h1>
        <p className="text-gray-400 max-w-3xl">{t.subtitle}</p>
        <p className="text-sm text-gray-500">{t.lastUpdated}</p>
      </div>

      <div className="space-y-6">
        {t.sections.map((section) => (
          <article key={section.title} className="rounded-2xl border border-white/10 bg-[#0c1218]/50 p-6">
            <h2 className="text-xl mb-4 text-white">{section.title}</h2>

            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className={`text-gray-100 leading-7 mb-3 ${openSans.className}`}>
                {paragraph}
              </p>
            ))}

            {section.groups?.map((group) => (
              <div key={group.title} className="mb-5 last:mb-0">
                <h3 className="text-base text-white mb-2">{group.title}</h3>
                <ul className={`space-y-2 list-disc pl-5 text-gray-300 ${openSans.className}`}>
                  {group.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            {section.bullets && (
              <ul className={`space-y-2 list-disc pl-5 text-gray-300 ${openSans.className}`}>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
