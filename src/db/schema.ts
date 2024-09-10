import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

// criando tabela para as metas
/**
 * Requisitos funcionais:
 * - Deve armazenar a meta de frequência semanal que o usuário quer atingir
 * - Deve armazenar a data na qual essa meta foi criada.
 * - Deve armazenar um titulo
 */
export const goals = pgTable('goals', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

// criando tabela para metas completadas
/**
 * Requisitos funcionais:
 * - Deve armazenar a meta de frequência semanal que o usuário quer atingir
 * - Deve armazenar a data na qual essa meta foi criada.
 * - Deve armazenar um titulo
 */

export const goalCompletions = pgTable('goal_completions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  goalId: text('goal_id')
    .notNull()
    .references(() => goals.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
