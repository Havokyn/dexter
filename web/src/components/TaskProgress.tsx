'use client'

import { Task, TaskStatus } from '@/types'
import { CheckCircle2, XCircle, Loader2, Circle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TaskProgressProps {
  tasks: Task[]
}

export default function TaskProgress({ tasks }: TaskProgressProps) {
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {tasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} />
        ))}
      </AnimatePresence>
    </div>
  )
}

interface TaskItemProps {
  task: Task
  index: number
}

function TaskItem({ task, index }: TaskItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.1 }}
      className="bg-background-tertiary rounded-lg border border-border p-4"
    >
      <div className="flex items-start gap-3">
        <TaskStatusIcon status={task.status} />
        <div className="flex-1 min-w-0">
          <p className="font-medium">{task.description}</p>

          {task.error && (
            <p className="text-sm text-error mt-1">{task.error}</p>
          )}

          {task.subTasks && task.subTasks.length > 0 && (
            <div className="mt-3 space-y-2 pl-4 border-l-2 border-border">
              {task.subTasks.map((subTask) => (
                <SubTaskItem key={subTask.id} subTask={subTask} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

interface SubTaskItemProps {
  subTask: Task['subTasks'][0]
}

function SubTaskItem({ subTask }: SubTaskItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2"
    >
      <TaskStatusIcon status={subTask.status} size="sm" />
      <p className="text-sm text-muted-light">{subTask.description}</p>
    </motion.div>
  )
}

interface TaskStatusIconProps {
  status: TaskStatus
  size?: 'sm' | 'md'
}

function TaskStatusIcon({ status, size = 'md' }: TaskStatusIconProps) {
  const iconSize = size === 'sm' ? 16 : 20

  switch (status) {
    case 'completed':
      return <CheckCircle2 size={iconSize} className="text-success flex-shrink-0" />
    case 'failed':
      return <XCircle size={iconSize} className="text-error flex-shrink-0" />
    case 'running':
      return <Loader2 size={iconSize} className="text-primary animate-spin flex-shrink-0" />
    case 'pending':
      return <Circle size={iconSize} className="text-muted flex-shrink-0" />
  }
}
