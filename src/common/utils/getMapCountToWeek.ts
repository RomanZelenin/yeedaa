import { StatsItem } from '~/query/types';

import { getStartOfWeek } from './getStartOfWeek';

export function getMapCountToWeek(stats: StatsItem[]) {
    const initialValue: { date: string; count: number }[] = [];
    return stats
        .map((it) => ({
            ...it,
            date: getStartOfWeek(new Date(it.date)),
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map((it) => ({
            ...it,
            date: it.date.toLocaleString('en-US', { month: 'short', day: 'numeric' }),
        }))
        .reduce((acc, curr) => {
            if (acc.length > 0 && acc[acc.length - 1].date === curr.date) {
                return [
                    ...acc.slice(0, acc.length - 1),
                    {
                        date: acc[acc.length - 1].date,
                        count: acc[acc.length - 1].count + curr.count,
                    },
                ];
            } else {
                acc.push(curr);
                return acc;
            }
        }, initialValue);
}
