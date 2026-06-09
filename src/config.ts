export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  successMessage: string;
}

export interface GalleryPhoto {
  url: string;
  caption: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface ConfigType {
  friendName: string;
  birthDatePasscode: string; // Format: DDMMYYYY (digits only or customizable)
  musicUrl: string;
  whatsappNumber?: string; // WhatsApp number for the floating chat button
  triviaQuestions: TriviaQuestion[];
  galleryPhotos: GalleryPhoto[];
  personalMessages: string[];
  quotes: Quote[];
  babyPrediction: {
    imageUrl: string;
    boyResponse: string;
    girlResponse: string;
  };
}

export const CONFIG: ConfigType = {
  friendName: "Priya Harshana",
  birthDatePasscode: "11061998", // Format: DDMMYYYY digits only
  musicUrl: "/bgm.mp3", // Premium instrumental track

  triviaQuestions: [
    {
      question: "Where did we first meet or hang out?",
      options: [
        "In college / school campus",
        "At a local coffee shop",
        "Through a mutual friend's party",
        "On an unexpected road trip"
      ],
      correctAnswer: 0,
      successMessage: "Yes! That place holds so many unforgettable memories!"
    },
    {
      question: "how your gang used to call you in college days?",
      options: [
        "taguu",
        "patithiyam",
        "maadu",
        "kadichu"
      ],
      correctAnswer: 3,
      successMessage: "Yes! You are my real kadichu di!"
    },
    {
      question: "what you hate to eat?",
      options: [
        "nuts",
        "corn",
        "carrot",
        "dates"
      ],
      correctAnswer: 0,
      successMessage: "Correct! You could never eat!"
    },
    {
      question: "Who is more likely to get lost even with Google Maps open?",
      options: [
        "Priya Harshana (obviously!)",
        "Sharthi (without a doubt)",
        "Rashmi (without a doubt)",
        "Shanmugapriya (without a doubt)"
      ],
      correctAnswer: 0,
      successMessage: "Haha, spot on! Priya Harshana's direction sense is legendary!"
    },
    {
      question: "which incident you wont forget?",
      options: [
        "in college days (after dec 24)",
        "pondicherry trip (we 4)",
        "sharthi marriage trip",
        "bike accident (shanmuga priya in chennai)"
      ],
      correctAnswer: 0,
      successMessage: "Yes! That incident changed our friendship!"
    },
  ],

  galleryPhotos: [
    {
      url: "/image-1.jpeg",
      caption: "Laughing over silly jokes - some things never change!"
    },
    {
      url: "/image-2.jpeg",
      caption: "That spontaneous trip where we watched the sunset."
    },
    {
      url: "/image-3.jpeg",
      caption: "Celebrating milestones together, side by side."
    },
    {
      url: "/image-4.jpeg",
      caption: "Endless conversations and cozy evening tea."
    },
    {
      url: "/image-5.jpeg",
      caption: "Our legendary Maggi & spicy momos cooking experiments!"
    },
    {
      url: "/image-6.jpeg",
      caption: "Getting lost together but making the best memories."
    },
    {
      url: "/image-7.jpeg",
      caption: "A beautiful day filled with sunshine and your radiant smile."
    },
    {
      url: "/image-8.jpeg",
      caption: "Late-night chats where we solved all the world's problems."
    },
    {
      url: "/image-9.jpeg",
      caption: "Through every phase of life, you've been my constant."
    },
    {
      url: "/image-10.jpeg",
      caption: "Exploring new places and finding hidden gems together."
    },
    {
      url: "/image-11.jpeg",
      caption: "To the one who always knows how to make me laugh."
    },
    {
      url: "/image-12.jpeg",
      caption: "Here's to the countless inside jokes only we understand."
    },
    {
      url: "/image-13.jpeg",
      caption: "Capturing a quiet moment of absolute joy and peace."
    },
    {
      url: "/image-14.jpeg",
      caption: "From college classrooms to life's biggest adventures."
    },
    {
      url: "/image-15.jpeg",
      caption: "So excited for your new, beautiful chapter of motherhood!"
    },
    {
      url: "/image-16.jpeg",
      caption: "Forever grateful for a best friend as wonderful as you."
    }
  ],

  personalMessages: [
    "To my wonderful friend, Priya Harshana,",
    "As you celebrate another beautiful year, I want to take a moment to tell you how incredibly grateful I am to have you in my life. You have been my confidant, my partner in crime, and the person who brings so much laughter and sunshine into my world.",
    "Through all the ups and downs, your kindness, warmth, and strength have inspired me. We've built a vault of memories that I treasure deeply—from our endless late-night chats to our absolute silly adventures.",
    "Now, as you stand on the threshold of a beautiful new chapter of motherhood, my heart is overflowing with joy for you. You are going to be the most loving, nurturing, and amazing mother.",
    "Happy Birthday, Priya Harshana! May this year bring you abundant happiness, good health, peace, and endless reasons to smile. I promise to always be there for you, just as you've always been there for me."
  ],

  quotes: [
    {
      text: "Growing old is mandatory, but growing up is optional.",
      author: "Walt Disney"
    },
    {
      text: "A sweet friendship refreshes the soul.",
      author: "Proverbs 27:9"
    },
    {
      text: "Every birthday is a gift. Every day is a new beginning.",
      author: "Unknown"
    },
    {
      text: "A grand adventure is about to begin.",
      author: "Winnie the Pooh"
    }
  ],

  babyPrediction: {
    imageUrl: "/baby_prediction.png",
    boyResponse: "A little prince 👦! Get ready for tiny sneakers, toy cars, and a bundle of endless energy! He's going to be so handsome and blessed to have you as his mom!",
    girlResponse: "A little princess 👧! Get ready for cute dresses, hairbows, and a mini-me who will inherit your beautiful smile and kind heart! She's going to be so precious!"
  }
};
