/* =============================================
   useMonkaData — React hook for loading Supabase data
   ============================================= */

import { useState, useEffect } from 'react'
import { fetchAllMonkaData, type MonkaData } from './supabaseData'

export function useMonkaData() {
    const [data, setData] = useState<MonkaData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false
        setLoading(true)

        fetchAllMonkaData()
            .then(result => {
                if (cancelled) return
                setData(result)
                if (result.error) setError(result.error)
                setLoading(false)
            })
            .catch(err => {
                if (cancelled) return
                setError(err.message || 'Erreur de chargement')
                setLoading(false)
            })

        return () => { cancelled = true }
    }, [])

    return { data, loading, error }
}
