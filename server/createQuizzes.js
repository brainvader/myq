export default function createQuizzes() {
    return [
        {
            uid: "0x77a11",
            title: "MinQとは何でしょうか?",
            user: "brainvader",
            date: "2020-11-12T20:41:58Z",
            question: [
                {
                    uid: "0x77a12",
                    content: "MinQとは何でしょうか?",
                    order: 0
                },
                {
                    uid: "0x77a14",
                    content: "またどのようなものを目指しているでしょうか?",
                    order: 1
                }
            ],
            answer: [
                {
                    uid: "0x77a13",
                    content: "MinQはクイズベースの独学支援システムです.",
                    order: 0
                },
                {
                    uid: "0x77a15",
                    content: "学習したい分野を小さなクイズに分割して少しずつ学ぶことができます.",
                    order: 1
                },
                {
                    uid: "0x77a16",
                    content: "最終的には最適化されたクイズの提供, 学習ペース管理, 適切なタイミングでの復習などユーザーの学習を総合的に支援します.",
                    order: 2
                }
            ],
            tags: [
                {
                    uid: "0x77a17",
                    tag_name: "minq"
                },
                {
                    uid: "0x77a18",
                    tag_name: "tutorial"
                }
            ]
        },
        {
            uid: "0x77a1a",
            title: "put on holdとは?",
            user: "brainvader",
            date: "2020-11-12T21:07:29Z",
            question: [
                {
                    uid: "0x77a19",
                    content: "put on holdとは?",
                    order: 0
                }
            ],
            answer: [
                {
                    uid: "0x77a1b",
                    content: "保留する",
                    order: 0
                }
            ],
            tags: [
                {
                    uid: "0x77a1c",
                    tag_name: "english"
                }
            ]
        },
        {
            title: "hotshotとは?",
            uid: "0x12",
            user: "brainvader",
            version: "0.0.1",
            date: "2020-10-08T18:01:01",
            question: [
                {
                    uid: "0x104",
                    type: "text",
                    content: "hotshotとは?",
                    order: 0
                }
            ],
            answer: [
                {
                    type: "0x205",
                    content: "有能な人、やり手, 凄腕",
                    order: 0
                }
            ],
            tags: [
                {
                    uid: "0x303",
                    tag_name: "english"
                }
            ]
        }
    ]
}