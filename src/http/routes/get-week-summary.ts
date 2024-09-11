import { getWeekSummaryUseCase } from '../../use-cases/get-week-summary.useCase'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get('/week-summary', async () => {
    const { summary } = await getWeekSummaryUseCase()

    return {
      summary,
    }
  })
}
