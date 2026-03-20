import Link from "next/link"

type Props = {
  city: string
  slug: string
  title: string
  excerpt?: string
}

export default function CityCard({
  city,
  slug,
  title,
  excerpt,
}: Props) {
  return (
    <Link
      href={`/${city}/${slug}`}
      className="block p-6 bg-white rounded-2xl shadow hover:shadow-xl transition hover:-translate-y-1"
    >
      <h2 className="text-xl font-semibold">{title}</h2>

      {excerpt && (
        <p className="text-gray-600 mt-2 text-sm">
          {excerpt}
        </p>
      )}
    </Link>
  )
}