// Mock data for UI demonstration

export const mockTweets = [
    {
        _id: '1',
        tweet_id: '1234567890',
        text: 'The midterm exam was really challenging but fair. Covered all the topics from the syllabus. #UniversityLife #Exam',
        author_username: 'sarah_student',
        author_name: 'Sarah Ahmed',
        created_at: '2026-03-08T10:30:00Z',
        language: 'en',
        keywords_matched: ['exam', 'syllabus'],
        engagement: {
            likes: 45,
            retweets: 12,
            replies: 8,
            quotes: 3
        },
        metadata: {
            is_reply: false,
            reply_to_id: null,
            mentioned_users: []
        }
    },
    {
        _id: '2',
        tweet_id: '1234567891',
        text: 'امتحان اليوم كان صعب جداً. المنهج طويل والوقت قصير. نحتاج مراجعة أفضل قبل الامتحانات النهائية.',
        author_username: 'ahmed_tech',
        author_name: 'Ahmed Hassan',
        created_at: '2026-03-08T09:15:00Z',
        language: 'ar',
        keywords_matched: ['امتحان', 'منهج'],
        engagement: {
            likes: 67,
            retweets: 23,
            replies: 15,
            quotes: 5
        },
        metadata: {
            is_reply: false,
            reply_to_id: null,
            mentioned_users: []
        }
    },
    {
        _id: '3',
        tweet_id: '1234567892',
        text: 'Our professor explained the assignment requirements clearly. Looking forward to working on this project! #Assignment #University',
        author_username: 'john_eng',
        author_name: 'John Smith',
        created_at: '2026-03-08T08:45:00Z',
        language: 'en',
        keywords_matched: ['assignment', 'professor'],
        engagement: {
            likes: 34,
            retweets: 8,
            replies: 5,
            quotes: 2
        },
        metadata: {
            is_reply: false,
            reply_to_id: null,
            mentioned_users: []
        }
    },
    {
        _id: '4',
        tweet_id: '1234567893',
        text: 'تاقیکردنەوەی ئەمڕۆ زۆر باش بوو. مامۆستا پرسیارەکانی ڕوون بوون. سوپاس بۆ ئامادەکاری باش.',
        author_username: 'layla_krd',
        author_name: 'Layla Karim',
        created_at: '2026-03-08T07:20:00Z',
        language: 'ku',
        keywords_matched: ['تاقیکردنەوە', 'مامۆستا'],
        engagement: {
            likes: 52,
            retweets: 18,
            replies: 10,
            quotes: 4
        },
        metadata: {
            is_reply: false,
            reply_to_id: null,
            mentioned_users: []
        }
    },
    {
        _id: '5',
        tweet_id: '1234567894',
        text: 'The new curriculum is much better than last year. More practical examples and real-world applications. Great improvement! #Curriculum',
        author_username: 'maria_cs',
        author_name: 'Maria Lopez',
        created_at: '2026-03-07T16:30:00Z',
        language: 'en',
        keywords_matched: ['curriculum'],
        engagement: {
            likes: 89,
            retweets: 34,
            replies: 22,
            quotes: 8
        },
        metadata: {
            is_reply: false,
            reply_to_id: null,
            mentioned_users: []
        }
    },
    {
        _id: '6',
        tweet_id: '1234567895',
        text: 'Homework deadline extended by one week. Thank you professor for understanding our workload! #Homework #University',
        author_username: 'david_math',
        author_name: 'David Chen',
        created_at: '2026-03-07T14:15:00Z',
        language: 'en',
        keywords_matched: ['homework', 'professor'],
        engagement: {
            likes: 156,
            retweets: 45,
            replies: 28,
            quotes: 12
        },
        metadata: {
            is_reply: false,
            reply_to_id: null,
            mentioned_users: []
        }
    },
    {
        _id: '7',
        tweet_id: '1234567896',
        text: 'المحاضرة اليوم كانت ممتازة. شرح الدكتور الموضوع بطريقة سهلة ومفهومة. استفدت كثيراً.',
        author_username: 'fatima_med',
        author_name: 'Fatima Ali',
        created_at: '2026-03-07T11:45:00Z',
        language: 'ar',
        keywords_matched: ['محاضرة'],
        engagement: {
            likes: 73,
            retweets: 19,
            replies: 11,
            quotes: 6
        },
        metadata: {
            is_reply: false,
            reply_to_id: null,
            mentioned_users: []
        }
    },
    {
        _id: '8',
        tweet_id: '1234567897',
        text: 'Quiz tomorrow on chapters 5-7. Study group meeting at library tonight. Who\'s in? #Quiz #StudyGroup',
        author_username: 'alex_bio',
        author_name: 'Alex Johnson',
        created_at: '2026-03-07T10:00:00Z',
        language: 'en',
        keywords_matched: ['quiz'],
        engagement: {
            likes: 42,
            retweets: 15,
            replies: 18,
            quotes: 3
        },
        metadata: {
            is_reply: false,
            reply_to_id: null,
            mentioned_users: []
        }
    },
    {
        _id: '9',
        tweet_id: '1234567898',
        text: 'Final exam schedule is out! Three exams in one week is too much. Need better planning from the university.',
        author_username: 'omar_eng',
        author_name: 'Omar Rashid',
        created_at: '2026-03-06T15:30:00Z',
        language: 'en',
        keywords_matched: ['exam', 'final', 'university'],
        engagement: {
            likes: 234,
            retweets: 78,
            replies: 45,
            quotes: 19
        },
        metadata: {
            is_reply: false,
            reply_to_id: null,
            mentioned_users: []
        }
    },
    {
        _id: '10',
        tweet_id: '1234567899',
        text: 'ئەرکی ماڵەوە زۆر سەختە. پێویستمان بە کات زیاترە بۆ تەواوکردنی. #ئەرک',
        author_username: 'hana_krd',
        author_name: 'Hana Mahmoud',
        created_at: '2026-03-06T13:20:00Z',
        language: 'ku',
        keywords_matched: ['ئەرک'],
        engagement: {
            likes: 61,
            retweets: 21,
            replies: 14,
            quotes: 7
        },
        metadata: {
            is_reply: false,
            reply_to_id: null,
            mentioned_users: []
        }
    }
];

export const mockStats = {
    overview: {
        totalTweets: 1247,
        tweetsToday: 89,
        mostActiveKeyword: 'exam',
        averageEngagement: 67.5
    },
    timeline: [
        { date: '2026-03-02', count: 145 },
        { date: '2026-03-03', count: 178 },
        { date: '2026-03-04', count: 203 },
        { date: '2026-03-05', count: 167 },
        { date: '2026-03-06', count: 189 },
        { date: '2026-03-07', count: 221 },
        { date: '2026-03-08', count: 144 }
    ],
    keywords: [
        { keyword: 'exam', count: 342 },
        { keyword: 'assignment', count: 267 },
        { keyword: 'syllabus', count: 198 },
        { keyword: 'homework', count: 156 },
        { keyword: 'quiz', count: 134 },
        { keyword: 'professor', count: 98 },
        { keyword: 'lecture', count: 87 },
        { keyword: 'curriculum', count: 65 }
    ],
    engagement: {
        totalLikes: 8456,
        totalRetweets: 2341,
        totalReplies: 1876,
        totalQuotes: 567
    },
    languages: [
        { language: 'English', count: 645, percentage: 51.7 },
        { language: 'Arabic', count: 412, percentage: 33.0 },
        { language: 'Kurdish', count: 190, percentage: 15.3 }
    ]
};

export const mockKeywords = [
    {
        _id: '1',
        keyword: 'exam',
        language: 'en',
        category: 'assessment',
        active: true,
        added_by: 'admin',
        created_at: '2026-02-01T10:00:00Z'
    },
    {
        _id: '2',
        keyword: 'امتحان',
        language: 'ar',
        category: 'assessment',
        active: true,
        added_by: 'admin',
        created_at: '2026-02-01T10:00:00Z'
    },
    {
        _id: '3',
        keyword: 'تاقیکردنەوە',
        language: 'ku',
        category: 'assessment',
        active: true,
        added_by: 'admin',
        created_at: '2026-02-01T10:00:00Z'
    },
    {
        _id: '4',
        keyword: 'assignment',
        language: 'en',
        category: 'coursework',
        active: true,
        added_by: 'admin',
        created_at: '2026-02-01T10:00:00Z'
    },
    {
        _id: '5',
        keyword: 'واجب',
        language: 'ar',
        category: 'coursework',
        active: true,
        added_by: 'admin',
        created_at: '2026-02-01T10:00:00Z'
    },
    {
        _id: '6',
        keyword: 'ئەرک',
        language: 'ku',
        category: 'coursework',
        active: true,
        added_by: 'admin',
        created_at: '2026-02-01T10:00:00Z'
    },
    {
        _id: '7',
        keyword: 'syllabus',
        language: 'en',
        category: 'content',
        active: true,
        added_by: 'admin',
        created_at: '2026-02-01T10:00:00Z'
    },
    {
        _id: '8',
        keyword: 'منهج',
        language: 'ar',
        category: 'content',
        active: true,
        added_by: 'admin',
        created_at: '2026-02-01T10:00:00Z'
    },
    {
        _id: '9',
        keyword: 'professor',
        language: 'en',
        category: 'people',
        active: true,
        added_by: 'admin',
        created_at: '2026-02-01T10:00:00Z'
    },
    {
        _id: '10',
        keyword: 'مامۆستا',
        language: 'ku',
        category: 'people',
        active: true,
        added_by: 'admin',
        created_at: '2026-02-01T10:00:00Z'
    }
];
// Mock graph data for network visualization
export const mockGraphData = {
    nodes: [
        {
            id: 'user1',
            username: '@sarah_student',
            display_name: 'Sarah Ahmed',
            platform: 'twitter',
            community: '1',
            influence_score: 0.8,
            connections: 25,
            followers_count: 150
        },
        {
            id: 'user2',
            username: '@ahmed_tech',
            display_name: 'Ahmed Hassan',
            platform: 'instagram',
            community: '1',
            influence_score: 0.6,
            connections: 18,
            followers_count: 89
        },
        {
            id: 'user3',
            username: '@john_eng',
            display_name: 'John Smith',
            platform: 'twitter',
            community: '2',
            influence_score: 0.9,
            connections: 32,
            followers_count: 234
        },
        {
            id: 'user4',
            username: '@layla_krd',
            display_name: 'Layla Karim',
            platform: 'facebook',
            community: '2',
            influence_score: 0.7,
            connections: 22,
            followers_count: 178
        },
        {
            id: 'user5',
            username: '@maria_cs',
            display_name: 'Maria Lopez',
            platform: 'instagram',
            community: '1',
            influence_score: 0.5,
            connections: 15,
            followers_count: 67
        },
        {
            id: 'user6',
            username: '@david_math',
            display_name: 'David Chen',
            platform: 'twitter',
            community: '3',
            influence_score: 0.85,
            connections: 28,
            followers_count: 201
        },
        {
            id: 'user7',
            username: '@fatima_med',
            display_name: 'Fatima Ali',
            platform: 'facebook',
            community: '3',
            influence_score: 0.4,
            connections: 12,
            followers_count: 45
        },
        {
            id: 'user8',
            username: '@alex_bio',
            display_name: 'Alex Johnson',
            platform: 'instagram',
            community: '2',
            influence_score: 0.65,
            connections: 20,
            followers_count: 123
        },
        {
            id: 'user9',
            username: '@omar_eng',
            display_name: 'Omar Rashid',
            platform: 'twitter',
            community: '1',
            influence_score: 0.75,
            connections: 24,
            followers_count: 189
        },
        {
            id: 'user10',
            username: '@hana_krd',
            display_name: 'Hana Mahmoud',
            platform: 'facebook',
            community: '3',
            influence_score: 0.55,
            connections: 16,
            followers_count: 98
        }
    ],
    links: [
        { source: 'user1', target: 'user2', type: 'mention', weight: 3, platform: 'twitter' },
        { source: 'user1', target: 'user5', type: 'reply', weight: 2, platform: 'twitter' },
        { source: 'user2', target: 'user3', type: 'mention', weight: 1, platform: 'instagram' },
        { source: 'user3', target: 'user4', type: 'retweet', weight: 4, platform: 'twitter' },
        { source: 'user4', target: 'user8', type: 'comment', weight: 2, platform: 'facebook' },
        { source: 'user5', target: 'user1', type: 'mention', weight: 2, platform: 'instagram' },
        { source: 'user6', target: 'user7', type: 'reply', weight: 3, platform: 'twitter' },
        { source: 'user7', target: 'user6', type: 'comment', weight: 1, platform: 'facebook' },
        { source: 'user8', target: 'user3', type: 'mention', weight: 2, platform: 'instagram' },
        { source: 'user2', target: 'user8', type: 'reply', weight: 1, platform: 'instagram' },
        { source: 'user6', target: 'user1', type: 'retweet', weight: 2, platform: 'twitter' },
        { source: 'user4', target: 'user6', type: 'mention', weight: 1, platform: 'facebook' },
        { source: 'user9', target: 'user1', type: 'reply', weight: 3, platform: 'twitter' },
        { source: 'user9', target: 'user5', type: 'mention', weight: 2, platform: 'twitter' },
        { source: 'user10', target: 'user7', type: 'comment', weight: 2, platform: 'facebook' },
        { source: 'user10', target: 'user4', type: 'mention', weight: 1, platform: 'facebook' }
    ],
    communities: [
        {
            id: '1',
            size: 4,
            density: 0.67,
            primary_platform: 'twitter',
            dominant_topics: ['exam', 'assignment'],
            members: ['user1', 'user2', 'user5', 'user9']
        },
        {
            id: '2',
            size: 3,
            density: 0.5,
            primary_platform: 'instagram',
            dominant_topics: ['lecture', 'syllabus'],
            members: ['user3', 'user4', 'user8']
        },
        {
            id: '3',
            size: 3,
            density: 0.8,
            primary_platform: 'facebook',
            dominant_topics: ['university', 'course'],
            members: ['user6', 'user7', 'user10']
        }
    ],
    metrics: {
        total_nodes: 10,
        total_edges: 16,
        density: 0.36,
        clustering_coefficient: 0.45,
        average_path_length: 2.1
    }
};