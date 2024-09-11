import { goalCompletions, goals } from './../db/schema'
import { db } from '../db'
import { count, and, gte, lte, eq, sql } from 'drizzle-orm'
import dayjs from 'dayjs'

interface CreateGoalCompletionsRequest {
  goalId: string
}

interface CreateGoalCompletionsResponse {
  goal: object
}

export async function createGoalCompletions({
  goalId,
}: CreateGoalCompletionsRequest) {
  // Não permitir que uma meta exceda o numero máximo de vezes que o usuário se propôs
  const lastDayOffWeek = dayjs().endOf('week').toDate()
  const firstDayOffWeek = dayjs().startOf('week').toDate()

  const goalsCompletionCounts = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.goalId).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOffWeek),
          lte(goalCompletions.createdAt, lastDayOffWeek)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const result = await db
    .with(goalsCompletionCounts)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount: sql /* sql */`
      COALESCE(${goalsCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goals)
    .leftJoin(goalsCompletionCounts, eq(goalsCompletionCounts.goalId, goals.id))
    .where(eq(goals.id, goalId))
    .limit(1)
    .toSQL()

  console.log(result)
  // // const { completionCount, desiredWeeklyFrequency } = result[0]

  // if (completionCount >= desiredWeeklyFrequency) {
  //   throw new Error('Goal already completed this week')
  // }

  // const insertedResult = await db
  //   .insert(goalCompletions)
  //   .values({
  //     goalId,
  //   })
  //   .returning()

  // const goalCompletion = insertedResult[0]

  // return {
  //   goalCompletion,
  // }
}
