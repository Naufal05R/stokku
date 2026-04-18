interface ItemHeadingProps {
  title?: string
  description?: string
}

export const ItemHeading = ({ title, description }: ItemHeadingProps) => {
  return (
    <div className="mb-8 w-full border-b border-slate-200 pb-4 dark:border-slate-800">
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          {title || 'Item Configuration'}
        </h3>
        {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
    </div>
  )
}
