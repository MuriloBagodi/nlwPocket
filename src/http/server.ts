import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { getPendingGoalsRoute } from './routes/get-pending-completions'
import { createCompletionsRoute } from './routes/create-completion'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(getPendingGoalsRoute)
app.register(createCompletionsRoute)
app.register(getWeekSummaryRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server Running !'))
