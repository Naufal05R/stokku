export const getLabel = (label: unknown) => {
  if (typeof label === 'string') return label
}

export const getMetaLabel = (meta: unknown) => {
  if (!!meta && typeof meta === 'object' && 'label' in meta) return String(meta.label)
}
