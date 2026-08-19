// ============================================================
// PROJECTS DATA
// Edit project details here.
// GitHub URL: Set to a real repo URL when available.
//             Set to null if no matching repository exists.
// ============================================================

// NOTE: Verified GitHub profile: https://github.com/saksham0428
// Public repos found: web-dev, webdev, web-dev2, Leet-code, exp3.1, exp3.2
// None of these repos confidently match the portfolio projects below.
// All github fields are set to null until matching repos are confirmed.

export const projects = [
  {
    id: '01',
    slug: 'skin-cancer-detection',
    title: 'Skin Cancer Detection',
    subtitle: 'AI / Computer Vision',
    tagline: 'An AI-based system to analyze skin images and assist in detecting potential skin cancer patterns.',
    description:
      'Built a deep learning pipeline that processes dermoscopic images to identify patterns associated with skin cancer. The system provides a probability score and highlights suspicious regions, aiding early detection.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Computer Vision', 'CNN'],
    features: [
      'Image preprocessing & augmentation pipeline',
      'CNN-based classification model',
      'Probability heatmap visualization',
      'Multiple cancer type classification',
    ],
    github: null, // No matching repository found — add repo URL when available
    demo: null,
  },
  {
    id: '02',
    slug: 'whatsapp-chatbot',
    title: 'WhatsApp Chatbot',
    subtitle: 'Automation / NLP',
    tagline: 'An intelligent WhatsApp chatbot capable of automated responses and task execution via messaging.',
    description:
      'Developed a WhatsApp chatbot that handles automated queries, integrates with external APIs, and executes predefined tasks — all through natural language messages.',
    tech: ['Python', 'Twilio API', 'NLP', 'Flask'],
    features: [
      'Natural language query handling',
      'WhatsApp API integration via Twilio',
      'Command-based task execution',
      'Real-time response system',
    ],
    github: null, // No matching repository found — add repo URL when available
    demo: null,
  },
  {
    id: '03',
    slug: 'face-detection-ai',
    title: 'Face Detection AI',
    subtitle: 'Computer Vision',
    tagline: 'Real-time face detection and recognition system using computer vision techniques.',
    description:
      'Built a real-time face detection system using OpenCV and deep learning models. Capable of detecting multiple faces simultaneously with bounding box annotation and confidence scoring.',
    tech: ['Python', 'OpenCV', 'Deep Learning', 'Computer Vision'],
    features: [
      'Real-time video stream processing',
      'Multi-face simultaneous detection',
      'Confidence score visualization',
      'Webcam & video file support',
    ],
    github: null, // No matching repository found — add repo URL when available
    demo: null,
  },
  {
    id: '04',
    slug: 'java-sorting-visualizer',
    title: 'Sorting Visualizer',
    subtitle: 'Java / DSA',
    tagline: 'Interactive visualization of classic sorting algorithms to understand their mechanics and complexity.',
    description:
      'A Java application that visually demonstrates sorting algorithms step by step, with adjustable speed and array size. Great for understanding time complexity intuitively.',
    tech: ['Java', 'Swing', 'DSA', 'Algorithms'],
    features: [
      'Bubble, Merge, Quick, Insertion Sort',
      'Real-time bar chart animation',
      'Adjustable speed and array size',
      'Step-by-step execution mode',
    ],
    github: null, // No matching repository found — add repo URL when available
    demo: null,
  },
  {
    id: '05',
    slug: 'smart-home-weather-station',
    title: 'Smart Weather Station',
    subtitle: 'IoT / Hardware',
    tagline: 'An IoT-based home weather station with real-time data monitoring and cloud dashboards.',
    description:
      'Designed and built a smart home weather monitoring system using Arduino and ESP8266, capable of measuring temperature, humidity, and air quality — all streamed to a cloud dashboard.',
    tech: ['Arduino', 'ESP8266', 'IoT', 'ThingSpeak', 'C++'],
    features: [
      'Temperature, humidity & air quality sensing',
      'Wi-Fi data streaming to ThingSpeak',
      'Cloud-hosted real-time dashboard',
      'Low-power IoT design',
    ],
    github: null, // No matching repository found — add repo URL when available
    demo: null,
  },
  {
    id: '06',
    slug: 'smart-parking-system',
    title: 'Smart Parking System',
    subtitle: 'IoT / Embedded',
    tagline: 'Automated parking management system using sensors and microcontrollers.',
    description:
      'Built an automated parking availability system that uses IR/ultrasonic sensors to detect vacant slots and displays real-time status. Eliminates manual parking management.',
    tech: ['Arduino', 'IoT', 'Sensors', 'C++', 'LCD Display'],
    features: [
      'Real-time slot availability detection',
      'IR/ultrasonic sensor array',
      'LCD status display',
      'Automated gate control logic',
    ],
    github: null, // No matching repository found — add repo URL when available
    demo: null,
  },
  {
    id: '07',
    slug: 'financial-analytics-tableau',
    title: 'Financial Analytics',
    subtitle: 'Data Analytics / Tableau',
    tagline: 'Comprehensive financial data analysis and visualization using Tableau.',
    description:
      'Created an end-to-end financial analytics dashboard using Tableau, with SQL-powered data transformations. Provides insights into financial trends, KPIs, and anomaly detection.',
    tech: ['Tableau', 'SQL', 'Data Analytics', 'Data Visualization'],
    features: [
      'Interactive Tableau dashboard',
      'SQL-based data transformation',
      'Financial trend analysis',
      'KPI monitoring and anomaly detection',
    ],
    github: null, // No matching repository found — add repo URL when available
    demo: null,
  },
];
