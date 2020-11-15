import { graphql } from 'msw'

export const handlers = [
    // TODO: implement operation kind for mutaion
    graphql.mutation(),

    // TODO: implement operation kind for query
    graphql.query('GetAllUsers', (req, res, ctx) => {

        console.log('GetAllUsers', req)

        return res(

            ctx.data({

                users: [

                    {

                        firstName: 'John',

                        lastName: 'Maverick',

                    },

                    {

                        firstName: 'Cathaline',

                        lastName: 'McCoy',

                    },

                ],

            }),

        )

    })
]