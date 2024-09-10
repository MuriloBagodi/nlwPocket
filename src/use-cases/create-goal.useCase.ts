import { goals } from './../db/schema'
import { db } from '../db'

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

interface CreateGoalResponse {
  goal: object
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest): Promise<CreateGoalResponse> {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return { goal }
}
