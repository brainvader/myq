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
        },
    })

    return server
}

