import { extendTailwindMerge } from 'tailwind-merge';

export const tw = extendTailwindMerge({
  classGroups: {
    'text-shadow': [{ text: ['shadow', 'shadow-sm', 'shadow-lg'] }],
  },
});
