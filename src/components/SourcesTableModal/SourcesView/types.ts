import { Sources, Topic } from '~/types'

export type Props = {
  data: Sources[] | undefined
}

export type TopicTableProps = {
  data: Topic[] | null
  showMuted?: boolean
  setSelectedTopic: (topic: Topic) => void
}

export type TdProps = {
  width?: string
}

export interface ISourceMap {
  [key: string]: string
}

export type TPill = {
  selected: boolean
}