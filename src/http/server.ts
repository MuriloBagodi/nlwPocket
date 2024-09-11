import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import z from 'zod'
import { createGoalCompletions } from '../use-cases/create-goalCompletions.useCase'
import { createGoalRoute } from './routes/create-goal'
import { getPendingGoals } from './routes/get-pending-completions'
import { createCompletions } from './routes/create-completion'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(getPendingGoals)
app.register(createCompletions)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server Running !'))
