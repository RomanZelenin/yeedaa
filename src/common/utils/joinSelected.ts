import { SelectItem } from '~/app/features/filters/filtersSlice';

export function joinSelected(items: SelectItem[]) {
    return items
        .filter((it) => it.selected)
        .map((it) => it.title)
        .join(',');
}
