import { createServer, Model, Response } from "miragejs"

import createQuizzes from './createQuizzes'

export function makeServer({ environment = "development" } = {}) {
    let server = createServer({
        environment,

        models: {
            quiz: Model,
        },

        seeds(server) {
            server.db.loadData({
                quizzes: createQuizzes()
            })
        },

        routes() {
            this.namespace = 'api'

            this.passthrough((request) => {
                if (request.url === "/_next/static/development/_devPagesManifest.json") return true;
            })

            this.get('/quizzes', (schema, request) => {
                const { page } = request.queryParams;
                const quizzes = schema.quizzes.all()
                const body = {
                    totalQuizzes: 2,
                    totalPages: 1,
                    quizzes: quizzes.models
                }

                return new Response(200, { "Content-Type": "application/json" }, body)

            })

            this.get('/quizzes/:uid', (schema, request) => {
                const uid = request.params.uid
                const quiz = schema.quizzes.findBy({ uid: uid })
                return new Response(200, { "Content-Type": "application/json" }, quiz.attrs)
            })

            this.put('/quizzes/:uid', (schema, request) => {
                const uid = request.params.uid
                const attrs = JSON.parse(request.requestBody)
                const { quiz } = attrs
                const [newQuiz] = schema.db.quizzes.update({ uid: uid }, quiz)
                return new Response(200, { "Content-Type": "application/json" }, newQuiz)
            })
        },
    })

    return server
}

