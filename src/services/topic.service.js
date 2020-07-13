const defaultTopics = [
    {
        id: "1",
        title: "Where to find a nice dress",
        answers: [
            {
                id: '1',
                publishedAt: "2020-05-06 12:23:45",
                publishedBy: "John Doe",
                text: "You can find dress in street Kralja Petra"
            },
            {
                id: '2',
                publishedAt: "2020-05-06 15:00:01",
                publishedBy: "John Doe",
                text: "I have found mine there"
            },
            {
                id: '3',
                publishedAt: "2020-05-06 19:43:15",
                publishedBy: "John Doe",
                text: "There are also nice stores in street Strahinjica Bana"
            },
            {
                id: '4',
                publishedAt: "2020-05-06 20:23:55",
                publishedBy: "Petar Petrovic",
                text: "I am interested about dresses in Panchevo"
            }
        ]
    },
    {
        id: "2",
        title: "Interesting games to play",
        answers: [
            {
                id: '1',
                publishedAt: "2020-05-06 12:23:45",
                publishedBy: "John Doe",
                text: "quroidor"
            },
            {
                id: '2',
                publishedAt: "2020-05-06 15:00:01",
                publishedBy: "Vedrana Bradasevic",
                text: "Monopol"
            },
            {
                id: '12',
                publishedAt: "2020-05-06 19:43:15",
                publishedBy: "Nikolija Nikolic",
                text: "Jamb"
            },
            {
                id: '4',
                publishedAt: "2020-05-06 20:23:55",
                publishedBy: "Petar Petrovic",
                text: "Lora"
            }
        ]
    },
    {
        id: "3",
        title: "Songs for weddings",
        answers: [
            {
                id: '1',
                publishedAt: "2020-05-06 12:23:45",
                publishedBy: "John Doe",
                text: "Dance with somebody"
            },
            {
                id: '2',
                publishedAt: "2020-05-06 15:00:01",
                publishedBy: "Vedrana Bradasevic",
                text: "I have found mine there"
            },
            {
                id: '3',
                publishedAt: "2020-05-06 19:43:15",
                publishedBy: "Nikolija Nikolic",
                text: "There are also nice stores in street Strahinjica Bana"
            },
            {
                id: '4',
                publishedAt: "2020-05-06 20:23:55",
                publishedBy: "Petar Petrovic",
                text: "I am interested about dresses in Panchevo"
            }
        ]
    }
];

const getDefaultTopics = () => {
    localStorage.setItem('topics', JSON.stringify(defaultTopics));
    return JSON.parse(JSON.stringify(defaultTopics));
}

module.exports.getTopics = () => {
    return new Promise((resolve, reject) => {
        let topics = JSON.parse(localStorage.getItem("topics")) || getDefaultTopics();
        topics = topics.map(topic => {
            return {
                id: topic.id,
                title: topic.title,
                lastAnswerPublishedAt: topic.answers.length > 0 ? topic.answers.sort((answer1, answer2) =>
                 { return new Date(answer2.publishedAt).getTime() - new Date(answer1.publishedAt).getTime() })[0].publishedAt : null,
                numberOfAnswers: topic.answers.length
            }
        });
        resolve({
            status: 200,
            data: topics
        });
    });
};

module.exports.getTopic = (topicId) => {
    return new Promise((resolve, reject) => {
        const topics = JSON.parse(localStorage.getItem("topics")) || getDefaultTopics();
        resolve(topics.find(topic => topic.id === topicId));
    });
};

module.exports.addTopic = (topic) => {
    return new Promise((resolve, reject) => {
        const topics = JSON.parse(localStorage.getItem("topics")) || [];
        if (topic.title.length < 5 || topic.title.length > 200) {
            return;
        } else {
            topics.push(topic);
        }
        localStorage.setItem("topics", JSON.stringify(topics));
        resolve({
            status: 201
        });
    });
};

module.exports.addAnswer = (topicId, answer) => {
    return new Promise((resolve, reject) => {
        const topics = JSON.parse(localStorage.getItem("topics")) || getDefaultTopics();
        const topic = topics.find(topic => topic.id == topicId);
        topic.answers.push(answer);
        localStorage.setItem('topics', JSON.stringify(topics));
        resolve({
            status: 201
        });
    });
}