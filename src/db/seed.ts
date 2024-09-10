// Arquivo no qual vai popular o banco de dados de forma lúdica
import { db, client } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  await db.insert(goals).values([
    {
      title: 'Acordar cedo',
      desiredWeeklyFrequency: 5,
    },
    {
      title: 'Me exercitar',
      desiredWeeklyFrequency: 4,
    },
    {
      title: 'Meditar',
      desiredWeeklyFrequency: 2,
    },
  ])
}

seed().finally(() => {
  client.end()
})
