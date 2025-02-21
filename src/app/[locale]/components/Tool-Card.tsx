import Link from "next/link";
import locales from "../util/locales.json";

export default function ToolCard({ title, description, href, lang }: { title: string, description: string, href: string, lang: keyof typeof locales }) { 
  const seeMoreText = locales[lang]?.seeMoreButton || "See More";
  return (
		<div className="card bg-base-200 shadow-lg hover:shadow-2xl transition">
			<div className="card-body">
				<h3 className="card-title text-2xl font-semibold">{title}</h3>
				<p className="text-info">{description}</p>
				<div className="card-actions mt-4">
					<Link href={href} className="btn btn-outline btn-primary btn-sm">
						{seeMoreText}
					</Link>
				</div>
			</div>
		</div>
	);
}