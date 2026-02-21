/* Score-Action Gap Detection
   Identifies vulnerabilities with high/critical scores but zero activated MPs.
   This is a critical clinical safety check. */

import { VULN_IDS, getThresholdsForVuln, type VulnerabilityId } from '../../clinical/hooks'
import type { MonkaData } from '../../clinical/hooks'

export interface ScoreActionGap {
    vulnId: VulnerabilityId
    score: number
    max: number
    thresholdLevel: string
    activeMPCount: number
}

/**
 * Detects Score-Action Gaps: high vulnerability scores with no activated MP.
 * @param data Full Monka dataset
 * @param scoreByV Per-vulnerability scores
 * @param activatedMPs List of currently activated MP IDs
 * @param mpVulnMap Map of MP ID → vulnerability ID
 * @returns Array of detected gaps (empty = no gaps)
 */
export function detectScoreActionGaps(
    data: MonkaData,
    scoreByV: Record<string, { score: number; max: number }>,
    activatedMPs: string[],
    mpVulnMap: Record<string, string>,
): ScoreActionGap[] {
    const gaps: ScoreActionGap[] = []

    // Count activated MPs per vulnerability
    const mpCountByV: Record<string, number> = {}
    for (const mpId of activatedMPs) {
        const v = mpVulnMap[mpId]
        if (v) mpCountByV[v] = (mpCountByV[v] || 0) + 1
    }

    for (const vid of VULN_IDS) {
        const vs = scoreByV[vid]
        if (!vs || vs.score === 0) continue

        const thresholds = getThresholdsForVuln(data, vid)
        const threshold = thresholds.find(t => vs.score >= t.min_score && vs.score <= t.max_score)
        if (!threshold) continue

        const level = threshold.level.toLowerCase()
        const isHighRisk = level === 'eleve' || level === 'élevé' || level === 'critique'
        const activeMPCount = mpCountByV[vid] || 0

        if (isHighRisk && activeMPCount === 0) {
            gaps.push({
                vulnId: vid,
                score: vs.score,
                max: vs.max,
                thresholdLevel: threshold.level,
                activeMPCount,
            })
        }
    }

    return gaps
}
