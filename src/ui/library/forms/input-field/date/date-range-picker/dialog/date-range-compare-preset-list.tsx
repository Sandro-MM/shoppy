'use client'
import {List, ListItem} from '@ui/list/list';
import {Trans} from '@ui/i18n/trans';
import {DateRangeValue} from '@ui/forms/input-field/date/date-range-picker/date-range-value';
import {DateRangeComparePresets} from '@ui/forms/input-field/date/date-range-picker/dialog/date-range-compare-presets';

interface DateRangePresetList {
  originalRangeValue: DateRangeValue;
  onPresetSelected: (value: DateRangeValue) => void;
  selectedValue?: DateRangeValue | null;
}
export function DateRangeComparePresetList({
  originalRangeValue,
  onPresetSelected,
  selectedValue,
}: DateRangePresetList) {
  return (
    <List>
      {DateRangeComparePresets.map(preset => (
        <ListItem
          borderRadius="rounded-none"
          capitalizeFirst
          key={preset.key}
          isSelected={selectedValue?.preset === preset.key}
          onSelected={() => {
            const newValue = preset.getRangeValue(originalRangeValue);
            onPresetSelected(newValue);
          }}
        >
          <Trans {...preset.label} />
        </ListItem>
      ))}
    </List>
  );
}
