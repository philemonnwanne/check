import { NewsItemType } from "../NewsItem"

export const industryNews: NewsItemType[] = [
  {
    id: "3",
    type: "industry",
    title: "California Tech Industry Report",
    content: "Silicon Valley's latest industry analysis reveals emerging trends in AI adoption...",
    date: "2024-02-18",
    scope: {
      level: "national",
      country: "United States",
      state: "California"
    },
    source: {
      name: "TechCrunch",
      isVerified: true,
      url: "https://techcrunch.com"
    },
    industryCategory: "Technology",
    interactions: {
      likes: 67,
      comments: 15,
      shares: 23
    }
  },
  {
    id: "4",
    type: "industry",
    title: "Global Automotive Industry Trends",
    content: "Worldwide automotive manufacturing and electric vehicle adoption rates show significant growth...",
    date: "2024-02-15",
    scope: {
      level: "world"
    },
    source: {
      name: "Automotive News",
      isVerified: true,
      url: "https://www.autonews.com"
    },
    industryCategory: "Automotive",
    interactions: {
      likes: 55,
      comments: 10,
      shares: 6
    }
  },
  {
    id: "5",
    type: "industry",
    title: "Florida Tourism Industry Report",
    content: "Post-pandemic tourism recovery shows promising trends in Florida...",
    date: "2024-02-12",
    scope: {
      level: "national",
      country: "United States",
      state: "Florida"
    },
    source: {
      name: "Travel Weekly",
      isVerified: true,
      url: "https://www.travelweekly.com"
    },
    industryCategory: "Tourism & Hospitality",
    interactions: {
      likes: 30,
      comments: 8,
      shares: 5
    }
  },
  {
    id: "6",
    type: "industry",
    title: "Renewable Energy Breakthrough",
    content: "Scientists announce major advancement in solar energy storage technology...",
    date: "2024-02-05",
    scope: {
      level: "world"
    },
    source: {
      name: "Reuters",
      isVerified: true,
      url: "https://www.reuters.com"
    },
    industryCategory: "Energy",
    interactions: {
      likes: 26,
      comments: 8,
      shares: 2
    }
  }
]
