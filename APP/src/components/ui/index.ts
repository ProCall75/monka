/* =============================================
   Design System — Barrel Export
   
   Central import point for all UI components.
   Usage: import { StatusBadge, ScoreGauge } from '@/components/ui'
   ============================================= */

export { StatusBadge, getLevelStyles } from './StatusBadge'
export type { ClinicalLevel } from './StatusBadge'

export { ScoreGauge } from './ScoreGauge'

export { HeroCard } from './HeroCard'

export { Tooltip } from './Tooltip'

export { ProgressBar } from './ProgressBar'

export { FilterBar } from './FilterBar'
export type { FilterOption, FilterGroup } from './FilterBar'
