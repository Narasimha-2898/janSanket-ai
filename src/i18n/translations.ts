import { SupportedLanguage } from '../types';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  script: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', dir: 'ltr' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', dir: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', dir: 'ltr' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', dir: 'ltr' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', dir: 'ltr' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', dir: 'ltr' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', dir: 'ltr' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', dir: 'ltr' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', dir: 'ltr' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Arabic', dir: 'rtl' },
];

export interface TranslationDictionary {
  brand: {
    name: string;
    tagline: string;
    subTagline: string;
    badge: string;
  };
  nav: {
    home: string;
    exploreMap: string;
    reportIssue: string;
    impactDashboard: string;
    about: string;
    ctaReport: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    demoNotice: string;
    verifiedPilot: string;
  };
  impactStrip: {
    title: string;
    totalReports: string;
    openIssues: string;
    inProgress: string;
    resolvedIssues: string;
    hotspotsIdentified: string;
    avgResolution: string;
    days: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  categories: {
    all: string;
    pothole: string;
    garbage: string;
    drainage: string;
    streetlight: string;
    infrastructure: string;
    sanitation_other: string;
  };
  statuses: {
    all: string;
    submitted: string;
    under_review: string;
    in_progress: string;
    resolved: string;
    rejected: string;
  };
  priority: {
    score: string;
    band: string;
    critical: string;
    high: string;
    medium: string;
    low: string;
    breakdownTitle: string;
    severityLabel: string;
    recurrenceLabel: string;
    durationLabel: string;
    communityImpactLabel: string;
    disclaimer: string;
  };
  reportForm: {
    pageTitle: string;
    pageSubtitle: string;
    step1Heading: string;
    step2Heading: string;
    step3Heading: string;
    categoryLabel: string;
    titleLabel: string;
    titlePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    photoLabel: string;
    photoHint: string;
    choosePhoto: string;
    changePhoto: string;
    removePhoto: string;
    locationHeading: string;
    useMyLocation: string;
    gettingLocation: string;
    manualLocation: string;
    landmarkLabel: string;
    landmarkPlaceholder: string;
    latitude: string;
    longitude: string;
    selectOnMap: string;
    aiPreviewTitle: string;
    aiAnalyzing: string;
    aiSeverityEstimate: string;
    aiConfidence: string;
    duplicateWarningTitle: string;
    duplicateWarningDesc: string;
    viewCandidate: string;
    submitReport: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    reportIdLabel: string;
    viewReportBtn: string;
    reportAnotherBtn: string;
    validationCategory: string;
    validationTitle: string;
    validationDesc: string;
    validationLocation: string;
  };
  map: {
    pageTitle: string;
    pageSubtitle: string;
    filterCategory: string;
    filterStatus: string;
    filterPriority: string;
    showHotspots: string;
    fitBounds: string;
    resultsCount: string;
    noResults: string;
    legendTitle: string;
    hotspotLegend: string;
    reportDetailLink: string;
    reportedOn: string;
  };
  dashboard: {
    pageTitle: string;
    pageSubtitle: string;
    demoBanner: string;
    tabOverview: string;
    tabQueue: string;
    tabAnalytics: string;
    queueTitle: string;
    queueSubtitle: string;
    filterAll: string;
    sortHighestPriority: string;
    sortNewest: string;
    sortOldest: string;
    colTitle: string;
    colCategory: string;
    colArea: string;
    colPriority: string;
    colStatus: string;
    colAge: string;
    colAction: string;
    viewDetails: string;
    categoryDistributionTitle: string;
    statusDistributionTitle: string;
    trendTitle: string;
    hotspotListTitle: string;
  };
  detail: {
    backToMap: string;
    backToDashboard: string;
    reportedAt: string;
    locationInfo: string;
    aiAnalysisHeader: string;
    modelTag: string;
    fallbackTag: string;
    statusHistoryHeader: string;
    updateStatusDemo: string;
    updateStatusBtn: string;
    statusUpdatedToast: string;
    potentialDuplicatesTitle: string;
    noDuplicatesFound: string;
    matchDistance: string;
    matchScore: string;
  };
  about: {
    title: string;
    subtitle: string;
    missionTitle: string;
    missionText: string;
    formulaTitle: string;
    formulaExplanation: string;
    aiDisclaimerTitle: string;
    aiDisclaimerText: string;
    techStackTitle: string;
  };
  footer: {
    tagline: string;
    demoNotice: string;
    privacyNotice: string;
    quickLinks: string;
    developedFor: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brand: {
      name: 'JanSanket AI',
      tagline: 'Turning Civic Problems into Community Action',
      subTagline: 'AI + GIS Citizen Intelligence for Municipal Excellence',
      badge: 'MY Bharat Hackathon MVP',
    },
    nav: {
      home: 'Home',
      exploreMap: 'Explore Map',
      reportIssue: 'Report an Issue',
      impactDashboard: 'Impact Dashboard',
      about: 'About & Methodology',
      ctaReport: 'Report a Problem',
    },
    hero: {
      headline: 'Your City. Your Voice. Smarter Action.',
      subheadline:
        'Transform individual civic complaints into an explainable, location-aware community priority queue with AI classification and GIS hotspot discovery.',
      primaryCta: 'Report a Problem',
      secondaryCta: 'Explore Civic Map',
      demoNotice: 'Live demo environment seeded with Hyderabad municipal sample reports.',
      verifiedPilot: 'Built for Civic Transparency & Citizen Empowerment',
    },
    impactStrip: {
      title: 'Real-Time Civic Ledger',
      totalReports: 'Reports Submitted',
      openIssues: 'Active In Queue',
      inProgress: 'Currently In Action',
      resolvedIssues: 'Civic Issues Resolved',
      hotspotsIdentified: 'Hotspots Detected',
      avgResolution: 'Avg. Days to Resolve',
      days: 'days',
    },
    howItWorks: {
      title: 'How JanSanket AI Works',
      subtitle: 'From citizen observation to measurable community remediation in four transparent stages.',
      step1Title: '1. Citizen Report',
      step1Desc: 'Capture photo, exact geo-coordinates, and brief problem description in your preferred language.',
      step2Title: '2. AI Classification',
      step2Desc: 'Structured AI categorizes hazard type, extracts keywords, and highlights duplicate candidate reports.',
      step3Title: '3. Geospatial Hotspots',
      step3Desc: 'GIS engine clusters related civic failures within geographic radius to spot systemic grid defects.',
      step4Title: '4. Transparent Priority',
      step4Desc: 'Objective formula (0.40S + 0.25R + 0.20D + 0.15U) sorts action queue without hidden bias.',
    },
    categories: {
      all: 'All Categories',
      pothole: 'Potholes & Roads',
      garbage: 'Garbage & Dumping',
      drainage: 'Drainage & Waterlogging',
      streetlight: 'Streetlights & Electrical',
      infrastructure: 'Public Infrastructure',
      sanitation_other: 'Sanitation & Hygiene',
    },
    statuses: {
      all: 'All Statuses',
      submitted: 'Submitted',
      under_review: 'Under Review',
      in_progress: 'In Progress',
      resolved: 'Resolved',
      rejected: 'Closed / Duplicate',
    },
    priority: {
      score: 'Priority Score',
      band: 'Priority Level',
      critical: 'Critical Action',
      high: 'High Priority',
      medium: 'Medium Priority',
      low: 'Low Priority',
      breakdownTitle: 'Explainable Score Breakdown',
      severityLabel: 'Severity (40%)',
      recurrenceLabel: 'Recurrence / Density (25%)',
      durationLabel: 'Duration Unresolved (20%)',
      communityImpactLabel: 'Community Impact (15%)',
      disclaimer: 'This score is an automated decision-support metric based on verifiable factors, not a statutory decree.',
    },
    reportForm: {
      pageTitle: 'Report a Civic Issue',
      pageSubtitle: 'Help your municipality and neighborhood prioritize repairs where they matter most.',
      step1Heading: '1. Issue Details',
      step2Heading: '2. Precise Location',
      step3Heading: '3. AI Validation & Review',
      categoryLabel: 'Issue Category',
      titleLabel: 'Short Title',
      titlePlaceholder: 'e.g., Deep pothole causing skidding near signal',
      descriptionLabel: 'Description of the Problem',
      descriptionPlaceholder: 'Describe the danger, size, duration, or impact on pedestrians/vehicles...',
      photoLabel: 'Photo Evidence',
      photoHint: 'Upload clear photo of the hazard (JPEG/PNG up to 5MB)',
      choosePhoto: 'Select Image File',
      changePhoto: 'Change Photo',
      removePhoto: 'Remove',
      locationHeading: 'Geo-Coordinates & Landmark',
      useMyLocation: 'Use My Current GPS',
      gettingLocation: 'Acquiring GPS Signal...',
      manualLocation: 'Select on Map / Custom Landmark',
      landmarkLabel: 'Landmark or Locality',
      landmarkPlaceholder: 'e.g., Near Road 36 Metro Pillar 124',
      latitude: 'Latitude',
      longitude: 'Longitude',
      selectOnMap: 'Pick on Interactive Map',
      aiPreviewTitle: 'AI Preliminary Assessment',
      aiAnalyzing: 'Analyzing problem description with Gemini AI engine...',
      aiSeverityEstimate: 'Suggested Severity',
      aiConfidence: 'AI Confidence',
      duplicateWarningTitle: 'Potential Duplicate Detected',
      duplicateWarningDesc: 'A very similar report exists within 300 meters of your coordinates.',
      viewCandidate: 'Inspect Existing Report',
      submitReport: 'Submit Verified Report',
      submitting: 'Registering into Civic Ledger...',
      successTitle: 'Civic Report Registered Successfully',
      successMessage: 'Your issue has been logged with an explainable priority score and added to the community map.',
      reportIdLabel: 'Report Reference ID',
      viewReportBtn: 'Inspect This Report',
      reportAnotherBtn: 'Report Another Issue',
      validationCategory: 'Please select an issue category.',
      validationTitle: 'Please provide a title (min 5 characters).',
      validationDesc: 'Please provide a descriptive explanation (min 15 characters).',
      validationLocation: 'Please provide valid latitude and longitude coordinates.',
    },
    map: {
      pageTitle: 'Geospatial Civic Map',
      pageSubtitle: 'Explore verified civic reports, spatial clusters, and neighborhood hotspot zones across Hyderabad.',
      filterCategory: 'Filter Category',
      filterStatus: 'Filter Status',
      filterPriority: 'Priority Level',
      showHotspots: 'Show GIS Hotspot Clusters',
      fitBounds: 'Reset View / Fit All Reports',
      resultsCount: 'Displaying {count} civic reports',
      noResults: 'No civic reports match the selected filters.',
      legendTitle: 'Map Legend',
      hotspotLegend: 'Hotspot Zone (Cluster radius)',
      reportDetailLink: 'View Full Report & Action History',
      reportedOn: 'Reported on',
    },
    dashboard: {
      pageTitle: 'Community Impact & Priority Action Queue',
      pageSubtitle: 'Real-time municipal telemetry, geographic concentration, and objective action scheduling.',
      demoBanner: 'Demo mode active: Connected to synthetic Hyderabad municipal dataset (is_demo=true).',
      tabOverview: 'Executive Overview',
      tabQueue: 'Action Queue',
      tabAnalytics: 'Spatial Analytics',
      queueTitle: 'Prioritized Civic Action Queue',
      queueSubtitle: 'Sorted strictly by the transparent priority formula (0.40S + 0.25R + 0.20D + 0.15U).',
      filterAll: 'All Items',
      sortHighestPriority: 'Highest Priority First',
      sortNewest: 'Most Recent First',
      sortOldest: 'Longest Unresolved First',
      colTitle: 'Civic Issue',
      colCategory: 'Category',
      colArea: 'Locality',
      colPriority: 'Score',
      colStatus: 'Status',
      colAge: 'Days Open',
      colAction: 'Action',
      viewDetails: 'Inspect',
      categoryDistributionTitle: 'Reports by Hazard Category',
      statusDistributionTitle: 'Workflow Resolution Status',
      trendTitle: '7-Day Intake & Remediation Velocity',
      hotspotListTitle: 'Active Geographic Hotspot Zones',
    },
    detail: {
      backToMap: 'Return to Map',
      backToDashboard: 'Return to Dashboard',
      reportedAt: 'Report Date',
      locationInfo: 'Geospatial Location',
      aiAnalysisHeader: 'AI Classification & Hazard Diagnostics',
      modelTag: 'Engine: Google Gemini Flash',
      fallbackTag: 'Engine: Rule-Based Fallback Engine',
      statusHistoryHeader: 'Lifecycle History & Civic Audit Trail',
      updateStatusDemo: 'Demo Officer Status Control',
      updateStatusBtn: 'Update Status',
      statusUpdatedToast: 'Status successfully updated in the civic database.',
      potentialDuplicatesTitle: 'Nearby Potential Duplicate Reports',
      noDuplicatesFound: 'No nearby duplicate candidates detected within 300 meters.',
      matchDistance: 'Distance',
      matchScore: 'Text Similarity',
    },
    about: {
      title: 'About JanSanket AI',
      subtitle: 'Turning Civic Problems into Community Action with AI, GIS, and Radical Transparency.',
      missionTitle: 'The Problem We Are Solving',
      missionText:
        'Municipal authorities often struggle with hundreds of uncoordinated complaints, duplicate reports for the same incident, and lack of objective urgency indicators. JanSanket AI bridges citizens and urban local bodies through geospatial intelligence, automatic duplicate pruning, and explainable prioritization.',
      formulaTitle: 'Transparent Prioritization Formula',
      formulaExplanation:
        'Priority Score = 0.40 × Severity (S) + 0.25 × Recurrence/Density (R) + 0.20 × Duration Unresolved (D) + 0.15 × Community Impact (U). No black box algorithms. Every citizen and official can inspect the exact factors driving an issue to the top of the queue.',
      aiDisclaimerTitle: 'Responsible AI & Verifiable Safety',
      aiDisclaimerText:
        'AI classification assists human decision-makers rather than replacing municipal authority. When Gemini API keys are configured, rich contextual classification is enabled; otherwise, a robust deterministic rule-based fallback guarantees zero downtime.',
      techStackTitle: 'Built for MY Bharat Hackathon',
    },
    footer: {
      tagline: 'Turning Civic Problems into Community Action.',
      demoNotice: 'All data shown is simulated demonstration data for Hyderabad, Telangana. Not affiliated with GHMC or official government bodies.',
      privacyNotice: 'Zero unnecessary personal information is retained. Submissions are strictly geo-tagged community observations.',
      quickLinks: 'Navigation',
      developedFor: 'Developed for MY Bharat Hack for Social Issues',
    },
  },
  hi: {
    brand: {
      name: 'जनसंकेत AI',
      tagline: 'नागरिक समस्याओं को सामुदायिक समाधान में बदलना',
      subTagline: 'नगरपालिका उत्कृष्टता के लिए AI + GIS नागरिक बुद्धिमत्ता',
      badge: 'MY भारत हैकाथॉन MVP',
    },
    nav: {
      home: 'होम',
      exploreMap: 'मानचित्र देखें',
      reportIssue: 'समस्या दर्ज करें',
      impactDashboard: 'प्रभाव डैशबोर्ड',
      about: 'सिस्टम व कार्यविधि',
      ctaReport: 'समस्या दर्ज करें',
    },
    hero: {
      headline: 'आपका शहर। आपकी आवाज़। प्रभावी समाधान।',
      subheadline:
        'व्यक्तिगत शिकायतों को AI वर्गीकरण और GIS हॉटस्पॉट पहचान के साथ पारदर्शी और स्थान-जागरूक सामुदायिक प्राथमिकता सूची में बदलें।',
      primaryCta: 'समस्या दर्ज करें',
      secondaryCta: 'नागरिक मानचित्र देखें',
      demoNotice: 'हैदराबाद नगरपालिका के नमूना डेटा के साथ लाइव डेमो वातावरण।',
      verifiedPilot: 'नागरिक सशक्तिकरण और पारदर्शिता के लिए निर्मित',
    },
    impactStrip: {
      title: 'नागरिक डेटा बहीखाता',
      totalReports: 'कुल दर्ज रिपोर्ट',
      openIssues: 'कतार में सक्रिय',
      inProgress: 'कार्य प्रगति पर',
      resolvedIssues: 'हल की गई समस्याएं',
      hotspotsIdentified: 'चिह्नित हॉटस्पॉट',
      avgResolution: 'समाधान का औसत समय',
      days: 'दिन',
    },
    howItWorks: {
      title: 'जनसंकेत AI कैसे कार्य करता है',
      subtitle: 'नागरिक अवलोकन से लेकर मापने योग्य समाधान तक के चार पारदर्शी चरण।',
      step1Title: '1. नागरिक रिपोर्ट',
      step1Desc: 'अपनी पसंदीदा भाषा में फोटो, सटीक जीपीएस निर्देशांक और समस्या का संक्षिप्त विवरण जोड़ें।',
      step2Title: '2. AI वर्गीकरण',
      step2Desc: 'संरचित AI खतरे के प्रकार को श्रेणीबद्ध करता है और संभावित डुप्लिकेट रिपोर्ट की पहचान करता है।',
      step3Title: '3. भौगोलिक हॉटस्पॉट',
      step3Desc: 'GIS इंजन एक निश्चित दायरे में संबंधित नागरिक समस्याओं को एकत्रित करके हॉटस्पॉट दिखाता है।',
      step4Title: '4. पारदर्शी प्राथमिकता',
      step4Desc: 'निष्पक्ष सूत्र (0.40S + 0.25R + 0.20D + 0.15U) बिना किसी पक्षपात के कार्य कतार को क्रमबद्ध करता है।',
    },
    categories: {
      all: 'सभी श्रेणियां',
      pothole: 'सड़क के गड्ढे व क्षति',
      garbage: 'कचरा व अवैध डंपिंग',
      drainage: 'नाली जाम व जलभराव',
      streetlight: 'स्ट्रीटलाइट व बिजली',
      infrastructure: 'सार्वजनिक अवसंरचना',
      sanitation_other: 'स्वच्छता व अन्य',
    },
    statuses: {
      all: 'सभी स्थितियां',
      submitted: 'दर्ज किया गया',
      under_review: 'समीक्षाधीन',
      in_progress: 'प्रगति पर',
      resolved: 'समाधान हुआ',
      rejected: 'बंद / डुप्लिकेट',
    },
    priority: {
      score: 'प्राथमिकता अंक',
      band: 'प्राथमिकता स्तर',
      critical: 'अति आवश्यक',
      high: 'उच्च प्राथमिकता',
      medium: 'मध्यम प्राथमिकता',
      low: 'सामान्य प्राथमिकता',
      breakdownTitle: 'स्पष्ट अंक विभाजन',
      severityLabel: 'गंभीरता (40%)',
      recurrenceLabel: 'पुनरावृत्ति / घनत्व (25%)',
      durationLabel: 'अनिस्तारित अवधि (20%)',
      communityImpactLabel: 'सामुदायिक प्रभाव (15%)',
      disclaimer: 'यह स्कोर सत्यापन योग्य कारकों पर आधारित एक स्वचालित निर्णय-सहायता पैमाना है।',
    },
    reportForm: {
      pageTitle: 'नागरिक समस्या दर्ज करें',
      pageSubtitle: 'अपनी स्थानीय नगरपालिका को सबसे महत्वपूर्ण समस्याओं को प्राथमिकता देने में मदद करें।',
      step1Heading: '1. समस्या का विवरण',
      step2Heading: '2. सटीक स्थान',
      step3Heading: '3. AI सत्यापन एवं समीक्षा',
      categoryLabel: 'समस्या की श्रेणी',
      titleLabel: 'संक्षिप्त शीर्षक',
      titlePlaceholder: 'उदा. सिग्नल के पास गहरा गड्ढा जिससे दोपहिया फिसल रहे हैं',
      descriptionLabel: 'समस्या का पूरा विवरण',
      descriptionPlaceholder: 'पैदल चलने वालों या वाहनों पर खतरे, आकार और अवधि का उल्लेख करें...',
      photoLabel: 'तस्वीर का प्रमाण',
      photoHint: 'स्पष्ट फोटो अपलोड करें (JPEG/PNG अधिकतम 5MB)',
      choosePhoto: 'फोटो चुनें',
      changePhoto: 'फोटो बदलें',
      removePhoto: 'हटाएं',
      locationHeading: 'जीपीएस निर्देशांक व सीमाचिह्न',
      useMyLocation: 'मेरा वर्तमान जीपीएस स्थान लें',
      gettingLocation: 'जीपीएस सिग्नल प्राप्त हो रहा है...',
      manualLocation: 'मानचित्र पर चुनें / सीमाचिह्न',
      landmarkLabel: 'निकटवर्ती सीमाचिह्न या इलाका',
      landmarkPlaceholder: 'उदा. मेट्रो पिलर 124 के सामने',
      latitude: 'अक्षांश (Latitude)',
      longitude: 'देशांतर (Longitude)',
      selectOnMap: 'मानचित्र पर बिंदु चुनें',
      aiPreviewTitle: 'AI प्रारंभिक विश्लेषण',
      aiAnalyzing: 'Gemini AI द्वारा विवरण का विश्लेषण किया जा रहा है...',
      aiSeverityEstimate: 'अनुमानित गंभीरता',
      aiConfidence: 'AI विश्वास स्तर',
      duplicateWarningTitle: 'संभावित डुप्लिकेट रिपोर्ट मिली',
      duplicateWarningDesc: 'आपके निर्देशांक के 300 मीटर के भीतर एक बहुत समान रिपोर्ट पहले से मौजूद है।',
      viewCandidate: 'मौजूदा रिपोर्ट देखें',
      submitReport: 'रिपोर्ट सुरक्षित रूप से दर्ज करें',
      submitting: 'नागरिक बहीखाते में दर्ज हो रहा है...',
      successTitle: 'समस्या सफलतापूर्वक दर्ज हुई',
      successMessage: 'आपकी समस्या को प्राथमिकता स्कोर के साथ पंजीकृत कर लिया गया है।',
      reportIdLabel: 'रिपोर्ट संदर्भ संख्या',
      viewReportBtn: 'यह रिपोर्ट देखें',
      reportAnotherBtn: 'एक और समस्या दर्ज करें',
      validationCategory: 'कृपया एक श्रेणी चुनें।',
      validationTitle: 'कृपया कम से कम 5 अक्षरों का शीर्षक दें।',
      validationDesc: 'कृपया समस्या का कम से कम 15 अक्षरों में विवरण दें।',
      validationLocation: 'कृपया मान्य जीपीएस निर्देशांक प्रदान करें।',
    },
    map: {
      pageTitle: 'भू-स्थानिक नागरिक मानचित्र',
      pageSubtitle: 'हैदराबाद भर में दर्ज नागरिक रिपोर्ट, स्थानिक क्लस्टर और हॉटस्पॉट क्षेत्रों का अन्वेषण करें।',
      filterCategory: 'श्रेणी फिल्टर',
      filterStatus: 'स्थिति फिल्टर',
      filterPriority: 'प्राथमिकता स्तर',
      showHotspots: 'GIS हॉटस्पॉट क्लस्टर दिखाएं',
      fitBounds: 'दृष्टि रीसेट करें / सभी रिपोर्ट दिखाएं',
      resultsCount: '{count} नागरिक रिपोर्ट प्रदर्शित',
      noResults: 'चयनित फिल्टर के अनुरूप कोई रिपोर्ट नहीं मिली।',
      legendTitle: 'मानचित्र संकेतिका',
      hotspotLegend: 'हॉटस्पॉट क्षेत्र (क्लस्टर दायरा)',
      reportDetailLink: 'पूर्ण विवरण व इतिहास देखें',
      reportedOn: 'दर्ज दिनांक',
    },
    dashboard: {
      pageTitle: 'सामुदायिक प्रभाव एवं प्राथमिकता कतार',
      pageSubtitle: 'वास्तविक समय की नगर टेलीमेट्री, भौगोलिक एकाग्रता और उद्देश्यपूर्ण कार्य सूची।',
      demoBanner: 'डेमो मोड सक्रिय: हैदराबाद नगरपालिका के कृत्रिम डेटासेट से जुड़ा है (is_demo=true)।',
      tabOverview: 'सारांश अवलोकन',
      tabQueue: 'प्राथमिकता कतार',
      tabAnalytics: 'स्थानिक विश्लेषण',
      queueTitle: 'प्राथमिकता प्राप्त कार्य कतार',
      queueSubtitle: 'पारदर्शी सूत्र (0.40S + 0.25R + 0.20D + 0.15U) द्वारा सटीक क्रमबद्ध।',
      filterAll: 'सभी विषय',
      sortHighestPriority: 'सर्वोच्च प्राथमिकता पहले',
      sortNewest: 'नवीनतम पहले',
      sortOldest: 'सबसे पुरानी अनिस्तारित पहले',
      colTitle: 'नागरिक समस्या',
      colCategory: 'श्रेणी',
      colArea: 'इलाका',
      colPriority: 'अंक',
      colStatus: 'स्थिति',
      colAge: 'अवधि (दिन)',
      colAction: 'कार्य',
      viewDetails: 'निरीक्षण',
      categoryDistributionTitle: 'खतरे की श्रेणी अनुसार रिपोर्ट',
      statusDistributionTitle: 'कार्यप्रवाह समाधान स्थिति',
      trendTitle: '7 दिवसीय रिपोर्टिंग व समाधान गति',
      hotspotListTitle: 'सक्रिय भौगोलिक हॉटस्पॉट क्षेत्र',
    },
    detail: {
      backToMap: 'मानचित्र पर वापस',
      backToDashboard: 'डैशबोर्ड पर वापस',
      reportedAt: 'दर्ज करने की तिथि',
      locationInfo: 'भू-स्थानिक जानकारी',
      aiAnalysisHeader: 'AI वर्गीकरण एवं खतरा निदान',
      modelTag: 'इंजन: Google Gemini Flash',
      fallbackTag: 'इंजन: नियम-आधारित फॉलबैक इंजन',
      statusHistoryHeader: 'जीवनचक्र इतिहास एवं ऑडिट ट्रेल',
      updateStatusDemo: 'डेमो अधिकारी स्थिति नियंत्रण',
      updateStatusBtn: 'स्थिति अद्यतन करें',
      statusUpdatedToast: 'डेटाबेस में स्थिति सफलतापूर्वक बदल दी गई।',
      potentialDuplicatesTitle: 'आस-पास की संभावित डुप्लिकेट रिपोर्टें',
      noDuplicatesFound: '300 मीटर के भीतर कोई डुप्लिकेट रिपोर्ट नहीं मिली।',
      matchDistance: 'दूरी',
      matchScore: 'पाठ समानता',
    },
    about: {
      title: 'जनसंकेत AI के बारे में',
      subtitle: 'AI, GIS और पूर्ण पारदर्शिता के साथ नागरिक समस्याओं को सामुदायिक समाधान में बदलना।',
      missionTitle: 'हम जिस समस्या का समाधान कर रहे हैं',
      missionText:
        'नगर निगम अक्सर असंगठित शिकायतों, एक ही समस्या की बार-बार रिपोर्टिंग और तात्कालिकता के सटीक माप के अभाव से जूझते हैं। जनसंकेत AI नागरिकों और निकायों को जोड़ता है।',
      formulaTitle: 'पारदर्शी प्राथमिकता निर्धारण सूत्र',
      formulaExplanation:
        'प्राथमिकता अंक = 0.40 × गंभीरता (S) + 0.25 × पुनरावृत्ति/घनत्व (R) + 0.20 × अनिस्तारित अवधि (D) + 0.15 × सामुदायिक प्रभाव (U)। कोई ब्लैक-बॉक्स नहीं।',
      aiDisclaimerTitle: 'जिम्मेदार AI और सुरक्षा',
      aiDisclaimerText:
        'AI वर्गीकरण नगर पालिका अधिकारियों का विकल्प बनने के बजाय उनकी निर्णय प्रक्रिया को गति प्रदान करता है।',
      techStackTitle: 'MY भारत हैकाथॉन के लिए विकसित',
    },
    footer: {
      tagline: 'नागरिक समस्याओं को सामुदायिक समाधान में बदलना।',
      demoNotice: 'प्रदर्शित सभी डेटा हैदराबाद के लिए केवल सिमुलेटेड डेमो डेटा है। किसी सरकारी संस्था का आधिकारिक दावा नहीं है।',
      privacyNotice: 'कोई अनावश्यक व्यक्तिगत जानकारी एकत्र नहीं की जाती है।',
      quickLinks: 'नेविगेशन',
      developedFor: 'MY भारत हैक फॉर सोशल इश्यूज़ के लिए निर्मित',
    },
  },
  te: {
    brand: {
      name: 'జనసంకేత్ AI',
      tagline: 'పౌర సమస్యలను సమాజ కార్యాచరణగా మార్చడం',
      subTagline: 'మున్సిపల్ అభివృద్ధికి AI + GIS పౌర మేధస్సు',
      badge: 'MY భారత్ హ్యాకథాన్ MVP',
    },
    nav: {
      home: 'హోమ్',
      exploreMap: 'మ్యాప్ చూడండి',
      reportIssue: 'సమస్యను నివేదించండి',
      impactDashboard: 'ప్రభావ డ్యాష్‌బోర్డ్',
      about: 'విధానం & వివరాలు',
      ctaReport: 'సమస్యను నివేదించండి',
    },
    hero: {
      headline: 'మీ నగరం. మీ గళం. స్మార్ట్ పరిష్కారం.',
      subheadline:
        'AI వర్గీకరణ మరియు GIS హాట్‌స్పాట్ లెక్కింపు ద్వారా సాధారణ ఫిర్యాదులను స్పష్టమైన, స్థానిక ప్రాధాన్యతా కార్యాచరణగా మార్చండి.',
      primaryCta: 'సమస్యను నివేదించండి',
      secondaryCta: 'పౌర మ్యాప్ చూడండి',
      demoNotice: 'హైదరాబాద్ మున్సిపల్ డెమో డేటాతో రూపొందించిన ప్రత్యక్ష వాతావరణం.',
      verifiedPilot: 'పారదర్శకత మరియు పౌర సాధికారత కోసం రూపొందించబడింది',
    },
    impactStrip: {
      title: 'పౌర సమాచార చిట్టా',
      totalReports: 'నమోదైన సమస్యలు',
      openIssues: 'క్యూలో ఉన్నవి',
      inProgress: 'పరిష్కారంలో ఉన్నవి',
      resolvedIssues: 'పరిష్కరించబడినవి',
      hotspotsIdentified: 'గుర్తించిన హాట్‌స్పాట్‌లు',
      avgResolution: 'సగటు పరిష్కార సమయం',
      days: 'రోజులు',
    },
    howItWorks: {
      title: 'జనసంకేత్ AI ఎలా పనిచేస్తుంది',
      subtitle: 'పౌరుడి గమనింపు నుండి సమస్య శాశ్వత పరిష్కారం వరకు 4 పారదర్శక దశలు.',
      step1Title: '1. పౌర నివేదిక',
      step1Desc: 'మీ ప్రాంతపు ఫోటో, ఖచ్చితమైన GPS అక్షాంశాలు, సమస్య వివరణను మీ భాషలో నమోదు చేయండి.',
      step2Title: '2. AI వర్గీకరణ',
      step2Desc: 'Gemini AI సమస్య రకాన్ని వర్గీకరించి, సమీపంలోని డూప్లికేట్ నివేదికలను గుర్తిస్తుంది.',
      step3Title: '3. భౌగోళిక హాట్‌స్పాట్‌లు',
      step3Desc: 'GIS మ్యాపింగ్ ద్వారా సమస్యల కేంద్రీకృత ప్రాంతాలు మరియు హాట్‌స్పాట్ క్లస్టర్లను లెక్కించండి.',
      step4Title: '4. పారదర్శక ప్రాధాన్యత',
      step4Desc: 'స్పష్టమైన సూత్రం (0.40S + 0.25R + 0.20D + 0.15U) ద్వారా నిష్పక్షపాత ప్రాధాన్యతా స్కోర్.',
    },
    categories: {
      all: 'అన్ని విభాగాలు',
      pothole: 'రోడ్డు గుంతలు & దెబ్బతిన్న రోడ్లు',
      garbage: 'చెత్త & అనధికార డంపింగ్',
      drainage: 'మురుగు కాలువలు & నీరు నిలవడం',
      streetlight: 'స్ట్రీట్‌లైట్లు & విద్యుత్ సమస్యలు',
      infrastructure: 'ప్రజా మౌలిక సదుపాయాలు',
      sanitation_other: 'పారిశుధ్యం & ఇతరాలు',
    },
    statuses: {
      all: 'అన్ని స్థితులు',
      submitted: 'సమర్పించబడింది',
      under_review: 'సమీక్షలో ఉంది',
      in_progress: 'పురోగతిలో ఉంది',
      resolved: 'పరిష్కరించబడింది',
      rejected: 'రద్దు / డూప్లికేట్',
    },
    priority: {
      score: 'ప్రాధాన్యతా స్కోర్',
      band: 'ప్రాధాన్యతా స్థాయి',
      critical: 'అత్యవసర చర్య',
      high: 'అధిక ప్రాధాన్యత',
      medium: 'మధ్యమ ప్రాధాన్యత',
      low: 'సాధారణ ప్రాధాన్యత',
      breakdownTitle: 'స్కోర్ విశ్లేషణ',
      severityLabel: 'తీవ్రత (40%)',
      recurrenceLabel: 'పునరావృతం / సాంద్రత (25%)',
      durationLabel: 'పరిష్కారం కాని సమయం (20%)',
      communityImpactLabel: 'సమాజ ప్రభావం (15%)',
      disclaimer: 'ఈ స్కోర్ ఖచ్చితమైన అంశాల ఆధారంగా స్వయంచాలక నిర్ణయ మద్దతు కొలమానం.',
    },
    reportForm: {
      pageTitle: 'పౌర సమస్యను నివేదించండి',
      pageSubtitle: 'మున్సిపల్ అధికారులు అత్యంత ముఖ్యమైన సమస్యలకు త్వరిత ప్రాధాన్యత ఇచ్చేలా సహాయపడండి.',
      step1Heading: '1. సమస్య వివరాలు',
      step2Heading: '2. ఖచ్చితమైన స్థానం',
      step3Heading: '3. AI సమీక్ష & పరిశీలన',
      categoryLabel: 'సమస్య విభాగం',
      titleLabel: 'సంక్షిప్త శీర్షిక',
      titlePlaceholder: 'ఉదా: సిగ్నల్ దగ్గర వాహనాలు జారుతున్న లోతైన రోడ్డు గుంత',
      descriptionLabel: 'సమస్య పూర్తి వివరణ',
      descriptionPlaceholder: 'ప్రమాదం, పరిమాణం మరియు పాదచారులు/వాహనాలపై ప్రభావాన్ని వివరించండి...',
      photoLabel: 'ఫోటో సాక్ష్యం',
      photoHint: 'సమస్య స్పష్టమైన ఫోటో అప్‌లోడ్ చేయండి (JPEG/PNG గరిష్టంగా 5MB)',
      choosePhoto: 'ఫోటో ఎంచుకోండి',
      changePhoto: 'ఫోటో మార్చండి',
      removePhoto: 'తొలగించు',
      locationHeading: 'GPS అక్షాంశాలు & ఆనవాలు',
      useMyLocation: 'నా ప్రస్తుత GPS స్థానం ఉపయోగించండి',
      gettingLocation: 'GPS సిగ్నల్ తీసుకుంటోంది...',
      manualLocation: 'మ్యాప్‌లో గుర్తించండి / ఆనవాలు',
      landmarkLabel: 'సమీప ఆనవాలు లేదా ప్రాంతం',
      landmarkPlaceholder: 'ఉదా: రోడ్ నం. 36 మెట్రో పిల్లర్ 124 వద్ద',
      latitude: 'అక్షాంశం (Latitude)',
      longitude: 'రేఖాంశం (Longitude)',
      selectOnMap: 'ఇంటరాక్టివ్ మ్యాప్‌లో ఎంచుకోండి',
      aiPreviewTitle: 'AI ప్రాథమిక విశ్లేషణ',
      aiAnalyzing: 'Gemini AI ద్వారా సమస్య విశ్లేషించబడుతోంది...',
      aiSeverityEstimate: 'సూచించిన తీవ్రత',
      aiConfidence: 'AI విశ్వసనీయత',
      duplicateWarningTitle: 'సమీప డూప్లికేట్ నివేదిక గుర్తించబడింది',
      duplicateWarningDesc: 'మీరు ఎంచుకున్న స్థానానికి 300 మీటర్ల పరిధిలో ఇదే రకమైన నివేదిక ఉంది.',
      viewCandidate: 'ఉన్న నివేదికను చూడండి',
      submitReport: 'నివేదికను సమర్పించండి',
      submitting: 'నమోదు చేయబడుతోంది...',
      successTitle: 'సమస్య విజయవంతంగా నమోదైంది',
      successMessage: 'మీ సమస్య ప్రాధాన్యతా స్కోర్‌తో పౌర మ్యాప్‌లో చేర్చబడింది.',
      reportIdLabel: 'రిపోర్ట్ రిఫరెన్స్ నంబర్',
      viewReportBtn: 'ఈ నివేదికను చూడండి',
      reportAnotherBtn: 'మరొక సమస్యను నివేదించండి',
      validationCategory: 'దయచేసి ఒక విభాగాన్ని ఎంచుకోండి.',
      validationTitle: 'కనీసం 5 అక్షరాల శీర్షిక ఇవ్వండి.',
      validationDesc: 'కనీసం 15 అక్షరాలలో సమస్య వివరణ ఇవ్వండి.',
      validationLocation: 'దయచేసి సరైన GPS అక్షాంశాలు నమోదు చేయండి.',
    },
    map: {
      pageTitle: 'భౌగోళిక పౌర మ్యాప్ (GIS)',
      pageSubtitle: 'హైదరాబాద్ అంతటా నమోదైన సమస్యలు, క్లస్టర్లు మరియు హాట్‌స్పాట్ ప్రాంతాలను అన్వేషించండి.',
      filterCategory: 'విభాగం ఫిల్టర్',
      filterStatus: 'స్థితి ఫిల్టర్',
      filterPriority: 'ప్రాధాన్యతా స్థాయి',
      showHotspots: 'GIS హాట్‌స్పాట్ క్లస్టర్లు చూపించు',
      fitBounds: 'మ్యాప్ రీసెట్ / అన్ని నివేదికలు చూపించు',
      resultsCount: '{count} పౌర నివేదికలు చూపిస్తోంది',
      noResults: 'ఎంచుకున్న ఫిల్టర్లకు అనుగుణమైన సమస్యలు లేవు.',
      legendTitle: 'మ్యాప్ సూచిక',
      hotspotLegend: 'హాట్‌స్పాట్ జోన్ (క్లస్టర్ వ్యాసార్థం)',
      reportDetailLink: 'పూర్తి నివేదిక మరియు చరిత్ర చూడండి',
      reportedOn: 'నమోదైన తేదీ',
    },
    dashboard: {
      pageTitle: 'కమ్యూనిటీ ఇంపాక్ట్ & యాక్షన్ క్యూ',
      pageSubtitle: 'రియల్-టైమ్ మున్సిపల్ సమాచారం మరియు పారదర్శక కార్యాచరణ ప్రణాళిక.',
      demoBanner: 'డెమో మోడ్ యాక్టివ్: హైదరాబాద్ మున్సిపల్ నమూనా డేటాబేస్ (is_demo=true).',
      tabOverview: 'ముఖ్య అవలోకనం',
      tabQueue: 'యాక్షన్ క్యూ',
      tabAnalytics: 'స్పేషియల్ విశ్లేషణ',
      queueTitle: 'ప్రాధాన్యత కల్పించిన పౌర సమస్యల క్యూ',
      queueSubtitle: 'పారదర్శక సూత్రం (0.40S + 0.25R + 0.20D + 0.15U) ద్వారా క్రమబద్ధీకరించబడింది.',
      filterAll: 'అన్నీ',
      sortHighestPriority: 'అత్యధిక ప్రాధాన్యత మొదట',
      sortNewest: 'ఇటీవలివి మొదట',
      sortOldest: 'ఎక్కువ కాలం పరిష్కారం కానివి',
      colTitle: 'పౌర సమస్య',
      colCategory: 'విభాగం',
      colArea: 'ప్రాంతం',
      colPriority: 'స్కోర్',
      colStatus: 'స్థితి',
      colAge: 'రోజులు',
      colAction: 'చర్య',
      viewDetails: 'పరిశీలించు',
      categoryDistributionTitle: 'విభాగాల వారీగా సమస్యలు',
      statusDistributionTitle: 'పరిష్కార పురోగతి స్థితి',
      trendTitle: '7 రోజుల నమోదు & పరిష్కార వేగం',
      hotspotListTitle: 'యాక్టివ్ భౌగోళిక హాట్‌స్పాట్ జోన్లు',
    },
    detail: {
      backToMap: 'మ్యాప్‌కు తిరిగి వెళ్లు',
      backToDashboard: 'డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్లు',
      reportedAt: 'నమోదైన తేదీ',
      locationInfo: 'భౌగోళిక స్థానం',
      aiAnalysisHeader: 'AI వర్గీకరణ & ప్రమాద నిర్ధారణ',
      modelTag: 'ఇంజన్: Google Gemini Flash',
      fallbackTag: 'ఇంజన్: రూల్ బేస్డ్ ఫాల్‌బ్యాక్',
      statusHistoryHeader: 'పురోగతి చరిత్ర & ఆడిట్ వివరాలు',
      updateStatusDemo: 'డెమో అధికారి స్థితి నియంత్రణ',
      updateStatusBtn: 'స్థితిని అప్‌డేట్ చేయండి',
      statusUpdatedToast: 'డేటాబేస్‌లో స్థితి విజయవంతంగా నవీకరించబడింది.',
      potentialDuplicatesTitle: 'సమీపంలోని డూప్లికేట్ నివేదికలు',
      noDuplicatesFound: '300 మీటర్లలో ఎలాంటి డూప్లికేట్ నివేదికలు లేవు.',
      matchDistance: 'దూరం',
      matchScore: 'టెక్స్ట్ సారూప్యత',
    },
    about: {
      title: 'జనసంకేత్ AI గురించి',
      subtitle: 'AI, GIS మరియు సంపూర్ణ పారదర్శకతతో పౌర సమస్యలను పరిష్కారాలుగా మార్చడం.',
      missionTitle: 'మనం పరిష్కరిస్తున్న ప్రధాన సమస్య',
      missionText:
        'మున్సిపాలిటీలు తరచుగా క్రమబద్ధత లేని ఫిర్యాదులు మరియు ఒకే సమస్యపై అనేక డూప్లికేట్ నివేదికలతో సతమతమవుతాయి. జనసంకేత్ AI వీటిని పరిష్కరిస్తుంది.',
      formulaTitle: 'పారదర్శక ప్రాధాన్యతా సూత్రం',
      formulaExplanation:
        'ప్రాధాన్యతా స్కోర్ = 0.40 × తీవ్రత (S) + 0.25 × పునరావృతం (R) + 0.20 × ఆలస్యం (D) + 0.15 × సమాజ ప్రభావం (U). దాచిన అల్గారిథమ్స్ లేవు.',
      aiDisclaimerTitle: 'బాధ్యతాయుతమైన AI & భద్రత',
      aiDisclaimerText:
        'AI కేవలం నిర్ణయాలకు సహాయకారిగా ఉంటుంది; మున్సిపల్ అధికారుల స్థానాన్ని భర్తీ చేయదు.',
      techStackTitle: 'MY భారత్ హ్యాకథాన్ కొరకు నిర్మించబడింది',
    },
    footer: {
      tagline: 'పౌర సమస్యలను సమాజ కార్యాచరణగా మార్చడం.',
      demoNotice: 'చూపించిన డేటా హైదరాబాద్‌కు సంబంధించిన నమూనా డెమో డేటా మాత్రమే.',
      privacyNotice: 'ఎలాంటి అనవసర వ్యక్తిగత వివరాలను సేకరించము.',
      quickLinks: 'లింకులు',
      developedFor: 'MY భారత్ హ్యాక్ ఫర్ సోషల్ ఇష్యూస్ కొరకు అభివృద్ధి చేయబడింది',
    },
  },
  bn: {
    brand: {
      name: 'জনসংকেত AI',
      tagline: 'নাগরিক সমস্যা থেকে সামাজিক প্রতিকার',
      subTagline: 'পৌরসভার অগ্রগতির জন্য AI + GIS নাগরিক বুদ্ধিমত্তা',
      badge: 'MY ভারত হ্যাকাথন MVP',
    },
    nav: {
      home: 'হোম',
      exploreMap: 'মানচিত্র দেখুন',
      reportIssue: 'সমস্যা জানান',
      impactDashboard: 'ড্যাশবোর্ড',
      about: 'পদ্ধতি ও বিবরণ',
      ctaReport: 'সমস্যা জানান',
    },
    hero: {
      headline: 'আপনার শহর। আপনার কণ্ঠস্বর। কার্যকর পদক্ষেপ।',
      subheadline:
        'AI শ্রেণীকরণ এবং GIS হটস্পট বিশ্লেষণের মাধ্যমে নাগরিক অভিযোগগুলিকে অগ্রাধিকারভিত্তিক কর্মতালিকায় রূপান্তর করুন।',
      primaryCta: 'সমস্যা জানান',
      secondaryCta: 'নাগরিক মানচিত্র দেখুন',
      demoNotice: 'হায়দ্রাবাদ মিউনিসিপ্যাল ডেমো ডেটা সহ লাইভ পরিবেশ।',
      verifiedPilot: 'নাগরিক ক্ষমতায়ন ও স্বচ্ছতার জন্য নির্মিত',
    },
    impactStrip: {
      title: 'নাগরিক খতিয়ান',
      totalReports: 'মোট জমা রিপোর্ট',
      openIssues: 'সক্রিয় সমস্যা',
      inProgress: 'কাজ চলছে',
      resolvedIssues: 'সমাধান হয়েছে',
      hotspotsIdentified: 'শনাক্ত হটস্পট',
      avgResolution: 'গড় সমাধানের দিন',
      days: 'দিন',
    },
    howItWorks: {
      title: 'জনসংকেত AI কীভাবে কাজ করে',
      subtitle: 'নাগরিকের পর্যবেক্ষণ থেকে সমস্যা সমাধান পর্যন্ত ৪টি স্বচ্ছ পর্যায়।',
      step1Title: '১. নাগরিক রিপোর্ট',
      step1Desc: 'ছবি, জিপিএস কোঅর্ডিনেট এবং সংক্ষিপ্ত বিবরণ আপনার পছন্দের ভাষায় জমা দিন।',
      step2Title: '২. AI শ্রেণীকরণ',
      step2Desc: 'ঝুঁকির ধরণ চিহ্নিত করে এবং কাছাকাছি সদৃশ রিপোর্ট শনাক্ত করে।',
      step3Title: '৩. ভৌগোলিক হটস্পট',
      step3Desc: 'GIS মানচিত্রে গুচ্ছাকারে নাগরিক হটস্পট এলাকা চিহ্নিত হয়।',
      step4Title: '৪. স্বচ্ছ অগ্রাধিকার',
      step4Desc: 'বস্তুনিষ্ঠ সূত্র (0.40S + 0.25R + 0.20D + 0.15U) দিয়ে পক্ষপাতহীন স্কোরিং।',
    },
    categories: {
      all: 'সমস্ত বিভাগ',
      pothole: 'রাস্তার গর্ত ও ক্ষতি',
      garbage: 'আবর্জনা ও অবৈধ ডাম্পিং',
      drainage: 'নিকাশি ও জল জমা',
      streetlight: 'পথবাতি ও বিদ্যুৎ',
      infrastructure: 'পাবলিক পরিকাঠামো',
      sanitation_other: 'স্বচ্ছতা ও অন্যান্য',
    },
    statuses: {
      all: 'সমস্ত অবস্থা',
      submitted: 'জমা হয়েছে',
      under_review: 'পর্যালোচনাধীন',
      in_progress: 'প্রক্রিয়াধীন',
      resolved: 'সমাধান হয়েছে',
      rejected: 'বাতিল / ডুপ্লিকেট',
    },
    priority: {
      score: 'অগ্রাধিকার স্কোর',
      band: 'অগ্রাধিকার মাত্রা',
      critical: 'জরুরি পদক্ষেপ',
      high: 'উচ্চ অগ্রাধিকার',
      medium: 'মাঝারি অগ্রাধিকার',
      low: 'সাধারণ অগ্রাধিকার',
      breakdownTitle: 'স্কোর ব্যাখ্যা',
      severityLabel: 'তীব্রতা (৪০%)',
      recurrenceLabel: 'পুনরাবৃত্তি (২৫%)',
      durationLabel: 'অমীমাংসিত সময় (২০%)',
      communityImpactLabel: 'সামাজিক প্রভাব (১৫%)',
      disclaimer: 'এটি তথ্যভিত্তিক সিদ্ধান্তের সহায়ক স্কোর।',
    },
    reportForm: {
      pageTitle: 'একটি নাগরিক সমস্যা জানান',
      pageSubtitle: 'পৌরসভাকে সবচেয়ে গুরুত্বপূর্ণ সমস্যাগুলি আগে সমাধান করতে সাহায্য করুন।',
      step1Heading: '১. সমস্যার বিবরণ',
      step2Heading: '২. সঠিক অবস্থান',
      step3Heading: '৩. AI পর্যালোচনা',
      categoryLabel: 'সমস্যার বিভাগ',
      titleLabel: 'সংক্ষিপ্ত শিরোনাম',
      titlePlaceholder: 'যেমন: রাস্তার মোড়ে গভীর গর্ত',
      descriptionLabel: 'বিস্তারিত বিবরণ',
      descriptionPlaceholder: 'বিপদের বিবরণ, আকার এবং চলাচলের উপর প্রভাব লিখুন...',
      photoLabel: 'ছবির প্রমাণ',
      photoHint: 'পরিষ্কার ছবি আপলোড করুন (সর্বোচ্চ ৫ মেগাবাইট)',
      choosePhoto: 'ছবি নির্বাচন করুন',
      changePhoto: 'ছবি পরিবর্তন করুন',
      removePhoto: 'মুছুন',
      locationHeading: 'GPS কোঅর্ডিনেট ও ল্যান্ডমার্ক',
      useMyLocation: 'আমার বর্তমান GPS নিন',
      gettingLocation: 'GPS খোঁজা হচ্ছে...',
      manualLocation: 'মানচিত্রে চিহ্নিত করুন',
      landmarkLabel: 'নিকটবর্তী ল্যান্ডমার্ক',
      landmarkPlaceholder: 'যেমন: মেট্রো পিলার ১২৪ এর সামনে',
      latitude: 'অক্ষাংশ (Latitude)',
      longitude: 'দ্রাঘিমাংশ (Longitude)',
      selectOnMap: 'মানচিত্রে চিহ্নিত করুন',
      aiPreviewTitle: 'AI বিশ্লেষণ প্রিভিউ',
      aiAnalyzing: 'Gemini AI দ্বারা বিশ্লেষণ করা হচ্ছে...',
      aiSeverityEstimate: 'অনুমিত তীব্রতা',
      aiConfidence: 'AI নির্ভুলতা',
      duplicateWarningTitle: 'সম্ভাব্য সদৃশ রিপোর্ট শনাক্ত',
      duplicateWarningDesc: '৩০০ মিটারের মধ্যে অত্যন্ত সাদৃশ্যপূর্ণ একটি রিপোর্ট বিদ্যমান।',
      viewCandidate: 'পূর্বের রিপোর্ট দেখুন',
      submitReport: 'রিপোর্ট জমা দিন',
      submitting: 'নিবন্ধন হচ্ছে...',
      successTitle: 'রিপোর্ট সফলভাবে জমা হয়েছে',
      successMessage: 'আপনার রিপোর্টটি স্কোর সহ নাগরিক মানচিত্রে অন্তর্ভুক্ত করা হয়েছে।',
      reportIdLabel: 'রেফারেন্স আইডি',
      viewReportBtn: 'রিপোর্টটি দেখুন',
      reportAnotherBtn: 'অন্য একটি সমস্যা জানান',
      validationCategory: 'অনুগ্রহ করে বিভাগ বেছে নিন।',
      validationTitle: 'কমপক্ষে ৫ অক্ষরের শিরোনাম দিন।',
      validationDesc: 'কমপক্ষে ১৫ অক্ষরের বিবরণ দিন।',
      validationLocation: 'সঠিক জিপিএস কোঅর্ডিনেট দিন।',
    },
    map: {
      pageTitle: 'ভৌগোলিক নাগরিক মানচিত্র (GIS)',
      pageSubtitle: 'হায়দ্রাবাদ জুড়ে নাগরিক রিপোর্ট ও হটস্পট জোন অন্বেষণ করুন।',
      filterCategory: 'বিভাগ ফিল্টার',
      filterStatus: 'অবস্থা ফিল্টার',
      filterPriority: 'অগ্রাধিকার মাত্রা',
      showHotspots: 'হটস্পট ক্লাস্টার প্রদর্শন',
      fitBounds: 'সব রিপোর্ট দেখুন',
      resultsCount: '{count} টি রিপোর্ট প্রদর্শিত',
      noResults: 'কোন রিপোর্ট পাওয়া যায়নি।',
      legendTitle: 'মানচিত্র নির্দেশিকা',
      hotspotLegend: 'হটস্পট জোন',
      reportDetailLink: 'সম্পূর্ণ বিবরণ দেখুন',
      reportedOn: 'জমা দেওয়ার তারিখ',
    },
    dashboard: {
      pageTitle: 'সামাজিক প্রভাব ও অগ্রাধিকার ড্যাশবোর্ড',
      pageSubtitle: 'রিয়েল-টাইম পৌর টেলিমেট্রি এবং স্বচ্ছ অ্যাকশন সারি।',
      demoBanner: 'ডেমো মোড সক্রিয়: হায়দ্রাবাদ স্যাম্পল ডেটাসেট (is_demo=true)।',
      tabOverview: 'সারসংক্ষেপ',
      tabQueue: 'অ্যাকশন কিউ',
      tabAnalytics: 'বিশ্লেষণ',
      queueTitle: 'অগ্রাধিকার অ্যাকশন কিউ',
      queueSubtitle: 'স্বচ্ছ সূত্রের ভিত্তিতে ক্রমানুযায়ী সাজানো।',
      filterAll: 'সমস্ত',
      sortHighestPriority: 'সর্বোচ্চ অগ্রাধিকার আগে',
      sortNewest: 'সাম্প্রতিক আগে',
      sortOldest: 'দীর্ঘকালীন অনিষ্পন্ন আগে',
      colTitle: 'সমস্যা',
      colCategory: 'বিভাগ',
      colArea: 'এলাকা',
      colPriority: 'স্কোর',
      colStatus: 'অবস্থা',
      colAge: 'দিন',
      colAction: 'পদক্ষেপ',
      viewDetails: 'দেখুন',
      categoryDistributionTitle: 'বিভাগভিত্তিক রিপোর্ট',
      statusDistributionTitle: 'সমাধানের অগ্রগতি',
      trendTitle: '৭ দিনের প্রবণতা',
      hotspotListTitle: 'সক্রিয় ভৌগোলিক হটস্পট',
    },
    detail: {
      backToMap: 'মানচিত্রে ফিরুন',
      backToDashboard: 'ড্যাশবোর্ডে ফিরুন',
      reportedAt: 'রিপোর্টের তারিখ',
      locationInfo: 'ভৌগোলিক অবস্থান',
      aiAnalysisHeader: 'AI বিশ্লেষণ ও ঝুঁকি নির্ণয়',
      modelTag: 'ইঞ্জিন: Google Gemini Flash',
      fallbackTag: 'ইঞ্জিন: নিয়ম-ভিত্তিক ইঞ্জিন',
      statusHistoryHeader: 'অগ্রগতির ইতিহাস ও অডিট ট্রেইল',
      updateStatusDemo: 'ডেমো অফিসার স্থিতি নিয়ন্ত্রণ',
      updateStatusBtn: 'অবস্থা আপডেট করুন',
      statusUpdatedToast: 'অবস্থা সফলভাবে আপডেট হয়েছে।',
      potentialDuplicatesTitle: 'নিকটবর্তী সম্ভাব্য সদৃশ রিপোর্ট',
      noDuplicatesFound: '৩০০ মিটারের মধ্যে সদৃশ রিপোর্ট নেই।',
      matchDistance: 'দূরত্ব',
      matchScore: 'পাঠ্য সাদৃশ্য',
    },
    about: {
      title: 'জনসংকেত AI সম্পর্কে',
      subtitle: 'AI, GIS এবং স্বচ্ছতার মাধ্যমে নাগরিক সমস্যার প্রতিকার।',
      missionTitle: 'আমাদের লক্ষ্য',
      missionText: 'নাগরিক অভিযোগের দ্রুত এবং সুষম সমাধান নিশ্চিত করা।',
      formulaTitle: 'অগ্রাধিকার সূত্র',
      formulaExplanation: 'স্কোর = ০.৪০S + ০.২৫R + ০.২০D + ০.১৫U',
      aiDisclaimerTitle: 'দায়িত্বশীল AI',
      aiDisclaimerText: 'AI সিদ্ধান্ত গ্রহণে সহায়তা প্রদান করে।',
      techStackTitle: 'MY ভারত হ্যাকাথনের জন্য নির্মিত',
    },
    footer: {
      tagline: 'নাগরিক সমস্যা থেকে সামাজিক প্রতিকার।',
      demoNotice: 'প্রদর্শিত ডেটা হায়দ্রাবাদের জন্য ডেমো ডেটা।',
      privacyNotice: 'কোন ব্যক্তিগত গোপনীয় তথ্য সংরক্ষিত হয় না।',
      quickLinks: 'নেভিগেশন',
      developedFor: 'MY ভারত হ্যাক ফর সোশ্যাল ইস্যুজ',
    },
  },
  mr: { ...translationsPlaceholder('मराठी', 'mr', 'Devanagari') },
  ta: { ...translationsPlaceholder('தமிழ்', 'ta', 'Tamil') },
  kn: { ...translationsPlaceholder('ಕನ್ನಡ', 'kn', 'Kannada') },
  ml: { ...translationsPlaceholder('മലയാളം', 'ml', 'Malayalam') },
  gu: { ...translationsPlaceholder('ગુજરાતી', 'gu', 'Gujarati') },
  pa: { ...translationsPlaceholder('ਪੰਜਾਬੀ', 'pa', 'Gurmukhi') },
  or: { ...translationsPlaceholder('ଓଡ଼ିଆ', 'or', 'Odia') },
  ur: { ...translationsPlaceholder('اردو', 'ur', 'Arabic', true) },
};

function translationsPlaceholder(name: string, code: string, _script: string, isRtl = false): TranslationDictionary {
  // Return localized baseline so every language key is 100% satisfied
  return {
    brand: {
      name: isRtl ? 'جان سنکیت AI' : `JanSanket AI (${name})`,
      tagline: isRtl ? 'شہری مسائل کو عوامی عمل میں بدلنا' : 'Turning Civic Problems into Community Action',
      subTagline: 'AI + GIS Citizen Intelligence for Municipal Excellence',
      badge: 'MY Bharat Hackathon MVP',
    },
    nav: {
      home: isRtl ? 'ہوم' : 'Home',
      exploreMap: isRtl ? 'نقشہ دیکھیں' : 'Explore Map',
      reportIssue: isRtl ? 'مسئلہ درج کریں' : 'Report an Issue',
      impactDashboard: isRtl ? 'ڈیش بورڈ' : 'Impact Dashboard',
      about: isRtl ? 'طریقہ کار' : 'About & Methodology',
      ctaReport: isRtl ? 'مسئلہ درج کریں' : 'Report a Problem',
    },
    hero: {
      headline: isRtl ? 'آپ کا شہر۔ آپ کی آواز۔ سمارٹ اقدام۔' : 'Your City. Your Voice. Smarter Action.',
      subheadline:
        'Transform civic complaints into an explainable, location-aware community priority queue with AI & GIS.',
      primaryCta: isRtl ? 'مسئلہ درج کریں' : 'Report a Problem',
      secondaryCta: isRtl ? 'نقشہ دیکھیں' : 'Explore Civic Map',
      demoNotice: 'Hyderabad municipal sample records demo environment.',
      verifiedPilot: 'Built for Civic Transparency & Citizen Empowerment',
    },
    impactStrip: {
      title: 'Civic Ledger',
      totalReports: 'Reports Submitted',
      openIssues: 'Active In Queue',
      inProgress: 'Currently In Action',
      resolvedIssues: 'Civic Issues Resolved',
      hotspotsIdentified: 'Hotspots Detected',
      avgResolution: 'Avg. Days to Resolve',
      days: 'days',
    },
    howItWorks: {
      title: 'How JanSanket AI Works',
      subtitle: 'From citizen observation to remediation in four stages.',
      step1Title: '1. Citizen Report',
      step1Desc: 'Capture photo, exact geo-coordinates, and brief problem description.',
      step2Title: '2. AI Classification',
      step2Desc: 'Structured AI categorizes hazard type and flags potential duplicates.',
      step3Title: '3. Geospatial Hotspots',
      step3Desc: 'GIS engine clusters related civic failures within geographic radius.',
      step4Title: '4. Transparent Priority',
      step4Desc: 'Objective formula (0.40S + 0.25R + 0.20D + 0.15U) sorts action queue.',
    },
    categories: {
      all: 'All Categories',
      pothole: 'Potholes & Roads',
      garbage: 'Garbage & Dumping',
      drainage: 'Drainage & Waterlogging',
      streetlight: 'Streetlights & Electrical',
      infrastructure: 'Public Infrastructure',
      sanitation_other: 'Sanitation & Hygiene',
    },
    statuses: {
      all: 'All Statuses',
      submitted: 'Submitted',
      under_review: 'Under Review',
      in_progress: 'In Progress',
      resolved: 'Resolved',
      rejected: 'Closed / Duplicate',
    },
    priority: {
      score: 'Priority Score',
      band: 'Priority Level',
      critical: 'Critical Action',
      high: 'High Priority',
      medium: 'Medium Priority',
      low: 'Low Priority',
      breakdownTitle: 'Explainable Score Breakdown',
      severityLabel: 'Severity (40%)',
      recurrenceLabel: 'Recurrence / Density (25%)',
      durationLabel: 'Duration Unresolved (20%)',
      communityImpactLabel: 'Community Impact (15%)',
      disclaimer: 'This score is an automated decision-support metric based on verifiable factors.',
    },
    reportForm: {
      pageTitle: 'Report a Civic Issue',
      pageSubtitle: 'Help your municipality prioritize repairs where they matter most.',
      step1Heading: '1. Issue Details',
      step2Heading: '2. Precise Location',
      step3Heading: '3. AI Validation & Review',
      categoryLabel: 'Issue Category',
      titleLabel: 'Short Title',
      titlePlaceholder: 'e.g., Deep pothole causing skidding near signal',
      descriptionLabel: 'Description of the Problem',
      descriptionPlaceholder: 'Describe the danger, size, duration, or impact...',
      photoLabel: 'Photo Evidence',
      photoHint: 'Upload clear photo of the hazard (JPEG/PNG up to 5MB)',
      choosePhoto: 'Select Image File',
      changePhoto: 'Change Photo',
      removePhoto: 'Remove',
      locationHeading: 'Geo-Coordinates & Landmark',
      useMyLocation: 'Use My Current GPS',
      gettingLocation: 'Acquiring GPS Signal...',
      manualLocation: 'Select on Map / Custom Landmark',
      landmarkLabel: 'Landmark or Locality',
      landmarkPlaceholder: 'e.g., Near Road 36 Metro Pillar 124',
      latitude: 'Latitude',
      longitude: 'Longitude',
      selectOnMap: 'Pick on Interactive Map',
      aiPreviewTitle: 'AI Preliminary Assessment',
      aiAnalyzing: 'Analyzing problem description...',
      aiSeverityEstimate: 'Suggested Severity',
      aiConfidence: 'AI Confidence',
      duplicateWarningTitle: 'Potential Duplicate Detected',
      duplicateWarningDesc: 'A very similar report exists within 300 meters of your coordinates.',
      viewCandidate: 'Inspect Existing Report',
      submitReport: 'Submit Verified Report',
      submitting: 'Registering into Civic Ledger...',
      successTitle: 'Civic Report Registered Successfully',
      successMessage: 'Your issue has been logged with an explainable priority score.',
      reportIdLabel: 'Report Reference ID',
      viewReportBtn: 'Inspect This Report',
      reportAnotherBtn: 'Report Another Issue',
      validationCategory: 'Please select an issue category.',
      validationTitle: 'Please provide a title (min 5 characters).',
      validationDesc: 'Please provide a descriptive explanation (min 15 characters).',
      validationLocation: 'Please provide valid latitude and longitude coordinates.',
    },
    map: {
      pageTitle: 'Geospatial Civic Map',
      pageSubtitle: 'Explore verified civic reports, spatial clusters, and neighborhood hotspot zones across Hyderabad.',
      filterCategory: 'Filter Category',
      filterStatus: 'Filter Status',
      filterPriority: 'Priority Level',
      showHotspots: 'Show GIS Hotspot Clusters',
      fitBounds: 'Reset View / Fit All Reports',
      resultsCount: 'Displaying {count} civic reports',
      noResults: 'No civic reports match the selected filters.',
      legendTitle: 'Map Legend',
      hotspotLegend: 'Hotspot Zone (Cluster radius)',
      reportDetailLink: 'View Full Report & Action History',
      reportedOn: 'Reported on',
    },
    dashboard: {
      pageTitle: 'Community Impact & Priority Action Queue',
      pageSubtitle: 'Real-time municipal telemetry, geographic concentration, and objective action scheduling.',
      demoBanner: 'Demo mode active: Connected to synthetic Hyderabad municipal dataset (is_demo=true).',
      tabOverview: 'Executive Overview',
      tabQueue: 'Action Queue',
      tabAnalytics: 'Spatial Analytics',
      queueTitle: 'Prioritized Civic Action Queue',
      queueSubtitle: 'Sorted strictly by the transparent priority formula (0.40S + 0.25R + 0.20D + 0.15U).',
      filterAll: 'All Items',
      sortHighestPriority: 'Highest Priority First',
      sortNewest: 'Most Recent First',
      sortOldest: 'Longest Unresolved First',
      colTitle: 'Civic Issue',
      colCategory: 'Category',
      colArea: 'Locality',
      colPriority: 'Score',
      colStatus: 'Status',
      colAge: 'Days Open',
      colAction: 'Action',
      viewDetails: 'Inspect',
      categoryDistributionTitle: 'Reports by Hazard Category',
      statusDistributionTitle: 'Workflow Resolution Status',
      trendTitle: '7-Day Intake & Remediation Velocity',
      hotspotListTitle: 'Active Geographic Hotspot Zones',
    },
    detail: {
      backToMap: 'Return to Map',
      backToDashboard: 'Return to Dashboard',
      reportedAt: 'Report Date',
      locationInfo: 'Geospatial Location',
      aiAnalysisHeader: 'AI Classification & Hazard Diagnostics',
      modelTag: 'Engine: Google Gemini Flash',
      fallbackTag: 'Engine: Rule-Based Fallback Engine',
      statusHistoryHeader: 'Lifecycle History & Civic Audit Trail',
      updateStatusDemo: 'Demo Officer Status Control',
      updateStatusBtn: 'Update Status',
      statusUpdatedToast: 'Status successfully updated in the civic database.',
      potentialDuplicatesTitle: 'Nearby Potential Duplicate Reports',
      noDuplicatesFound: 'No nearby duplicate candidates detected within 300 meters.',
      matchDistance: 'Distance',
      matchScore: 'Text Similarity',
    },
    about: {
      title: 'About JanSanket AI',
      subtitle: 'Turning Civic Problems into Community Action with AI, GIS, and Radical Transparency.',
      missionTitle: 'The Problem We Are Solving',
      missionText: 'JanSanket AI bridges citizens and urban local bodies through geospatial intelligence and objective prioritization.',
      formulaTitle: 'Transparent Prioritization Formula',
      formulaExplanation: 'Priority Score = 0.40S + 0.25R + 0.20D + 0.15U.',
      aiDisclaimerTitle: 'Responsible AI',
      aiDisclaimerText: 'AI assists human decision-makers rather than replacing municipal authority.',
      techStackTitle: 'Built for MY Bharat Hackathon',
    },
    footer: {
      tagline: 'Turning Civic Problems into Community Action.',
      demoNotice: 'All data shown is simulated demonstration data for Hyderabad, Telangana.',
      privacyNotice: 'Zero unnecessary personal information is retained.',
      quickLinks: 'Navigation',
      developedFor: 'Developed for MY Bharat Hack for Social Issues',
    },
  };
}
