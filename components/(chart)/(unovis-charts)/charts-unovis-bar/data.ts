import { EducationDatum, ElectionDatum } from './utils';
export const data: ElectionDatum[] = [
  {
    year: 1980,
    republican: 43642639,
    democrat: 35480948,
    other: 6505863,
    libertarian: 867401,
  },
  {
    year: 1984,
    republican: 54166829,
    democrat: 37449813,
    libertarian: 227204,
    other: 811015,
  },
  {
    year: 1988,
    republican: 48642640,
    democrat: 41716679,
    libertarian: 409708,
    other: 817798,
  },
  {
    year: 1992,
    republican: 38798913,
    democrat: 44856747,
    other: 20663272,
    libertarian: 280848,
  },
  {
    year: 1996,
    republican: 39003697,
    democrat: 47295351,
    other: 9625419,
    libertarian: 465351,
  },
  {
    year: 2000,
    republican: 50311372,
    democrat: 50830580,
    other: 4071625,
    libertarian: 380405,
  },
  {
    year: 2004,
    republican: 61872711,
    democrat: 58894561,
    other: 1212870,
    libertarian: 369308,
  },
  {
    year: 2008,
    republican: 59613835,
    democrat: 69338846,
    other: 1956116,
    libertarian: 510456,
  },
  {
    year: 2012,
    republican: 60670117,
    democrat: 65752017,
    other: 1501463,
    libertarian: 1216400,
  },
  {
    year: 2016,
    republican: 62692670,
    democrat: 65677288,
    libertarian: 4125170,
    other: 4292059,
  },
  {
    year: 2020,
    democrat: 81268908,
    republican: 74216146,
    libertarian: 1797355,
    other: 1246094,
  },
];

export const educationsData: EducationDatum[] = [
  {
    country: 'Australia',
    masters: 9.4,
    doctoral: 1.6,
    bachelors: 35,
  },
  {
    country: 'Bahrain',
    masters: 2,
    doctoral: 0.3,
    bachelors: 23.3,
  },
  {
    country: 'Bangladesh',
    masters: 5.7,
    doctoral: 0.2,
    bachelors: 14.1,
  },
  {
    country: 'Bosnia and Herzegovina',
    masters: 1.6,
    doctoral: 0.2,
    bachelors: 10.6,
  },
  {
    country: 'Costa Rica',
    masters: 2.9,
    doctoral: 0.2,
    bachelors: 21.6,
  },
  {
    country: 'Cyprus',
    masters: 13.4,
    doctoral: 1.1,
    bachelors: 29.8,
  },
  {
    country: 'Denmark',
    masters: 13.5,
    doctoral: 1.1,
    bachelors: 33.1,
  },
  {
    country: 'Estonia',
    masters: 21.2,
    doctoral: 0.9,
    bachelors: 30.8,
  },
  {
    country: 'Greece',
    masters: 6.9,
    doctoral: 0.7,
    bachelors: 26,
  },
  {
    country: 'Hungary',
    masters: 11.8,
    doctoral: 0.7,
    bachelors: 24.1,
  },
  {
    country: 'Iceland',
    masters: 16.9,
    doctoral: 1.4,
    bachelors: 36.6,
  },
  {
    country: 'Indonesia',
    masters: 0.6,
    doctoral: 0,
    bachelors: 10.5,
  },
  {
    country: 'Italy',
    masters: 13,
    doctoral: 0.4,
    bachelors: 16.5,
  },
  {
    country: 'Jordan',
    masters: 2.1,
    doctoral: 0.7,
    bachelors: 22.7,
  },
].map((d) => {
  const round = (n: any) => Math.floor(n * 100) / 100;
  return {
    ...d,
    bachelors: round(d.bachelors - d.masters),
    masters: round(d.masters - d.doctoral),
    total: d.bachelors,
  };
});

export const productData = [
  {
    endDate: 1645056000000,
    startDate: 1534636800000,
    description:
      'Cameos on Google allowed celebrities and other public figures to record video responses to the most common questions asked about them which would be shown to users in Google Search results.',
    name: 'Cameos on Google',
    type: 'service',
  },
  {
    endDate: 1660003200000,
    startDate: 1487116800000,
    description:
      'YouTube Go was an app aimed at making YouTube easier to access on mobile devices in emerging markets through special features like downloading video on wifi for viewing later.',
    name: 'YouTube Go',
    type: 'app',
  },
  {
    endDate: 1587600000000,
    startDate: 1416441600000,
    description:
      'Google Contributor was a program run by Google that allowed users in the Google Network of content sites to view the websites without any advertisements that are administered, sorted, and maintained by Google.',
    name: 'Google Contributor',
    type: 'service',
  },
  {
    endDate: 1456012800000,
    startDate: 1340236800000,
    description:
      'Google Maps Coordinate was a service for managing mobile workforces with the help of mobile apps and a web-based dashboard.',
    name: 'Google Maps Coordinate',
    type: 'service',
  },
  {
    endDate: 1627603200000,
    startDate: 1372636800000,
    description:
      'Fitbit Coach (formerly Fitstar) was video-based body weight workout app that used AI to personalize workouts based on user feedback.',
    name: 'Fitbit Coach',
    type: 'app',
  },
  {
    endDate: 1627603200000,
    startDate: 1409529600000,
    description:
      'Fitstar Yoga was a video-based yoga app that created unique yoga sessions based on user preference and skill level.',
    name: 'Fitstar Yoga',
    type: 'app',
  },
  {
    endDate: 1671408000000,
    startDate: 1440979200000,
    description:
      'Google OnHub was a series of residential wireless routers manufactured by Asus and TP-Link that were powered by Google software, managed by Google apps, and offered enhanced special features like Google Assistant.',
    name: 'Google OnHub',
    type: 'hardware',
  },
  {
    endDate: 1632700800000,
    startDate: 1509494400000,
    description:
      "Analytics platform for Google's Dialogflow chatbot & others, started by the Google-funded Area120 incubator then retired and partially merged into Dialogflow itself.",
    name: 'Chatbase',
    type: 'service',
  },
  {
    endDate: 1639180800000,
    startDate: 976492800000,
    description:
      'Google Toolbar was a web browser toolbar that provided a search box in web browsers like Internet Explorer and Firefox.',
    name: 'Google Toolbar',
    type: 'service',
  },
  {
    endDate: 1634256000000,
    startDate: 1414713600000,
    description:
      'My Maps was an Android application that enabled users to create custom maps for personal use or sharing on their mobile device.',
    name: 'Google My Maps',
    type: 'app',
  },
  {
    endDate: 1622505600000,
    startDate: 1409011200000,
    description:
      'Zync render was a cloud render platform for animation and visual effects.',
    name: 'Zync Render',
    type: 'service',
  },
  {
    endDate: 1341100800000,
    startDate: 1257379200000,
    description:
      'Google Commerce Search was an enterprise search service that powered online retail stores and e-commerce websites that improved speed and accuracy.',
    name: 'Google Commerce Search',
    type: 'service',
  },
  {
    endDate: 1617926400000,
    startDate: 1557792000000,
    description:
      'The Google Shopping Mobile App, which had absorbed Google Express when it launched, provided a native shopping experience with a personalized homepage for mobile users. It is now retired and the functionality lives on in the Shopping Tab.',
    name: 'Google Shopping Mobile App',
    type: 'app',
  },
  {
    endDate: 1623715200000,
    startDate: 1304985600000,
    description:
      'Google Play Movies & TV, originally Google TV, was an app used to view purchased and rented media and was ultimately replaced with YouTube.',
    name: 'Google Play Movies & TV',
    type: 'app',
  },
  {
    endDate: 1617235200000,
    startDate: 1351555200000,
    description:
      'Google Public Alerts was an online notification service owned by Google.org that sends safety alerts to various countries.',
    name: 'Google Public Alerts',
    type: 'service',
  },
  {
    endDate: 1617148800000,
    startDate: 1262304000000,
    description:
      '(also known as Google Short Links) was a URL shortening service. It also supported custom domain for customers of Google Workspace (formerly G Suite (formerly Google Apps)).',
    name: 'Google Go Links',
    type: 'service',
  },
  {
    endDate: 1611619200000,
    startDate: 1459814400000,
    description:
      'Tilt Brush was a room-scale 3D-painting virtual-reality application available from Google, originally developed by Skillman & Hackett.',
    name: 'Tilt Brush',
    type: 'app',
  },
  {
    endDate: 1641340800000,
    startDate: 1432771200000,
    description:
      'Android Things was an Android-based embedded operating system (originally named Brillo) aimed to run on Internet of Things (IoT) devices.',
    name: 'Android Things',
    type: 'service',
  },
  {
    endDate: 1607558400000,
    startDate: 1513209600000,
    description:
      'YouTube VR allowed you to easily find and watch 360 videos and virtual reality content with SteamVR-compatible headsets.',
    name: 'YouTube VR (SteamVR)',
    type: 'app',
  },
  {
    endDate: 1623110400000,
    startDate: 1464739200000,
    description:
      "Measure allowed users to take measurements of everyday objects with their device's camera utilizing ARCore technology.",
    name: 'Measure',
    type: 'app',
  },
  {
    endDate: 1617148800000,
    startDate: 1316908800000,
    description:
      'Google Crisis Map was a website that allowed to create, publish, and share maps by combining layers from anywhere on the web.',
    name: 'Google Crisis Map',
    type: 'service',
  },
  {
    endDate: 1592956800000,
    startDate: 1535760000000,
    description:
      'Pigeon Transit was a transit app that used crowdsourced information about delays, crowded trains, escalator outages, live entertainment, dirty or unsafe conditions.',
    name: 'Pigeon Transit',
    type: 'app',
  },
  {
    endDate: 1589328000000,
    startDate: 1219104000000,
    description:
      "Enhanced 404 Pages was a JavaScript library that added suggested URLs and a search box to a website's 404 Not Found page.",
    name: 'Enhanced 404 Pages',
    type: 'service',
  },
  {
    endDate: 1267315200000,
    startDate: 1164931200000,
    description:
      'YouTube Streams allowed users to watch a YouTube video together while chatting about the video in real time.',
    name: 'YouTube Streams',
    type: 'service',
  },
  {
    endDate: 1598832000000,
    startDate: 1549324800000,
    description:
      'Password Checkup provided a warning to users if they were using a username and password combination checked against over 4 billion credentials that Google knew to be unsafe.',
    name: 'Password Checkup extension',
    type: 'app',
  },
  {
    endDate: 1593475200000,
    startDate: 1580515200000,
    description:
      "Google Photos Print was a subscription service that automatically selected the best ten photos from the last thirty days which were mailed to user's homes.",
    name: 'Google Photos Print',
    type: 'service',
  },
  {
    endDate: 1603324800000,
    startDate: 1321401600000,
    description:
      'Google Play Music was a music and podcast streaming service, and online music locker.',
    name: 'Google Play Music',
    type: 'service',
  },
  {
    endDate: 1589241600000,
    startDate: 1560124800000,
    description:
      'Shoelace was an app used to find group activities with others who share your interests.',
    name: 'Shoelace',
    type: 'app',
  },
  {
    endDate: 1589241600000,
    startDate: 1527724800000,
    description:
      ' Neighbourly was a mobile app designed to help you learn about your neighborhood by asking other residents, and find out about local services and facilities in your area from people who live around you.',
    name: 'Neighbourly',
    type: 'app',
  },
  {
    endDate: 1584576000000,
    startDate: 1525824000000,
    description:
      'Material Theme Editor is a plugin for Sketch App which allows you to create a material based design system for your app.',
    name: 'Material Theme Editor',
    type: 'app',
  },
  {
    endDate: 1581897600000,
    startDate: 1443312000000,
    description:
      'Google Station is a service which gives partners an easy set of tools to roll-out Wi-Fi hotspots in public places. Google Station provides software and guidance on hardware to turn fiber connections into fast, reliable and safe Wi-Fi zones.',
    name: 'Google Station',
    type: 'service',
  },
  {
    endDate: 1580947200000,
    startDate: 1366243200000,
    description:
      'One Today was an app that allowed users to donate $1 to different organizations and discover how their donation would be used.',
    name: 'One Today',
    type: 'app',
  },
  {
    endDate: 1611014400000,
    startDate: 1480464000000,
    description:
      'App Maker was a tool that allowed its users to build and deploy custom business apps easily and securely on the web without writing much code.',
    name: 'App Maker',
    type: 'service',
  },
  {
    endDate: 1515715200000,
    startDate: 1467244800000,
    description:
      'SoundStage was a virtual reality music sandbox built specifically for room-scale VR.',
    name: 'SoundStage',
    type: 'service',
  },
  {
    endDate: 1609372800000,
    startDate: 1271376000000,
    description:
      "Google Cloud Print allowed users to 'print from anywhere;' to print from web, desktop, or mobile to any Google Cloud Print-connected printer.",
    name: 'Google Cloud Print',
    type: 'service',
  },
  {
    endDate: 1552435200000,
    startDate: 1380585600000,
    description:
      'Google Spotlight Stories was an app and content studio project which created immersive stories for mobile and VR.',
    name: 'Google Spotlight Stories',
    type: 'service',
  },
  {
    endDate: 1571270400000,
    startDate: 1496275200000,
    description:
      'Datally (formerly Triangle) was a smart app by Google that helped you save, manage, and share your mobile data.',
    name: 'Datally',
    type: 'app',
  },
  {
    endDate: 1307232000000,
    startDate: 874281600000,
    description:
      "Google Specialized Search allowed users to search across a limited index of the web for specialised topics like Linux, Microsoft, and 'Uncle Sam.'",
    name: 'Google Specialized Search',
    type: 'service',
  },
  {
    endDate: 1571097600000,
    startDate: 1507075200000,
    description:
      'Google Clips was a miniature clip-on camera that could automatically capture interesting or relevant video clips determined by machine learning algorithms.',
    name: 'Google Clips',
    type: 'hardware',
  },
  {
    endDate: 1571097600000,
    startDate: 1478736000000,
    description:
      'Google Daydream was a virtual reality platform and set of hardware devices that worked with certain Android phones.',
    name: 'Google Daydream',
    type: 'hardware',
  },
  {
    endDate: 1574380800000,
    startDate: 1516924800000,
    description:
      'Google Bulletin was a hyperlocal news service where users could post news from their neighborhood and allow others in the same areas to hear those stories.',
    name: 'Google Bulletin',
    type: 'service',
  },
  {
    endDate: 1573948800000,
    startDate: 1537228800000,
    description:
      'Touring Bird was an Area 120 incubator project which helped users compare prices, book tours, tickets, and experiences, and learn about top destinations around the world.',
    name: 'Touring Bird',
    type: 'service',
  },
  {
    endDate: 1569974400000,
    startDate: 1278460800000,
    description:
      'YouTube Leanback was an optimized version of YouTube used for television web browsers and webview application wrappers.',
    name: 'YouTube Leanback',
    type: 'service',
  },
  {
    endDate: 1567468800000,
    startDate: 1385683200000,
    description:
      'YouTube app for Nintendo 3DS, 2DS, and New 3DS allowed users to stream YouTube videos on the portable gaming console.',
    name: 'YouTube for Nintendo 3DS',
    type: 'app',
  },
  {
    endDate: 1598918400000,
    startDate: 1500336000000,
    description:
      'Google Hire was an applicant tracking system to help small to medium businesses distribute jobs, identify and attract candidates, build strong relationships with candidates, and efficiently manage the interview process.',
    name: 'Hire by Google',
    type: 'service',
  },
  {
    endDate: 1576368000000,
    startDate: 1306281600000,
    description:
      'Google Correlate was a service that provided users information about how strongly the frequency of multiple search terms correlates with each other over a specified time interval.',
    name: 'Google Correlate',
    type: 'service',
  },
  {
    endDate: 1568764800000,
    startDate: 1502064000000,
    description:
      'YouTube Messages was a direct messaging feature that allowed users to share and discuss videos one-on-one and in groups on YouTube.',
    name: 'YouTube Messages',
    type: 'service',
  },
  {
    endDate: 1569801600000,
    startDate: 1296086400000,
    description:
      'Follow Your World allowed users to register points of interest on Google Maps and receive email updates whenever the imagery is updated.',
    name: 'Follow Your World',
    type: 'service',
  },
  {
    endDate: 1560556800000,
    startDate: 1536278400000,
    description:
      'Blog Compass was a blog management tool that integrated with WordPress and Blogger available only in India.',
    name: 'Blog Compass',
    type: 'app',
  },
  {
    endDate: 1249430400000,
    startDate: 1167609600000,
    description:
      'Google Radio Automation was a hardware and software service used by radio operators to automate song playing among other radio station functions.',
    name: 'Google Radio Automation',
    type: 'hardware',
  },
  {
    endDate: 1614729600000,
    startDate: 1403654400000,
    description:
      'Google Cardboard was a low-cost, virtual reality (VR) platform named after its folded cardboard viewer into which a smartphone was inserted.',
    name: 'Google Cardboard',
    type: 'hardware',
  },
  {
    endDate: 1505865600000,
    startDate: 1276560000000,
    description:
      'YouTube Video Editor was a web-based tool for editing, merging, and adding special effects to video content.',
    name: 'YouTube Video Editor',
    type: 'service',
  },
  {
    endDate: 1463270400000,
    startDate: 1335916800000,
    description:
      'Revolv was a monitoring and control system that allowed users to control their connected devices from a single hub.',
    name: 'Revolv',
    type: 'hardware',
  },
  {
    endDate: 1547164800000,
    startDate: 1443484800000,
    description:
      'Chromecast Audio was a device that allowed users to stream audio from any device to any speaker with an audio input.',
    name: 'Chromecast Audio',
    type: 'hardware',
  },
  {
    endDate: 1552435200000,
    startDate: 1474416000000,
    description:
      'Google Allo was an instant messaging mobile app for Android, iOS, and Web with special features like a virtual assistant and encrypted mode.',
    name: 'Google Allo',
    type: 'app',
  },
  {
    endDate: 1595376000000,
    startDate: 1556668800000,
    description:
      'CallJoy was an Area 120 project that provided phone automation for small-to-mediaum businesses allowing them to train the bot agent with responses to common customer questions.',
    name: 'CallJoy',
    type: 'app',
  },
  {
    endDate: 1450656000000,
    startDate: 1126656000000,
    description:
      'Google Blog Search API was a way to search blogs utilizing Google.',
    name: 'Google Blog Search API',
    type: 'service',
  },
  {
    endDate: 1309564800000,
    startDate: 1260144000000,
    description:
      'Google Real-Time Search provided live search results from Twitter, Facebook, and news websites.',
    name: 'Google Real-Time Search',
    type: 'service',
  },
  {
    endDate: 1554163200000,
    startDate: 1432771200000,
    description:
      'Inbox by Gmail aimed to improve email through several key features.',
    name: 'Inbox by Gmail',
    type: 'service',
  },
  {
    endDate: 1349395200000,
    startDate: 1297209600000,
    description:
      'Sparrow was an email client for OS X and iOS. Google acquired and then killed it.',
    name: 'Sparrow',
    type: 'app',
  },
  {
    endDate: 1164931200000,
    startDate: 1019088000000,
    description: 'Google Answers was an online knowledge market.',
    name: 'Google Answers',
    type: 'service',
  },
  {
    endDate: 1147046400000,
    startDate: 1068422400000,
    description:
      'Google Deskbar was a small inset window on the Windows toolbar and allowed users to perform searches without leaving the desktop.',
    name: 'Google Deskbar',
    type: 'service',
  },
  {
    endDate: 1160438400000,
    startDate: 1122854400000,
    description: 'Writely was a Web-based word processor.',
    name: 'Writely',
    type: 'service',
  },
  {
    endDate: 1196467200000,
    startDate: 1072915200000,
    description:
      'Google Click-to-Call allowed a user to speak directly over the phone to businesses found in search results.',
    name: 'Google Click-to-Call',
    type: 'service',
  },
  {
    endDate: 1372636800000,
    startDate: 1128643200000,
    description: 'Google Reader was a RSS/Atom feed aggregator.',
    name: 'Google Reader',
    type: 'service',
  },
  {
    endDate: 1335744000000,
    startDate: 1251763200000,
    description:
      'Google Wave was an online communication and collaborative real-time editor tool.',
    name: 'Google Wave',
    type: 'service',
  },
  {
    endDate: 1320969600000,
    startDate: 1218326400000,
    description:
      'Google Notebook allowed users to save and organize clips of information while conducting research online.',
    name: 'Google Notebook',
    type: 'service',
  },
  {
    endDate: 1472601600000,
    startDate: 1354060800000,
    description:
      'Web hosting in Google Drive was a method of uploading HTML, CSS and other files in order to publish live web sites.',
    name: 'Web Hosting in Google Drive',
    type: 'service',
  },
  {
    endDate: 1525046400000,
    startDate: 1275264000000,
    description:
      'Encrypted Search provided users with anonymous internet searching.',
    name: 'Encrypted Search',
    type: 'service',
  },
  {
    endDate: 1534723200000,
    startDate: 1286236800000,
    description:
      'Google Goggles was used for searches based on pictures taken by handheld devices.',
    name: 'Google Goggles',
    type: 'service',
  },
  {
    endDate: 1383264000000,
    startDate: 1116460800000,
    description:
      'iGoogle was a customizable Ajax-based start page or personal web portal.',
    name: 'iGoogle',
    type: 'service',
  },
  {
    endDate: 1487203200000,
    startDate: 1463356800000,
    description:
      'Google Spaces was an app for group discussions and messaging.',
    name: 'Google Spaces',
    type: 'service',
  },
  {
    endDate: 1490918400000,
    startDate: 1214179200000,
    description:
      'Google Map Maker was a mapping and map editing service where users were able to draw features directly onto a map.',
    name: 'Google Map Maker',
    type: 'service',
  },
  {
    endDate: 1504224000000,
    startDate: 1172707200000,
    description: 'Trendalyzer was a data trend viewing platform.',
    name: 'Trendalyzer',
    type: 'service',
  },
  {
    endDate: 1444348800000,
    startDate: 1034640000000,
    description:
      'Picasa was an image organizer and image viewer for organizing and editing digital photos.',
    name: 'Picasa',
    type: 'service',
  },
  {
    endDate: 1452816000000,
    startDate: 1111017600000,
    description:
      'Google Code was a service that provided revision control, an issue tracker, and a wiki for code documentation.',
    name: 'Google Code',
    type: 'service',
  },
  {
    endDate: 1467331200000,
    startDate: 1309478400000,
    description:
      'Google Swiffy was a web-based tool that converted SWF files to HTML5.',
    name: 'Google Swiffy',
    type: 'service',
  },
  {
    endDate: 1478217600000,
    startDate: 1130025600000,
    description:
      'Panoramio was a geo-location tagging and photo sharing product.',
    name: 'Panoramio',
    type: 'service',
  },
  {
    endDate: 1429488000000,
    startDate: 1384473600000,
    description:
      'Google Helpouts was an online collaboration service where users could share their expertise through live video.',
    name: 'Google Helpouts',
    type: 'service',
  },
  {
    endDate: 1435622400000,
    startDate: 1220227200000,
    description:
      'Google Moderator was a service that used crowdsourcing to rank user-submitted questions, suggestions and ideas.',
    name: 'Google Moderator',
    type: 'service',
  },
  {
    endDate: 1403481600000,
    startDate: 1182988800000,
    description:
      'Google Questions and Answers was a free knowledge market that allowed users to collaboratively find answers to their questions.',
    name: 'Google Questions and Answers',
    type: 'service',
  },
  {
    endDate: 1412035200000,
    startDate: 1074902400000,
    description:
      'Orkut was a social network designed to help users meet new and old friends and maintain existing relationships.',
    name: 'Orkut',
    type: 'service',
  },
  {
    endDate: 1403654400000,
    startDate: 1379548800000,
    description:
      'Quickoffice was a productivity suite for mobile devices which allowed the viewing, creating and editing of documents, presentations and spreadsheets.',
    name: 'Quickoffice',
    type: 'app',
  },
  {
    endDate: 1391126400000,
    startDate: 1104537600000,
    description:
      'Google Notifier alerted users to new emails on their Gmail account.',
    name: 'Google Notifier',
    type: 'service',
  },
  {
    endDate: 1341964800000,
    startDate: 1126656000000,
    description:
      'Meebo was a browser-based instant messaging application which supported multiple IM services.',
    name: 'Meebo',
    type: 'service',
  },
  {
    endDate: 1356912000000,
    startDate: 1196899200000,
    description:
      'Google Chart API was an interactive Web service that created graphical charts from user-supplied data.',
    name: 'Google Chart API',
    type: 'service',
  },
  {
    endDate: 1356912000000,
    startDate: 1196899200000,
    description:
      'Google Mini was a smaller version of the Google Search Appliance.',
    name: 'Google Mini',
    type: 'hardware',
  },
  {
    endDate: 1546214400000,
    startDate: 1009843200000,
    description:
      'Google Search Appliance was a rack-mounted device that provided document indexing functionality.',
    name: 'Google Search Appliance',
    type: 'hardware',
  },
  {
    endDate: 1553904000000,
    startDate: 1259625600000,
    description:
      'Google URL Shortener, also known as goo.gl, was a URL shortening service.',
    name: 'Google URL Shortener',
    type: 'service',
  },
  {
    endDate: 1323907200000,
    startDate: 1265673600000,
    description:
      'Google Buzz was a social networking, microblogging and messaging tool that integrated with Gmail.',
    name: 'Google Buzz',
    type: 'service',
  },
  {
    endDate: 1314835200000,
    startDate: 1199145600000,
    description:
      "Google Desktop allowed local searches of a user's emails, computer files, music, photos, chats and Web pages viewed.",
    name: 'Google Desktop',
    type: 'service',
  },
  {
    endDate: 1656547200000,
    startDate: 1291593600000,
    description:
      'Google Chrome Apps were hosted or packaged web applications that ran on the Google Chrome browser.',
    name: 'Google Chrome Apps',
    type: 'service',
  },
  {
    endDate: 1158278400000,
    startDate: 1009843200000,
    description:
      'Google Public Service Search provided governmental, non-profit and academic organizational search results without ads.',
    name: 'Google Public Service Search',
    type: 'service',
  },
  {
    endDate: 1186790400000,
    startDate: 1136592000000,
    description:
      'Google Video Marketplace was a service that included a store where videos could be bought and rented.',
    name: 'Google Video Marketplace',
    type: 'service',
  },
  {
    endDate: 1214784000000,
    startDate: 1149724800000,
    description:
      'Google Browser Sync was a Firefox extension that synced information like passwords and browsing history.',
    name: 'Google Browser Sync',
    type: 'service',
  },
  {
    endDate: 1230681600000,
    startDate: 1215475200000,
    description:
      'Google Lively was a web-based virtual environment that provided a new way to access information.',
    name: 'Google Lively',
    type: 'service',
  },
  {
    endDate: 1210809600000,
    startDate: 1028160000000,
    description:
      'Hello was a service by Picasa that let users share pictures "like you\'re sitting side-by-side."',
    name: 'Hello',
    type: 'service',
  },
  {
    endDate: 1227484800000,
    startDate: 1159660800000,
    description:
      'SearchMash was an experimental, non-branded search engine that Google used to be able to play around with new search technologies, concepts and interfaces.',
    name: 'SearchMash',
    type: 'service',
  },
  {
    endDate: 1235779200000,
    startDate: 1056931200000,
    description:
      'Dodgeball was a location-based social network where users texted their location to the service, and it notified them of friends and points of interest nearby.',
    name: 'Dodgeball',
    type: 'service',
  },
  {
    endDate: 1248998400000,
    startDate: 1180483200000,
    description:
      'Google Mashup Editor was an online web mashup creation service with publishing, syntax highlighting, and debugging.',
    name: 'Google Mashup Editor',
    type: 'service',
  },
  {
    endDate: 1256947200000,
    startDate: 1114905600000,
    description:
      'Google Ride Finder was a service that used GPS data to pinpoint and map the location of taxis, limos, and shuttle vehicles available for hire in 10 U.S. metro areas.',
    name: 'Google Ride Finder',
    type: 'service',
  },
  {
    endDate: 1325376000000,
    startDate: 1211241600000,
    description:
      'Google Health was a personal health information centralization service that provided users a merged health record from multiple sources.',
    name: 'Google Health',
    type: 'service',
  },
  {
    endDate: 1345507200000,
    startDate: 930787200000,
    description:
      "Postini was an e-mail, Web security, and archiving service that filtered e-mail spam and malware (before it was delivered to a client's mail server), e-mail archiving.",
    name: 'Postini',
    type: 'service',
  },
  {
    endDate: 1266537600000,
    startDate: 912384000000,
    description:
      'Marratech was a Swedish company that made software for e-meetings (e.g., web conferencing, videoconferencing).',
    name: 'Marratech e-meetings',
    type: 'service',
  },
  {
    endDate: 1267574400000,
    startDate: 1227139200000,
    description:
      'SearchWiki was a Google Search feature which allowed logged-in users to annotate and re-order search results.',
    name: 'Google SearchWiki',
    type: 'service',
  },
  {
    endDate: 1289520000000,
    startDate: 1175817600000,
    description:
      'GOOG-411 (or Google Voice Local Search) was a telephone service that provided a speech-recognition-based business directory search.',
    name: 'GOOG-411',
    type: 'service',
  },
  {
    endDate: 1626307200000,
    startDate: 1372550400000,
    description:
      'Tour Builder allowed users to create and share interactive tours inside Google Earth with photos and videos of locations.',
    name: 'Tour Builder',
    type: 'service',
  },
  {
    endDate: 1292544000000,
    startDate: 1130198400000,
    description:
      'Google Base was a database provided by Google into which any user can add almost any type of content, such as text, images, and structured information.',
    name: 'Google Base',
    type: 'service',
  },
  {
    endDate: 1312070400000,
    startDate: 1021852800000,
    description:
      'Google Labs was a technology playground used by Google to demonstrate and test new projects.',
    name: 'Google Labs',
    type: 'service',
  },
  {
    endDate: 1316131200000,
    startDate: 1254700800000,
    description:
      "Google PowerMeter was a software project of Google's philanthropic arm that helped consumers track their home electricity usage.",
    name: 'Google PowerMeter',
    type: 'service',
  },
  {
    endDate: 1554163200000,
    startDate: 1309219200000,
    description: 'Google+ was an Internet-based social network.',
    name: 'Google+',
    type: 'service',
  },
  {
    endDate: 1391731200000,
    startDate: 1309478400000,
    description:
      'Google Schemer was a Google service for sharing and discovering things to do.',
    name: 'Google Schemer',
    type: 'service',
  },
  {
    endDate: 1376006400000,
    startDate: 1233792000000,
    description:
      'Google Latitude was a location-aware feature of Google Maps, a successor to an earlier SMS-based service Dodgeball.',
    name: 'Google Latitude',
    type: 'service',
  },
  {
    endDate: 1365811200000,
    startDate: 1167609600000,
    description:
      'Picnik was an online photo editing service that allowed users to edit, style, crop, and resize images.',
    name: 'Picnik',
    type: 'service',
  },
  {
    endDate: 1477958400000,
    startDate: 1127433600000,
    description: 'Google Showtimes was a standalone movie search result page.',
    name: 'Google Showtimes',
    type: 'service',
  },
  {
    endDate: 1391126400000,
    startDate: 1238112000000,
    description:
      'Bump! is a discontinued iOS and Android mobile app that enables smartphone users to transfer contact information, photos and files between devices.',
    name: 'Bump!',
    type: 'app',
  },
  {
    endDate: 1475539200000,
    startDate: 1262649600000,
    description:
      "Google Nexus was Google's line of flagship Android phones, tablets, and accessories.",
    name: 'Google Nexus',
    type: 'hardware',
  },
  {
    endDate: 1326585600000,
    startDate: 1138752000000,
    description:
      'Jaiku was a social networking, micro-blogging and lifestreaming service comparable to Twitter.',
    name: 'Jaiku',
    type: 'service',
  },
  {
    endDate: 1335830400000,
    startDate: 1216771200000,
    description:
      'Knol was a Google project that aimed to include user-written articles on a range of topics.',
    name: 'Knol',
    type: 'service',
  },
  {
    endDate: 1421539200000,
    startDate: 1368576000000,
    description:
      'Google Play Edition devices were a series of Android smartphones and tablets sold by Google.',
    name: 'Google Play Edition',
    type: 'hardware',
  },
  {
    endDate: 1456790400000,
    startDate: 1420070400000,
    description:
      'Google Compare allowed consumers to compare several offers ranging from insurance, mortgage, and credit cards.',
    name: 'Google Compare',
    type: 'service',
  },
  {
    endDate: 1301788800000,
    startDate: 1257984000000,
    description:
      'Gizmo5 was a VOIP communications network and a proprietary freeware soft phone for that network.',
    name: 'Gizmo5',
    type: 'service',
  },
  {
    endDate: 1326585600000,
    startDate: 1160006400000,
    description:
      'Google Code Search was a free beta product which allowed users to search for open-source code on the Internet.',
    name: 'Google Code Search',
    type: 'service',
  },
  {
    endDate: 1392595200000,
    startDate: 1373673600000,
    description:
      "SlickLogin was an Israeli start-up company which developed sound-based password alternatives, was acquired by Google and hasn't released anything since.",
    name: 'SlickLogin',
    type: 'service',
  },
  {
    endDate: 1220140800000,
    startDate: 1152748800000,
    description:
      'Google Page Creator was a website creation and hosting service that allowed users to build basic websites with no HTML knowledge.',
    name: 'Google Page Creator',
    type: 'service',
  },
  {
    endDate: 1513296000000,
    startDate: 1417392000000,
    description:
      'Project Tango was an API for augmented reality apps that was killed and replaced by ARCore.',
    name: 'Project Tango',
    type: 'service',
  },
  {
    endDate: 1588550400000,
    startDate: 1412121600000,
    description:
      'Fabric was a platform that helped mobile teams build better apps, understand their users, and grow their business.',
    name: 'Fabric',
    type: 'service',
  },
  {
    endDate: 1372636800000,
    startDate: 1340755200000,
    description:
      'Nexus Q was a digital media player that allowed users with Android devices to stream content from supported services to a connected television or speakers via an integrated amplifier.',
    name: 'Nexus Q',
    type: 'hardware',
  },
  {
    endDate: 1438646400000,
    startDate: 1313452800000,
    description:
      'Google Catalogs was a shopping application that delivered the virtual catalogs of large retailers to users.',
    name: 'Google Catalogs',
    type: 'service',
  },
  {
    endDate: 1302220800000,
    startDate: 1289779200000,
    description:
      'Google Hotpot was a local recommendation engine that allowed people to rate restaurants, hotels, etc. and share them with friends.',
    name: 'Google Hotpot',
    type: 'service',
  },
  {
    endDate: 1314921600000,
    startDate: 1253664000000,
    description:
      'Google Sidewiki was a browser sidebar tool that allowed users to contribute information to any web page.',
    name: 'Google Sidewiki',
    type: 'service',
  },
  {
    endDate: 1354492800000,
    startDate: 1217894400000,
    description:
      'AdSense for Feeds was a RSS-based service for AdSense that allowed publishers to advertise on their RSS Feeds.',
    name: 'AdSense for Feeds',
    type: 'service',
  },
  {
    endDate: 1314921600000,
    startDate: 1236988800000,
    description:
      'Aardvark was a social search service that connected users live with friends or friends-of-friends who were able to answer their questions.',
    name: 'Aardvark',
    type: 'service',
  },
  {
    endDate: 1238371200000,
    startDate: 1191110400000,
    description:
      'Google Shared Stuff was a web page sharing system that allowed users to bookmark pages and share it.',
    name: 'Google Shared Stuff',
    type: 'service',
  },
  {
    endDate: 1199059200000,
    startDate: 978307200000,
    description:
      'Google Zeitgeist was a weekly, monthly, and yearly snapshot in time of what people were searching for on Google all over the world.',
    name: 'Zeitgeist',
    type: 'service',
  },
  {
    endDate: 1472774400000,
    startDate: 1383004800000,
    description:
      'Project Ara was a modular smartphone project under development by Google.',
    name: 'Project Ara',
    type: 'hardware',
  },
  {
    endDate: 1368576000000,
    startDate: 1124668800000,
    description:
      "Often remembered as 'Gchat', Google Talk was a messaging service for both text and voice using XMPP.",
    name: 'Google Talk',
    type: 'service',
  },
  {
    endDate: 1426377600000,
    startDate: 1367280000000,
    description:
      'BebaPay was a form of electronic ticketing platform in Nairobi, Kenya that was developed by Google in partnership with Equity Bank.',
    name: 'BebaPay',
    type: 'service',
  },
  {
    endDate: 1314835200000,
    startDate: 1252886400000,
    description:
      'Google Fast Flip was an online news aggregator, something of a high tech microfiche.',
    name: 'Google Fast Flip',
    type: 'service',
  },
  {
    endDate: 1200787200000,
    startDate: 1115164800000,
    description:
      'Google Web Accelerator was a client-side software that increased the load speed of web pages.',
    name: 'Google Web Accelerator',
    type: 'service',
  },
  {
    endDate: 1539216000000,
    startDate: 1517443200000,
    description:
      'Reply was a mobile app that let users insert Smart Replies (pre-defined replies) into conversations on messaging apps.',
    name: 'Reply',
    type: 'app',
  },
  {
    endDate: 1315180800000,
    startDate: 1243987200000,
    description:
      'Google Squared was an information extraction and relationship extraction product that compiled structured data into a spreadsheet-like format.',
    name: 'Google Squared',
    type: 'service',
  },
  {
    endDate: 1421280000000,
    startDate: 1365984000000,
    description:
      'Google Glass Explorer Edition was a wearable computer with an optical head-mounted display and camera that allows the wearer to interact with various applications and the Internet via natural language voice commands.',
    name: 'Google Glass Explorer Edition',
    type: 'hardware',
  },
  {
    endDate: 1392940800000,
    startDate: 1354233600000,
    description:
      'BufferBox was a Canadian startup that provided consumers 24/7 convenience of picking up their online purchases.',
    name: 'BufferBox',
    type: 'service',
  },
  {
    endDate: 1236729600000,
    startDate: 1104537600000,
    description:
      'Grand Central was a Voice over IP service that was acquired by Google, and turned into Google Voice.',
    name: 'Grand Central',
    type: 'service',
  },
  {
    endDate: 1464048000000,
    startDate: 1414972800000,
    description:
      'Nexus Player was a digital media player that allowed users to play music, watch video originating from Internet services or a local network, and play games.',
    name: 'Nexus Player',
    type: 'hardware',
  },
  {
    endDate: 1351728000000,
    startDate: 1250726400000,
    description:
      'Google Listen was an Android application that let you search, subscribe, download, and stream podcasts and web audio.',
    name: 'Google Listen',
    type: 'app',
  },
  {
    endDate: 1311120000000,
    startDate: 955065600000,
    description:
      'Google Directory was an Internet website directory organized into 14 main categories that allowed users to explore the web.',
    name: 'Google Directory',
    type: 'service',
  },
  {
    endDate: 1321920000000,
    startDate: 1180569600000,
    description:
      'Gears (aka Google Gears) was utility software that aimed to create more powerful web apps by adding offline storage and other additional features to web browsers.',
    name: 'Gears',
    type: 'service',
  },
  {
    endDate: 1370304000000,
    startDate: 1255392000000,
    description:
      'Building Maker enabled users to create 3D models of buildings for Google Earth on the browser.',
    name: 'Building Maker',
    type: 'service',
  },
  {
    endDate: 1312502400000,
    startDate: 1259625600000,
    description:
      'Google Dictionary was a standalone online dictionary service.',
    name: 'Google Dictionary',
    type: 'service',
  },
  {
    endDate: 1330560000000,
    startDate: 1211932800000,
    description:
      'Google Friend Connect was a free social networking site from 2008 to 2012.',
    name: 'Google Friend Connect',
    type: 'service',
  },
  {
    endDate: 1497916800000,
    startDate: 1365638400000,
    description:
      "Glass OS (Google XE) was a version of Google's Android operating system designed for Google Glass.",
    name: 'Glass OS',
    type: 'service',
  },
  {
    endDate: 1535414400000,
    startDate: 1505779200000,
    description:
      'Tez was a mobile payments service by Google, targeted at users in India. It was rebranded to Google Pay.',
    name: 'Tez',
    type: 'service',
  },
  {
    endDate: 1388534400000,
    startDate: 1306368000000,
    description:
      'Google Offers was a service offering discounts and coupons. Initially, it was a deal of the day website similar to Groupon.',
    name: 'Google Offers',
    type: 'service',
  },
  {
    endDate: 1461974400000,
    startDate: 1234396800000,
    description:
      'MyTracks was a GPS tracking application for Android which allowed users to track their path, speed, distance and elevation.',
    name: 'MyTracks',
    type: 'app',
  },
  {
    endDate: 1455753600000,
    startDate: 1370044800000,
    description:
      'Pie was a work-centric group chat website and app comparable to Slack.',
    name: 'Pie',
    type: 'service',
  },
  {
    endDate: 1510704000000,
    startDate: 1142899200000,
    description:
      'Portfolios was a feature available in Google Finance to track personal financial securities.',
    name: 'Google Portfolios',
    type: 'service',
  },
  {
    endDate: 1522540800000,
    startDate: 1226534400000,
    description:
      "Google's Site Search was a service that enabled any website to add a custom search field powered by Google.",
    name: 'Google Site Search',
    type: 'service',
  },
  {
    endDate: 1384905600000,
    startDate: 1323302400000,
    description:
      'Google Currents was a social magazine app by Google, which was replaced by Google Play Newsstand.',
    name: 'Google Currents',
    type: 'app',
  },
  {
    endDate: 1272585600000,
    startDate: 1208044800000,
    description:
      'BumpTop was a skeuomorphic desktop environment app that simulates the normal behavior and physical properties of a real-world desk and enhances it with automatic tools to organize its contents.',
    name: 'BumpTop',
    type: 'service',
  },
  {
    endDate: 1384905600000,
    startDate: 1151452800000,
    description:
      'Google Checkout was an online payment processing service that aimed to simplify the process of paying for online purchases.',
    name: 'Google Checkout',
    type: 'service',
  },
  {
    endDate: 1314921600000,
    startDate: 1136505600000,
    description:
      'Google Pack was a collection of software tools offered by Google to download in a single archive. It was announced at the 2006 Consumer Electronics Show, on January 6. Google Pack was only available for Windows XP, Windows Vista, and Windows 7.',
    name: 'Google Pack',
    type: 'service',
  },
  {
    endDate: 1449792000000,
    startDate: 1325376000000,
    description:
      'Timeful was an iOS to do list and calendar application, developed to reinvent the way that people manage their most precious resource of time.',
    name: 'Timeful',
    type: 'app',
  },
  {
    endDate: 1312070400000,
    startDate: 1172620800000,
    description:
      'Rebang was a Zeitgeist-like service centered on providing service to a Chinese audience. It was incorporated into Google Labs as of late 2010, and later discontinued along with its parent project.',
    name: 'Google Rebang',
    type: 'service',
  },
  {
    endDate: 1330992000000,
    startDate: 1114905600000,
    description:
      'Slide was a photo sharing software for social networking services such as MySpace and Facebook. Later Slide began to make applications and became the largest developer of third-party applications for Facebook.',
    name: 'Slide',
    type: 'service',
  },
  {
    endDate: 1297296000000,
    startDate: 1246406400000,
    description:
      'Real Estate on Google Maps enabled users to find places for sale or rent in an area they were interested in.',
    name: 'Real Estate On Google Maps',
    type: 'service',
  },
  {
    endDate: 1338508800000,
    startDate: 1301616000000,
    description:
      'Needlebase was a point-and-click tool for extracting, sorting and visualizing data from across pages around the web.',
    name: 'Needlebase',
    type: 'service',
  },
  {
    endDate: 1367280000000,
    startDate: 1207526400000,
    description:
      'Google Cloud Connect was a free cloud computing plugin for multiple versions of Microsoft Office that automatically stored and synchronized files to Google Docs.',
    name: 'Google Cloud Connect',
    type: 'service',
  },
  {
    endDate: 1368144000000,
    startDate: 1096588800000,
    description:
      'Google SMS let you text questions- including weather, sports scores, word definitions, and more- to 466453 and get an answer back.',
    name: 'Google SMS',
    type: 'service',
  },
  {
    endDate: 1539648000000,
    startDate: 1473638400000,
    description:
      'Google News & Weather was a news aggregator application available on the Android and iOS operating systems.',
    name: 'Google News & Weather',
    type: 'app',
  },
  {
    endDate: 1309478400000,
    startDate: 1257033600000,
    description:
      "Google Script Converter was an online transliteration tool for transliteration (script conversion) between Hindi, Romanagari and various other scripts. It's ended because Google shut down Google Labs and all associated projects.",
    name: 'Google Script Converter',
    type: 'service',
  },
  {
    endDate: 1345420800000,
    startDate: 1106611200000,
    description:
      'Google Video was a free video hosting service from Google, similar to YouTube, that allowed video clips to be hosted on Google servers and embedded on to other websites.',
    name: 'Google Video',
    type: 'service',
  },
  {
    endDate: 1318464000000,
    startDate: 1292371200000,
    description:
      'ZygoteBody, formerly Google Body, is a web application by Zygote Media Group that renders manipulable 3D anatomical models of the human body.',
    name: 'ZygoteBody',
    type: 'service',
  },
  {
    endDate: 1249430400000,
    startDate: 1225497600000,
    description:
      'Flix Cloud was a high-capacity online video encoding service.',
    name: 'On2 Flix Cloud',
    type: 'service',
  },
  {
    endDate: 1325289600000,
    startDate: 1230768000000,
    description:
      "Noop was a project by Google engineers Alex Eagle and Christian Gruber aiming to develop a new programming language that attempted to blend the best features of 'old' and 'new' languages and best-practices.",
    name: 'Noop Programming Language',
    type: 'service',
  },
  {
    endDate: 1454284800000,
    startDate: 1372636800000,
    description:
      'Google Maps Engine was an online tool for map creation. It enabled you to create layered maps using your own data as well as Google Maps data.',
    name: 'Google Maps Engine',
    type: 'service',
  },
  {
    endDate: 1534291200000,
    startDate: 1460592000000,
    description:
      'Save to Google Chrome Extension enabled you to quickly save a page link with image and tags to a Pocket-like app.',
    name: 'Save to Google Chrome Extension',
    type: 'service',
  },
  {
    endDate: 1334880000000,
    startDate: 1257811200000,
    description:
      'Google Flu Vaccine Finder was a maps mash-up that showed nearby vaccination places across the United States.',
    name: 'Google Flu Vaccine Finder',
    type: 'service',
  },
  {
    endDate: 1334880000000,
    startDate: 1300233600000,
    description:
      'Google One Pass was an online store developed by Google for media publishers looking to sell subscriptions to their content.',
    name: 'Google One Pass',
    type: 'service',
  },
  {
    endDate: 1311120000000,
    startDate: 1258416000000,
    description:
      'Google Image Swirl was an enhancement to the image search tool that came out of Google Labs. It built on top of image search by grouping images with similar visual and semantic qualities.',
    name: 'Google Image Swirl',
    type: 'service',
  },
  {
    endDate: 1486512000000,
    startDate: 1456876800000,
    description:
      "Google Hands Free was a mobile payment system that allowed users to pay their bill using Bluetooth to connect to payment terminals by saying 'I'll pay with Google.'",
    name: 'Google Hands Free',
    type: 'service',
  },
  {
    endDate: 1462147200000,
    startDate: 1172880000000,
    description:
      'Freebase was a large collaborative knowledge base consisting of structured data composed mainly by its community members, developed by Metaweb(acquired by Google).',
    name: 'Freebase',
    type: 'service',
  },
  {
    endDate: 1394755200000,
    startDate: 1343692800000,
    description:
      'Wildfire by Google was a social marketing application that enabled businesses to create, optimize and measure their presence on social networks.',
    name: 'Wildfire Interactive',
    type: 'service',
  },
  {
    endDate: 1462147200000,
    startDate: 1341792000000,
    description:
      'Google Now was a feature of Google Search that offered predictive cards with information and daily updates in Chrome and the Google app for Android and iOS.',
    name: 'Google Now',
    type: 'service',
  },
  {
    endDate: 1440028800000,
    startDate: 1225497600000,
    description:
      'Google Flu Trends was a service attempting to make accurate predictions about flu activity. ',
    name: 'Google Flu Trends',
    type: 'service',
  },
  {
    endDate: 1348704000000,
    startDate: 1217980800000,
    description:
      'Google Insights for Search was a service used to provide data about terms people searched in Google and was merged into Google Trends.',
    name: 'Google Insights for Search',
    type: 'service',
  },
  {
    endDate: 1219881600000,
    startDate: 1161648000000,
    description:
      'Google Send to Phone was an add-on to send links and other information from Firefox to their phone by text message.',
    name: 'Send to Phone',
    type: 'service',
  },
  {
    endDate: 1332892800000,
    startDate: 1114819200000,
    description:
      'Urchin was a web statistics analysis program developed by Urchin Software Corporation. It analyzed web server log file content and displayed the traffic information on that website based upon the log data.',
    name: 'Urchin',
    type: 'service',
  },
  {
    endDate: 1488326400000,
    startDate: 1361404800000,
    description:
      'Chromebook Pixel was a first-of-its-kind laptop built by Google that ran Chrome OS, a Linux kernel-based operating system.',
    name: 'Chromebook Pixel',
    type: 'hardware',
  },
  {
    endDate: 1187308800000,
    startDate: 1156204800000,
    description:
      "The Google Video Player plays back files in Google's own Google Video File (.gvi) media format and supported playlists in 'Google Video Pointer' (.gvp) format.",
    name: 'Google Video Player',
    type: 'service',
  },
  {
    endDate: 1523318400000,
    startDate: 1277942400000,
    description:
      'A service that Google developed for long-tail travel clients. ITA Software will create a new, easier way for users to find better flight information online, which should encourage more users to make their flight purchases online.',
    name: 'qpx-express-API',
    type: 'service',
  },
  {
    endDate: 1454198400000,
    startDate: 1194480000000,
    description:
      'Songza was a free music streaming service that would recommend its users various playlists based on time of day and mood or activity.',
    name: 'Songza',
    type: 'service',
  },
  {
    endDate: 1391212800000,
    startDate: 1285113600000,
    description:
      'Google Chrome Frame was a plugin for Internet Explorer that allowed web pages to be displayed using WebKit and the V8 JavaScript engine.',
    name: 'Google Chrome Frame',
    type: 'service',
  },
  {
    endDate: 1324339200000,
    startDate: 1183248000000,
    description:
      'Apture was a service that allowed publishers and bloggers to link and incorporate multimedia into a dynamic layer above their pages.',
    name: 'Apture',
    type: 'service',
  },
  {
    endDate: 1296432000000,
    startDate: 1280620800000,
    description:
      'fflick was a review, information, and news website that used information from aggregated Tweets to rate movies as positive or negative.',
    name: 'fflick',
    type: 'service',
  },
  {
    endDate: 1404086400000,
    startDate: 1286323200000,
    description:
      'Google TV was a smart TV platform that integrated Android and Chrome to create an interactive television overlay.',
    name: 'Google TV',
    type: 'hardware',
  },
  {
    endDate: 1351641600000,
    startDate: 1289347200000,
    description:
      'Google Refine was a standalone desktop application for data cleanup and transformation to other formats.',
    name: 'Google Refine',
    type: 'service',
  },
  {
    endDate: 1575331200000,
    startDate: 1244505600000,
    description:
      'Google Fusion Tables was a web service for data management that provided a means for visualizing data in different charts, maps, and graphs.',
    name: 'Google Fusion Tables',
    type: 'service',
  },
  {
    endDate: 1259971200000,
    startDate: 1018483200000,
    description:
      'The Google Web APIs were a free SOAP service for doing Google searches so that developers could use the results in almost any way they wanted.',
    name: 'Google Web APIs',
    type: 'service',
  },
  {
    endDate: 1309478400000,
    startDate: 1025481600000,
    description:
      'Google Sets generates a list of items when users enter a few examples. For example, entering "Green, Purple, Red" emits the list "Green, Purple, Red, Blue, Black, White, Yellow, Orange, Brown".',
    name: 'Google Sets',
    type: 'service',
  },
  {
    endDate: 1432252800000,
    startDate: 1304985600000,
    description:
      'Android @ Home allowed a user’s device to discover, connect, and communicate with devices and appliances in the home.',
    name: 'Android @ Home',
    type: 'service',
  },
  {
    endDate: 1477872000000,
    startDate: 1335830400000,
    description:
      'Pixate was a platform for creating sophisticated animations and interactions, and refine your designs through 100% native prototypes for iOS and Android. ',
    name: 'Pixate',
    type: 'app',
  },
  {
    endDate: 1449878400000,
    startDate: 1211932800000,
    description:
      'Google Earth Browser Plug-in allowed developers to embed Google Earth into web pages and included a JavaScript API for custom 3D drawing and interaction.',
    name: 'Google Earth Browser Plug-in',
    type: 'service',
  },
  {
    endDate: 1251763200000,
    startDate: 1121731200000,
    description: 'Google Toolbar for Firefox',
    name: 'Google Toolbar for Firefox',
    type: 'service',
  },
  {
    endDate: 1551916800000,
    startDate: 1433116800000,
    description:
      'Mr. Jingles (aka Google Notification Widget) displayed alerts and notifications from across multiple Google services.',
    name: 'Google Notification Widget (Mr. Jingles)',
    type: 'service',
  },
  {
    endDate: 1547510400000,
    startDate: 1212537600000,
    description:
      'YouTube Video Annotations allowed video creators to add interactive commentary to their videos containing background information, branching ("choose your own adventure" style) stories, or links to any YouTube video, channel, or search results page.',
    name: 'YouTube Video Annotations',
    type: 'service',
  },
  {
    endDate: 1544054400000,
    startDate: 1427846400000,
    description:
      "Google Nearby Notifications were a proximity marketing tool using Bluetooth beacons and location-based data to serve content relevant to an Android user's real-world location.",
    name: 'Google Nearby Notifications',
    type: 'service',
  },
  {
    endDate: 1234396800000,
    startDate: 1215475200000,
    description:
      'Google Audio Ads service allowed advertisers to run campaigns on AM/FM radio stations in US using the AdWords interface.',
    name: 'Google Audio Ads',
    type: 'service',
  },
  {
    endDate: 1421193600000,
    startDate: 1291593600000,
    description:
      "Word Lens translated text in real time on images by using the viewfinder of a device's camera without the need of an internet connection; The technology was rolled into Google Translate.",
    name: 'Word Lens',
    type: 'app',
  },
  {
    endDate: 1559088000000,
    startDate: 1340755200000,
    description:
      'Google Cloud Messaging (GCM) was a notification service that enabled developers to send messages between servers and client apps running on Android or Chrome.',
    name: 'Google Cloud Messaging (GCM)',
    type: 'service',
  },
  {
    endDate: 1547510400000,
    startDate: 1363651200000,
    description:
      'Google Realtime API provided ways to synchronise resources between devices. It operated on files stored on Google Drive.',
    name: 'Google Realtime API',
    type: 'service',
  },
  {
    endDate: 1555977600000,
    startDate: 1427068800000,
    description:
      "Data Saver was an extension for Chrome that routed web pages through Google servers to compress and reduce the user's bandwidth.",
    name: 'Data Saver Extension for Chrome',
    type: 'service',
  },
  {
    endDate: 1384128000000,
    startDate: 1291852800000,
    description:
      'Google Trader was a classifieds service run by Google in Ghana, Uganda, Kenya and Nigeria to help customers trade goods and services online.',
    name: 'Google Trader',
    type: 'service',
  },
  {
    endDate: 1567209600000,
    startDate: 1403481600000,
    description:
      'Works with Nest was an API that allowed external services to access and control Nest devices. This enabled the devices to be used with third-party home automation platforms and devices.',
    name: 'Works with Nest API',
    type: 'service',
  },
  {
    endDate: 1561680000000,
    startDate: 1432771200000,
    description:
      'Google Jump was a cloud-based VR media solution that enabled 3D-360 media production by integrating customized capture solutions with best-in-class automated stitching.',
    name: 'Google Jump',
    type: 'service',
  },
  {
    endDate: 1522454400000,
    startDate: 1270080000000,
    description:
      'reCAPTCHA Mailhide allowed users to mask their email address behind a captcha to prevent robots from scraping the email and sending spam.',
    name: 'reCAPTCHA Mailhide',
    type: 'service',
  },
  {
    endDate: 1559174400000,
    startDate: 1440547200000,
    description:
      'YouTube Gaming was a video gaming-oriented service and app for videos and live streaming.',
    name: 'YouTube Gaming',
    type: 'service',
  },
  {
    endDate: 1564963200000,
    startDate: 1474243200000,
    description:
      "Google Trips was a mobile app that allowed users to plan for upcoming travel by facilitating flight, hotel, car, and restaurant reservations from user's email alongside summarized info about the user's destination.",
    name: 'Google Trips',
    type: 'app',
  },
  {
    endDate: 1560470400000,
    startDate: 1491955200000,
    description:
      'Areo was a mobile app that allowed users in Bangalore, Mumbai, Delhi, Gurgaon, and Pune to order meals from nearby restaurants or schedule appointments with local service professionals, including electricians, painters, cleaners, plumbers, and more.',
    name: 'Areo',
    type: 'app',
  },
  {
    endDate: 1564617600000,
    startDate: 1316476800000,
    description:
      'Hangouts on Air allowed users to host a multi-user video call while recording and streaming the call on YouTube.',
    name: 'Hangouts on Air',
    type: 'service',
  },
  {
    endDate: 1575417600000,
    startDate: 1244419200000,
    description:
      'Google Translator Toolkit was a web application which allowed translators to edit and manage translations generated by Google Translate.',
    name: 'Google Translator Toolkit',
    type: 'service',
  },
  {
    endDate: 1569801600000,
    startDate: 1366243200000,
    description:
      'G Suite Training (previously known as Synergyse) provided interactive and video-based training for 20 Google G Suite products in nine languages through a website and a Chrome extension.',
    name: 'G Suite Training',
    type: 'service',
  },
  {
    endDate: 1459468800000,
    startDate: 1449446400000,
    description:
      'uWeave (pronounced “micro weave”) was an implementation of the Weave protocol intended for use on microcontroller based devices.',
    name: 'uWeave',
    type: 'app',
  },
  {
    endDate: 1467244800000,
    startDate: 1383264000000,
    description:
      'Google Wallet Card was a prepaid debit card that let users pay for things in person and online using their Wallet balance at any retailer that accepted MasterCard.',
    name: 'Google Wallet Card',
    type: 'hardware',
  },
  {
    endDate: 1640908800000,
    startDate: 1287532800000,
    description:
      'AngularJS was a JavaScript open-source front-end web framework based on MVC pattern using a dependency injection technique.',
    name: 'AngularJS',
    type: 'service',
  },
  {
    endDate: 1577750400000,
    startDate: 1348704000000,
    description:
      'Field Trip was a mobile app that acted as a virtual tour guide by cross referencing multiple sources of information to provide users information about points of interest near them.',
    name: 'Field Trip',
    type: 'app',
  },
  {
    endDate: 1596153600000,
    startDate: 1548288000000,
    description:
      'Focals were a custom-built smart glasses product with a transparent, holographic display that allowed users to read and respond to text messages, navigate turn-by-turn directions, check the weather, and integrate with third-party services like Uber and Amazon Alexa.',
    name: 'Focals by North',
    type: 'hardware',
  },
  {
    endDate: 1562284800000,
    startDate: 1533081600000,
    description:
      "Dragonfly was a search engine designed to be compatible with China's state censorship provisions.",
    name: 'Dragonfly',
    type: 'service',
  },
  {
    endDate: 1334880000000,
    startDate: 1313539200000,
    description:
      'Google Related was introduced to be an experimental navigation assistant launched to help people find useful and interesting information while surfing the web.',
    name: 'Google Related',
    type: 'service',
  },
  {
    endDate: 1580774400000,
    startDate: 1355270400000,
    description:
      'Google Fiber TV was an IPTV service that was bundled with Google Fiber.',
    name: 'Google Fiber TV',
    type: 'service',
  },
  {
    endDate: 1569888000000,
    startDate: 1384992000000,
    description:
      'Message Center is a web console where Gmail users view and manage spam email messages.',
    name: 'Message Center',
    type: 'service',
  },
  {
    endDate: 1525737600000,
    startDate: 1384905600000,
    description:
      'Google Play Newsstand was a news aggregator and digital newsstand service.',
    name: 'Google Play Newsstand',
    type: 'app',
  },
  {
    endDate: 1475193600000,
    startDate: 1440028800000,
    description:
      'Together was a watch face for Android Wear that let two users link their watches together to share small visual messages.',
    name: 'Together',
    type: 'app',
  },
  {
    endDate: 1370563200000,
    startDate: 1310342400000,
    description:
      'Punchd was a digital loyalty card app and service targeted towards small businesses that originated as a student project at Cal Poly in 2009 and was acquired by Google in 2011.',
    name: 'Punchd',
    type: 'service',
  },
  {
    endDate: 1580947200000,
    startDate: 1297123200000,
    description:
      'Androidify allowed users to create a custom Android avatar of for themselves and for others.',
    name: 'Androidify',
    type: 'app',
  },
  {
    endDate: 1606780800000,
    startDate: 1480896000000,
    description:
      'Trusted Contacts was an app that allowed users to share their location and view the location of specific users.',
    name: 'Trusted Contacts',
    type: 'app',
  },
  {
    endDate: 1483228800000,
    startDate: 1267574400000,
    description:
      'Google Gesture Search allowed users to search contacts, applications, settings, music and bookmark on their Android device by drawing letters or numbers onto the screen.',
    name: 'Gesture Search',
    type: 'app',
  },
  {
    endDate: 1603065600000,
    startDate: 1510704000000,
    description:
      'Nest Secure was a security system with an alarm, keypad, and motion sensor with embedded microphone.',
    name: 'Nest Secure',
    type: 'hardware',
  },
  {
    endDate: 1625011200000,
    startDate: 1438387200000,
    description:
      'Expeditions is a program for providing virtual reality experiences to school classrooms through Google Cardboard viewers, allowing educators to take their students on virtual field trips.',
    name: 'Expeditions',
    type: 'app',
  },
  {
    endDate: 1607644800000,
    startDate: 1463961600000,
    description:
      "Science Journal was a mobile app that helped you run science experiments with your smartphone using the device's onboard sensors.",
    name: 'Science Journal',
    type: 'app',
  },
  {
    endDate: 1625011200000,
    startDate: 1525824000000,
    description:
      'Tour Creator allowed users to build immersive, 360° guided tours that could be viewed with VR devices.',
    name: 'Tour Creator',
    type: 'app',
  },
  {
    endDate: 1573084800000,
    startDate: 1560384000000,
    description:
      'Game Builder was a multiplayer 3D game environment for creating new games without coding experience.',
    name: 'Game Builder',
    type: 'app',
  },
  {
    endDate: 1625011200000,
    startDate: 1509494400000,
    description:
      'Poly was a distribution platform for creators to share 3D objects.',
    name: 'Poly',
    type: 'service',
  },
  {
    endDate: 1607904000000,
    startDate: 1512950400000,
    description:
      'Google Home Max was a large, stereo smart speaker with two tweeters and subwoofers, aux input, and a USB-C input (for wired ethernet) featuring Smart Sound machine learning technology.',
    name: 'Google Home Max',
    type: 'hardware',
  },
  {
    endDate: 1622419200000,
    startDate: 1376784000000,
    description:
      'Timely Alarm Clock was an Android application providing alarm, stopwatch and timer functionality with synchronisation across devices.',
    name: 'Timely',
    type: 'app',
  },
  {
    endDate: 1611273600000,
    startDate: 1402704000000,
    description:
      "Loon was a service to provide internet access via an array of high-altitude balloons hovering in the Earth's stratosphere",
    name: 'Loon',
    type: 'service',
  },
  {
    endDate: 1613088000000,
    startDate: 1524355200000,
    description:
      'Swift for TensorFlow (S4TF) was a next-generation platform for machine learning with a focus on differentiable programming.',
    name: 'Swift for TensorFlow',
    type: 'service',
  },
  {
    endDate: 1632960000000,
    startDate: 1128902400000,
    description:
      'Google Bookmarks was a private web-based bookmarking service not integrated with any other Google services.',
    name: 'Google Bookmarks',
    type: 'service',
  },
  {
    endDate: 1639612800000,
    startDate: 1525737600000,
    description:
      "Material Gallery is a collaboration tool for UI designers, optimized for Google's Material Design, with mobile preview apps and a Sketch plugin.",
    name: 'Material Gallery',
    type: 'service',
  },
  {
    endDate: 1651363200000,
    startDate: 1156723200000,
    description:
      "G Suite (Legacy Free Edition) was a free tier offering some of the services included in Google's productivity suite.",
    name: 'G Suite (Legacy Free Edition)',
    type: 'service',
  },
  {
    endDate: 1633046400000,
    startDate: 1498867200000,
    description:
      'Backup and Sync was a desktop software tool for Windows and MacOS that allowed users to sync files from Google Drive to their local machine.',
    name: 'Backup and Sync',
    type: 'app',
  },
  {
    endDate: 1640908800000,
    startDate: 1512086400000,
    description:
      'Streams was a "clinician support app" which aimed to improve clinical decision-making and patient safety across hospitals in the United Kingdom.',
    name: 'Streams',
    type: 'app',
  },
  {
    endDate: 1672444800000,
    startDate: 1472688000000,
    description:
      'YouTube Originals was a variety of original content including scripted series, educational videos, and music and celebrity programming.',
    name: 'YouTube Originals',
    type: 'service',
  },
  {
    endDate: 1636070400000,
    startDate: 1574121600000,
    description:
      "Your News Update was a service that offed an audio digest of a mix of short news stories chosen in that moment based on a user's interests, location, user history, and preferences, as well as the top news stories out there.",
    name: 'Your News Update',
    type: 'service',
  },
  {
    name: 'Google Pinyin IME',
    startDate: 1175644800000,
    endDate: 1543536000000,
    link: 'https://en.wikipedia.org/wiki/Google_Pinyin',
    description:
      'Google Pinyin IME was an input method that allowed users on multiple operating systems to input characters from pinyin, the romanization of Standard Mandarin Chinese.',
    type: 'service',
  },
  {
    name: 'VR180 Creator',
    startDate: 1529020800000,
    endDate: 1627689600000,
    link: 'https://ubunlog.com/en/vr180-creator-edito-videovr/',
    description:
      'VR180 Creator allowed users to edit video taken on 180 degree and 360 degree devices on multiple operating systems.',
    type: 'app',
  },
  {
    name: 'Google Sites (Classic)',
    startDate: 1204156800000,
    endDate: 1638230400000,
    link: 'https://en.wikipedia.org/wiki/Google_Sites',
    description:
      'Google Sites (Classic) allowed users to build and edit websites and wiki portals for private and public use.',
    type: 'service',
  },
  {
    name: 'Playground AR',
    startDate: 1512950400000,
    endDate: 1597881600000,
    link: 'https://www.xda-developers.com/google-no-longer-offer-playground-ar-stickers-future-pixel-phones-starting-pixel-4a/',
    description:
      'Playground AR (aka AR Stickers) allowed users to place virtual characters and objects in augmented reality via the Camera App on Pixel phones.',
    type: 'app',
  },
  {
    name: 'Personal Blocklist',
    startDate: 1296518400000,
    endDate: 1564617600000,
    link: 'https://searchengineland.com/google-finally-discontinues-the-blocked-sites-feature-152885',
    description:
      'Personal Blocklist was a Chrome Web Extension by Google that allowed users to block certain websites from appearing in Google search results.',
    type: 'service',
  },
  {
    name: 'AdSense (mobile app)',
    startDate: 1375228800000,
    endDate: 1577750400000,
    link: 'https://9to5google.com/2019/07/15/google-killing-adsense-apps/',
    description:
      'AdSense (mobile app) allowed users to manage their AdSense accounts in a native app for iOS and Android.',
    type: 'app',
  },
  {
    name: 'YouTube for PS Vita',
    startDate: 1340668800000,
    endDate: 1426809600000,
    link: 'https://www.ign.com/articles/2015/01/28/sony-to-end-ps-vita-support-for-maps-near-and-youtube',
    description:
      'YouTube for PlayStation Vita was a native YouTube browsing and viewing application for the PS Vita and PSTV game consoles.',
    type: 'app',
  },
  {
    name: 'Posts on Google',
    startDate: 1337126400000,
    endDate: 1627689600000,
    link: 'https://www.seroundtable.com/google-posts-knowledge-panels-discontinued-31755.html',
    description:
      'Posts on Google allowed notable individuals with knowledge graph panels to author specific content that would appear in Google Search results. ',
    type: 'service',
  },
  {
    name: 'YouTube Community Contributions',
    startDate: 1451606400000,
    endDate: 1601251200000,
    link: 'https://www.engadget.com/youtube-community-contributions-saying-goodbye-141205281.html',
    description:
      'YouTube Community Contributions allowed users to contribute translations for video titles or submit descriptions, closed captions or subtitles on YouTube content.',
    type: 'service',
  },
  {
    name: 'Google Currents (2019)',
    startDate: 1554854400000,
    endDate: 1680220800000,
    link: 'https://www.theverge.com/2022/2/10/22928042/google-plus-replacement-wind-down-currents-spaces',
    description:
      'Google Currents was service that provided social media features similar to Google+ for Google Workspace customers.',
    type: 'service',
  },
  {
    name: 'Google Assistant Snapshot',
    startDate: 1531785600000,
    endDate: 1649808000000,
    link: 'https://www.droid-life.com/2022/03/03/googles-assistant-snapshot-is-going-away/',
    description:
      'Google Assistant Snapshot was the successor to Google Now that provided predictive cards with information and daily updates in the Google app for Android and iOS.',
    type: 'service',
  },
  {
    name: 'Google Cloud Prediction API',
    startDate: 1275264000000,
    endDate: 1525046400000,
    link: 'https://www.infoq.com/news/2017/06/google-drops-prediction-api/',
    description:
      'Google Cloud Prediction API was a PaaS for machine learning (ML) functionality to help developers build ML models to create application features such as recommendation systems, spam detection, and purchase prediction.',
    type: 'service',
  },
].sort((p1, p2) => p1.startDate - p2.startDate);

export const musicData = [
  {
    year: 1973,
    vinyl: 1.436,
    cd: 0,
    streaming: 0,
    cassette: 0.5806,
    download: 0,
  },
  {
    year: 1974,
    vinyl: 1.55,
    cd: 0,
    streaming: 0,
    cassette: 0.6497,
    download: 0,
  },
  {
    year: 1975,
    vinyl: 1.6965,
    cd: 0,
    streaming: 0,
    cassette: 0.692,
    download: 0,
  },
  {
    year: 1976,
    vinyl: 1.9081,
    cd: 0,
    streaming: 0,
    cassette: 0.829,
    download: 0,
  },
  {
    year: 1977,
    vinyl: 2.4402,
    cd: 0,
    streaming: 0,
    cassette: 1.0606,
    download: 0,
  },
  {
    year: 1978,
    vinyl: 2.7336,
    cd: 0,
    streaming: 0,
    cassette: 1.3978,
    download: 0,
  },
  {
    year: 1979,
    vinyl: 2.4106,
    cd: 0,
    streaming: 0,
    cassette: 1.2649,
    download: 0,
  },
  {
    year: 1980,
    vinyl: 2.45,
    cd: 0,
    streaming: 0,
    cassette: 1.232,
    download: 0,
  },
  {
    year: 1981,
    vinyl: 2.5981,
    cd: 0,
    streaming: 0,
    cassette: 1.3758,
    download: 0,
  },
  {
    year: 1982,
    vinyl: 2.2081,
    cd: 0,
    streaming: 0,
    cassette: 1.4205,
    download: 0,
  },
  {
    year: 1983,
    vinyl: 1.9583,
    cd: 0.0172,
    streaming: 0,
    cassette: 1.8109,
    download: 0,
  },
  {
    year: 1984,
    vinyl: 1.8475,
    cd: 0.1033,
    streaming: 0,
    cassette: 2.3839,
    download: 0,
  },
  {
    year: 1985,
    vinyl: 1.5615,
    cd: 0.3895,
    streaming: 0,
    cassette: 2.4115,
    download: 0,
  },
  {
    year: 1986,
    vinyl: 1.2111,
    cd: 0.9301,
    streaming: 0,
    cassette: 2.4995,
    download: 0,
  },
  {
    year: 1987,
    vinyl: 0.9964,
    cd: 1.5936,
    streaming: 0,
    cassette: 2.974,
    download: 0,
  },
  {
    year: 1988,
    vinyl: 0.7126,
    cd: 2.0997,
    streaming: 0,
    cassette: 3.4424,
    download: 0,
  },
  {
    year: 1989,
    vinyl: 0.3367,
    cd: 2.7024,
    streaming: 0,
    cassette: 3.5404,
    download: 0,
  },
  {
    year: 1990,
    vinyl: 0.1809,
    cd: 3.6299,
    streaming: 0,
    cassette: 3.7303,
    download: 0,
  },
  {
    year: 1991,
    vinyl: 0.0933,
    cd: 4.4909,
    streaming: 0,
    cassette: 3.25,
    download: 0,
  },
  {
    year: 1992,
    vinyl: 0.0799,
    cd: 5.529,
    streaming: 0,
    cassette: 3.4151,
    download: 0,
  },
  {
    year: 1993,
    vinyl: 0.0618,
    cd: 6.7705,
    streaming: 0,
    cassette: 3.2143,
    download: 0,
  },
  {
    year: 1994,
    vinyl: 0.065,
    cd: 8.7517,
    streaming: 0,
    cassette: 3.2513,
    download: 0,
  },
  {
    year: 1995,
    vinyl: 0.0718,
    cd: 9.7086,
    streaming: 0,
    cassette: 2.5399,
    download: 0,
  },
  {
    year: 1996,
    vinyl: 0.0843,
    cd: 10.3549,
    streaming: 0,
    cassette: 2.0946,
    download: 0,
  },
  {
    year: 1997,
    vinyl: 0.0689,
    cd: 10.5117,
    streaming: 0,
    cassette: 1.6562,
    download: 0,
  },
  {
    year: 1998,
    vinyl: 0.0597,
    cd: 12.1372,
    streaming: 0,
    cassette: 1.5143,
    download: 0,
  },
  {
    year: 1999,
    vinyl: 0.0597,
    cd: 13.4154,
    streaming: 0,
    cassette: 1.1096,
    download: 0,
  },
  {
    year: 2000,
    vinyl: 0.054,
    cd: 13.6391,
    streaming: 0,
    cassette: 0.6306,
    download: 0,
  },
  {
    year: 2001,
    vinyl: 0.0588,
    cd: 13.324,
    streaming: 0,
    cassette: 0.3581,
    download: 0,
  },
  {
    year: 2002,
    vinyl: 0.0454,
    cd: 12.3606,
    streaming: 0,
    cassette: 0.2082,
    download: 0,
  },
  {
    year: 2003,
    vinyl: 0.0432,
    cd: 11.7031,
    streaming: 0,
    cassette: 0.1081,
    download: 0,
  },
  {
    year: 2004,
    vinyl: 0.0392,
    cd: 12.0918,
    streaming: 0.0069,
    cassette: 0.0237,
    download: 0.1835,
  },
  {
    year: 2005,
    vinyl: 0.0274,
    cd: 11.1545,
    streaming: 0.1709,
    cassette: 0.0131,
    download: 0.9243,
  },
  {
    year: 2006,
    vinyl: 0.0256,
    cd: 9.8393,
    streaming: 0.2407,
    cassette: 0.0037,
    download: 1.65,
  },
  {
    year: 2007,
    vinyl: 0.0269,
    cd: 7.9558,
    streaming: 0.272,
    cassette: 0.003,
    download: 2.3924,
  },
  {
    year: 2008,
    vinyl: 0.0596,
    cd: 5.7064,
    streaming: 0.323,
    cassette: 0.0009,
    download: 2.6859,
  },
  {
    year: 2009,
    vinyl: 0.0663,
    cd: 4.5355,
    streaming: 0.3629,
    cassette: 0,
    download: 2.66,
  },
  {
    year: 2010,
    vinyl: 0.0912,
    cd: 3.5725,
    streaming: 0.4631,
    cassette: 0,
    download: 2.6934,
  },
  {
    year: 2011,
    vinyl: 0.124,
    cd: 3.257,
    streaming: 0.6554,
    cassette: 0,
    download: 2.9018,
  },
  {
    year: 2012,
    vinyl: 0.1655,
    cd: 2.607,
    streaming: 1.0362,
    cassette: 0,
    download: 3.0162,
  },
  {
    year: 2013,
    vinyl: 0.2137,
    cd: 2.2501,
    streaming: 1.4608,
    cassette: 0,
    download: 2.9203,
  },
  {
    year: 2014,
    vinyl: 0.2493,
    cd: 1.8725,
    streaming: 1.8352,
    cassette: 0,
    download: 2.5531,
  },
  {
    year: 2015,
    vinyl: 0.3391,
    cd: 1.5231,
    streaming: 2.3421,
    cassette: 0,
    download: 2.3107,
  },
  {
    year: 2016,
    vinyl: 0.3603,
    cd: 1.192,
    streaming: 4.0019,
    cassette: 0,
    download: 1.8294,
  },
  {
    year: 2017,
    vinyl: 0.3946,
    cd: 1.1009,
    streaming: 5.7167,
    cassette: 0,
    download: 1.3853,
  },
  {
    year: 2018,
    vinyl: 0.4245,
    cd: 0.7303,
    streaming: 7.4368,
    cassette: 0,
    download: 1.0173,
  },
  {
    year: 2019,
    vinyl: 0.5044,
    cd: 0.6439,
    streaming: 8.9132,
    cassette: 0,
    download: 0.8326,
  },
];

export const brushChartData = [
  {
    year: 1961,
    bra: 15.036353,
    can: 16.730306,
    chn: 109.659976,
    fra: 20.802475,
    idn: 14.3671,
    ind: 87.376496,
    rus: null,
    usa: 163.619978,
  },
  {
    year: 1962,
    bra: 15.918336,
    can: 29.26125,
    chn: 120.421293,
    fra: 25.305105,
    idn: 16.2469,
    ind: 87.257552,
    rus: null,
    usa: 162.45578,
  },
  {
    year: 1963,
    bra: 16.616892,
    can: 34.122307,
    chn: 137.456233,
    fra: 25.367307,
    idn: 13.9528,
    ind: 90.373008,
    rus: null,
    usa: 174.812487,
  },
  {
    year: 1964,
    bra: 16.469226,
    can: 28.504578,
    chn: 152.356625,
    fra: 26.05047,
    idn: 16.0746,
    ind: 93.706,
    rus: null,
    usa: 160.937079,
  },
  {
    year: 1965,
    bra: 20.350793,
    can: 32.228771,
    chn: 162.156281,
    fra: 29.130754,
    idn: 15.3395,
    ind: 79.699504,
    rus: null,
    usa: 183.602617,
  },
  {
    year: 1966,
    bra: 17.867924,
    can: 38.663261,
    chn: 177.613486,
    fra: 26.737646,
    idn: 17.3674,
    ind: 80.137608,
    rus: null,
    usa: 184.44488,
  },
  {
    year: 1967,
    bra: 20.322328,
    can: 30.080426,
    chn: 181.182167,
    fra: 32.345675,
    idn: 15.591101,
    ind: 95.453504,
    rus: null,
    usa: 208.158055,
  },
  {
    year: 1968,
    bra: 20.418801,
    can: 34.413439,
    chn: 177.133015,
    fra: 33.237542,
    idn: 20.32885,
    ind: 102.443708,
    rus: null,
    usa: 202.538423,
  },
  {
    year: 1969,
    bra: 20.54986,
    can: 35.922333,
    chn: 176.486754,
    fra: 33.115628,
    idn: 20.31308,
    ind: 106.291244,
    rus: null,
    usa: 205.28817,
  },
  {
    year: 1970,
    bra: 23.698316,
    can: 28.560715,
    chn: 200.836854,
    fra: 31.44342,
    idn: 22.15622,
    ind: 113.909504,
    rus: null,
    usa: 186.860751,
  },
  {
    year: 1971,
    bra: 22.814265,
    can: 38.85975,
    chn: 212.14276,
    fra: 36.98861,
    idn: 22.79649,
    ind: 113.238296,
    rus: null,
    usa: 237.624461,
  },
  {
    year: 1972,
    bra: 22.703928,
    can: 35.466355,
    chn: 206.516977,
    fra: 40.48182,
    idn: 21.64798,
    ind: 108.615456,
    rus: null,
    usa: 228.117866,
  },
  {
    year: 1973,
    bra: 23.721606,
    can: 36.600202,
    chn: 221.853449,
    fra: 43.053408,
    idn: 25.1793,
    ind: 119.648216,
    rus: null,
    usa: 237.683006,
  },
  {
    year: 1974,
    bra: 26.240014,
    can: 30.864826,
    chn: 234.63687,
    fra: 41.069978,
    idn: 25.483788,
    ind: 106.793,
    rus: null,
    usa: 204.617505,
  },
  {
    year: 1975,
    bra: 26.238419,
    can: 37.107574,
    chn: 244.525529,
    fra: 35.73189,
    idn: 25.24209,
    ind: 127.8078,
    rus: null,
    usa: 249.283743,
  },
  {
    year: 1976,
    bra: 31.1432,
    can: 44.710278,
    chn: 250.213735,
    fra: 32.72907,
    idn: 25.873084,
    ind: 121.625108,
    rus: null,
    usa: 258.200097,
  },
  {
    year: 1977,
    bra: 30.913834,
    can: 42.239008,
    chn: 243.286035,
    fra: 39.31614,
    idn: 26.489786,
    ind: 138.062904,
    rus: null,
    usa: 266.014469,
  },
  {
    year: 1978,
    bra: 24.033646,
    can: 41.895782,
    chn: 273.038118,
    fra: 45.454526,
    idn: 29.8008,
    ind: 142.964696,
    rus: null,
    usa: 276.602542,
  },
  {
    year: 1979,
    bra: 27.147322,
    can: 35.955,
    chn: 292.727509,
    fra: 44.266904,
    idn: 29.888191,
    ind: 126.470304,
    rus: null,
    usa: 302.62558,
  },
  {
    year: 1980,
    bra: 33.217492,
    can: 41.3647,
    chn: 280.287437,
    fra: 48.024778,
    idn: 33.642843,
    ind: 140.4906,
    rus: null,
    usa: 269.883982,
  },
  {
    year: 1981,
    bra: 32.050567,
    can: 50.8622,
    chn: 286.450038,
    fra: 45.9417,
    idn: 37.283478,
    ind: 147.583816,
    rus: null,
    usa: 330.889528,
  },
  {
    year: 1982,
    bra: 33.838263,
    can: 53.333208,
    chn: 315.36405,
    fra: 48.6685,
    idn: 36.818521,
    ind: 136.101404,
    rus: null,
    usa: 333.103755,
  },
  {
    year: 1983,
    bra: 29.197566,
    can: 47.447208,
    chn: 345.626506,
    fra: 46.397398,
    idn: 40.389883,
    ind: 166.781704,
    rus: null,
    usa: 207.657604,
  },
  {
    year: 1984,
    bra: 32.711289,
    can: 42.793504,
    chn: 365.937335,
    fra: 58.14429,
    idn: 43.424273,
    ind: 164.4776,
    rus: null,
    usa: 314.7495,
  },
  {
    year: 1985,
    bra: 36.011139,
    can: 48.2393,
    chn: 339.877377,
    fra: 55.68418,
    idn: 43.362447,
    ind: 165.682196,
    rus: null,
    usa: 347.118216,
  },
  {
    year: 1986,
    bra: 37.2984,
    can: 56.9647,
    chn: 352.084647,
    fra: 50.373694,
    idn: 45.647142,
    ind: 164.955216,
    rus: null,
    usa: 315.331216,
  },
  {
    year: 1987,
    bra: 44.148398,
    can: 51.6352,
    chn: 359.240676,
    fra: 52.939096,
    idn: 45.233872,
    ind: 156.1145,
    rus: null,
    usa: 280.494047,
  },
  {
    year: 1988,
    bra: 42.905037,
    can: 35.4942,
    chn: 351.82429,
    fra: 56.071405,
    idn: 48.328093,
    ind: 183.867008,
    rus: null,
    usa: 206.5281,
  },
  {
    year: 1989,
    bra: 43.93441,
    can: 48.089308,
    chn: 367.63608,
    fra: 57.603036,
    idn: 50.918096,
    ind: 199.413216,
    rus: null,
    usa: 284.238058,
  },
  {
    year: 1990,
    bra: 32.49039,
    can: 56.806235,
    chn: 404.719096,
    fra: 55.110621,
    idn: 51.91278,
    ind: 193.919312,
    rus: null,
    usa: 312.410604,
  },
  {
    year: 1991,
    bra: 36.682063,
    can: 53.8523,
    chn: 398.896071,
    fra: 60.262166,
    idn: 50.944146,
    ind: 193.101196,
    rus: null,
    usa: 280.063391,
  },
  {
    year: 1992,
    bra: 44.057994,
    can: 49.64265,
    chn: 404.275226,
    fra: 60.473755,
    idn: 56.235467,
    ind: 201.468404,
    rus: 103.79399,
    usa: 353.025147,
  },
  {
    year: 1993,
    bra: 43.073467,
    can: 51.4831,
    chn: 407.930462,
    fra: 55.422572,
    idn: 54.640825,
    ind: 208.6269,
    rus: 96.225194,
    usa: 259.105342,
  },
  {
    year: 1994,
    bra: 45.845332,
    can: 46.6185,
    chn: 396.46012,
    fra: 53.185122,
    idn: 53.51038,
    ind: 211.9414,
    rus: 78.650928,
    usa: 355.934924,
  },
  {
    year: 1995,
    bra: 49.641823,
    can: 49.3442,
    chn: 418.664201,
    fra: 53.284874,
    idn: 57.990042,
    ind: 210.0125,
    rus: 61.90184,
    usa: 277.60121,
  },
  {
    year: 1996,
    bra: 42.43696,
    can: 58.4941,
    chn: 453.4393,
    fra: 62.25351,
    idn: 60.408927,
    ind: 218.7509,
    rus: 67.441814,
    usa: 335.780123,
  },
  {
    year: 1997,
    bra: 44.87482,
    can: 49.6069,
    chn: 445.931409,
    fra: 63.031639,
    idn: 58.147907,
    ind: 223.2324,
    rus: 86.710503,
    usa: 336.582161,
  },
  {
    year: 1998,
    bra: 40.742023,
    can: 50.9845,
    chn: 458.394739,
    fra: 67.947149,
    idn: 59.406188,
    ind: 226.877,
    rus: 46.853327,
    usa: 349.425744,
  },
  {
    year: 1999,
    bra: 47.631962,
    can: 54.1126,
    chn: 455.192431,
    fra: 64.264518,
    idn: 60.070424,
    ind: 236.205608,
    rus: 53.778631,
    usa: 335.364364,
  },
  {
    year: 2000,
    bra: 46.527202,
    can: 51.0904,
    chn: 407.336509,
    fra: 65.732235,
    idn: 61.575,
    ind: 234.931192,
    rus: 64.242691,
    usa: 342.631506,
  },
  {
    year: 2001,
    bra: 57.125393,
    can: 43.3914,
    chn: 398.396811,
    fra: 60.300838,
    idn: 59.808,
    ind: 242.963796,
    rus: 83.303483,
    usa: 324.994634,
  },
  {
    year: 2002,
    bra: 50.875594,
    can: 36.0469,
    chn: 398.68824,
    fra: 69.700575,
    idn: 61.074973,
    ind: 206.636708,
    rus: 84.730327,
    usa: 297.143452,
  },
  {
    year: 2003,
    bra: 67.454329,
    can: 49.1972,
    chn: 376.655003,
    fra: 55.099557,
    idn: 63.024042,
    ind: 236.5927,
    rus: 65.335462,
    usa: 348.247631,
  },
  {
    year: 2004,
    bra: 63.953364,
    can: 50.7782,
    chn: 413.16379,
    fra: 70.642016,
    idn: 65.313711,
    ind: 229.845504,
    rus: 75.986,
    usa: 389.023763,
  },
  {
    year: 2005,
    bra: 55.670925,
    can: 50.9624,
    chn: 429.370265,
    fra: 64.210067,
    idn: 66.67499,
    ind: 239.997492,
    rus: 76.1921,
    usa: 366.436346,
  },
  {
    year: 2006,
    bra: 59.148978,
    can: 48.5773,
    chn: 452.800282,
    fra: 61.820445,
    idn: 66.064399,
    ind: 242.785588,
    rus: 76.494549,
    usa: 338.3368,
  },
  {
    year: 2007,
    bra: 69.441634,
    can: 48.0053,
    chn: 457.809418,
    fra: 59.578778,
    idn: 70.444963,
    ind: 260.485904,
    rus: 80.207513,
    usa: 415.13086,
  },
  {
    year: 2008,
    bra: 79.745466,
    can: 56.0304,
    chn: 480.12597,
    fra: 70.418032,
    idn: 76.574994,
    ind: 266.8353,
    rus: 106.41789,
    usa: 402.399936,
  },
  {
    year: 2009,
    bra: 70.914791,
    can: 49.6919,
    chn: 483.277147,
    fra: 70.373159,
    idn: 82.028628,
    ind: 250.783392,
    rus: 95.615476,
    usa: 418.666166,
  },
  {
    year: 2010,
    bra: 75.160152,
    can: 46.1222,
    chn: 497.920509,
    fra: 65.839202,
    idn: 84.797028,
    ind: 267.838308,
    rus: 59.619074,
    usa: 401.12633,
  },
  {
    year: 2011,
    bra: 77.586276,
    can: 48.3372,
    chn: 521.171808,
    fra: 63.954886,
    idn: 83.400154,
    ind: 287.86,
    rus: 91.780915,
    usa: 385.545256,
  },
  {
    year: 2012,
    bra: 89.908244,
    can: 51.8399,
    chn: 541.163568,
    fra: 68.341731,
    idn: 88.44315,
    ind: 293.29,
    rus: 68.753479,
    usa: 356.210124,
  },
  {
    year: 2013,
    bra: 100.901726,
    can: 66.528601,
    chn: 554.422547,
    fra: 67.537681,
    idn: 89.791565,
    ind: 294.90951,
    rus: 90.364971,
    usa: 434.30845,
  },
  {
    year: 2014,
    bra: 101.402184,
    can: 51.683501,
    chn: 559.325222,
    fra: 72.579315,
    idn: 89.854891,
    ind: 296.01,
    rus: 103.138503,
    usa: 442.84909,
  },
  {
    year: 2015,
    bra: 106.027826,
    can: 53.563,
    chn: 623.197344,
    fra: 72.875854,
    idn: 95.010276,
    ind: 284.333,
    rus: 102.447609,
    usa: 431.870788,
  },
  {
    year: 2016,
    bra: 84.167849,
    can: 58.904067,
    chn: 618.011522,
    fra: 54.398704,
    idn: 102.93318,
    ind: 297.85,
    rus: 117.755457,
    usa: 503.465267,
  },
  {
    year: 2017,
    bra: 117.979368,
    can: 56.3777,
    chn: 619.879237,
    fra: 68.730244,
    idn: 110.072609,
    ind: 313.64,
    rus: 131.295318,
    usa: 466.847085,
  },
  {
    year: 2018,
    bra: 103.064737,
    can: 58.0958,
    chn: 612.170193,
    fra: 62.740329,
    idn: 113.290938,
    ind: 318.32,
    rus: 109.837875,
    usa: 467.95114,
  },
];

export const groups = [
  { key: 'bra', name: 'Brazil' },
  { key: 'can', name: 'Canada' },
  { key: 'chn', name: 'China' },
  { key: 'fra', name: 'France' },
  { key: 'idn', name: 'Indonesia' },
  { key: 'ind', name: 'India' },
  { key: 'rus', name: 'Russian Federation' },
  { key: 'usa', name: 'United States' },
];
