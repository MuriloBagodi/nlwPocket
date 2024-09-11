import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletions } from '../../use-cases/create-goalCompletions.useCase'
import z from 'zod'
export const createCompletions: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body
      await createGoalCompletions({
        goalId,
      })
    }
  )
}
